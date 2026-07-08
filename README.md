# World Flag Battle

A static MVP for a playful fan competition site where the whole page is made of country flags. When fans boost a country, that flag grows and takes up more space on the board.

## What is included

- Full-screen responsive flag territory board
- Hover/tap overlay with a boost button
- Boost modal with demo payment amounts
- Leaderboard drawer
- Demo/local boost totals using `localStorage`
- Flag size recalculation based on each country's total support
- Clear unofficial disclaimer

## How it works right now

This is still a front-end demo. Clicking **Boost** opens a test modal and updates totals in the visitor's browser only.

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
- Cloudflare D1 or KV for persistent leaderboard totals

## Notes

Avoid using FIFA, World Cup, official tournament logos, or national association branding in the site name or design unless proper permission is obtained. This MVP uses generic country flags and fan-language only.
