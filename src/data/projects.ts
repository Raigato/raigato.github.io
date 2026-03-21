// src/data/projects.ts

export interface Project {
  number: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string; // path relative to /public — e.g. '/images/projects/foo.jpg'
  alt: string; // descriptive alt text for the thumbnail image
  url?: string; // live URL — omit if none
  github?: string; // GitHub URL — omit if none
}

export const projects: Project[] = [
  {
    number: "01",
    title: "Growth Engineering Platform",
    description:
      "Built from scratch at Swile: a global platform to modernize marketing operations and dramatically increase team velocity. Powers acquisition campaigns, landing pages, and growth experiments at scale.",
    tags: ["Next.js", "Vercel", "AI Agents"],
    thumbnail: "/images/projects/swile.jpg",
    alt: "Screenshot of Growth Engineering Platform dashboard at Swile",
    url: "https://swile.co",
  },
  {
    number: "02",
    title: "Casinoël by Swile",
    description:
      "A holiday-season interactive web experience for Swile: a roulette game where every player wins a gift. Implemented end-to-end from random generation logic to full animated frontend.",
    tags: ["Next.js", "CSS Animations", "Express"],
    thumbnail: "/images/projects/casinoel.jpg",
    alt: "Screenshot of Casinoël holiday roulette game by Swile",
    url: "https://www.behance.net/gallery/133286405/Casinoel-by-Swile",
  },
  {
    number: "03",
    title: "La Route des Golfs",
    description:
      "A marketplace to sell golf experiences across French destinations — built from scratch. Covers tee times, stays, and curated itineraries for golf tourism in France.",
    tags: ["Next.js", "Laravel", "PostgreSQL"],
    thumbnail: "/images/projects/laroutedesgolfs.jpg",
    alt: "Screenshot of La Route des Golfs golf experience marketplace",
    url: "https://www.explorenicecotedazur.com/blog-pro-actualite/nice-cote-dazur-sur-la-route-des-golfs/",
  },
  {
    number: "04",
    title: "Studiz App",
    description:
      "A free iOS app to help students learn with a gamified approach. Create and share quizzes to learn faster and more efficiently.",
    tags: ["Swift", "Firebase", "AWS API"],
    thumbnail: "/images/projects/studiz.jpg",
    alt: "Screenshot of Studiz gamified quiz app for students",
    url: "https://mystudiz.com/",
    github: "https://github.com/Raigato/myStudizApp",
  },
];
