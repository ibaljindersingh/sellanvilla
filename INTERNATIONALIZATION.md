# Internationalization (i18n) Setup

This document describes the internationalization setup for the Sellan Villa application using `next-intl`.

## Overview

The application now supports multiple languages with a clean separation between UI strings (localized) and system constants (non-localized).

## Architecture

### 1. Locale Structure
```
app/
├── [locale]/           # Locale-specific routes
│   ├── layout.tsx      # Locale-aware layout
│   ├── page.tsx        # Home page
│   ├── shop/
│   │   └── page.tsx    # Shop page
│   ├── cart/
│   │   └── page.tsx    # Cart page
│   └── wishlist/
│       └── page.tsx    # Wishlist page
├── components/         # Reusable components
├── contexts/          # React contexts
├── hooks/            # Custom hooks including useTranslations
└── constants/        # System constants (non-localized)
```

### 2. Supported Locales
- **English (en)** - Default locale
- **Spanish (es)** - Secondary locale

### 3. File Organization

#### Locale Files (`messages/`)
- `en.json` - English translations
- `es.json` - Spanish translations

#### Constants (`app/constants/`)
- `index.ts` - System constants, error messages, API messages
- Separates non-UI strings from translatable content

## Key Components

### 1. Internationalization Configuration

#### `i18n.ts`
```typescript
export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;
```

#### `middleware.ts`
Handles locale routing and redirects

#### `next.config.mjs`
Configured with `next-intl` plugin

### 2. Translation Hook

#### `useTranslations()`
Provides typed access to translations with helper methods:

```typescript
const { t, common, product, cart, shop } = useTranslations();

// Direct translation
t('product.addToCart')

// Helper methods
common.home()        // Returns "Home" or "Inicio"
product.addToCart()  // Returns "Add to Cart" or "Agregar al Carrito"
```

### 3. Locale-Aware Layout

#### `app/[locale]/layout.tsx`
- Wraps all locale-specific pages
- Provides `NextIntlClientProvider`
- Includes localized header and footer

### 4. Language Switcher

#### `LanguageSwitcher.tsx`
- Allows users to switch between languages
- Updates URL structure
- Maintains current page context

## Usage Examples

### 1. In Components

```typescript
import { useTranslations } from '../hooks/useTranslations';

export default function ProductCard() {
  const { t } = useTranslations();
  
  return (
    <button>
      {t('product.addToCart')}
    </button>
  );
}
```

### 2. In Server Components

```typescript
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations();
  
  return (
    <h1>{t('shop.featuredProducts')}</h1>
  );
}
```

### 3. Using Helper Methods

```typescript
const { common, product } = useTranslations();

return (
  <nav>
    <Link href="/">{common.home()}</Link>
    <Link href="/shop">{common.shop()}</Link>
    <button>{product.addToCart()}</button>
  </nav>
);
```

## Adding New Languages

### 1. Create Locale File
Create `messages/[locale].json` with translations:

```json
{
  "common": {
    "home": "Home",
    "shop": "Shop"
  }
}
```

### 2. Update Configuration
Add locale to `i18n.ts`:

```typescript
export const locales = ['en', 'es', 'fr'] as const;
```

### 3. Update Language Switcher
Add language name to `LanguageSwitcher.tsx`:

```typescript
{loc === 'fr' ? 'Français' : loc}
```

## Best Practices

### 1. String Organization
- **UI Strings**: Place in locale files under appropriate categories
- **System Constants**: Place in `app/constants/index.ts`
- **Error Messages**: Use constants for technical errors, locale files for user-facing errors

### 2. Translation Keys
- Use descriptive, hierarchical keys: `product.addToCart`
- Group related strings: `cart.subtotal`, `cart.total`
- Keep keys consistent across locales

### 3. Testing
- Mock translations in tests using `test-utils.tsx`
- Test both English and other locales
- Verify fallback behavior

### 4. Performance
- Use `getTranslations()` in server components
- Use `useTranslations()` in client components
- Lazy load locale files

## Error Handling

### 1. Missing Translations
- Fallback to key name if translation missing
- Console warning for missing keys
- Graceful degradation

### 2. Locale Validation
- Middleware validates locale parameters
- 404 for invalid locales
- Redirect to default locale for root path

## Migration Notes

### From Hardcoded Strings
1. **UI Strings**: Move to locale files
2. **System Constants**: Move to constants file
3. **Components**: Update to use translation hooks
4. **Tests**: Update to use mocked translations

### Example Migration
```typescript
// Before
<button>Add to Cart</button>

// After
<button>{t('product.addToCart')}</button>
```

## Troubleshooting

### Common Issues

1. **Translation Not Found**
   - Check key exists in locale file
   - Verify locale file is properly imported
   - Check for typos in key names

2. **Locale Not Working**
   - Verify middleware configuration
   - Check `next.config.mjs` setup
   - Ensure locale files are in correct location

3. **Build Errors**
   - Check TypeScript types for locale files
   - Verify import paths in `i18n.ts`
   - Ensure all locales have complete translation sets

## Future Enhancements

1. **Dynamic Locale Loading**
   - Lazy load locale files
   - Support for more languages
   - RTL language support

2. **Advanced Features**
   - Pluralization rules
   - Date/time formatting
   - Number formatting
   - Currency formatting

3. **Developer Experience**
   - Translation key validation
   - Missing translation detection
   - Translation management tools

