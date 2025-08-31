"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '../../i18n';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-md hover:bg-gray-50">
        <GlobeAltIcon className="w-5 h-5" />
        <span className="text-sm font-medium uppercase">{locale}</span>
      </button>
      
      <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLanguageChange(loc)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
              locale === loc 
                ? 'text-primary-600 bg-primary-50 font-medium' 
                : 'text-gray-700'
            } ${loc === 'en' ? 'rounded-t-lg' : ''} ${loc === 'es' ? 'rounded-b-lg' : ''}`}
          >
            {loc === 'en' ? 'English' : loc === 'es' ? 'Español' : loc}
          </button>
        ))}
      </div>
    </div>
  );
}
