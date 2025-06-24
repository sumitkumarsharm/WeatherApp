import { CloudRain, Search } from "lucide-react";
import React, { useState } from "react";

const ShowWeatherUi = ({ isDark }) => {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("");

  const baseText = isDark ? "text-white" : "text-black";
  const fadedText = isDark ? "text-white/80" : "text-black/80";
  const boxBg = isDark ? "bg-white/10 text-white" : "bg-white/30 text-black";

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  console.log(inputCity);

  return (
    <div
      className={`backdrop-blur-md w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-xl shadow-xl p-4 sm:p-6 md:p-8 border transition-all duration-300 ${
        isDark
          ? "bg-black/30 border-white/20 text-white"
          : "bg-white/10 border-white/30 text-black"
      }`}
    >
      <h2
        className={`text-xl sm:text-2xl text-center font-bold mb-4 flex items-center justify-center gap-3 tracking-wide ${
          isDark ? "text-indigo-300" : "text-white"
        }`}
      >
        <CloudRain className="w-6 sm:w-8 h-6 sm:h-8" />
        Weather Forecast
      </h2>

      {/* Input & Button */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
          className={`bg-transparent text-white px-3 py-2 rounded outline-none border border-white/30 placeholder:capitalize placeholder:text-white/60 ${baseText}`}
        />

        <button
          type="submit"
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-3 py-2 rounded outline-none flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          Search Weather
        </button>
      </div>
    </div>
  );
};

export default ShowWeatherUi;
