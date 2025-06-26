import { useState, useEffect } from "react";
import { CloudRain, Search } from "lucide-react";

const ShowWatherUi = ({ isDark }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&timestamp=${Date.now()}`
        );

        if (!response.ok) throw new Error("City not found ❌");

        const data = await response.json();
        setWeather(data);
        setInputCity(""); // ✅ clear input after success
      } catch (err) {
        setWeather(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, apiKey]);

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const baseText = isDark ? "text-white" : "text-black";
  const fadedText = isDark ? "text-white/80" : "text-black/80";
  const boxBg = isDark ? "bg-white/10 text-white" : "bg-white/30 text-black";

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

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        <button
          type="submit"
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-3 py-2 rounded outline-none flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          Search Weather
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-sm text-indigo-300 mt-4">
          Loading weather data...
        </p>
      )}

      {/* Weather Data */}
      {weather && !loading && (
        <div className="mt-6 text-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
            alt="weather icon"
            className="w-20 sm:w-24 md:w-28 h-auto mx-auto object-contain"
          />

          <h2
            className={`text-2xl sm:text-3xl font-bold text-white ${baseText}`}
          >
            {weather.name}, {weather.sys?.country}
          </h2>

          <p
            className={`text-base sm:text-lg capitalize text-white ${fadedText}`}
          >
            {weather.weather?.[0]?.description || "N/A"}
          </p>

          <h1
            className={`text-4xl sm:text-5xl font-bold mt-4 text-white ${baseText}`}
          >
            {Math.round(weather.main?.temp - 273.15)}
            <sup>°</sup>C
          </h1>

          {/* weather Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 text-center">
            {[
              { label: "Humidity", value: `${weather.main?.humidity}%` },
              { label: "Wind", value: `${weather.wind?.speed} m/s` },
              { label: "Clouds", value: `${weather.clouds?.all}%` },
            ].map((item) => (
              <div
                key={item.label}
                className={`px-4 py-3 flex-1 rounded-lg backdrop-blur-sm w-full sm:w-auto ${boxBg}`}
              >
                <p className="capitalize text-sm">{item.label}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowWatherUi;
