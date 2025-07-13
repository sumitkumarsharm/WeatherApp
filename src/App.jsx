import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import ShowWeatherUi from "./Components/ShowWeatherUi";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  // const [foreCast, setForeCast] = useState([]);

  // // remove krna hai
  // const city = "Bhopal";
  // const cnt = 7;
  // const API_key = "8d6c611230a9a88abc11174527a02fb9";
  // const mainurl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${cnt}&appid=${API_key}`;

  // useEffect(() => {
  //   const foreCast = async () => {
  //     const data = await fetch(mainurl);
  //     const json = await data.json();
  //     setForeCast(json.list);
  //   };

  //   foreCast();
  // }, []);
  // foreCast.map((day) => {
  //   const Dates = new Date(day.dt * 1000);
  //   const options = { weekday: "short", month: "short", day: "numeric" };
  //   console.log(Dates.toLocaleDateString("en-US", options));
  // });

  const bgGradient = isDark
    ? "from-gray-900 to-black"
    : "from-indigo-950 to-indigo-700";

  return (
    <div
      className={`relative w-full min-h-screen flex items-center justify-center bg-gradient-to-r ${bgGradient} p-3 transition-colors duration-500`}
    >
      <div className="fixed top-4 left-4 text-xs sm:text-sm px-2 py-1 rounded bg-black/30 text-white backdrop-blur z-50">
        Version 1.1.0
      </div>

      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 bg-black/20 text-white p-2 rounded-full shadow-md backdrop-blur-md hover:scale-105 transition z-50"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Weather UI showing */}
      <ShowWeatherUi isDark={isDark} />
    </div>
  );
};

export default App;
