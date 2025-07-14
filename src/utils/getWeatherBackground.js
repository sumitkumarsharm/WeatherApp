
export const getWeatherBackground = (condition) => {
  switch (condition) {
    case "Clear":
      return "from-yellow-300 to-orange-500";
    case "Clouds":
      return "from-gray-400 to-gray-700";
    case "Rain":
    case "Drizzle":
      return "from-blue-900 to-gray-800";
    case "Snow":
      return "from-blue-100 to-white";
    case "Thunderstorm":
      return "from-gray-800 to-black";
    case "Mist":
    case "Fog":
    case "Haze":
      return "from-gray-500 to-gray-700";
    default:
      return "from-indigo-950 to-indigo-700"; // fallback
  }
};
