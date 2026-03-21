# Portfolio Website Design Spec

**Date:** 2026-03-21
**Author:** Gabriel Raymondou
**Status:** Approved

---

## Context

The current portfolio at raigato.github.io is sparse, visually underdeveloped, and does not reflect the quality of work Gabriel produces. The goal is a bold, experimental redesign that attracts **freelance clients** and makes a strong first impression. Design reference: good-fella.com — dark, typographically aggressive, and unapologetically developer-coded.

---

## Tech Stack

| Tool | Version / Notes |
|------|----------------|
| **Astro** | `output: 'static'` — zero JS by default, islands where needed |
| **TypeScript** | Strict mode throughout |
| **Tailwind CSS** | v4, utility-first styling |
| **GSAP + ScrollTrigger** | Animations (loaded as Astro script, not a framework) |
| **Biome** | Linting + formatting (replaces ESLint + Prettier) |

No React, no component framework. Astro's native scripting (`<script>`) handles all interactivity. This keeps the bundle near-zero and Lighthouse scores high.

---

## Deployment

**GitHub Pages** — static export via `astro build`. Deployed automatically via a GitHub Actions workflow on push to `main`. Output goes to `./dist`, served from the repo's `gh-pages` branch (or root of `main` depending on repo settings).

---

## Visual Design

### Color Palette — Raw White

| Role | Value |
|------|-------|
| Background | `#0A0A0A` |
| Primary text | `#FFFFFF` |
| Secondary text | `rgba(255,255,255,0.4)` |
| Borders | `#1E1E1E` |
| Glitch accent (red) | `#FF0044` |
| Glitch accent (cyan) | `#00FFEE` |
| Available indicator | `#4FFFB0` |

Color appears **only in glitch effects and hover states**. The base palette is strictly black and white.

### Typography

- **Headings / hero name**: System black or `Arial Black`, bold, tight letter-spacing (`-2px`)
- **UI labels / nav / tags**: Monospace (system `monospace` stack)
- **Body text**: System sans-serif

No external font dependencies — system fonts only for maximum performance.

---

## Content Data Files

All editable content is centralized. To update the site, only these two files need touching:

### `src/data/config.ts`

```ts
export const config = {
  name: 'Gabriel Raymondou',
  role: 'Fullstack Developer',
  location: 'Cannes, France',
  bio: '...',
  email: 'hello@example.com',
  available: true,
  stack: ['TypeScript', 'React', 'Next.js', 'Node', 'PostgreSQL', 'Docker'],
  socials: {
    github: 'https://github.com/raigato',
    linkedin: 'https://linkedin.com/in/...',
    twitter: 'https://twitter.com/...',
  },
}
```

### `src/data/projects.ts`

```ts
export interface Project {
  number: string        // '01', '02', ...
  title: string
  description: string
  tags: string[]
  thumbnail: string    // path relative to /public/images/projects/
  url?: string         // live URL — optional
  github?: string      // GitHub URL — optional
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Project Name',
    description: 'What it does, for whom, and the problem it solves.',
    tags: ['React', 'Node', 'PostgreSQL'],
    thumbnail: '/images/projects/project-01.jpg',
    url: 'https://...',
    github: 'https://github.com/...',
  },
  // Add new projects here — nothing else to update
]
```

**Adding a project**: add one object to the array + drop the thumbnail image in `public/images/projects/`. Done.

---

## Page Structure

Single page (`src/pages/index.astro`). Sections in order:

### 1. Navbar

- Sticky, `position: fixed`, full width
- Left: `G.R —` in monospace
- Right: `CONTACT ↓` — smooth-scrolls to contact section
- Background: transparent over hero, transitions to `#0A0A0A` with subtle border on scroll (GSAP ScrollTrigger)

### 2. Hero

Full-viewport height, two-column grid (50/50 on desktop, stacked on mobile):

**Left — ASCII Portrait**
- Photo converted to ASCII art at build time using a Node script (`scripts/ascii-gen.js`)
- Script uses the `sharp` library to read `public/images/portrait.jpg`, resizes to **80 characters wide** (maintaining aspect ratio with ~0.45 char height ratio), maps pixel brightness to chars `░▒▓█`, outputs `src/data/ascii.txt`
- Rendered in a `<pre>` block in monospace, white text
- On hover: GSAP timeline randomly replaces characters with glitch chars (`░▒▓█`), then restores — 300ms flicker

**Right — Terminal Typewriter**
- Monospace, looks like a CLI session
- GSAP types out lines one by one after page load (200ms delay between lines, ~60ms per character):
  ```
  ~/gabriel $
  name    → Gabriel Raymondou
  role    → Fullstack Dev
  location → Cannes, France
  status  → Available ●
  ```
