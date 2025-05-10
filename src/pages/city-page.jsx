import { AiSummarize } from '@/api/chatbot'
import CurrentWeather from '@/components/current-weather'
import FavoriteButton from '@/components/favorite-button'
import HourlyTemperature from '@/components/hoourly-temperature'
import WeatherSkeleton from '@/components/loading-skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import WeatherDetails from '@/components/weather-details'
import WeatherForecast from '@/components/weather-forecast'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather'
import axios from 'axios'
import { AlertTriangle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

function CityPage() {
  const [chatOutput, setChatOutput] = useState("")
  const [searchParams] = useSearchParams(); // FIXED
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates)
  useEffect(() => {
    async function addToDb() {
      if (!weatherQuery?.data) return;

      try {
        console.log('object')
        const reponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/save`,
          {
            city: weatherQuery.data.name,
            condition: weatherQuery.data.weather[0].main,
            temperature: weatherQuery.data.main.temp
          },
          { withCredentials: true }
        );
        console.log("added successfully", reponse);
      } catch (error) {
        console.error("Error in adding to DB:", error); // Log actual error
      }
    }

    addToDb();
  }, [weatherQuery?.data]);
  const handleSummarization = async () => {
    const response = await AiSummarize(weatherQuery.data, forecastQuery.data, locationQuery.data)
    console.log(response)
    setChatOutput(response)
    console.log(chatOutput)
  }
  if (weatherQuery.error || forecastQuery.error) {


    return (
      <Alert variant={"destructive"}>
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }



  console.log(weatherQuery?.data.main.temp)
  console.log(weatherQuery?.data.name)
  console.log(weatherQuery?.data.weather[0].main)
  console.log(forecastQuery?.data)
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>{params.cityName} ,{weatherQuery.data.sys.country}</h1>
      </div>
      <div>
        <FavoriteButton data={weatherQuery.data} />
      </div>
      <div className='grid gap-6'> {/* FIXED */}
        <div className='flex flex-col  gap-4'>
          {weatherQuery.data && <CurrentWeather data={weatherQuery.data} />}
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
      <Drawer direction="right w-[350px] ">
        <DrawerTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-lg"
            onClick={handleSummarization}
          >
            AI Summary
          </Button>
        </DrawerTrigger>

        <DrawerContent className="w-[350px] p-4 bg-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">AI Weather Summary</h3>
          <div className="text-sm text-muted-foreground overflow-y-auto max-h-[80vh] whitespace-pre-line">
            <div
              className="text-sm text-muted-foreground overflow-y-auto max-h-[80vh]"
              dangerouslySetInnerHTML={{ __html: chatOutput }}
            />

          </div>

        </DrawerContent>
      </Drawer>

    </div>
  );
}

export default CityPage;
