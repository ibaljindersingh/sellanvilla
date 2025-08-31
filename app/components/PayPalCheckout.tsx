"use client";

import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

interface PayPalCheckoutProps {
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

declare global {
  interface Window {
    paypal: any;
  }
}

export default function PayPalCheckout({ onSuccess, onError, onCancel }: PayPalCheckoutProps) {
  const { state: cartState } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load PayPal script
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test'}&currency=USD`;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.error('Failed to load PayPal script');
      onError('Failed to load payment system');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onError]);

  useEffect(() => {
    if (isLoaded && window.paypal && cartState.items.length > 0) {
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          const total = (cartState.total * 1.08).toFixed(2); // Including tax
          
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total,
                  currency_code: 'USD',
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: cartState.total.toFixed(2)
                    },
                    tax_total: {
                      currency_code: 'USD',
                      value: (cartState.total * 0.08).toFixed(2)
                    }
                  }
                },
                items: cartState.items.map(item => ({
                  name: item.name,
                  unit_amount: {
                    currency_code: 'USD',
                    value: item.price.toFixed(2)
                  },
                  quantity: item.quantity.toString(),
                  category: 'PHYSICAL_GOODS'
                }))
              }
            ],
            application_context: {
              shipping_preference: 'NO_SHIPPING'
            }
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            const order = await actions.order.capture();
            onSuccess(order.id);
          } catch (error) {
            onError('Payment failed. Please try again.');
          }
        },
        onError: (err: any) => {
          onError('An error occurred during checkout. Please try again.');
        },
        onCancel: () => {
          onCancel();
        }
      }).render('#paypal-button-container');
    }
  }, [isLoaded, cartState, onSuccess, onError, onCancel]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600">Loading PayPal...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div id="paypal-button-container" className="w-full"></div>
    </div>
  );
}
