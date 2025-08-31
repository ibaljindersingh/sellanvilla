"use client";

import { useTranslations } from '../hooks/useTranslations';

export default function LocalizedFooter() {
  const { t } = useTranslations();

  return (
    <footer className="bg-primary-900 text-white py-12 mt-12">
      <div className="container mx-auto px-4 text-center space-y-4">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.facebook.com/sellanvilla"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
          >
            {t('footer.facebook')}
          </a>
          <a
            href="mailto:orders@sellanvilla.com"
            className="text-white/80 hover:text-white transition-colors"
          >
            {t('footer.email')}
          </a>
        </div>
        <p className="text-white/60 text-sm">
          {t('footer.craftedWithLove')}
        </p>
        <p className="font-semibold">&copy; {new Date().getFullYear()} Sellan Villa. {t('footer.allRightsReserved')}</p>
      </div>
    </footer>
  );
}

