# World Flag Battle

A static MVP for a playful fan competition site where every boost makes a country flag bigger on the board.

## What is included

- Responsive landing page
- Country flag grid
- Leaderboard
- Boost modal
- Demo/local boost totals using `localStorage`
- Search/filter by country
- Clear unofficial disclaimer

## How to test locally

Open `index.html` in a browser.

## Deploying on Cloudflare Pages

Use these settings:

- Framework preset: None
- Build command: Leave blank
- Build output directory: `/`
- Root directory: `/`

## Payment integration later

The current boost button is intentionally a mock/demo flow. To accept real payments, replace the demo `addBoost()` flow in `script.js` with a checkout flow such as:

- Stripe Checkout
- PayPal Checkout
- Cloudflare Worker endpoint that records payments and updates totals

## Notes

Avoid using FIFA, World Cup, official tournament logos, or national association branding in the site name or design unless proper permission is obtained. This MVP uses generic country flags and fan-language only.
