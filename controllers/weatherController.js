import express from 'express';

import { getWeather } from '../services/weatherService.js';

async function weatherController(req, res) {
  const { city } = req.query;

  try {
    const weatherInfo = await getWeather(city);
    res.json(weatherInfo);
  } catch (error) {
    // Log the full error to your terminal for debugging
    console.error('Axios error:', error.response?.data || error.message);

    // Check if the error is a 404 (City Not Found) from OpenWeatherMap
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: `City not found: ${city}` });
    }

    // Check if the error is a 401 (Invalid API Key)
    if (error.response && error.response.status === 401) {
      return res.status(401).json({ message: 'Invalid API Key.' });
    }

    // For all other errors, send a generic 500 error
    res.status(500).json({ message: 'Error fetching weather data' });
  }
}

export default weatherController;
