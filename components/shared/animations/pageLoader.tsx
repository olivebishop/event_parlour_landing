import React from 'react';
import { Ticket } from 'lucide-react';

const EventTicketLoader = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black">
      {/* Diagonal Light Beam */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-20 w-[200%] h-60 rotate-[25deg] transform origin-top-left opacity-40">
          <div className="w-full h-full bg-gradient-to-r from-white via-white/40 to-transparent blur-2xl rounded-full"></div>
        </div>
        
        {/* Complementary subtle beam */}
        <div className="absolute -left-10 top-1/3 w-[140%] h-28 rotate-[25deg] transform origin-top-left opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-white/80 via-white/30 to-transparent blur-xl rounded-full"></div>
        </div>
      </div>
      
      <div className="relative w-64 h-64 flex items-center justify-center z-10">
        {/* Background glow effect */}
        <div className="absolute w-56 h-56 rounded-full bg-gradient-to-r from-white/10 to-gray-500/10 blur-xl animate-pulse"></div>
        
        {/* Outer rotating circle */}
        <div className="absolute w-56 h-56 rounded-full border-4 border-gray-200/30 border-t-white animate-spin"></div>
        
        {/* Ticket */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-40 h-20 bg-gradient-to-r from-[#171717] to-black rounded-lg relative flex flex-col justify-center items-center text-white shadow-lg shadow-white/5">
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
      
      <div className="mt-4 text-center relative z-10">
        <p className="text-gray-100 font-semibold tracking-wider text-lg">
          LOADING<span className="inline-block animate-bounce">.</span>
          <span className="inline-block animate-bounce delay-100">.</span>
          <span className="inline-block animate-bounce delay-200">.</span>
        </p>
        <p className="text-gray-400 text-sm mt-1">Preparing your amazing experience</p>
      </div>
      
      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>
    </div>
  );
};

export default EventTicketLoader;