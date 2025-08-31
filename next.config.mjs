import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/**
 * Next.js configuration file. Enables React strict mode and
 * configures image handling so that Netlify can properly serve
 * unoptimized static files. The app router uses the `src/app` pattern
 * enabled by default in Next 13+.  
 */

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Unoptimized images let Netlify handle image serving without
    // Next's image optimization pipeline. This keeps the build fast and
    // ensures dynamic routes work correctly on Netlify.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // App directory is enabled by default in Next.js 13+
};

export default withNextIntl(nextConfig);