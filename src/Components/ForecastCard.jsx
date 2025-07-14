import React from "react";

const ForecastCard = ({ data, formatDate, isDark }) => {
  if (!data) return null;

  const date = new Date();
  const today = date.toLocaleDateString("en-US", {
    month: "short",
    weekday: "short",
    day: "numeric",
  });

  const isToday = formatDate(data.dt) === today;

  // Themed classes
  const cardBg = isDark
    ? "bg-white/10 text-white hover:bg-white/20"
    : "bg-white/20 text-black hover:bg-white/10";

  const fadedText = isDark ? "text-gray-300" : "text-gray-600";
  const todayHighlight = isDark ? "text-green-400" : "text-green-600";

  return (
    <div className="w-full">
      <div
        className={`backdrop-blur-md shadow-lg rounded-2xl px-4 py-3 flex items-center justify-between transition-all ${cardBg} border border-white/20 hover:border-white/20`}
      >
        {/* Date and Today label */}
        <div className="flex flex-col">
          <p className="text-sm sm:text-base font-medium">
            {formatDate(data.dt)}
          </p>
          {isToday && (
            <span
              className={`text-xs sm:text-sm font-semibold ${todayHighlight}`}
            >
              Today
            </span>
          )}
        </div>

        {/* Icon and Temperature */}
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
            <p className={`text-sm ${fadedText}`}>{data.weather[0].main}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
