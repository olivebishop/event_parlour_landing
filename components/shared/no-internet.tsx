"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"

export function NoInternet() {
  const [isVisible, setIsVisible] = useState(false)
  const [isRetrying, setIsRetrying] = useState(false)


  // Animate in on mount
  useEffect(() => {
    setIsVisible(true)
    
    // Continuous subtle rotation animation for the icon
  }, []);
  
  const handleRetry = () => {
    setIsRetrying(true)
    
    // Simulate checking connection with animation
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  return (
    <div className={`fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-[#171717] text-white p-4 sm:p-6 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md text-center px-4">
        {/* Animated icon with pulse and rotation */}
        <div 
          className={`relative mb-3 md:mb-4 transform transition-all duration-500 ${isRetrying ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}

        >
          <WifiOff className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
          <div className="absolute inset-0 rounded-full a bg-white opacity-10"></div>
        </div>

        {/* Animated title */}
        <h1 
          className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: '200ms' }}
        >
          No Internet Connection
        </h1>

        {/* Animated signal waves */}
        <div className="relative w-full h-40 sm:h-48 md:h-64 my-4 sm:my-5 md:my-6 flex items-center justify-center overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-full h-full border-2 border-white rounded-full opacity-20"
              style={{
                animation: `ripple 3s infinite ease-out ${i * 0.5}s`,
                transformOrigin: 'center',
              }}
            />
          ))}
          
          {/* Central disconnected node */}
          <div className="relative z-10">
            <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-[#171717] rounded-full m-1"></div>
          </div>
        </div>

        {/* Animated text */}
        <p 
          className={`text-sm sm:text-base mb-4 sm:mb-5 md:mb-6 max-w-prose transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: '400ms' }}
        >
          Please check your connection and try again. Your content will load once you&apos;re back online.
        </p>

        {/* Animated button */}
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 border border-white rounded-md hover:bg-white hover:text-[#171717] transition-all duration-300 text-sm sm:text-base ${isRetrying ? 'bg-white text-[#171717]' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: '600ms' }}
        >
          {isRetrying ? 'Connecting...' : 'Try Again'}
        </button>
      </div>
      
      {/* Add CSS for ripple animation */}
      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: scale(0.01);
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}