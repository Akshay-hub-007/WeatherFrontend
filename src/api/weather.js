import { API_CONFIG } from "./config";
class WeatherAPI {
    createUrl(endpoint, params) {
        
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params
        })
        return `${endpoint}?${searchParams.toString()}`;
    }

    async fetchData(url) {
        console.log(url);
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Weather API Error :${response.statusText}`)
        }
        return response.json()
    }
    async getCurrentWeather(lat, lon) {

        console.log("Fetching weather data...");
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        });
        console.log(url);

        console.log(API_CONFIG.DEFAULT_PARAMS.units);

        return this.fetchData(url);
    }
    async getForecast(lat, lon) {
        try {
            console.log("Fetching forecast data for:", lat, lon);

            const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
                lat: lat.toString(),
                lon: lon.toString(),
                units: API_CONFIG.DEFAULT_PARAMS.units
            });

            console.log("Request URL:", url);

            const data = await this.fetchData(url);
            return data;
        } catch (error) {
            console.error("Error fetching forecast data:", error);
            throw error;
        }
    }

    async reverseGeocode(lat, lon) {
        console.log(lat,lon);
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit: 1
        })
       console.log(url);
        return this.fetchData(url)
    }

    async searchLocations(query){
        const url=this.createUrl(`${API_CONFIG.GEO}/direct`,{
            q:query,
            limit:5
        })

        return this.fetchData(url)
    }

    async getAirPollution(lat,lon)
    {
        const url=this.createUrl(`${API_CONFIG.BASE_URL}/air_pollution`,{
            lat:lat,
            lon:lon
        })
        console.log(url)
        return this.fetchData(url)
    }

}

export const weatherAPI = new WeatherAPI()