# Signal Core Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, local-first Next.js homepage for a premium AI-agent company, with a monochrome editorial system, responsive navigation, cinematic GSAP motion, and a resilient React Three Fiber hero.

**Architecture:** The Next.js App Router renders the page shell and content sections on the server, while small client islands own navigation state, GSAP sequences, counters, and WebGL. Content and feature metadata live in typed data modules so later routes can reuse the same information without duplicating copy. The 3D scene is dynamically loaded behind an accessible static fallback and never gates the core message or CTAs.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, GSAP/ScrollTrigger, Lenis, Three.js, React Three Fiber, Drei, Vitest, Testing Library, Playwright

**Spec:** `docs/superpowers/specs/2026-10-15-signal-core-homepage-design.md`

## Global Constraints

- The first milestone implements `/` only and remains local; no deployment or hosted Site is created.
- Company name and logo stay as polished placeholders that can be replaced without layout changes.
- The visual palette is predominantly white, deep black, cool grey, and restrained silver.
- Copy is German and all claims, prices, integrations, and ROI examples remain within the supplied sales document.
- Essential content is server-rendered and usable when WebGL, intensive motion, or client-side JavaScript is unavailable.
- `prefers-reduced-motion` disables scroll scrubbing, intensive parallax, and non-essential loops.
- Future routes must not be exposed as broken links in this milestone.
- No CMS, database, authentication, live contact backend, booking integration, or customer claims are added.

## Review Focus

- WebGL unavailable or scene initialization fails: the hero keeps its heading, CTAs, channel labels, and a deliberate static Signal Core fallback.
- Reduced-motion user: all essential content is immediately present, counters resolve to their final values, and no scrubbed or looping animation runs.
- Keyboard-only visitor: navigation, mobile menu, CTA buttons, and industry cards have a logical order and visible focus treatment.
- Narrow mobile viewport: oversized display type, navigation, 3D fallback, cards, and pricing content do not clip or cause horizontal overflow.
- Unimplemented future route: the UI communicates that the destination is in preparation instead of navigating to a 404.

---

## File Map

