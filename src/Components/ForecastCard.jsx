import React from "react";

const ForecastCard = ({ data, formatDate }) => {
  if (!data) return null;

  const date = new Date();
  const today = date.toLocaleDateString("en-US", {
    month: "short",
    weekday: "short",
    day: "numeric",
  });

  const isToday = formatDate(data.dt) === today;

  return (
    <div className="w-full">
      <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl px-4 py-3 flex items-center justify-between text-white transition-all hover:bg-white/20">
        <div className="flex flex-col">
          <p className="text-sm sm:text-base font-medium">
            {formatDate(data.dt)}
          </p>
          {isToday && (
            <span className="text-green-400 text-xs sm:text-sm font-semibold">
              Today
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <img
            className="w-12 h-12"
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            title={data.weather[0].description}
          />
          <div className="text-right">
            <p className="text-base sm:text-lg font-semibold">
              {data.temp.max.toFixed(0)}° / {data.temp.min.toFixed(0)}°
            </p>
            <p className="text-sm text-gray-300">{data.weather[0].main}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
