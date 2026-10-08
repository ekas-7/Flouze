# Flouze

> *Flouze* (French slang): money.

Flouze is a personal expense tracker for iPhone. Open it, log what you just spent in a couple of taps, and see where your money goes day by day.

It ships as a web app (PWA) that installs to the home screen and runs fullscreen like a native app, so releases go out instantly without App Store review. It is built **iPhone-first**: every screen is designed and tested for the iPhone 16 lineup before anything else.

## What we're building

- **Log an expense in seconds:** amount, category, optional note. Logging fast enough to do it at the till is the whole point.
- **Daily view:** today's spending and a running list of recent expenses.
- **Your data, your account:** sign in with Google; every expense belongs to your account and is stored in MongoDB.

## Status

Built:

- Installable PWA: manifest, home screen icon, launch screens for iPhone 16e, 16, 16 Plus, 16 Pro and 16 Pro Max
- iOS polish: content clears the Dynamic Island and home bar, no rubber-band bounce or tap flash, no input auto-zoom, system font (SF Pro)
- Google sign-in with database sessions (see [Architecture](#architecture))
- UI kit: tokens and components for the ledger, dock and quick-log button (see [UI kit](#ui-kit))
- **The app:**
  - **Dashboard** (`/`): this month's expenses vs income, and your latest 100 entries grouped by day and hour
  - **Log** (`/new`, the pencil button): type the amount, pick a category, optional note and time, save
  - **Edit / delete** (`/t/[id]`): tap any entry
  - **Ledger** (`/ledger`): this month's spending by category, with shares
  - **Profile** (`/profile`): account and sign out

Later, maybe: older months and search, budgets, offline logging, push reminders, CSV export.

## Principles

- **iPhone first.** If it doesn't feel native on an iPhone 16, it isn't done.
- **Ship small.** The simplest thing that works, then iterate. No speculative features.
- **Fast by default.** Static where possible, no heavy dependencies, no web fonts, no auth JavaScript in the browser.
- **Trust is the product.** It's people's money: security, correctness and clear numbers are never cut.

## UI kit

Kawaii / soft neumorphic-editorial: warm cream paper, pastel category colors, soft charcoal type, a doodle cat mascot dreaming of fish. Live reference with sample data at [`/kit`](http://localhost:3000/kit).

**Tokens** (Tailwind theme in `src/app/globals.css`, use as classes like `bg-cream`, `text-ink`, `rounded-card`):

| Token | Value | Use |
| --- | --- | --- |
| `cream` / `oat` / `card` | `#FBF7EE` / `#F3EADB` / `#FFFDF9` | Page / chips / sheets and cards |
| `ink` | `#2D2B2A` | Text, primary buttons (use `/60`, `/40` for secondary text) |
| `mint` `peach` `sky` `lilac` `butter` `rose` | pastel + matching `-ink` | Category cards, tiles and their text |
| `expense` / `income` | `#C4473F` / `#2F8653` | Money (both pass WCAG AA) |
| `rounded-card` / `-tile` / `-sheet` | 18 / 14 / 28px | Cards / icon tiles / sheets |
| `shadow-soft` / `-clay` / `-float` | | Low-elevation cards / claymorphic icon tiles / floating dock and FAB |
| `font-sans` | SF Pro Rounded (`ui-rounded`) | Built into iOS, zero download |

**Components** (`import { … } from "@/components/ui"`):

| Component | What it is |
| --- | --- |
| `SummaryHeader` | Title + Expenses vs Income totals, with the mascot |
| `Sheet` | Rounded card-colored sheet the ledger sits on (includes bottom space for the dock) |
| `DayHeader` | Date pill + weekday chip + day's income / expense totals |
| `TimeMarker` | `14:00 ▸` hour group label |
| `TransactionCard` | Pastel card: clay category icon, title, time, signed amount |
| `CategoryIcon` | Claymorphic tile with the category's doodle icon, in its pastel |
| `Button` | Pill button, `primary` (ink) or `soft` (card) |
| `Fab` | Pencil quick-log button, bottom right above the dock |
| `Dock` | Floating pill nav: Dashboard, Ledger, Wallet, Profile |
| `Mascot` | Doodle cat SVG (decorative) |

Categories (label, tone) live in `CATEGORIES` in `src/components/ui/tokens.ts`; `formatAmount()` formats money (negative = expense, true minus sign, Indian digit grouping). Category icons are custom inline SVG doodles in `src/components/ui/icons.tsx`, drawn to match the mascot, so the kit ships no image files.

## Architecture

```
iPhone (installed PWA)
   │  httpOnly session cookie
   ▼
Next.js 16 server ── Server Components / Server Actions
   │  getCurrentUser() checks the session on every request
   ▼
Better Auth ── Google OAuth
   │
   ▼
Prisma 6 ── MongoDB Atlas (user, session, account, verification, transaction)
```

**Stateful sessions.** Signing in creates a `session` document in MongoDB, and the browser only holds an opaque, signed, httpOnly cookie pointing to it. Every request looks the session up in the database, so signing out (or deleting the session document) revokes access immediately. Sessions last 30 days and slide forward once a day while you use the app.

**Server-first.** Sign-in and sign-out are Server Actions, and pages read the user on the server. The browser never loads an auth SDK, and nothing sensitive is sent to the client.

**Money and time.** Amounts are stored as integer paise (`amount` is negative for expenses, positive for income), so totals never drift from floating-point rounding. Income is just the `income` category. Days and hours are grouped in the device's time zone: the app stores it in a `tz` cookie, and the server formats with it (defaults to `Asia/Kolkata`).

**Rules for new code:**

- Read the user with `getCurrentUser()` from `src/lib/session.ts`. It redirects to `/sign-in` when there's no valid session. With Cache Components on, call it inside a `<Suspense>` boundary.
- Every Server Action and Route Handler that touches user data calls `getCurrentUser()` itself and scopes queries by `user.id`. Never trust an id from the client.
- Read transactions through `src/lib/transactions.ts`; its functions resolve the user themselves.
- Money is parsed with `parseAmount()` and shown with `formatAmount()` from `src/lib/money.ts`; never use floats for stored amounts.
- Database access stays on the server (`src/lib/db.ts`, `src/lib/auth.ts` and `src/lib/session.ts` are server-only).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components)
- React 19, TypeScript, Tailwind CSS 4
- [Better Auth](https://better-auth.com) with Google
- [Prisma 6](https://www.prisma.io) + MongoDB Atlas (Prisma 7 doesn't support MongoDB yet)
- pnpm

## Getting started

```bash
cp .env.example .env   # fill in the values (see below)
pnpm install           # also generates the Prisma client
pnpm db:push           # creates collections and indexes
pnpm dev               # http://localhost:3000
pnpm test              # unit tests for money and date logic
```

**Trying the app without Google:** `pnpm dlx tsx --env-file=.env scripts/test-session.mts` creates a test user and prints a session cookie; set it in your browser for `localhost:3000`. Add `--cleanup` to delete the test user and their entries.

### Environment

| Variable | Where it comes from |
| --- | --- |
| `DATABASE_URL` | MongoDB Atlas connection string, with `/flouze` as the database name |
| `BETTER_AUTH_SECRET` | `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | The app's public URL (`http://localhost:3000` in dev) |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | See below |

### Google sign-in setup

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → **Create credentials → OAuth client ID** (configure the consent screen first if asked).
2. Application type: **Web application**.
3. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`, plus `https://<your-domain>/api/auth/callback/google` once deployed.
4. Put the client ID and secret in `.env`.

### Database

- Schema: `prisma/schema.prisma`. The `User`, `Session`, `Account` and `Verification` models belong to Better Auth; regenerate them with `pnpm dlx @better-auth/cli generate --config src/lib/auth.ts --output prisma/schema.prisma` after changing auth plugins.
- MongoDB has no migrations: after editing the schema, run `pnpm db:push`.

### Test on your iPhone

Google only accepts `localhost` or HTTPS redirect URLs, so to sign in from a phone you need an HTTPS URL: deploy (e.g. Vercel), or tunnel your Mac with `cloudflared tunnel --url http://localhost:3000`. Set `BETTER_AUTH_URL` to that URL and add its callback to Google.

Open the URL in Safari on the iPhone, then **Share → Add to Home Screen**.

## Project layout

| Path | What it is |
| --- | --- |
| `src/app/(tabs)/` | Dashboard, Ledger and Profile, sharing the dock and pencil button |
| `src/app/new/`, `src/app/t/[id]/` | Log and edit screens |
| `src/components/transaction-form.tsx` | The log / edit form |
| `src/app/sign-in/page.tsx` | Sign-in screen |
| `src/app/actions.ts` | Server Actions: sign in / out, save and delete transactions |
| `src/lib/transactions.ts` | Transaction reads, scoped to the signed-in user |
| `src/lib/money.ts`, `src/lib/dates.ts` | Paise parsing / formatting, time-zone-aware grouping (tested in `lib.test.ts`) |
| `src/app/api/auth/[...all]/route.ts` | Better Auth endpoints (OAuth callback, session) |
| `src/lib/auth.ts` | Better Auth config |
| `src/lib/session.ts` | `getCurrentUser()`, the only way to read the user |
| `src/lib/db.ts` | Shared Prisma client |
| `prisma/schema.prisma` | Database schema (MongoDB) |
| `src/components/ui/` | UI kit components and tokens |
| `src/app/kit/page.tsx` | UI kit reference page |
| `src/app/brand.tsx` | App name, colors, logo, and the iPhone 16 screen sizes |
| `src/app/manifest.ts` | Web app manifest |
| `src/app/icon.tsx`, `apple-icon.tsx` | Generated app icons |
| `src/app/splash/[device]/route.tsx` | Generated iOS launch screens |
| `src/app/layout.tsx` | iOS meta tags and viewport |
| `src/app/globals.css` | Theme and iOS CSS fixes |

## AI agent setup

- `.cursor/rules/ponytail.mdc`: [Ponytail](https://github.com/DietrichGebert/ponytail), keeps agents writing the least code that works (MIT).
- `.cursor/skills/pwa-expert/`: [pwa-expert skill](https://github.com/curiositech/some_claude_skills) from curiositech/some_claude_skills, reference for service workers, caching and offline (MIT).
- `AGENTS.md`: Next.js 16 notes, iOS caveats and auth rules for agents.