- `package.json` - scripts and runtime/test dependencies
- `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `vitest.config.ts`, `playwright.config.ts` - framework and test configuration
- `src/app/layout.tsx` - global metadata, fonts, body shell
- `src/app/page.tsx` - server-composed homepage
- `src/app/globals.css` - Tailwind import, design tokens, global typography, focus and reduced-motion rules
- `src/content/home.ts` - typed German homepage copy, channels, industries, ROI, process, and package preview
- `src/lib/motion.ts` - pure motion-capability decision helper
- `src/hooks/use-motion-mode.ts` - browser adapter for media queries and WebGL capability
- `src/components/layout/site-header.tsx`, `site-footer.tsx` - navigation and footer
- `src/components/ui/*` - reusable section label, magnetic link, reveal text, and preparation notice
- `src/components/home/*` - homepage sections
- `src/components/three/signal-core-scene.tsx` - isolated React Three Fiber scene
- `src/components/three/signal-core-fallback.tsx` - CSS/SVG fallback composition
- `tests/content/home.test.ts`, `tests/lib/motion.test.ts`, `tests/components/home.test.tsx` - unit/component coverage
- `e2e/home.spec.ts` - browser, responsive, keyboard, reduced-motion, and fallback smoke coverage

---

### Task 1: Project Foundation and Typed Content

**Files:**

- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/content/home.ts`
- Test: `tests/content/home.test.ts`

**Interfaces:**

- Consumes: the approved design spec and supplied PDF content
- Produces: `homeContent`, `Channel`, `Industry`, `ProcessStep`, and `PackagePreview` for all later homepage sections

- [ ] **Step 1: Write the failing typed-content test**

Create `tests/content/home.test.ts` with assertions that `homeContent.channels` contains exactly the four ids `phone`, `whatsapp`, `website`, and `team`; `industries` contains eight unique slugs; the hero contains one primary and one secondary CTA; every ROI figure contains an explicit `qualifier`; and every future navigation item has `status: "planned"`.

- [ ] **Step 2: Run the content test to verify it fails**

Run: `pnpm vitest run tests/content/home.test.ts`

Expected: FAIL because the project and `src/content/home.ts` do not exist.

- [ ] **Step 3: Scaffold the local app and install the selected stack**

Create the listed framework configuration, scripts for `dev`, `build`, `typecheck`, `test`, and `test:e2e`, and dependencies for Next.js, Tailwind CSS, GSAP, Lenis, Three.js, React Three Fiber, Drei, Vitest, Testing Library, and Playwright. Preserve the existing `docs/` tree.

- [ ] **Step 4: Implement the typed content contract**

Create the exported types and `homeContent` constant in `src/content/home.ts`. Use the approved hero promise, the four-channel model, all eight industry categories, the five-step process, and qualified package/ROI preview copy from the source material.

- [ ] **Step 5: Add the global document shell and design tokens**

Implement `src/app/layout.tsx` with German locale, local metadata, display/body font variables, and the base body shell. Implement tokens in `src/app/globals.css` for paper, ink, graphite, mist, silver, radius, gutters, type scale, selection, visible focus, and global reduced-motion rules.

- [ ] **Step 6: Run foundation verification**

Run: `pnpm vitest run tests/content/home.test.ts && pnpm typecheck`

Expected: the content test passes and TypeScript exits with code 0.

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml next.config.ts tsconfig.json postcss.config.mjs vitest.config.ts playwright.config.ts src/app src/content tests/content
git commit -m "feat: establish signal core site foundation"
```

---

### Task 2: Motion Capability, Navigation, and Hero Shell

**Files:**

- Create: `src/lib/motion.ts`
- Create: `src/hooks/use-motion-mode.ts`
- Create: `src/components/ui/section-label.tsx`
- Create: `src/components/ui/magnetic-link.tsx`
- Create: `src/components/ui/preparation-notice.tsx`
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/home/hero-section.tsx`
- Create: `src/components/three/signal-core-fallback.tsx`
- Test: `tests/lib/motion.test.ts`
- Test: `tests/components/home.test.tsx`

**Interfaces:**

- Consumes: `homeContent.hero`, `homeContent.navigation`, and `homeContent.channels`
- Produces: `resolveMotionMode(capabilities: MotionCapabilities): MotionMode`, `useMotionMode(): MotionMode`, `SiteHeader`, and `HeroSection`

- [ ] **Step 1: Write the failing motion decision tests**

Create `tests/lib/motion.test.ts` for `resolveMotionMode`. Assert `"reduced"` when `prefersReducedMotion` is true, `"fallback"` when WebGL is false, `"lite"` when the pointer is coarse, and `"full"` only when WebGL and fine pointer are available without reduced motion.

- [ ] **Step 2: Run the motion tests to verify they fail**

Run: `pnpm vitest run tests/lib/motion.test.ts`

Expected: FAIL because `resolveMotionMode` is missing.

- [ ] **Step 3: Implement the pure decision helper and browser hook**

Add `MotionMode = "full" | "lite" | "reduced" | "fallback"`, the `MotionCapabilities` interface, and `resolveMotionMode`. Implement `useMotionMode` as the sole browser adapter for reduced-motion, pointer precision, and WebGL detection.

- [ ] **Step 4: Write the failing header and hero component tests**

In `tests/components/home.test.tsx`, assert that the header exposes the placeholder brand, opens and closes an accessible mobile menu, renders planned destinations as buttons rather than broken anchors, and that the hero always renders its H1, both CTAs, all four channel labels, and fallback artwork.

- [ ] **Step 5: Run the component tests to verify they fail**

Run: `pnpm vitest run tests/components/home.test.tsx`

Expected: FAIL because the components are missing.

- [ ] **Step 6: Implement navigation, shared actions, and hero shell**

Build the floating desktop header, full-screen mobile menu, planned-route notice, magnetic CTA behavior for fine pointers, and the server-visible hero structure. `HeroSection` must accept a `visual` slot so the next task can replace the static core without changing copy or layout.

- [ ] **Step 7: Run component and type verification**

Run: `pnpm vitest run tests/lib/motion.test.ts tests/components/home.test.tsx && pnpm typecheck`

Expected: all tests pass and TypeScript exits with code 0.

- [ ] **Step 8: Commit**

```bash
git add src/lib src/hooks src/components/ui src/components/layout/site-header.tsx src/components/home/hero-section.tsx src/components/three/signal-core-fallback.tsx tests/lib tests/components
git commit -m "feat: add adaptive hero and navigation shell"
```

---

### Task 3: Signal Core WebGL and Motion Choreography

**Files:**

- Create: `src/components/three/signal-core-scene.tsx`
- Create: `src/components/three/signal-core-loader.tsx`
- Create: `src/components/ui/reveal-text.tsx`
- Create: `src/components/home/home-motion.tsx`
- Modify: `src/components/home/hero-section.tsx`
- Modify: `tests/components/home.test.tsx`
- Test: `e2e/home.spec.ts`

**Interfaces:**

- Consumes: `useMotionMode()`, the `HeroSection` visual slot, and four channel ids from `homeContent`
- Produces: `SignalCoreLoader`, `SignalCoreScene`, `RevealText`, and scoped GSAP/Lenis orchestration mounted by `HomeMotion`

- [ ] **Step 1: Extend the component test for resilient scene loading**

Mock the dynamic scene import in `tests/components/home.test.tsx`. Assert that loading and rejected-import states preserve the H1 and CTAs and display `SignalCoreFallback` rather than an empty region.

- [ ] **Step 2: Run the scene-resilience test to verify it fails**

Run: `pnpm vitest run tests/components/home.test.tsx`

Expected: FAIL because `SignalCoreLoader` is missing.

- [ ] **Step 3: Implement the procedural Signal Core scene**

Build an original scene from lightweight procedural geometry: a central reflective core, translucent shell, orbital rings, and four connection nodes. Limit device-pixel ratio, use demand-aware rendering for lite modes, react gently to pointer input, and expose channel-state changes without loading an external model.

- [ ] **Step 4: Implement dynamic loading and failure fallback**

`SignalCoreLoader` dynamically imports the canvas scene client-side, renders `SignalCoreFallback` while loading, catches scene errors inside the visual boundary, and selects static/reduced output from `useMotionMode`.

- [ ] **Step 5: Implement scoped GSAP and Lenis choreography**

Create `RevealText` and `HomeMotion`. Register ScrollTrigger only on the client, synchronize Lenis with the GSAP ticker, scope selectors with `gsap.context`, and clean up the timeline, triggers, and Lenis instance on unmount. In reduced mode, reveal final states without creating scrubbed timelines.

- [ ] **Step 6: Add the initial browser smoke test**

Create `e2e/home.spec.ts` with assertions that the hero heading and CTAs are visible at desktop and mobile widths, no horizontal scrollbar is introduced, reduced-motion emulation leaves the full headline visible, and disabling WebGL still yields visible fallback artwork.

- [ ] **Step 7: Run scene and smoke verification**

Run: `pnpm vitest run tests/components/home.test.tsx && pnpm build && pnpm playwright test e2e/home.spec.ts`

Expected: tests pass, production build succeeds, and browser checks pass without console errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/three src/components/ui/reveal-text.tsx src/components/home/hero-section.tsx src/components/home/home-motion.tsx tests/components e2e
git commit -m "feat: create interactive signal core experience"
```

---

### Task 4: Complete Homepage Narrative

**Files:**

- Create: `src/components/home/channel-story.tsx`
- Create: `src/components/home/capability-section.tsx`
- Create: `src/components/home/industry-explorer.tsx`
- Create: `src/components/home/roi-section.tsx`
- Create: `src/components/home/process-section.tsx`
- Create: `src/components/home/pricing-preview.tsx`
- Create: `src/components/home/final-cta.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `tests/components/home.test.tsx`
- Modify: `e2e/home.spec.ts`

**Interfaces:**

- Consumes: all typed exports from `homeContent`, shared UI primitives, and `HomeMotion` data attributes
- Produces: a complete server-composed homepage with section ids `channels`, `capabilities`, `industries`, `roi`, `process`, `pricing`, and `contact`

- [ ] **Step 1: Write failing narrative component tests**

Extend `tests/components/home.test.tsx` to assert one heading per required section, eight keyboard-focusable industry cards with visible pain-point copy, qualified ROI values, five ordered process steps, three package previews, and the final CTA/footer. Assert no placeholder customer logos or testimonials exist.

- [ ] **Step 2: Run the narrative tests to verify they fail**

Run: `pnpm vitest run tests/components/home.test.tsx`

Expected: FAIL because the narrative components do not exist.

- [ ] **Step 3: Implement the channel and capability story**

Build the pinned-capable four-channel sequence and the operational-agent comparison. Mark scroll targets with stable data attributes consumed by `HomeMotion`; keep all copy visible and ordered without animation.

- [ ] **Step 4: Implement the industry explorer and ROI section**

Render all eight verticals from typed content with focus/hover states that never hide essential text. Add example metrics with explicit assumptions and counters that resolve immediately in reduced mode.

- [ ] **Step 5: Implement process, package preview, final CTA, and footer**

Create the five-step implementation narrative, qualified Starter/Pro/Premium preview, black cinematic closing section, and future-aware footer. Planned routes use the shared preparation notice rather than broken navigation.

- [ ] **Step 6: Compose the homepage**

Implement `src/app/page.tsx` as the server composition root, placing `HomeMotion` once and maintaining semantic heading order and landmarks.

- [ ] **Step 7: Extend end-to-end interaction coverage**

Add Playwright checks for opening and closing the mobile menu, keyboard focus visibility, every required section, all eight industry cards, final CTA visibility, and planned navigation not causing a 404.

- [ ] **Step 8: Run narrative verification**

Run: `pnpm vitest run && pnpm typecheck && pnpm build && pnpm playwright test`

Expected: all unit, component, type, build, and browser checks pass.

- [ ] **Step 9: Commit**

```bash
git add src/app/page.tsx src/components/home src/components/layout/site-footer.tsx tests e2e
git commit -m "feat: complete signal core homepage narrative"
```

---

### Task 5: Visual QA, Performance, and Final Polish

**Files:**

- Modify: `src/app/globals.css`
- Modify: `src/components/home/*`
- Modify: `src/components/layout/*`
- Modify: `src/components/three/*`
- Modify: `e2e/home.spec.ts`
- Create: `README.md`

**Interfaces:**

- Consumes: the complete homepage and all verification commands from Tasks 1-4
- Produces: a polished local build with documented startup instructions and recorded verification evidence

- [ ] **Step 1: Run the full automated baseline**

Run: `pnpm vitest run && pnpm typecheck && pnpm build && pnpm playwright test`

Expected: all commands pass before visual adjustments begin.

- [ ] **Step 2: Inspect representative viewports**

Review the served production build at 1440x1000, 1024x768, 768x1024, and 390x844. Check typography rhythm, hero composition, section transitions, canvas/fallback alignment, card density, CTA prominence, and horizontal overflow.

- [ ] **Step 3: Correct visual and interaction defects**

Make only evidence-driven adjustments found in Step 2. Preserve content contracts and do not add new claims or features during polish.

- [ ] **Step 4: Exercise accessibility and fallback states manually**

Verify keyboard-only navigation, visible focus, mobile menu focus behavior, reduced motion, WebGL fallback, coarse pointer behavior, and page readability with JavaScript disabled.

- [ ] **Step 5: Review runtime performance**

Confirm the 3D scene is dynamically loaded, pixel ratio is capped, no oversized external media exists, animations avoid layout-thrashing properties, and the browser console has no hydration or WebGL lifecycle warnings.

- [ ] **Step 6: Document local use**

Create `README.md` with prerequisites, `pnpm install`, `pnpm dev`, verification commands, project structure, and a note that branding and later routes are intentionally placeholders for the next milestone.

- [ ] **Step 7: Run final verification after polish**

Run: `pnpm vitest run && pnpm typecheck && pnpm build && pnpm playwright test`

Expected: all commands pass on the final files with no relevant console errors.

- [ ] **Step 8: Commit**

```bash
git add README.md src e2e
git commit -m "chore: polish and verify signal core homepage"
```
