import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const locales = ['en', 'sw', 'es', 'zh', 'de', 'it', 'fr', 'ar', 'ko', 'ja', 'he'];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('language')?.value || 'en';

  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
