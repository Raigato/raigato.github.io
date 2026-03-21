# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bold, experimental one-page portfolio for Gabriel Raymondou — dark/monochrome aesthetic, ASCII+terminal hero, GSAP animations, deployed to GitHub Pages via Astro static export.

**Architecture:** Single Astro page (`src/pages/index.astro`) composed of focused component files. All personal content lives in two typed data files (`config.ts`, `projects.ts`) — nothing else needs editing to add a project or update personal info. GSAP runs in Astro `<script>` tags (no framework runtime).

**Tech Stack:** Astro 5 (static), TypeScript (strict), Tailwind CSS v4, GSAP + ScrollTrigger, Biome, sharp (ASCII generation), GitHub Actions (deploy)

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/pages/index.astro` | Page shell — imports and composes all sections |
| `src/components/Navbar.astro` | Sticky nav, scroll-triggered background |
| `src/components/Hero.astro` | Two-column: ASCII portrait + terminal typewriter |
| `src/components/About.astro` | Bio + stack grid, scroll reveal |
| `src/components/Projects.astro` | Section header + maps ProjectCard per project |
| `src/components/ProjectCard.astro` | Single project card — thumbnail, meta, optional links |
| `src/components/Contact.astro` | Large heading + email CTA + social links |
| `src/components/Footer.astro` | One-line footer |
| `src/data/config.ts` | Name, role, bio, email, socials, stack, available flag |
| `src/data/projects.ts` | Project interface + projects array |
| `src/data/ascii.txt` | Generated ASCII art (output of scripts/ascii-gen.js) |
| `src/styles/global.css` | Tailwind imports + CSS custom properties + keyframes |
| `scripts/ascii-gen.js` | Node script: portrait.jpg → ascii.txt via sharp |
| `public/images/portrait.jpg` | Source photo for ASCII generation |
| `public/images/projects/` | Project thumbnail images |
| `astro.config.ts` | output: static, site URL, base path for GitHub Pages |
| `tailwind.config.ts` | Theme extensions (font stacks, custom colors) |
| `biome.json` | Linting + formatting config |
| `.github/workflows/deploy.yml` | Build + deploy to GitHub Pages on push to main |

---

## Task 1: Scaffold Astro Project

**Files:**
- Create: `astro.config.ts`
- Create: `tailwind.config.ts`
- Create: `biome.json`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create the Astro project**

```bash
cd /Users/gabrielraymondou/Downloads/v2
npm create astro@latest . -- --template minimal --typescript strict --no-git --install
```

Expected: Astro project scaffolded with `src/pages/index.astro`, `package.json`, `tsconfig.json`.

- [ ] **Step 2: Add Tailwind, GSAP, and Biome**

```bash
npx astro add tailwind --yes
npm install gsap
npm install --save-dev @biomejs/biome sharp
```

- [ ] **Step 3: Configure Astro for static GitHub Pages output**

Replace `astro.config.ts` with:

```ts
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  output: 'static',
  site: 'https://raigato.github.io',
  integrations: [tailwind()],
})
```

- [ ] **Step 4: Configure Biome**

Create `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  }
}
```

- [ ] **Step 5: Set up global CSS**

Replace `src/styles/global.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0a0a0a;
  --fg: #ffffff;
  --fg-muted: rgba(255, 255, 255, 0.4);
  --border: #1e1e1e;
  --accent-red: #ff0044;
  --accent-cyan: #00ffee;
  --accent-green: #4fffb0;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

- [ ] **Step 6: Verify the scaffold builds**

```bash
npm run build
```

Expected: `dist/` directory created, no errors.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Astro project with Tailwind, GSAP, Biome"
```

---

## Task 2: Data Layer

**Files:**
- Create: `src/data/config.ts`
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create config.ts**

```ts
// src/data/config.ts

export const config = {
  name: 'Gabriel Raymondou',
  role: 'Fullstack Developer',
  location: 'Cannes, France',
  bio: 'Freelance fullstack developer based in Cannes. I build exceptional websites, web applications, and custom growth tools for ambitious teams.',
  email: 'hello@gabrielraymondou.com', // update with real email
  available: true,
  stack: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Docker',
  ],
  socials: {
    github: 'https://github.com/raigato',
    linkedin: 'https://linkedin.com/in/gabriel-raymondou', // update
    twitter: 'https://twitter.com/raigato', // update
  },
} as const
```

- [ ] **Step 2: Create projects.ts with interface**

```ts
// src/data/projects.ts

