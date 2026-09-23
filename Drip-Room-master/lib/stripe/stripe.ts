import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey && process.env.NODE_ENV === 'production') {
  throw new Error('STRIPE_SECRET_KEY is missing from environment variables.');
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_mock_placeholder', {
  apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion,
  appInfo: {
    name: 'Drip Room Archive Store',
    version: '1.0.0',
  },
});
