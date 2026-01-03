'use client';

import { createContext, useContext, ReactNode } from 'react';

type Messages = Record<string, unknown>;

const TranslationContext = createContext<{ messages: Messages; locale: string }>({
  messages: {},
  locale: 'en',
});

export function TranslationProvider({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: Messages;
  locale: string;
}) {
  return (
    <TranslationContext.Provider value={{ messages, locale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(namespace: string) {
  const { messages } = useContext(TranslationContext);
  
  return (key: string) => {
    const namespaceMessages = messages[namespace] as Record<string, unknown> | undefined;
    if (!namespaceMessages) return key;
    
    // Handle nested keys like "quickLinks.events"
    const keys = key.split('.');
    let value: unknown = namespaceMessages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    // Return stringified value for arrays/objects, or string for primitives
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      return JSON.stringify(value);
    }
    
    return String(value) || key;
  };
}

export function useLocale() {
  const { locale } = useContext(TranslationContext);
  return locale;
}
