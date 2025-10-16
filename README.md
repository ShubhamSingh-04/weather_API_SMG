# Weather API

A simple and efficient REST API built with Node.js and Express to provide weather information from OpenWeatherMap. It features a caching mechanism to minimize redundant requests to external services and improve response times.

## ✨ Features

- **Express Server**: Provides robust and simple API routing.
- **OpenWeatherMap Integration**: Fetches real-time weather data from the OpenWeatherMap API.
- **Weather Endpoint**: A dedicated `/weather` route to fetch weather data.
- **Data Caching**: Implements a local cache to store recent weather data and reduce latency.
- **Automatic Cache Cleanup**: A scheduled job periodically removes expired data from the cache.

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1.  **Clone the repository:**
    `git clone https://github.com/ShubhamSingh-04/weather_API_SMG.git`

2.  **Navigate to the project directory:**
    `cd weather_API_SMG`

3.  **Install dependencies:**
    `npm install`

4.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your OpenWeatherMap API key:
    ```
    OPEN_WEATHER_API_KEY=your_api_key_here
    PORT=3000
    ```
5.  **Start the server:**
    `npm start`

The following are set in the `config.js` file:

- `CACHE_DURATION_MS`
- `CLEANUP_INTERVAL_MS`

## 🖥️ Usage

### Running the application

To start the server, run: `npm start`

The server will start on the port defined in your environment variables, or on port `3000` by default.

### API Endpoints

#### `GET /`

Returns a simple welcome message.
**Example:** `curl http://localhost:3000/`

#### `GET /weather`

Fetches weather information for a specific city.
**Example:** `curl "http://localhost:3000/weather?city=London"`

Returns a JSON response with weather details such as temperature, humidity, and description.
{
"temperature": 15.0,
"condition": "Clouds",
"humidity": 87
}

### `GET /weather`

Fetches current weather information for a specified city.

#### Query Parameters

- `city` (string, **required**): The name of the city for which you want weather information.

**Example:** `curl "http://localhost:3000/weather?city=London"`

#### Success Response

**Code:** `200 OK`

Returns a JSON object containing the key weather details.

**Content:**

```json
{
  "temperature": 15.0,
  "condition": "Clouds",
  "humidity": 87
}
```
