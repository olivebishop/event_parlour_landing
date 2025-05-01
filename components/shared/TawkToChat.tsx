'use client';
import { useEffect } from 'react';

// Define proper types for Tawk API
declare global {
  interface Window {
    Tawk_API?: TawkAPIType;
    Tawk_LoadStart?: Date;
  }
}

// Define TawkAPI type to avoid using 'any'
interface TawkAPIType {
  onLoad: () => void;
  setAttributes: (
    attributes: Record<string, string>,
    callback: (error: Error | null) => void
  ) => void;
  // Add other Tawk API methods as needed
}

interface TawkToChatProps {
  pageTitle?: string;
  propertyId?: string; // Allow override through props
}

export default function TawkToChat({ 
  pageTitle,
  propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || '6813ea6c1a4bf0190267e5c5/1iq6snelk'
}: TawkToChatProps): null {
  useEffect(() => {
    // Skip initialization if propertyId is not available
    if (!propertyId) {
      console.warn('TawkTo chat not initialized: Missing property ID');
      return;
    }

    // Initialize Tawk variables
    window.Tawk_API = window.Tawk_API || {
      onLoad: () => {},
      setAttributes: () => {}
    } as TawkAPIType;
    window.Tawk_LoadStart = new Date();
    
    // Create script element
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    // Configure Tawk_API
    window.Tawk_API!.onLoad = function() {
      // Set the page title for better visitor tracking
      if (pageTitle && window.Tawk_API) {
        window.Tawk_API.setAttributes({
          name: 'Page',
          value: pageTitle
        }, function(error: Error | null) {
          if (error) {
            console.error('Error setting page attribute:', error);
          }
        });
      }
    };
    
    // Append the script to the document
    document.head.appendChild(script);
    
    // Clean up function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [pageTitle, propertyId]); // Re-run if pageTitle or propertyId changes

  return null; // This component doesn't render anything visible
}