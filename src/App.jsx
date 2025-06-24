import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import ShowWeatherUi from "./Components/ShowWeatherUi";

const App = () => {
  const [isDark, setIsDark] = useState(false);

  const bgGradient = isDark
    ? "from-gray-900 to-black"
    : "from-indigo-950 to-indigo-700";

  return (
    <div
      className={`relative w-full min-h-screen flex items-center justify-center bg-gradient-to-r ${bgGradient} p-3 transition-colors duration-500`}
    >
      {/* Version tag */}
      <div className="fixed top-4 left-4 text-xs sm:text-sm px-2 py-1 rounded bg-black/30 text-white backdrop-blur z-50">
        v1.0.0
      </div>

      {/* Dark/Light toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 bg-black/20 text-white p-2 rounded-full shadow-md backdrop-blur-md hover:scale-105 transition z-50"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Weather UI */}
      <ShowWeatherUi isDark={isDark} />
    </div>
  );
};

export default App;
