// src/hooks/useWeather.js
import { useState, useEffect } from "react";

export const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&timestamp=${Date.now()}`
        );

        if (!response.ok) throw new Error("City not found ❌");

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setWeather(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, apiKey]);

  return { weather, error, loading };
};
