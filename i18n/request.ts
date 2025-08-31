import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '../i18n';

export default getRequestConfig(async ({ locale }) => {
  // If locale is undefined, use default locale
  const resolvedLocale = locale || defaultLocale;
  
  // Validate that the resolved locale is valid
  if (!locales.includes(resolvedLocale as any)) {
    console.warn(`Invalid locale '${resolvedLocale}', falling back to '${defaultLocale}'`);
    locale = defaultLocale;
  }

  return {
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
    locale: resolvedLocale
  };
});
