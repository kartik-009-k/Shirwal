import { PageFactory } from './PageFactory';

const mk = (title: string, subtitle: string) => <PageFactory title={title} subtitle={subtitle} />;

export const routeElements: Record<string, JSX.Element> = {
  '/': mk('Landing', 'Futuristic hyperlocal ecosystem for Shirwal.'),
  '/home': mk('Home Feed', 'Featured businesses, trending vendors, and smart suggestions.'),
  '/categories': mk('Category Explorer', 'Discover restaurants, kirana, services, agriculture and more.'),
  '/vendors': mk('Vendor Listings', 'Browse all businesses with smart filters.'),
  '/vendor/:id': mk('Vendor Profile', 'Ratings, products, services, and reviews.'),
  '/product/:id': mk('Product Detail', 'Detailed specs, pricing, variants, and reviews.'),
  '/cart': mk('Cart', 'Review selected products and service bookings.'),
  '/checkout': mk('Checkout', 'Address, payment simulation, and order confirmation.'),
  '/orders': mk('Orders', 'Current and past orders with timeline states.'),
  '/tracking/:id': mk('Realtime Tracking', 'Live order stage simulation with map card.'),
  '/favorites': mk('Favorites', 'Saved vendors and products.'),
  '/notifications': mk('Notifications', 'Realtime offers, status updates, and alerts.'),
  '/search': mk('Search', 'Advanced search and category intelligence.'),
  '/profile': mk('Profile', 'Account, addresses, preferences, and trust score.'),
  '/settings': mk('Settings', 'Theme, privacy, notification, and accessibility controls.'),
  '/chat': mk('Chat', 'Customer support and vendor conversations.'),
  '/vendor/onboarding': mk('Vendor Onboarding', 'Apply and launch your storefront.'),
  '/vendor/dashboard': mk('Vendor Dashboard', 'Operations overview and quick actions.'),
  '/vendor/products': mk('Product Management', 'Catalog, pricing, stock, and bundles.'),
  '/vendor/services': mk('Service Management', 'Service slots, availability, and pricing.'),
  '/vendor/orders': mk('Orders Management', 'Incoming orders, dispatch queue, and SLA.'),
  '/vendor/earnings': mk('Earnings Dashboard', 'Payout insights and revenue trends.'),
  '/vendor/analytics': mk('Analytics Dashboard', 'Traffic, conversion, and repeat customer trends.'),
  '/vendor/customization': mk('Store Customization', 'Themes, banners, and brand voice.'),
  '/vendor/chat': mk('Customer Chat Center', 'Unified inbox with SLA tags.'),
  '/admin/dashboard': mk('Admin Dashboard', 'System health, growth, and moderation.'),
  '/admin/vendors': mk('Vendor Approvals', 'Review and approve applications.'),
  '/admin/analytics': mk('Admin Analytics', 'Demand, geography, and retention snapshots.'),
  '/admin/reports': mk('Reports', 'Downloadable operational and financial reports.'),
  '/admin/users': mk('User Management', 'Roles, risk flags, and profile tools.'),
  '/admin/categories': mk('Category Management', 'Taxonomy, visibility, and curation.'),
  '/admin/banners': mk('Banner Management', 'Campaign scheduling and promotion controls.')
};
