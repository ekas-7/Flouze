<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Flouze: iPhone-first PWA

The target is an installed PWA on iPhone 16 (iOS Safari / WebKit). When using the `pwa-expert` skill, these parts do not apply on iOS:

- `beforeinstallprompt` never fires on iOS. Install is manual (Share → Add to Home Screen); the hint in `src/app/page.tsx` handles it with the `standalone:` CSS variant.
- Background Sync and Periodic Sync are unsupported. Retry on reconnect instead (Next's `experimental.useOffline`, see `node_modules/next/dist/docs/01-app/02-guides/offline-support.md`).
- Don't use `next-pwa`. For service-worker caching use Serwist, per `node_modules/next/dist/docs/01-app/02-guides/progressive-web-apps.md`.
- Push needs iOS 16.4+ and only works once the app is installed to the home screen.
- iOS can evict caches of apps not opened for a while; never treat Cache Storage as the source of truth for money data.

## Auth and data access

- Sessions are stateful (Better Auth, stored in MongoDB). Read the user only via `getCurrentUser()` in `src/lib/session.ts`, inside a `<Suspense>` boundary.
- Every Server Action / Route Handler touching user data calls `getCurrentUser()` itself and filters by `user.id`. Never accept a user id from the client.
- MongoDB + Prisma: no migrations, run `pnpm db:push` after schema changes.
