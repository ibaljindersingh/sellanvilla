# PayPal Integration Setup Guide

## 1. Environment Configuration

Create a `.env.local` file in your project root with the following:

```bash
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

## 2. Getting Your PayPal Client ID

### For Production:
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Log in with your PayPal account
3. Navigate to "Apps & Credentials"
4. Create a new app or use an existing one
5. Copy the **Client ID** (not the secret)

### For Testing (Sandbox):
1. Use the same PayPal Developer Dashboard
2. Make sure you're in "Sandbox" mode
3. Create a sandbox app
4. Use the sandbox **Client ID**

## 3. Testing the Integration

### Sandbox Testing:
- Use PayPal's sandbox accounts for testing
- Sandbox buyer account: `sb-buyer@business.example.com`
- Password: `12345678`

### Production:
- Real PayPal accounts will work
- All transactions will be real

## 4. Features Included

✅ **Cart Management**
- Add/remove items
- Quantity updates
- Persistent storage (localStorage)

✅ **Wishlist Management**
- Save items for later
- Move items between cart and wishlist
- Persistent storage (localStorage)

✅ **PayPal Checkout**
- Secure payment processing
- Order creation with item details
- Tax calculation (8%)
- Free shipping

✅ **User Experience**
- Loading states
- Success/error messages
- Responsive design
- Navigation between pages

## 5. Security Notes

- Never expose your PayPal secret in client-side code
- The `NEXT_PUBLIC_` prefix makes the client ID available to the browser (this is safe)
- All payment processing happens on PayPal's secure servers
- Your app never handles actual payment data

## 6. Customization

You can modify:
- Tax rate (currently 8%)
- Shipping preferences
- Currency (currently USD)
- Button styling and placement

## 7. Troubleshooting

### Common Issues:
1. **PayPal buttons not loading**: Check your client ID and internet connection
2. **Payment errors**: Verify you're using the correct environment (sandbox vs production)
3. **Cart not persisting**: Check if localStorage is enabled in your browser

### Support:
- PayPal Developer Documentation: https://developer.paypal.com/
- PayPal Support: https://www.paypal.com/support/
