import type { ExperienceItem } from '../types'

const whatsappNumber = '2348139739813'
const whatsappMessage = 'Hi Prosper, I came across your portfolio and would like to talk about a project.'

export const site = {
  name: 'Prosper Edafe',
  role: 'Software Engineer',
  location: 'Lagos, Nigeria',
  timeZone: 'Africa/Lagos',
  startedYear: 2021,
  email: 'mamusedafe19@gmail.com',
  phoneDisplay: '+234 813 973 9813',
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  github: 'https://github.com/Prosperedafe',
  linkedin: 'https://www.linkedin.com/in/edafe-prosper-b046ba239/',
  resume: '/Prosper-Edafe-resume.pdf',
}

export const socials = [
  { label: 'GitHub', url: site.github },
  { label: 'LinkedIn', url: site.linkedin },
  { label: 'WhatsApp', url: site.whatsapp },
  { label: 'Email', url: `mailto:${site.email}` },
]

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const services = [
  {
    title: 'Web platforms',
    text: 'SaaS dashboards, storefronts and marketing sites that stay fast as they grow. Built with React, Next.js or Vue, typed end to end.',
    tools: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Mobile apps',
    text: 'One codebase for iOS and Android, with the details that make an app feel native: payments, push notifications, offline states.',
    tools: ['React Native', 'Expo', 'Redux Toolkit', 'React Query'],
  },
  {
    title: 'Desktop software',
    text: 'Installable apps for the counter and the back office, with auto-updates and deep links, shipped to the Microsoft Store.',
    tools: ['Electron', 'React', 'RTK Query', 'MUI'],
  },
  {
    title: 'Backend & integrations',
    text: 'The parts users never see: database schemas, auth and access rules, payment webhooks and AI features wired into the product.',
    tools: ['Supabase', 'PostgreSQL', 'Stripe', 'Paystack', 'Claude / OpenAI'],
  },
]

export const stack = [
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'Vue', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'SCSS', 'MUI', 'shadcn/ui', 'GSAP'],
  },
  {
    group: 'Mobile & Desktop',
    items: [
      'React Native',
      'Expo',
      'iOS & Android',
      'Push notifications',
      'In-app payments',
      'Camera, location & voice',
      'Offline queues',
      'EAS builds',
      'Play Store releases',
      'Electron',
    ],
  },
  {
    group: 'State & Data',
    items: ['Redux Toolkit', 'RTK Query', 'React Query', 'REST APIs', 'WebSockets'],
  },
  {
    group: 'Backend & Services',
    items: ['Supabase', 'PostgreSQL', 'Node.js', 'Stripe', 'Paystack', 'Resend'],
  },
  {
    group: 'Workflow',
    items: ['Git & GitHub', 'Vercel', 'Netlify', 'Responsive design', 'Performance tuning'],
  },
]

export const experience: ExperienceItem[] = [
  {
    company: 'Hawkish Group',
    position: 'Software Engineer',
    period: 'March 2026 — Present',
    location: 'Remote',
    description:
      'Building two SaaS products for the UK and Nigerian markets: Bexora, a business operating system for founders, and CleanPro OS, software for cleaning companies. I work across web, mobile, desktop and the Supabase backend.',
    skills: ['Next.js', 'React Native', 'Expo', 'Electron', 'Supabase', 'Stripe', 'Paystack'],
  },
  {
    company: 'Bloomie Inc',
    position: 'Software Engineer',
    period: 'Aug 2025 — Dec 2025',
    location: 'Remote',
    description:
      'Worked on an AI-powered learning platform that connects parents, kids and tutors through live online lessons. I built frontend features for the tutoring experience, including virtual meeting sessions and an AI note-taker that captures each lesson, so tutors and parents can follow every child’s progress.',
    skills: ['React', 'Next.js', 'TypeScript', 'Video meetings', 'AI integration', 'REST APIs'],
  },
  {
    company: 'OyaSync Ltd',
    position: 'Software Engineer',
    period: 'Nov 2024 — May 2025',
    location: 'Lagos, Nigeria',
    description:
      'Built and maintained HBL, an Electron desktop and web app that restaurants, bars, filling stations and retailers use to manage sales, stock and reporting. Also contributed to internal web tools.',
    skills: ['Electron', 'React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'MUI'],
  },
  {
    company: 'Dosh Services',
    position: 'Lead Frontend Engineer',
    period: 'Nov 2022 — Dec 2024',
    location: 'Lagos, Nigeria',
    description:
      'Led frontend work on client products: hospital applications, booking dashboards, a marketplace connecting people with service providers, and the Quilox nightclub app with wallet and QR payments.',
    skills: ['React', 'React Native', 'TypeScript', 'Expo', 'React Query', 'Paystack', 'WebSockets'],
  },
  {
    company: 'The start',
    position: 'Getting into tech',
    period: 'Mid 2021',
    location: 'Nigeria',
    description:
      'Started with the fundamentals of the web and kept building until it turned into a career. I have not stopped since.',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
]
