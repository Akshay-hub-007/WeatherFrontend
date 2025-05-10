import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    weather: (coords) => ["weather", coords],
    forecast: (coords) => ["forecast", coords],
    location: (coords) => ["location", coords],
    pollution:(coords)=>["pollution",coords],
    search:(query)=>["search",query]
};

export function useWeatherQuery(coordinates) {
    console.log();
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => weatherAPI.getCurrentWeather(coordinates.lat, coordinates.lon),
        enabled: !!coordinates,
    });
}
export function useForecastQuery(coordinates) {
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: async () => {
            if (!coordinates) return null;
            try {
                return await weatherAPI.getForecast(coordinates.lat, coordinates.lon);
            } catch (error) {
                console.error("Forecast API Error:", error);
                return null;
            }
        },
        enabled: !!coordinates,
    });
}

export function useAirPollutionQuery(coordinates)
{
    return useQuery({
        queryKey:WEATHER_KEYS.pollution(coordinates??{lat:0,lon:0}),
        queryFn:async()=>{
            if(!coordinates) return null
            try {
                return await weatherAPI.getAirPollution(coordinates.lat,coordinates.lon)
            } catch (error) {
                 console.error("Air Pollution API Error:", error);
                return null;
            }
        },
         enabled: !!coordinates,
    })
}

export function useReverseGeocodeQuery(coordinates) {
    console.log(coordinates);
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () =>
            coordinates ? weatherAPI.reverseGeocode(coordinates.lat, coordinates.lon) : null, 
        enabled: !!coordinates,
    });
}

export function useLocationSearch(query)
{
    return useQuery({
        queryKey:WEATHER_KEYS.search(query) ,
        queryFn:()=>weatherAPI.searchLocations(query),
        enabled:query.length>=3
    })
}
