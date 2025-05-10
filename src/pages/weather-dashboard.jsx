import { AiSummarize } from '@/api/chatbot'
import AirPollution from '@/components/AirPollution'
import CurrentWeather from '@/components/current-weather'
import FavoriteCities from '@/components/favorities-cities'
import HourlyTemperature from '@/components/hoourly-temperature'
import WeatherSkeleton from '@/components/loading-skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import WeatherDetails from '@/components/weather-details'
import WeatherForecast from '@/components/weather-forecast'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useAirPollutionQuery, useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather'
import axios from 'axios'
import { AlertCircle, AlertTriangle, Loader, MapPin, RefreshCw, Terminal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function WeatherDashboard() {

  const { coordinates, error: locationError, getLocation, isLoading: locationLoding } = useGeolocation()

  const [chatOutput, setChatOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const locationQuery = useReverseGeocodeQuery(coordinates)
  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)
  const airForeCast = useAirPollutionQuery(coordinates)
  const navigate=useNavigate()
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  useEffect(() => {
    async function authenticate() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/isLogged`, {
          withCredentials: true,
        });
        console.log(response)
        if (response.status !== 200) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    }

    authenticate();
  }, []);

  const handleSummarization = async () => {
    setLoading(true)
    const response = await AiSummarize(weatherQuery.data, forecastQuery.data, locationQuery.data)
    console.log(response)
    setChatOutput(response)
    setLoading(false)
  }
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }


  if (locationLoding) {
    return <WeatherSkeleton />
  }

  if (locationError) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant={"destructive"}>
        <Terminal className="h-4 w-4" />
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant={"destructive"}>
        <Terminal className="h-4 w-4" />
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>{locationError}</p>
          <Button onClick={handleRefresh} variant="outline" className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  
  if (!weatherQuery.data || !forecastQuery.data || !airForeCast.data) {
    return <WeatherSkeleton />
  }
  return (
    <div className='space-y-4'>
    

      {/* Favorite Cities */}
      <FavoriteCities />
      <div className='flex items-center justify-between'>
        <div className='flex flex-=row items-center'>
          <MapPin color='green' />
          <h1 className='text-xl font-bold tracking-tight'> My Location</h1>
        </div>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Current and Hourly weather */}
      <div className="grid gap-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {weatherQuery && locationName && (
            <CurrentWeather
              data={weatherQuery.data}
              locationName={locationName}
            />
          )}
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div className="flex flex-col gap-6">
            <WeatherDetails data={weatherQuery.data} />
            <AirPollution data={airForeCast.data} />
          </div>
          <WeatherForecast data={forecastQuery.data} />
        </div>

      </div>

      <Drawer direction="right w-[350px] ">
        <DrawerTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-lg"
            onClick={handleSummarization}
          >
            {loading ? <>
              <Loader className='animate-spin' /> Summarizing..
            </> : <>AI SUMMARY</>}
          </Button>
        </DrawerTrigger>

        {chatOutput &&
          (
            <DrawerContent className="w-[350px] p-4 bg-white shadow-lg">
              <h3 className="text-lg font-semibold mb-2">AI Weather Summary</h3>
              <div className="text-sm text-muted-foreground overflow-y-auto max-h-[80vh] whitespace-pre-line">
                <div
                  className="text-sm text-muted-foreground overflow-y-auto max-h-[80vh]"
                  dangerouslySetInnerHTML={{ __html: chatOutput }}
                />

              </div>

            </DrawerContent>
          )}
      </Drawer>

    </div>
  )
}

export default WeatherDashboard