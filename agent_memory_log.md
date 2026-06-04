# Agent Memory Log

## Aesthetic & Technical Preferences
* **Colors & Theme**: Highly custom dark-theme fintech and diagnostic UI (Teal/Emerald/Violet). Strict rules forbidding generic raw colors.
* **Transitions**: Use spring timing functions (`cubic-bezier(0.16, 1, 0.3, 1)`) and index-based stagger values instead of basic `ease-in-out` transitions.
* **Opacity and Transparency**: Use RGB custom property variables (`rgba(var(--lens-color-rgb), alpha)`) instead of `color-mix()` for maximum compatibility.
* **Performance**: Mutate styles directly in mousemove event listeners on the DOM node instead of triggering React state updates.

## Interaction & Protocol Loop
* **Clarification**: Utilize the `/grill-me` interactive design alignment command when resolving options or setting up implementation plans. Ask questions one at a time and provide recommendations.
* **Verification**: Rely on local build successes (`npm run build` and `tsc --noEmit`) and user browser checks. Avoid excessive browser screenshots.

## Analytics & Conversion Telemetry
* **Loading Optimization**: Always avoid loading blocking static `<script async>` tags in next.js `<head>`. Consolidate logic into `next/script` using `strategy="afterInteractive"` or `lazyOnload` to keep LCP/CLS metrics high-performing.
* **Fallback Instrumentation**: Ensure GA4 `trackEvent` modules handle placeholder keys gracefully and support local-fallback logic so tracking is robust during development and local staging.

