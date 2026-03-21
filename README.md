# Raigato — Portfolio

Personal portfolio site for Raigato, Fullstack Developer.

Built with Astro, Tailwind CSS v4, and GSAP. Deployed to GitHub Pages.

## Stack

- [Astro](https://astro.build) — static site framework
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- [GSAP](https://gsap.com) — animations (terminal typewriter, ASCII reveal)
- [Biome](https://biomejs.dev) — linting and formatting
- [PostHog](https://posthog.com) — cookieless analytics

## Project Structure

```
src/
├── components/   # Astro components (Hero, About, Projects, Experience, Contact, …)
├── data/         # Config, projects, and experience data
├── pages/        # index.astro
└── styles/       # global.css
public/           # Static assets
```

## Commands

All commands are run from the root of the project:

| Command           | Action                                   |
| :---------------- | :--------------------------------------- |
| `pnpm install`    | Install dependencies                     |
| `pnpm dev`        | Start local dev server at localhost:4321 |
| `pnpm build`      | Build production site to ./dist/         |
| `pnpm preview`    | Preview the production build locally     |
| `pnpm check`      | Lint, format, and type-check             |

## Development

Pre-commit hooks (Husky) run Biome checks automatically on staged files.
