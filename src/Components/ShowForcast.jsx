import React, { useState } from "react";
import { useForecast } from "../Hook/useForecast";
import ForecastCard from "./ForecastCard";

const ShowForecast = ({ city, isDark }) => {
  const [showFullForecast, setShowFullForecast] = useState(false);
  const { foreCast, forecastError, foreCastLoading } = useForecast(city);

  const visibleForecast = showFullForecast
    ? foreCast?.list
    : foreCast?.list?.slice(0, 7);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Theme classes
  const baseText = isDark ? "text-white" : "text-black";
  const fadedText = isDark ? "text-white/80" : "text-black/80";
  const boxBg = isDark ? "bg-white/10 text-white" : "bg-white/30 text-black";

  if (foreCastLoading)
    return <p className={`${baseText} text-center`}>Loading forecast...</p>;

  if (forecastError)
    return (
      <p className="text-red-500 text-center font-medium">
        Error: {forecastError}
      </p>
    );

  if (!foreCast || !foreCast.list) return null;

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {/* Section Title */}
        <div className={`text-center text-white ${baseText}`}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-1">
            Weather Forecast
          </h2>
          <p className={fadedText} style={{ color: "white" }}>
            {city && `Next ${showFullForecast ? 15 : 7} days in ${city}`}
          </p>
        </div>

        {/* Forecast Header */}
        <div
          className={`hidden sm:flex justify-between font-semibold px-2 text-white`}
        >
          <p>Date</p>
          <p>Temperature</p>
        </div>

        {/* Forecast Cards */}
        <div className="flex flex-col gap-3">
          {visibleForecast.map((day, index) => (
            <ForecastCard
              key={index}
              data={day}
              formatDate={formatDate}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Show More Button */}
        {!showFullForecast && foreCast?.list?.length > 7 && (
          <div className="text-center">
            <button
              onClick={() => setShowFullForecast(true)}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition"
            >
              Show 15-Day Weather Forecast
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowForecast;
