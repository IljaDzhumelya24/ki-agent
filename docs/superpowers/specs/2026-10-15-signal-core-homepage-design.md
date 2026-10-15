# Signal Core Homepage - Design Specification

## 1. Goal

Create the local foundation and first finished homepage for a premium, multi-page website that sells AI agents to local businesses. The homepage must create an immediate high-end impression while explaining the offer clearly enough that a business owner understands the value, the available channels, and the next step.

The supplied sales document is the factual content basis. Claims, prices, integrations, legal statements, and ROI examples must not be expanded beyond that source without separate verification. Company name and logo remain polished placeholders that can be replaced later without changing the layout.

## 2. Audience and Success Criteria

Primary audience:

- Owners and decision-makers at local businesses
- Prospects from gastronomy, beauty, healthcare, trades, automotive, real estate, sports, and hospitality
- Visitors who may be interested in automation but do not yet understand the difference between an FAQ chatbot and an operational AI agent

The homepage succeeds when it:

- Produces a strong visual "wow" within the first viewport
- Communicates the core promise within several seconds
- Makes the four channels and the shared agent model easy to understand
- Feels credible, controlled, and commercially useful rather than gimmicky
- Leads visitors toward a demo or consultation CTA
- Works smoothly on desktop, tablet, and mobile
- Remains usable when motion is reduced or WebGL is unavailable

## 3. Creative Direction: Signal Core

The visual system is editorial, monochrome, and spatial. The page uses a predominantly white canvas, deep black typography, cool grey surfaces, and restrained silver materials. Selected sections invert to black to create pacing and contrast.

The central visual metaphor is a single intelligent core connected to four access points: telephone, WhatsApp, website chat, and team app. The 3D object is abstract and premium - polished metal, translucent glass, soft refraction, fine orbital lines, and controlled light - not a robot, brain stock image, or generic neon AI graphic.

Typography combines a distinctive display face for oversized headlines with a highly legible grotesk for navigation and body text. The hierarchy should feel confident and sparse. Text is written in German and avoids exaggerated promises.

Motion uses deliberate choreography:

- Masked headline reveals
- Subtle character or line staggering
- Magnetic and tactile buttons
- Section transitions tied to scroll position
- Controlled parallax and depth
- A 3D core that reacts to pointer movement and changes state during the channel story
- Micro-interactions that clarify navigation and selectable cards

Motion must support the narrative, never block reading or make normal navigation unpredictable.

## 4. Homepage Narrative

### 4.1 Global Navigation

A refined floating header contains a placeholder wordmark, links for Lösungen, Branchen, Technologie, Preise, and Über uns, plus a primary "Demo starten" action. The header transitions from transparent to a lightly blurred white surface as the visitor scrolls. Desktop may use an editorial mega-menu; mobile uses a full-screen menu with simple, accessible transitions.

### 4.2 Hero

The first viewport presents a large core statement such as:

> Ein Agent. Jeder Kanal. Keine Anfrage verloren.

Supporting copy explains that the same agent serves phone, WhatsApp, website chat, and the internal team app. The hero contains the interactive Signal Core, two actions (demo and solutions), a small system-status detail, and restrained indicators for the four channels.

### 4.3 Four Channels, One System

A scroll-driven sequence explains how each channel connects to one shared source of knowledge, tools, rules, and human handoff. The 3D core changes orientation or connection state as each channel enters focus. A static diagram and copy remain available when motion is disabled.

### 4.4 Operational Difference

This section distinguishes an operational agent from a basic FAQ bot. It focuses on booking, changing appointments, collecting structured requests, creating tasks, handing off to people, and logging outcomes. Claims remain aligned with the supplied source.

### 4.5 Industry Explorer

Eight interactive cards introduce the supported verticals:

- Gastronomie
- Beauty und Pflege
- Gesundheit
- Handwerk
- Automotive
- Immobilien
- Sport und Freizeit
- Beherbergung

Each card includes one concrete pain point and one meaningful workflow. Hover and focus interactions reveal depth without hiding essential information. These cards will later link to dedicated industry pages.

### 4.6 Value and ROI

An editorial metrics section explains that value comes from recovered requests and saved time. Numbers are clearly labelled as examples or assumptions. Animated counters run only when visible and resolve immediately for reduced-motion users.

### 4.7 Implementation Process

A concise sequence explains Bedarf, Live-Demo, Pilot, Integration, and Go-live. It communicates that integrations and clearly defined boundaries are part of the product, not an afterthought.

