'use client'
import React, { ReactNode, useEffect, useState, createContext, useContext } from 'react';
import EventTicketLoader from '@/components/shared/animations/pageLoader';

// Create a context for loading state
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Hook to use the loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Check if the DOM is fully loaded
    if (document.readyState === 'complete') {
      setContentReady(true);
    } else {
      // Add event listener for when content is loaded
      const handleLoad = () => {
        setContentReady(true);
      };

      window.addEventListener('load', handleLoad);
      
      // Cleanup
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  useEffect(() => {
    // Set a minimum loading time to avoid flicker for fast loads
    const minLoadTime = setTimeout(() => {
      if (contentReady) {
        setIsLoading(false);
      }
    }, 800);

    return () => clearTimeout(minLoadTime);
  }, [contentReady]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading ? <EventTicketLoader /> : children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;