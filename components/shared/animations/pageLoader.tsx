import React from 'react';
import { Ticket } from 'lucide-react';

const EventTicketLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Background glow effect */}
        <div className="absolute w-56 h-56 rounded-full blur-xl animate-pulse"></div>
        
        {/* Outer rotating circle */}
        <div className="absolute w-56 h-56 rounded-full border-4 border-gray-200 border-t-[#171717] animate-spin"></div>
        
        {/* Ticket */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-40 h-20 bg-gradient-to-r from-[#171717] to-black rounded-lg relative flex flex-col justify-center items-center text-white shadow-lg">
            <div className="absolute inset-0.5 bg-white/5 rounded-md"></div>
            <div className="flex items-center gap-2 mb-1">
              <Ticket size={16} className="text-gray-300" />
              <span className="font-bold text-lg tracking-wide">EVENT PARLOUR</span>
            </div>
            <div className="text-xs text-purple-200 font-medium">Premium Ticketing</div>
            
            <div className="absolute top-1/3 left-0 right-0 h-0.5 border-t border-dashed border-white/30"></div>
            
            {/* Ticket holes */}
            <div className="absolute w-3 h-3 bg-gray-50 rounded-full top-1/2 -translate-y-1/2 -left-1.5"></div>
            <div className="absolute w-3 h-3 bg-gray-50 rounded-full top-1/2 -translate-y-1/2 -right-1.5"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-gray-100 font-semibold tracking-wider text-lg">
          LOADING<span className="inline-block animate-bounce">.</span>
          <span className="inline-block animate-bounce delay-100">.</span>
          <span className="inline-block animate-bounce delay-200">.</span>
        </p>
        <p className="text-gray-500 text-sm mt-1">Preparing your amazing experience</p>
      </div>
    </div>
  );
};

export default EventTicketLoader;