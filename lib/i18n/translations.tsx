'use client';

import { createContext, useContext, ReactNode } from 'react';

type Messages = Record<string, Record<string, string>>;

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
    const namespaceMessages = messages[namespace];
    if (!namespaceMessages) return key;
    return namespaceMessages[key] || key;
  };
}

export function useLocale() {
  const { locale } = useContext(TranslationContext);
  return locale;
}
