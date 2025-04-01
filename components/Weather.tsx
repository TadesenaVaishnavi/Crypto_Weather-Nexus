"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = "0730612a627dcd512dd2dd48e02a7fae"; // Your API key

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        if (!response.ok) {
          console.error("API Error:", data); // Debugging
          throw new Error(data.message || "Failed to fetch weather data");
        }

        setWeatherData(data);
        setError(null); // Clear previous errors
      } catch (err: any) {
        console.error("Fetch error:", err); // Debugging
        setError(err.message);
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Weather Information</h2>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : weatherData ? (
        <div className="space-y-2">
          <p className="text-lg"><strong>📍 City:</strong> {weatherData.name}</p>
          <p>🌡️ <strong>Temperature:</strong> {weatherData.main.temp}°C</p>
          <p>💧 <strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p>🌤️ <strong>Conditions:</strong> {weatherData.weather[0]?.description}</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading weather data...</p>
      )}
    </div>
  );
}
