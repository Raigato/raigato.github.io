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
  },
  {
    number: '03',
    title: 'Project Name',
    description: 'What it does, for whom, and the core problem it solves.',
    tags: ['Python', 'FastAPI', 'Docker'],
    thumbnail: '/images/projects/project-03.jpg',
  },
]