export interface Project {
  number: string
  title: string
  description: string
  tags: string[]
  thumbnail: string    // path relative to /public — e.g. '/images/projects/foo.jpg'
  url?: string         // live URL — omit if none
  github?: string      // GitHub URL — omit if none
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Project Name',
    description: 'What it does, for whom, and the core problem it solves.',
    tags: ['React', 'Node', 'PostgreSQL'],
    thumbnail: '/images/projects/project-01.jpg',
    url: 'https://example.com',
    github: 'https://github.com/raigato/project-01',
  },
  {
    number: '02',
    title: 'Project Name',
    description: 'What it does, for whom, and the core problem it solves.',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    thumbnail: '/images/projects/project-02.jpg',
    github: 'https://github.com/raigato/project-02',
    // no url — private or unreleased
  },
  {
    number: '03',
    title: 'Project Name',
    description: 'What it does, for whom, and the core problem it solves.',
    tags: ['Python', 'FastAPI', 'Docker'],
    thumbnail: '/images/projects/project-03.jpg',
    // no url, no github — private
  },
]
```

- [ ] **Step 3: Verify TypeScript types**

```bash
npx astro check
```

Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add typed data files for config and projects"
```

---

## Task 3: ASCII Generation Script

**Files:**
- Create: `scripts/ascii-gen.js`
- Create: `public/images/portrait.jpg` (manually — user provides their photo)

- [ ] **Step 1: Add portrait photo**

Place your portrait photo at `public/images/portrait.jpg`. Square or portrait crop works best. Minimum 400×400px.

- [ ] **Step 2: Create the ASCII generation script**

```js
// scripts/ascii-gen.js
import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const CHAR_WIDTH = 80
const CHAR_HEIGHT_RATIO = 0.45  // monospace chars are taller than wide
const CHARS = ' ░▒▓█'           // dark → light

async function generateAscii() {
  const inputPath = resolve(__dirname, '../public/images/portrait.jpg')
  const outputPath = resolve(__dirname, '../src/data/ascii.txt')

  const height = Math.round(CHAR_WIDTH * CHAR_HEIGHT_RATIO)

  const { data, info } = await sharp(inputPath)
    .resize(CHAR_WIDTH, height)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const rows = []
  for (let y = 0; y < info.height; y++) {
    let row = ''
    for (let x = 0; x < info.width; x++) {
      const pixel = data[y * info.width + x]
      const charIndex = Math.floor((pixel / 255) * (CHARS.length - 1))
      row += CHARS[charIndex]
    }
    rows.push(row)
  }

  writeFileSync(outputPath, rows.join('\n'), 'utf-8')
  console.log(`ASCII art written to ${outputPath} (${info.width}×${info.height} chars)`)
}

generateAscii().catch(console.error)
```

- [ ] **Step 3: Add `type: module` to package.json and add generate script**

In `package.json`, add to `"scripts"`:
```json
"generate:ascii": "node scripts/ascii-gen.js"
```

And ensure `"type": "module"` is set at the top level.

- [ ] **Step 4: Run the script**

```bash
npm run generate:ascii
```

Expected: `src/data/ascii.txt` created with 36 lines of ASCII art (80 chars wide).

- [ ] **Step 5: Commit**

```bash
git add scripts/ src/data/ascii.txt public/images/portrait.jpg
git commit -m "feat: ASCII art generation script + portrait"
```

---

## Task 4: Page Shell and Navbar

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/Navbar.astro`

- [ ] **Step 1: Write the page shell**

Replace `src/pages/index.astro`:

```astro
---
import '../styles/global.css'
import Navbar from '../components/Navbar.astro'
import Hero from '../components/Hero.astro'
import About from '../components/About.astro'
import Projects from '../components/Projects.astro'
import Contact from '../components/Contact.astro'
import Footer from '../components/Footer.astro'
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Gabriel Raymondou — Freelance Fullstack Developer, Cannes" />
    <title>Gabriel Raymondou</title>
  </head>
  <body>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Create Navbar component**

Create `src/components/Navbar.astro`:

