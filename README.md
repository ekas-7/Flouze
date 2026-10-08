# Flouze

> *Flouze* (French slang): money.

Flouze is a money-making app for iPhone. The goal is a native-feeling app that people open every day to grow their income, shipped as a web app so we can release instantly without App Store reviews.

We are building it **iPhone-first**: every screen is designed and tested for the iPhone 16 lineup before anything else. It installs to the home screen and runs fullscreen like a native app.

## Status

Day zero. What exists today is the app shell:

- Installable PWA (manifest, home screen icon, standalone fullscreen)
- Launch screens sized for iPhone 16e, 16, 16 Plus, 16 Pro and 16 Pro Max
- iOS polish: content clears the Dynamic Island and home bar, no rubber-band bounce or tap flash, no input auto-zoom, system font (SF Pro)

Not built yet: the product itself, accounts, data, offline caching, push notifications.

## Principles

- **iPhone first.** If it doesn't feel native on an iPhone 16, it isn't done.
- **Ship small.** The simplest thing that works, then iterate. No speculative features.
- **Fast by default.** Static where possible, no heavy dependencies, no web fonts.
- **Trust is the product.** It's about people's money: security, correctness and clear numbers are never cut.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components)
- React 19, TypeScript, Tailwind CSS 4
- pnpm

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

### Test on your iPhone

Install mode only works on a real device:

```bash
pnpm build && pnpm start -H 0.0.0.0
```

Open `http://<your-mac-ip>:3000` in Safari on the iPhone (same Wi-Fi), then tap **Share → Add to Home Screen**.

## Project layout

| Path | What it is |
| --- | --- |
| `src/app/brand.tsx` | App name, colors, logo, and the iPhone 16 screen sizes |
| `src/app/manifest.ts` | Web app manifest |
| `src/app/icon.tsx`, `apple-icon.tsx` | Generated app icons |
| `src/app/splash/[device]/route.tsx` | Generated iOS launch screens |
| `src/app/layout.tsx` | iOS meta tags and viewport |
| `src/app/globals.css` | Theme and iOS CSS fixes |

## AI agent setup

- `.cursor/rules/ponytail.mdc`: [Ponytail](https://github.com/DietrichGebert/ponytail), keeps agents writing the least code that works (MIT).
- `.cursor/skills/pwa-expert/`: [pwa-expert skill](https://github.com/curiositech/some_claude_skills) from curiositech/some_claude_skills, reference for service workers, caching and offline (MIT).
- `AGENTS.md`: Next.js 16 notes plus iOS-specific caveats for the skill above.
