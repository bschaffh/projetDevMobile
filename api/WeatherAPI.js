const WEATHER_API_KEY = "e1ab33ad7c084643966214927223001";
const WEATHER_API_URL = "http://api.weatherapi.com/v1/";

export async function searchPlace(searchTerm) {
    try {
        const url = `${WEATHER_API_URL}search.json?key=${WEATHER_API_KEY}&q=${searchTerm}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(`Error with function WeatherAPI/searchPlace: ${error.message}`);
        throw error;
    }
}

export async function getPlaceInfo(lat, lon) {
    try {
        const url = `${WEATHER_API_URL}current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=yes`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(`Error with function WeatherAPI/getPlaceInfo: ${error.message}`);
        throw error;
    }
}