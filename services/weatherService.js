import dotenv from 'dotenv';
import axios from 'axios';
import { getCache, setCache } from '../database.js';
import { CACHE_DURATION_MS } from '../config.js';

dotenv.config();

async function getWeather(city) {
  try {
    const lowerCaseCity = city.toLowerCase();

    // Check the cache
    const cachedData = await getCache(lowerCaseCity);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION_MS) {
      console.log(`✅ Serving "${city}" from database cache.`);
      return cachedData.data;
    }

    // If not in cache, fetch from API
    const weatherInfo = await getWeatherFromAPI(lowerCaseCity);

    // Save to cache
    await setCache(lowerCaseCity, weatherInfo);

    return weatherInfo;
  } catch (err) {
    throw err;
  }
}

async function getWeatherFromAPI(city) {
  const API_KEY = process.env.OPEN_WEATHER_API_KEY;
  console.log(`Fetching weather from API for ${city}`);

  // Build the API URL
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Extract just the data we need
    const weatherInfo = {
      temperature: data.main.temp,
      condition: data.weather[0].main, // e.g., "Clouds", "Rain"
      humidity: data.main.humidity,
    };

    return weatherInfo;
  } catch (err) {
    throw err;
  }
}

export { getWeather };
