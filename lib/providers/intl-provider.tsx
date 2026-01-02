import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type Props = {
  locale: string;
  messages: IntlMessages;
  children: ReactNode;
};

export function IntlProvider({ locale, messages, children }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