### 4.8 Package Preview

Starter, Pro, and Premium appear as a visual preview based on the supplied proposal. The section directs visitors to a later pricing page and avoids presenting changeable example prices as permanent contractual offers without an appropriate qualifier.

### 4.9 Final CTA and Footer

The page transitions into a cinematic black closing section with a large consultation invitation and a focused CTA. The footer exposes the future multi-page information architecture and includes placeholder legal links.

## 5. Information Architecture

Only the homepage is implemented in the first milestone. The project structure and navigation anticipate these routes:

- `/` - Homepage
- `/loesungen` - Channel and capability overview
- `/branchen` - Industry overview
- `/branchen/[slug]` - Individual industry pages
- `/technologie` - Architecture, integrations, security, and boundaries
- `/preise` - Packages and pricing
- `/ueber-uns` - Company story and approach
- `/kontakt` - Demo and consultation request

Unimplemented destinations must not lead to broken pages in the homepage milestone. They will either be represented as non-navigating preview items or use an intentional "in preparation" treatment until their milestone is built.

## 6. Technical Architecture

Core stack:

- Next.js with App Router
- React and TypeScript
- Tailwind CSS
- GSAP with ScrollTrigger
- Lenis smooth scrolling synchronized with GSAP
- Three.js through React Three Fiber and Drei

The page is decomposed into focused components:

- `SiteHeader` and navigation layers
- `HeroSection`
- `SignalCoreScene`
- `ChannelStory`
- `CapabilitySection`
- `IndustryExplorer`
- `RoiSection`
- `ProcessSection`
- `PricingPreview`
- `FinalCta`
- `SiteFooter`
- Shared primitives for animated text, buttons, section labels, and motion preferences

Most page content is server-rendered. Interactive sections and the WebGL scene are isolated client components. The 3D layer is dynamically loaded to avoid blocking initial content. No database, authentication, CMS, or external integration is required for the homepage milestone.

## 7. Responsive, Performance, and Accessibility

- Layouts adapt intentionally at desktop, tablet, and mobile breakpoints rather than simply shrinking.
- Touch devices receive interaction states that do not depend on hover.
- The 3D scene uses conservative geometry, materials, and device-pixel ratio limits.
- On constrained devices, the scene reduces complexity or falls back to a styled static composition.
- `prefers-reduced-motion` disables scroll scrubbing, intensive parallax, and non-essential loops.
- Navigation, dialogs, cards, and actions remain keyboard accessible.
- Focus styles are visible and consistent.
- Text contrast meets WCAG AA for normal reading content.
- Semantic headings, landmarks, labels, and descriptive metadata are included.
- Layout remains stable while fonts and the 3D scene load.

## 8. Error and Fallback Behaviour

- A client-side error in the 3D scene must not remove the headline, CTA, or core explanation.
- WebGL absence produces a deliberate static fallback, not an empty canvas.
- JavaScript-disabled rendering retains the essential homepage copy and normal links.
- Missing future routes are never exposed as broken links.
- Motion initialization is scoped and cleaned up during navigation or hot reload.

## 9. Validation

The homepage milestone is complete only after:

- Type checking succeeds
- Production build succeeds
- The page is visually inspected at representative desktop, tablet, and mobile sizes
- Header, menu, CTA, industry interactions, and scroll sequences are exercised
- WebGL failure or fallback behaviour is checked
- Reduced-motion behaviour is checked
- Keyboard navigation and visible focus are checked
- Browser console contains no relevant errors or hydration warnings
- Performance is reviewed for oversized assets, unnecessary client components, and excessive animation work

## 10. Scope Boundaries

Included in this milestone:

- Local project setup
- Fully designed and implemented homepage
- Functional navigation experience for currently available content
- Custom procedural 3D hero object and scroll-linked presentation
- Responsive and accessible motion system
- Prepared architecture for later pages

Not included yet:

- Full content pages beyond the homepage
- Live booking, phone, WhatsApp, CRM, or calendar integrations
- Contact form backend or lead storage
- CMS, accounts, dashboards, or team app functionality
- Deployment or public hosting
- Final company name, logo, testimonials, customer logos, or unverifiable case studies

## 11. Content Integrity

The source material contains time-sensitive market prices, vendor information, legal summaries, and ROI assumptions. The homepage may use these only with transparent labels and without turning examples into guarantees. Legal statements remain high-level and clearly avoid presenting the website as legal advice. Before later production launch, all time-sensitive claims must be verified again.
