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
      className={`w-full min-h-screen flex items-center justify-center bg-gradient-to-r ${bgGradient} p-3 transition-colors duration-500`}
    >
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 bg-black/20 text-white p-2 rounded-full shadow-md backdrop-blur-md hover:scale-105 transition"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="fixed top-4 left-4 text-xs text-white/60 font-mono bg-black/20 px-2 py-1 rounded">
        v1.0.0
      </div>
      <ShowWeatherUi isDark={isDark} />
    </div>
  );
};

export default App;
