Frontend Requirements — Pavitra Premium Sarees

Overview

This document captures the frontend-only requirements for the Pavitra saree e-commerce project. It includes the user's extracted requirements plus additional recommended frontend items (accessibility, performance, SEO, UX patterns, testing, and dev-experience).

1. Tech Stack
- HTML5, CSS3
- Bootstrap 5.3+ (responsive grid/utilities)
- JavaScript (ES6+), jQuery optional for legacy widgets
- AJAX for dynamic content; progressive enhancement
- Optional: small frontend bundler (Vite/webpack) for production assets

2. Public Website (core pages)
- Home (editorial, hero, saree-type sections)
- Categories & Category landing pages (Saree type pages)
- Product listing (filters, sort, pagination)
- Product details (images, gallery, variants, SKU, HSN, GST, MOQ, price)
- Search & Autosuggest
- Cart, Checkout, Order confirmation
- Offers & Campaign pages
- CMS pages: About, Contact, Privacy, Terms, Refund, Shipping

3. Panels & Dashboards (frontend UI only)
- Retailer frontend (registration/login, dashboard, orders, wallet, profile)
- Seller frontend (dashboard, product management UIs, inventory views)
- Delivery partner UI (assigned orders, delivery status UI)
- Super Admin UIs: dashboards and management screens (design/markup only)

4. Product & Catalog UX
- Attributes: colors, sizes, variants, weight, dimensions, SKU, HSN, GST
- Variant selection with deep-linking (URL reflecting variant)
- Responsive image gallery, zoom, thumbnails, 360° viewer placeholder
- Size guide modal and accessible measurement helper
- Bulk-pricing display and MOQ badges
- Related products, recently viewed, and cross-sell components

5. Search & Filters
- Search bar with typeahead/autocomplete and popular suggestions
- Faceted filters: category, sub-category, brand, price range, color, size, availability, seller
- Filter counts and active-filters UI with clear states
- Sorting options and server-side pagination or infinite scroll

6. Shopping Flow
- Product → Product Details → Add to Cart → Cart → Checkout → Payment → Order Confirmation
- Wishlist, quick view modal, save for later
- Bulk order UI (add multiple SKUs/quantities) and B2B flows (credit/checkout variations)
- Order summary validation and editable quantities

7. Payments (UI concerns)
- Payment selection UI: UPI, Netbanking, Debit/Credit Card, Wallet, COD, Bank Transfer
- 3DS redirect UX, payment failure & retry flows, success state
- Save/remember card/UPI alias (frontend placeholder; do not store sensitive data)

8. Order Tracking & Returns
- Order timeline UI (Placed → Accepted → Packed → Shipped → Out for Delivery → Delivered)
- Cancellation/Return/Refund/Replaced states and customer actions
- Return request flow and status tracking

9. Wallet & Transactions (frontend)
- Wallet dashboard: balance, credits, debits, cashback, transaction ledger, filters
- Transaction detail modal and export option (CSV)

10. Offers & Coupons
- Display of flash sales, category/product/seller offers, coupon entry UX, and campaign banners
- Promo countdown, limited stock badges

11. Notifications & Communication
- In-app notifications center UI
- UI hooks for Email/SMS/WhatsApp/push notifications
- Notification preferences in profile

12. Accessibility & Internationalization
- WCAG 2.1 AA considerations: keyboard navigation, ARIA roles, skip-to-main, focus outlines
- Locale/currency formatting and `hreflang` support
- RTL compatibility if required

13. SEO & Social
- SEO-friendly URLs, meta titles/descriptions per page
- Open Graph / Twitter Card tags, canonical, structured data: Product, Offer, BreadcrumbList
- Sitemap and robots.txt (frontend hints and generation support)

14. Performance & Assets
- Responsive images, srcset, WebP/AVIF fallbacks
- Lazy loading, preloading critical assets, font-display:swap
- CDN-ready asset structure, cache-control hints
- Build pipeline for minification and fingerprinting

15. Privacy & Security (frontend scope)
- Cookie consent UI and preference management
- CSP meta template, secure external link handling, no sensitive data in client storage

16. Testing & Monitoring
- Cross-browser responsive checklist, Lighthouse score targets
- Visual regression (Storybook + Chromatic/Percy), E2E tests for key flows (checkout, search)
- Error boundaries and user-friendly error pages

17. Developer Experience
- Component library (reusable buttons/cards), design tokens, variables (colors/typography)
- Storybook for UI components; linting, Prettier/ESLint, CI lint/test hooks

18. Deliverables & Files (suggested)
- `frontend-requirements.md` (this file)
- `README.md` (how to run dev server, build steps)
- `design-tokens.json` (colors/typography)
- `components/` (Button, Card, ProductGrid, Modal, Header, Footer)
- `pages/` (Home, Category, Product, Cart, Checkout)
- `assets/` (images, icons, fonts)

Next steps
- I can add this file to the workspace (done) and wire up a minimal `README.md` with local dev steps.
- I can scaffold a minimal component structure (HTML templates + CSS) if you want.