```astro
---
import { config } from '../data/config'
---

<nav
  id="navbar"
  class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300"
  style="background: transparent;"
>
  <span class="font-mono text-sm tracking-widest text-white/60">G.R —</span>
  <a
    href="#contact"
    class="font-mono text-xs tracking-widest border border-white/20 px-3 py-1.5 text-white/80 hover:border-white hover:text-white transition-all duration-200"
  >
    CONTACT ↓
  </a>
</nav>

<script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)

  const navbar = document.getElementById('navbar')

  ScrollTrigger.create({
    start: 'top -80px',
    onEnter: () => {
      gsap.to(navbar, {
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        borderBottom: '1px solid #1e1e1e',
        duration: 0.3,
      })
    },
    onLeaveBack: () => {
      gsap.to(navbar, {
        backgroundColor: 'transparent',
        borderBottom: 'none',
        duration: 0.3,
      })
    },
  })
</script>
```

- [ ] **Step 3: Run dev server and verify navbar renders**

```bash
npm run dev
```

Open http://localhost:4321 — verify navbar is visible with correct text, no console errors.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/components/Navbar.astro
git commit -m "feat: page shell and sticky navbar with scroll trigger"
```

---

## Task 5: Hero — ASCII Portrait + Terminal Typewriter

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.astro`:

```astro
---
import { config } from '../data/config'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const ascii = readFileSync(resolve('src/data/ascii.txt'), 'utf-8')
---

<section
  id="hero"
  class="min-h-screen flex items-center px-6 pt-20 pb-12"
>
  <div class="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    <!-- ASCII Portrait -->
    <div class="ascii-wrap group cursor-default select-none">
      <pre
        id="ascii-art"
        class="font-mono text-[5px] leading-tight text-white/70 whitespace-pre overflow-hidden"
        aria-label="ASCII portrait of Gabriel Raymondou"
      >{ascii}</pre>
      <p class="font-mono text-[10px] text-white/20 mt-2 tracking-widest">[ HOVER ]</p>
    </div>

    <!-- Terminal Typewriter -->
    <div class="terminal font-mono">
      <p class="text-white/30 text-sm mb-4">~/gabriel $</p>
      <div id="terminal-lines" class="space-y-1 text-sm">
        <!-- Lines injected by GSAP -->
      </div>
      <div id="terminal-ctas" class="mt-8 flex gap-3 opacity-0">
        <a
          href="#contact"
          class="font-mono text-xs bg-white text-black px-4 py-2 font-bold tracking-widest hover:bg-white/90 transition-colors"
        >
          GET IN TOUCH
        </a>
        <a
          href="#work"
          class="font-mono text-xs border border-white/30 text-white/70 px-4 py-2 tracking-widest hover:border-white hover:text-white transition-all"
        >
          VIEW WORK ↓
        </a>
      </div>
    </div>

  </div>
</section>

<script>
  import { gsap } from 'gsap'

  // — Terminal typewriter —
  const terminalLines = document.getElementById('terminal-lines')!
  const terminalCtas = document.getElementById('terminal-ctas')!

  const lines = [
    { key: 'name',     val: 'Gabriel Raymondou',  color: '' },
    { key: 'role',     val: 'Fullstack Dev',       color: '' },
    { key: 'location', val: 'Cannes, France',      color: '' },
    { key: 'status',   val: 'Available ●',         color: 'var(--accent-green)' },
  ]

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const tl = gsap.timeline({ delay: reducedMotion ? 0 : 0.4 })

  for (const line of lines) {
    const el = document.createElement('div')
    el.innerHTML = `<span class="text-white/40">${line.key}</span> → <span style="color:${line.color || 'inherit'}">${line.val}</span><span class="cursor" style="animation: blink 1s infinite; opacity:1">_</span>`
    terminalLines.appendChild(el)

    const valSpan = el.querySelectorAll('span')[1] as HTMLElement
    const cursor = el.querySelector('.cursor') as HTMLElement
    const fullText = line.val

    if (reducedMotion) {
      // Show all text instantly — no typewriter
      valSpan.textContent = fullText
      cursor.style.display = 'none'
    } else {
      valSpan.textContent = ''
      tl.add(() => {
        let i = 0
        const interval = setInterval(() => {
          valSpan.textContent = fullText.slice(0, ++i)
          if (i >= fullText.length) {
            clearInterval(interval)
            cursor.style.display = 'none'
          }
        }, 60)
      }).addPause(`+=${fullText.length * 0.06 + 0.2}`)
    }
  }

  tl.to(terminalCtas, { opacity: 1, y: 0, duration: reducedMotion ? 0 : 0.4, ease: 'power2.out' })

  // — ASCII glitch on hover —
  const asciiEl = document.getElementById('ascii-art')!
  const originalAscii = asciiEl.textContent ?? ''
  const glitchChars = '░▒▓█▄▀■□▪▫'
  let glitchInterval: ReturnType<typeof setInterval> | null = null

  asciiEl.addEventListener('mouseenter', () => {
    let ticks = 0
    glitchInterval = setInterval(() => {
      if (ticks++ > 5) {
        clearInterval(glitchInterval!)
        asciiEl.textContent = originalAscii
        return
      }
      asciiEl.textContent = originalAscii
        .split('')
        .map((ch) =>
          ch !== '\n' && Math.random() < 0.04
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : ch,
        )
        .join('')
    }, 50)
  })

  asciiEl.addEventListener('mouseleave', () => {
    if (glitchInterval) clearInterval(glitchInterval)
    asciiEl.textContent = originalAscii
  })
</script>
```

