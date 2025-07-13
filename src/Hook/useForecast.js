import { useEffect, useState } from "react";

export const useForecast = () => {
  const [foreCast, setForeCast] = useState(null);
  const [forecastError, setForecastError] = useState("");
  const [foreCastLoading, setForeCastLoading] = useState(false);

  const city = "Bhopal";
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const cnt = 15;

  useEffect(() => {
    if (!city || !apiKey) return;

    const fetchForecast = async () => {
      setForeCastLoading(true);
      setForecastError("");

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${cnt}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("City not found or API error");
        }

        const data = await response.json();
        setForeCast(data);
      } catch (error) {
        setForeCast(null);
        setForecastError(error.message);
      } finally {
        setForeCastLoading(false);
      }
    };

    fetchForecast();
  }, [city, apiKey]);

  return { foreCast, forecastError, foreCastLoading };
};
