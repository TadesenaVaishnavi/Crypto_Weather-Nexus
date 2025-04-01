"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [city, setCity] = useState("London");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric"); // Default: Celsius
  const [weatherData, setWeatherData] = useState<any>(null);
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [currency, setCurrency] = useState<"usd" | "inr">("usd"); // Default: USD
  const [exchangeRate, setExchangeRate] = useState<number>(82); // Approximate 1 USD = 82 INR
  const [error, setError] = useState<string | null>(null);

  // Fetch Weather Data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=0730612a627dcd512dd2dd48e02a7fae`
        );
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
          setError(null);
        } else {
          setError(`Error fetching weather data for ${city}.`);
        }
      } catch (error) {
        setError("Failed to fetch weather data. Check your connection.");
      }
    };

    fetchWeather();
  }, [city, unit]);

  // Fetch Cryptocurrency Data
  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
        const data = await response.json();

        if (response.ok) {
          setCryptoData(data);
        } else {
          console.error("Crypto API Error:", data);
        }
      } catch (error) {
        console.error("Crypto API Fetch Error:", error);
      }
    };

    fetchCrypto();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* City & Temperature Unit Selection */}
      <div className="mb-4 flex space-x-4">
        <select className="p-2 border rounded-lg" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Tokyo">Tokyo</option>
        </select>
        <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${ unit === "metric" ? "bg-blue-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400"}`} onClick={() => setUnit("metric")}>
          °C  
        </button>
        <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${unit === "imperial" ? "bg-blue-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400"}`}onClick={() => setUnit("imperial")}>
          °F
        </button>

      </div>

      {/* Weather Section */}
      <section className="mb-6 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Weather Information</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : weatherData ? (
          <div>
            <p><strong>City:</strong> {weatherData.name}</p>
            <p><strong>Temperature:</strong> {weatherData.main.temp}°{unit === "metric" ? "C" : "F"}</p>
            <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
            <p><strong>Conditions:</strong> {weatherData.weather[0]?.description}</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </section>

      {/* Cryptocurrency Section */}
      <section className="mb-6 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Cryptocurrency Information</h2>

        {/* Currency Toggle */}
        <div className="flex space-x-4 mb-4">
        {/* <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${ currency === "usd" ? "bg-blue-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400" }`} onClick={() => setCurrency("usd")} >
            USD ($)
          </button> */}
          {/* <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${ currency === "inr" ? "bg-blue-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400" }`} onClick={() => setCurrency("inr")} > */}
          {/* <button className={`px-4 py-2 rounded-lg ${currency === "inr" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setCurrency("inr")}> */}
            {/* INR (₹)
          </button> */}
        </div>

        {cryptoData ? (
          <div>
            <p><strong>Coin:</strong> {cryptoData.name}</p>
            <p>
              <strong>Current Price:</strong>{" "}
              {currency === "usd"
                ? `$${cryptoData.market_data?.current_price?.usd ?? "N/A"}`
                : `₹${(cryptoData.market_data?.current_price?.usd * exchangeRate).toFixed(2) ?? "N/A"}`}
            </p>
            <p><strong>24h Change:</strong> {cryptoData.market_data?.price_change_percentage_24h ?? "N/A"}%</p>
          </div>
        ) : (
          <p>Loading crypto data...</p>
        )}
      </section>
    </div>
  );
}
