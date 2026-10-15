# Signal Core

Eine lokale Next.js-Homepage für ein hochwertig positioniertes KI-Agenten-Angebot. Der erste Meilenstein umfasst die vollständige Startseite mit responsiver Navigation, GSAP-/Lenis-Choreografie, einem prozeduralen React-Three-Fiber-Objekt und robusten Fallbacks.

## Voraussetzungen

- Node.js 20.9 oder neuer
- pnpm 11
- Chromium für die Playwright-Prüfungen (`pnpm playwright install chromium`)

## Lokal starten

```bash
pnpm install
pnpm dev
```

Die Seite ist anschließend unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Qualitätsprüfungen

```bash
pnpm test
pnpm typecheck
pnpm build
pnpm test:e2e
```

Die Browser-Suite prüft Desktop und Mobile, Reduced Motion, fehlendes WebGL, Tastaturbedienung, Menüverhalten, geplante Navigation und Lesbarkeit ohne JavaScript.

## Struktur

- `src/app` - App-Router-Einstieg, globale Gestaltung und Metadaten
- `src/content` - typisierte deutsche Inhalte der Homepage
- `src/components/home` - eigenständige Inhaltssektionen und Motion-Orchestrierung
- `src/components/three` - prozedurale 3D-Szene, Loader und statischer Fallback
- `src/components/layout` - Header und Footer
- `src/components/ui` - wiederverwendbare UI-Primitiven
- `tests` - Unit- und Komponententests
- `e2e` - Playwright-Browserprüfungen
- `docs/superpowers` - freigegebene Spezifikation und Implementierungsplan

## Bewusste Platzhalter

Unternehmensname, Logo, E-Mail-Adresse und rechtliche Seiten sind bewusst als Platzhalter angelegt. Die Navigation zeigt zukünftige Unterseiten als „in Vorbereitung“, damit im ersten Meilenstein kein Link auf eine nicht vorhandene Route führt. Live-Telefonie, WhatsApp, Buchungssysteme, CRM-Anbindungen, Formulare und Deployment gehören nicht zu diesem lokalen Homepage-Meilenstein.
