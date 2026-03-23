const API_KEY = "be9e585c274e086db135990fa3805b77";

export const getWeatherData = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("City not found");
  return res.json();
};

export const getCitySuggestions = async (query) => {
  if (query.length < 3) return [];
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  if (!res.ok) return [];
  return res.json();
};