- [ ] **Step 2: Verify hero in dev server**

```bash
npm run dev
```

Open http://localhost:4321 — verify:
- ASCII art renders in left column on desktop
- Terminal lines typewrite on load
- "Available ●" is green
- CTAs appear after typing completes
- Hovering ASCII triggers glitch flicker

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: No errors. Check `dist/index.html` includes the ASCII art.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: hero section with ASCII portrait and terminal typewriter"
```

---

## Task 6: About Section

**Files:**
- Create: `src/components/About.astro`

- [ ] **Step 1: Create About component**

Create `src/components/About.astro`:

```astro
---
import { config } from '../data/config'
---

<section id="about" class="py-24 px-6 border-t border-[#1e1e1e]">
  <div class="max-w-6xl mx-auto">

    <!-- Section label -->
    <div class="flex justify-between items-center mb-12 font-mono text-xs text-white/25 tracking-widest">
      <span>// ABOUT</span>
      <span>02 / 04</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- Bio -->
      <div>
        <p class="font-mono text-xs text-white/35 tracking-[3px] uppercase mb-4">Bio</p>
        <p class="text-white/70 leading-relaxed text-sm">{config.bio}</p>
      </div>

      <!-- Stack -->
      <div>
        <p class="font-mono text-xs text-white/35 tracking-[3px] uppercase mb-4">Stack</p>
        <div class="grid grid-cols-2 gap-2">
          {config.stack.map((item) => (
            <span class="font-mono text-xs border border-[#242424] text-white/50 px-3 py-1.5 tracking-wider">
              {item}
            </span>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>

<script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('#about', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 85%',
    },
  })
</script>
```

- [ ] **Step 2: Verify in dev server**

Scroll past the hero — About section fades in with stack chips. No layout overflow on mobile (resize to 375px).

- [ ] **Step 3: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: about section with bio and stack grid"
```

---

## Task 7: ProjectCard Component

**Files:**
- Create: `src/components/ProjectCard.astro`

- [ ] **Step 1: Create ProjectCard component**

Create `src/components/ProjectCard.astro`:

```astro
---
import type { Project } from '../data/projects'

interface Props {
  project: Project
}

const { project } = Astro.props
const hasLinks = project.url || project.github
---

<article class="project-card group border border-[#1e1e1e] grid grid-cols-[1fr_160px] hover:border-white/50 transition-colors duration-250 cursor-default">

  <!-- Left: meta -->
  <div class="p-5 flex flex-col justify-between">
    <div>
      <p class="font-mono text-[10px] text-white/25 mb-1">{project.number} —</p>
      <h3 class="font-mono font-bold text-base text-white mb-2 tracking-tight">{project.title}</h3>
      <p class="text-xs text-white/40 leading-relaxed">{project.description}</p>
    </div>
    <div class="flex items-end justify-between mt-4">
      <div class="flex gap-2 flex-wrap">
        {project.tags.map((tag) => (
          <span class="font-mono text-[10px] border border-[#242424] text-white/35 px-2 py-0.5 tracking-wider uppercase">
            {tag}
          </span>
        ))}
      </div>
      {hasLinks && (
        <div class="flex gap-3 shrink-0 ml-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-[11px] text-white/20 group-hover:text-white/70 transition-colors duration-200 hover:text-white"
            >
              GH ↗
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-[11px] text-white/20 group-hover:text-white/70 transition-colors duration-200 hover:text-white"
            >
              LIVE ↗
            </a>
          )}
        </div>
      )}
    </div>
  </div>

  <!-- Right: thumbnail -->
  <div class="border-l border-[#1e1e1e] group-hover:border-white/50 transition-colors duration-250 overflow-hidden">
    <img
      src={project.thumbnail}
      alt={`Screenshot of ${project.title}`}
      class="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-350"
      loading="lazy"
    />
  </div>

</article>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "feat: ProjectCard component with B&W thumbnail hover effect"
```

---

## Task 8: Projects Section

**Files:**
- Create: `src/components/Projects.astro`
- Add: `public/images/projects/*.jpg` (placeholder thumbnails)

- [ ] **Step 1: Add placeholder thumbnail images**

Create 3 small placeholder images in `public/images/projects/`. Any 400×250px JPG will do — they'll be replaced with real screenshots later. Name them `project-01.jpg`, `project-02.jpg`, `project-03.jpg`.

You can generate simple ones:
```bash
# Using ImageMagick if available, or manually create/download placeholders
convert -size 400x250 xc:#1a1a1a public/images/projects/project-01.jpg
convert -size 400x250 xc:#111118 public/images/projects/project-02.jpg
convert -size 400x250 xc:#180f0f public/images/projects/project-03.jpg
```

- [ ] **Step 2: Create Projects component**

Create `src/components/Projects.astro`:

```astro
---
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard.astro'
---

<section id="work" class="py-24 px-6 border-t border-[#1e1e1e]">
  <div class="max-w-6xl mx-auto">

    <!-- Section label -->
    <div class="flex justify-between items-center mb-12 font-mono text-xs text-white/25 tracking-widest">
      <span>// SELECTED WORK</span>
      <span>03 / 04</span>
    </div>

    <div id="project-list" class="flex flex-col gap-4">
      {projects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </div>

  </div>
</section>

<script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('#project-list .project-card', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#project-list',
      start: 'top 85%',
    },
  })
</script>
```

- [ ] **Step 3: Verify in dev server**

Scroll to projects section — three cards render with thumbnails. Hover a card: thumbnail goes to full color, border highlights. Links appear only on cards that have them.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.astro src/components/ProjectCard.astro public/images/projects/
git commit -m "feat: projects section with staggered reveal and thumbnail cards"
```

---

## Task 9: Contact and Footer

**Files:**
- Create: `src/components/Contact.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Contact component**

Create `src/components/Contact.astro`:

```astro
---
import { config } from '../data/config'
---

<section id="contact" class="py-24 px-6 border-t border-[#1e1e1e]">
  <div class="max-w-6xl mx-auto">

    <!-- Section label -->
    <div class="flex justify-between items-center mb-12 font-mono text-xs text-white/25 tracking-widest">
      <span>// CONTACT</span>
      <span>04 / 04</span>
    </div>

    <h2 class="text-5xl md:text-7xl font-black tracking-tight leading-none text-white mb-12" style="font-family: 'Arial Black', sans-serif;">
      LET'S<br />BUILD<br /><span class="text-white/15">SOMETHING.</span>
    </h2>

    <div class="flex flex-wrap gap-3">
      <a
        href={`mailto:${config.email}`}
        class="font-mono text-xs bg-white text-black px-5 py-3 font-bold tracking-widest hover:bg-white/90 transition-colors"
      >
        {config.email} ↗
      </a>
      {config.socials.github && (
        <a
          href={config.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs border border-[#333] text-white/50 px-5 py-3 tracking-widest hover:border-white hover:text-white transition-all"
        >
          GITHUB
        </a>
      )}
      {config.socials.linkedin && (
        <a
          href={config.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs border border-[#333] text-white/50 px-5 py-3 tracking-widest hover:border-white hover:text-white transition-all"
        >
          LINKEDIN
        </a>
      )}
      {config.socials.twitter && (
        <a
          href={config.socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs border border-[#333] text-white/50 px-5 py-3 tracking-widest hover:border-white hover:text-white transition-all"
        >
          TWITTER
        </a>
      )}
    </div>

  </div>
</section>

<script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('#contact h2', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%',
    },
  })
</script>
```

- [ ] **Step 2: Create Footer component**

Create `src/components/Footer.astro`:

```astro
---
const year = new Date().getFullYear()
---

<footer class="border-t border-[#1a1a1a] px-6 py-4 flex justify-between items-center">
  <span class="font-mono text-[10px] text-white/20 tracking-widest">© {year} GABRIEL RAYMONDOU</span>
  <span class="font-mono text-[10px] text-white/20 tracking-widest">DESIGNED & BUILT BY GR</span>
</footer>
```

- [ ] **Step 3: Verify full page in dev server**

Scroll through the entire page top to bottom:
- Navbar visible and functional
- Hero: ASCII + terminal typewriter
- About: bio + stack
- Projects: 3 cards with hover effects
- Contact: large heading + email + social links
- Footer: one line

- [ ] **Step 4: Verify build**

```bash
npm run build && npx serve dist
```

Open http://localhost:3000 — full page works from static output.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.astro src/components/Footer.astro
git commit -m "feat: contact section and footer"
```

---

## Task 10: Mobile Responsiveness

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/components/ProjectCard.astro`

- [ ] **Step 1: Fix Hero mobile layout**

In `Hero.astro`, the grid is already `grid-cols-1 md:grid-cols-2`. Verify on mobile (375px):
- ASCII art should be hidden on mobile (it's hard to read at small sizes)
- Terminal takes full width

Add `hidden md:block` to the ASCII wrap div:

```astro
<div class="ascii-wrap group cursor-default select-none hidden md:block">
```

- [ ] **Step 2: Fix ProjectCard mobile layout**

On mobile, the right-side thumbnail should be hidden (card is too narrow). In `ProjectCard.astro`, add `hidden md:block` to the thumbnail column:

```astro
<div class="border-l border-[#1e1e1e] group-hover:border-white/50 transition-colors duration-250 overflow-hidden hidden md:block">
```

Also change card grid to single column on mobile:

```astro
<article class="project-card group border border-[#1e1e1e] grid grid-cols-1 md:grid-cols-[1fr_160px] hover:border-white/50 transition-colors duration-250 cursor-default">
```

- [ ] **Step 3: Test at common breakpoints**

In Chrome DevTools, test at:
- 375px (iPhone SE) — hero terminal full width, project cards single column
- 768px (tablet) — hero splits, project thumbnails visible
- 1280px (desktop) — full layout

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/components/ProjectCard.astro
git commit -m "fix: responsive layout for hero and project cards"
```

---

## Task 11: GitHub Actions Deploy

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `.gitignore`

- [ ] **Step 1: Create .gitignore**

Create `.gitignore`:

```
node_modules/
dist/
.astro/
.env
.env.*
!.env.example
.DS_Store
.superpowers/
.obsidian/
```

- [ ] **Step 2: Create deploy workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - name: Generate ASCII art
        run: npm run generate:ascii

      - name: Build
        run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

- [ ] **Step 3: Enable GitHub Pages in repo settings**

In the GitHub repo settings → Pages → Source: select **GitHub Actions**.

- [ ] **Step 4: Push to main**

```bash
git add .github/ .gitignore
git commit -m "ci: GitHub Actions deploy to GitHub Pages"
git remote add origin https://github.com/raigato/raigato.github.io.git  # update if different
git push -u origin main
```

- [ ] **Step 5: Verify deploy**

Watch the Actions tab in GitHub. After the workflow completes (~2 min), open https://raigato.github.io — full site should be live.

---

## Task 12: Biome Lint + Final Polish

**Files:**
- All `src/` files

- [ ] **Step 1: Run Biome across all source files**

```bash
npx biome check src/ --apply
```

Expected: Formats all files, fixes auto-fixable lint issues.

- [ ] **Step 2: Run Astro type check**

```bash
npx astro check
```

Expected: No type errors.

- [ ] **Step 3: Run a final Lighthouse audit**

In Chrome DevTools → Lighthouse → run on https://raigato.github.io:
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 90

Fix any flagged issues (most common: missing `lang` on `<html>`, contrast ratio, image dimensions).

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: Biome lint pass and final polish"
git push
```

---

## Adding a New Project (Post-Launch)

1. Add thumbnail image to `public/images/projects/`
2. Add one object to the `projects` array in `src/data/projects.ts`
3. Push to `main` — GitHub Actions deploys automatically

That's it. No other files to touch.
