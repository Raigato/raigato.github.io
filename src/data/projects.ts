// src/data/projects.ts

export interface Project {
  number: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string; // path relative to /public — e.g. '/images/projects/foo.jpg'
  url?: string; // live URL — omit if none
  github?: string; // GitHub URL — omit if none
}

export const projects: Project[] = [
  {
    number: "01",
    title: "Studiz App",
    description:
      "A free iOS app to help students learn with a gamified approach. Create and share quizzes to learn faster and more efficiently.",
    tags: ["Swift", "Firebase", "AWS API"],
    thumbnail: "/images/projects/studiz.jpg",
    url: "https://mystudiz.com/",
    github: "https://github.com/Raigato/myStudizApp",
  },
  {
    number: "02",
    title: "Fliit Bot",
    description:
      "A chatbot for Facebook Messenger that lets you book your whole trip — flights to hotels — by finding the best available offers.",
    tags: ["Chatfuel", "Kiwi API", "DialogFlow"],
    thumbnail: "/images/projects/fliitbot.jpg",
    url: "https://vimeo.com/312108400",
  },
  {
    number: "03",
    title: "HeroGrowth",
    description:
      "Website for a social media management agency. Achieved an 80+ mobile PageSpeed Insights score at launch.",
    tags: ["Sass", "WordPress", "Bootstrap"],
    thumbnail: "/images/projects/herogrowth.jpg",
    url: "https://herogrowth.co/",
    github: "https://github.com/Raigato/herogrowth.co",
  },
];