- `status` line color: `#4FFFB0` (green) when `config.available === true`
- Below the terminal: two CTA buttons — `GET IN TOUCH` (filled) and `VIEW WORK ↓` (outline)

### 3. About / Stack

Two-column layout (stacked on mobile):

- **Left**: Short bio paragraph from `config.bio`
- **Right**: Stack grid — `config.stack` items as monospace bordered chips

GSAP ScrollTrigger: section fades + slides up 30px when entering viewport.

### 4. Projects

Section header `// SELECTED WORK` in monospace label style.

**Project card layout** (stacked vertically):
```
┌──────────────────────────┬──────────┐
│ 01 —                     │          │
│ PROJECT TITLE            │  THUMB   │
│ Description text         │  (160px) │
│ [TAG] [TAG] [TAG]  GH ↗  │          │
└──────────────────────────┴──────────┘
```

- Border: `#1E1E1E` default → `rgba(255,255,255,0.5)` on hover (CSS transition)
- Thumbnail: `filter: grayscale(100%) brightness(0.7)` → `grayscale(0%) brightness(1)` on card hover (CSS transition, 350ms ease)
- Links: `GH ↗` and/or `LIVE ↗` shown only if `github`/`url` are defined. If neither exists, nothing renders in that slot.
- Cards scroll-reveal with GSAP stagger (each card animates in 100ms after the previous)

### 5. Contact

Large bold heading: `LET'S BUILD SOMETHING.` (~4rem, tight tracking)

Below: email CTA button (filled white) + social icon links in a row (GitHub, LinkedIn, Twitter from `config.socials`).

### 6. Footer

Single line:
`© 2026 GABRIEL RAYMONDOU` — `DESIGNED & BUILT BY GR`

---

## Animations Summary

| Element | Trigger | Library | Effect |
|---------|---------|---------|--------|
| Terminal typewriter | Page load | GSAP | Characters typed one by one |
| Navbar background | Scroll past hero | GSAP ScrollTrigger | Opacity + border fade in |
| Section reveals | Scroll into view | GSAP ScrollTrigger | Fade + translateY(-30px) |
| Project cards | Scroll into view | GSAP ScrollTrigger | Staggered fade-in |
| ASCII glitch | Hover | GSAP | Random char replacement flicker |
| Thumbnail color | Card hover | CSS transition | grayscale → full color, 350ms |
| Card border | Card hover | CSS transition | Border color, 250ms |

No scroll-jacking. No page-load splash. Animations are additive — the page is fully usable without them (reduced motion respected via `prefers-reduced-motion`).

---

## File Structure

```
/
├── src/
│   ├── pages/
│   │   └── index.astro          # Single page
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro           # ASCII + terminal layout
│   │   ├── About.astro
│   │   ├── Projects.astro       # Maps over projects data
│   │   ├── ProjectCard.astro    # Single card component
│   │   └── Contact.astro
│   ├── data/
│   │   ├── config.ts            # Personal info, socials, stack
│   │   ├── projects.ts          # Project list + Project interface
│   │   └── ascii.txt            # Generated by scripts/ascii-gen.js
│   └── styles/
│       └── global.css           # Tailwind base + custom keyframes
├── public/
│   └── images/
│       ├── portrait.jpg         # Source for ASCII generation
│       └── projects/            # Project thumbnails
├── scripts/
│   └── ascii-gen.js             # Converts portrait.jpg → ascii.txt
├── .github/
│   └── workflows/
│       └── deploy.yml           # Astro build + GitHub Pages deploy
├── astro.config.ts
├── tailwind.config.ts
├── biome.json
└── tsconfig.json
```

---

## Responsiveness

| Breakpoint | Hero | Projects | About |
|-----------|------|----------|-------|
| Mobile (`< 768px`) | ASCII stacked above terminal | Full-width cards, thumbnail hidden | Single column |
| Tablet (`768px`) | Side by side, smaller ASCII | Cards with thumbnail | Two column |
| Desktop (`1024px+`) | Full split, large ASCII | Cards with thumbnail | Two column |

---

## Accessibility

- `prefers-reduced-motion`: all GSAP animations disabled, typewriter shows text instantly
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` for project cards
- `alt` text on all images
- Sufficient color contrast throughout (white on `#0A0A0A` passes WCAG AA)

---

## Verification

1. `astro build` completes with no errors — output in `./dist`
2. `npx serve dist` — verify all sections render correctly locally
3. Lighthouse score: Performance ≥ 95, Accessibility ≥ 95
4. Resize to 375px — hero stacks, thumbnail hides gracefully
5. Hover project cards — B&W thumbnail transitions to color
6. Hover ASCII portrait — glitch effect fires and resolves
7. Push to `main` — GitHub Actions deploys, site live at `raigato.github.io`
8. Add a project to `projects.ts` — card appears without touching any other file
