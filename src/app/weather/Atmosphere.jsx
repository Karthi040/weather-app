import React from 'react';

const Atmosphere = ({ condition }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Lightning */}
      {condition === 'Thunderstorm' && <div className="absolute inset-0 animate-lightning z-50" />}
      
      {/* Rain Drops */}
      {(condition === 'Rain' || condition === 'Thunderstorm' || condition === 'Drizzle') && (
        <div className="absolute inset-0 flex justify-around">
          {[...Array(25)].map((_, i) => (
            <div 
              key={i} 
              className="w-[1px] h-20 bg-white/40 animate-rain" 
              style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} 
            />
          ))}
        </div>
      )}

      {/* Snow Flakes */}
      {condition === 'Snow' && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-white rounded-full animate-snow blur-[1px]" 
              style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} 
            />
          ))}
        </div>
      )}

      {/* Environmental Animals & Plants */}
      <div className="absolute bottom-0 w-full flex justify-between px-12 text-7xl opacity-40 pb-4">
        <span className="animate-sway origin-bottom">🌴</span>
        {condition === 'Rain' && <span className="animate-bounce">🐸</span>}
        {condition === 'Clear' && <span className="animate-pulse">🦚</span>}
        <span className="animate-sway origin-bottom delay-1000">🌿</span>
      </div>
    </div>
  );
};

export default Atmosphere;