<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This project runs **Next.js 16.1.1** with **React 19.2.3** in **Static Export mode** (`output: "export"`).
APIs, conventions, and constraints differ significantly from legacy training data:

- All pages are statically prerendered to pure HTML/CSS/JS (`next build` outputs to `./out`).
- No Node.js runtime server APIs (`cookies()`, `headers()`, dynamic API routes, or server actions) are available.
- Dynamic route segments (`[outletName]`, `[outletId]`) must export `generateStaticParams()`.
- Static assets and images must be configured for static export (`images.unoptimized = true` in `next.config.ts`).
- Read the relevant documentation in `node_modules/next/dist/docs/` or at `https://nextjs.org/docs/app` before writing code.
- Heed React 19 compiler and hooks deprecations.

<!-- END:nextjs-agent-rules -->

# CW-COFFEE-SeatCheck - AI Agent Developer Guide

Welcome to **CW-COFFEE-SeatCheck**. This repository is a real-time cafe seat availability and monitoring system for CW Coffee outlets.

---

## 1. Project Overview & Architecture

- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3, Tailwind CSS v4, Lucide React icons
- **Language**: TypeScript 5 (Strict Mode)
- **Deployment Platform**: GitHub Pages (`https://cw-seatcheck.farrelad.com` via `public/CNAME`)
- **Backend Services**: Firebase v12 (Client-side SDK)
  - Firebase Realtime Database (real-time seat occupancy & updates)
  - Firebase Authentication (admin auth)
  - Firebase Firestore & Storage
- **Package Manager**: `pnpm@11.18.0` (with pinned dependency build authorization in `pnpm-workspace.yaml`)
- **Runtime Environment**: Node.js `22.14.0`

---

## 2. Static Web Export (`output: "export"`) Constraints

This project is deployed as a fully static website on GitHub Pages. Any AI agent working on this codebase MUST follow these rules:

1. **`generateStaticParams()` is Mandatory**:
   Every dynamic route segment MUST provide `generateStaticParams()` to pre-render all possible paths at build time:
   - `src/app/admin/outlet/[outletId]/page.tsx`
   - `src/app/category/outlet/[outletName]/page.tsx`
   - `src/app/category/outlet/[outletName]/checking/page.tsx`
2. **No Server-Side Dynamic APIs**:
   Do NOT use server-only functions such as `cookies()`, `headers()`, or uncached requests that require a Node.js server at request time.
3. **Client-Side Data Fetching**:
   All dynamic real-time data MUST be fetched client-side using the Firebase client SDK (`onValue`, `get`, `set`, `update`).
4. **Image Optimization**:
   Next.js Image Optimization server is disabled (`images: { unoptimized: true }`). Use `<Image unoptimized />` or ensure `next.config.ts` has `unoptimized: true`.
5. **Path Resolution & Routing**:
   Always use Next.js `<Link>` components with relative or internal routes. Ensure `trailingSlash: true` compliance.

---

## 3. React 19 & Next.js Coding Guidelines

Follow these strict rules enforced by our ESLint and React Compiler configurations:

1. **No Synchronous `setState` in Effects (`react-hooks/set-state-in-effect`)**:
   - Never call `setState` directly at the top level of `useEffect`.
   - If state needs to reset when a prop or key changes (e.g. `outletId` or `zoneName`), adjust state during render using the official React pattern:
     ```tsx
     const [prevKey, setPrevKey] = useState(currentKey);
     if (prevKey !== currentKey) {
     	setPrevKey(currentKey);
     	setData(null);
     	setLoading(true);
     }
     ```
   - Handle errors and updates inside asynchronous callbacks (e.g. Firebase `onValue(ref, onSuccess, onError)`).
2. **Safe Ref Management Outside Render (`react-hooks/refs`)**:
   - Never read or write `ref.current` during rendering.
   - Synchronize mutable refs inside `useEffect` or event handlers.
3. **No Direct Mutation of External Objects (`react-hooks/immutability`)**:
   - Never mutate external library objects (such as `BrowserMultiFormatReader` or third-party DOM instances). Use React state or ref containers (`videoElementRef`).
4. **Server vs. Client Component Boundaries**:
   - Default to Server Components for layouts and pages to minimize client bundle size.
   - Add `"use client"` only when components require React hooks (`useState`, `useEffect`), event listeners, or browser APIs (Camera, Geolocation, Canvas).
   - Keep `"use client"` components at the leaves of the component tree.
5. **Dynamic Imports for Heavy Libraries**:
   - Heavy client-only libraries (e.g. `@zxing/library` for QR code scanning) should be dynamically imported only when required (e.g. when opening a modal) to maintain small initial bundle sizes.

---

## 4. Verification & Quality Gates

Before submitting or committing any change, you MUST run and pass all of the following:

```bash
# 1. Typecheck (TypeScript compiler check)
pnpm run typecheck

# 2. Lint check (must pass with 0 errors and 0 warnings)
pnpm run lint

# 3. Format check (Prettier)
pnpm run format:check

# 4. Unit tests (Jest test suite)
pnpm test

# 5. Production Static Build (must export 54/54 static pages cleanly)
pnpm run build
```

---

## 5. Git Pre-Commit Hook & CI/CD Pipeline

- **Husky & lint-staged**: Automatically executes on every `git commit`. It lints, formats, and tests all staged files. Commits will fail if quality checks do not pass.
- **Pull Request Verification Workflow (`.github/workflows/pr-check.yml`)**:
  - Automatically runs parallel jobs:
    1. `format-and-audit`: Prettier format verification & pnpm security audit.
    2. `typecheck-and-lint`: TypeScript compiler & ESLint (zero-warning policy).
    3. `unit-tests`: Jest test suite.
    4. `static-build`: Full static build (`pnpm run build`).
    5. `pr-gate`: Aggregator gate required for merging into `main`.
- **Deployment Workflow (`.github/workflows/deploy.yml`)**:
  - Triggered manually via `workflow_dispatch`.
  - Runs pre-build quality checks, builds the static export, and deploys to GitHub Pages CDN.
