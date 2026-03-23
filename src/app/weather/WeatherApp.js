"use client";
import React, { useState, useEffect, useRef } from 'react';
import { getWeatherData, getCitySuggestions } from './weatherService';
import Atmosphere from './Atmosphere';
import './global.css'; // Corrected local import

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  // Load default city
  useEffect(() => {
    handleFetchWeather("Chennai");
  }, []);

  // Handle city search with suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.length >= 3) {
        const list = await getCitySuggestions(search);
        setSuggestions(list);
      } else {
        setSuggestions([]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleFetchWeather = async (cityName) => {
    try {
      const data = await getWeatherData(cityName);
      setWeather(data);
      setSuggestions([]);
      setSearch('');
    } catch (err) {
      alert("City not found!");
    }
  };

  if (!weather) return <div className="h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;

  const condition = weather.weather[0].main;

  // Background Theme based on weather
  const bgThemes = {
    Clear: "from-orange-400 to-yellow-300",
    Rain: "from-blue-900 via-indigo-800 to-blue-500",
    Snow: "from-slate-200 to-white text-slate-900",
    Thunderstorm: "from-gray-950 to-purple-950",
    Clouds: "from-gray-500 to-blue-300"
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br transition-all duration-1000 ${bgThemes[condition] || 'from-blue-500 to-cyan-400'} overflow-hidden p-6`}>
      
      {/* Background Climate & Animals */}
      <Atmosphere condition={condition} />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Search Bar */}
        <div className="relative mb-8" ref={dropdownRef}>
          <input 
            type="text" 
            placeholder="Search city..." 
            className="w-full bg-white/20 backdrop-blur-md border border-white/30 px-6 py-4 rounded-2xl text-white placeholder-white/60 outline-none focus:bg-white/30 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-50">
              {suggestions.map((s, i) => (
                <li 
                  key={i} 
                  onClick={() => handleFetchWeather(s.name)}
                  className="px-6 py-3 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors text-slate-800 border-b border-gray-100 last:border-none"
                >
                  <span className="font-bold">{s.name}</span>, <span className="text-sm opacity-60">{s.country}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Main Weather Card */}
        <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/20 text-white text-center shadow-2xl">
          <h1 className="text-4xl font-bold tracking-tight">{weather.name}</h1>
          <div className="my-8 text-8xl font-black drop-shadow-md">
            {Math.round(weather.main.temp)}<span className="text-4xl align-top">°</span>
          </div>
          <p className="text-2xl uppercase tracking-widest font-semibold opacity-90">{condition}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-white/10">
            <div>
              <p className="text-[10px] uppercase opacity-60 font-bold">Humidity</p>
              <p className="text-xl font-bold">{weather.main.humidity}%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase opacity-60 font-bold">Wind Speed</p>
              <p className="text-xl font-bold">{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}