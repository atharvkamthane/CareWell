# Design Brief — Secure Health Records & Disease Trend Monitoring

## Direction

A restrained clinical SaaS interface that feels calm, clear, dependable and operationally credible. Warm-white and pale-neutral surfaces create breathing room; deep ink/navy carries the main type; muted teal-green provides a focused accent for health and access status; quiet red/amber are reserved for alerts. Layouts use clear grids, generous whitespace, modest borders, consistent rounded corners, and light elevation only where it clarifies grouping.

## Core principles

1. Privacy boundaries are visible and legible—not hidden behind decoration.
2. The three roles have distinct navigation and information scope.
3. Medical information is dense enough to be useful, but organized into scannable cards, timelines, and tables.
4. Admin analytics remain aggregate-shaped; privacy suppression is a first-class state.
5. Demo interactions communicate their limitations instead of implying production security.

## Layout and signature elements

The public landing page pairs a concise privacy-forward message with a compact synthetic dashboard preview and a three-step patient → secure record → clinician diagram. Role-based dashboards use a consistent left navigation on wide screens and touch-friendly bottom navigation on mobile. A persistent privacy notice anchors administrator screens. A compact shield/record monogram serves as the project mark and favicon. The privacy pipeline is a horizontal sequence on desktop and a readable vertical sequence on small screens.

## Interaction and motion

Controls provide crisp hover, pressed, focus, disabled, success, and error states. Transitions are short and low-amplitude; page and card reveals use subtle fade/lift, the authorization checklist advances sequentially, the QR scanner shows one restrained scan line, and toasts/modals move slightly into place. Charts animate only on entry. Every motion is suppressed or simplified under `prefers-reduced-motion`.

## Typography and voice

Use a highly readable modern sans-serif stack with clear heading/body/metadata tiers, tabular figures for statistics, and comfortable line-height. The voice is direct, reassuring, plain-language, and careful about claims: describe safeguards as intended architecture, and label all authentication, QR, persistence, and access checks as prototype behavior.

## Branding

Use a flat, product-specific shield-and-record symbol with a restrained deep-blue/teal palette. Avoid text in the app icon; retain generous negative space and solid shapes that hold at favicon size. Use the same identity in the header, app favicon, and project-logo metadata.
