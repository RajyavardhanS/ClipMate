import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [displayedText, setDisplayedText] = useState('');
  const text = 'Want to keep your text saved at one place?';
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/clipboard');
  };

  useEffect(() => {
    let currentIndex = 0;
    const characters = text.split('');
    
    const interval = setInterval(() => {
      if (currentIndex < characters.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsButtonVisible(true);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0f172a]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 animate-gradient-shift" />
      
      {/* Blurred circle decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
      
      {/* Main content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Text container with padding to prevent overlap */}
        <div className="mb-8">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-center">
            {displayedText}
          </div>
        </div>
        
        {/* Decorative underline - now positioned below the text container */}
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full" />

        {/* Animated Button */}
        <button 
          className={`
            mt-12 px-8 py-4 text-xl font-semibold text-white
            bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
            rounded-full transform hover:scale-105 transition-all duration-300
            hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]
            relative overflow-hidden
            ${isButtonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ transition: 'all 0.5s ease-out' }}
          onClick={handleClick}
        >
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift" />
          
          {/* Button content */}
          <span className="relative z-10">
            Get Started
            <span className="ml-2 inline-block transform hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Landing;