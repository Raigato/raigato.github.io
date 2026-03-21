export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    title: "IP Support Consultant",
    company: "Questel",
    period: "2018 — 2019",
    description:
      "Provided technical and functional support for Questel's IP software suite. Advised clients on patent search, analytics, and portfolio management workflows.",
  },
  {
    title: "Co-Founder",
    company: "Hero-Com",
    period: "Sept 2019 — Dec 2019",
    description:
      "Built and launched an e-commerce startup. Learned Facebook/Google Ads, conversion optimisation, and supply-chain logistics. Shut down after four months due to unsustainable burn rate.",
  },
  {
    title: "Co-Founder",
    company: "HeroGrowth",
    period: "2020 — 2021",
    description:
      "Co-founded a social media management agency. Handled content strategy, paid social campaigns, and client reporting for SME clients across France.",
  },
  {
    title: "Founder",
    company: "Fliitbot",
    period: "2018",
    description:
      "Designed and shipped a Facebook Messenger chatbot for booking flights and hotels end-to-end, integrating Kiwi.com and DialogFlow APIs.",
  },
  {
    title: "Founder",
    company: "Studiz App",
    period: "2017 — 2018",
    description:
      "Built and published a gamified iOS quiz app for students. Users create and share quizzes. Integrated Firebase for real-time data and AWS for asset delivery.",
  },
];
