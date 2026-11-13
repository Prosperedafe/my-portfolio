import type { Project } from '../types'

import bexoraDashboard from '../assets/projects/bexora-dashboard.webp'
import bexoraComms from '../assets/projects/bexora-comms.webp'
import bexoraAnalytics from '../assets/projects/bexora-analytics.webp'
import bexoraLanding from '../assets/projects/bexora-landing.webp'
import bexoraMobile1 from '../assets/projects/bexora-mobile-1.webp'
import bexoraMobile2 from '../assets/projects/bexora-mobile-2.webp'
import cleanproOverview from '../assets/projects/cleanpro-overview.webp'
import cleanproDispatch from '../assets/projects/cleanpro-dispatch.webp'
import cleanproMobile from '../assets/projects/cleanpro-mobile.webp'
import cleanproLanding from '../assets/projects/cleanpro-landing.webp'
import styleHome from '../assets/projects/style-synchrony-home.webp'
import styleStory from '../assets/projects/style-synchrony-story.webp'
import quilox from '../assets/projects/quilox.webp'
import hbl from '../assets/projects/oyasync-hbl.webp'
import playsafari from '../assets/projects/playsafari.webp'

export const projects: Project[] = [
  {
    slug: 'bexora',
    title: 'Bexora',
    tagline: 'An AI business operating system for founders and growing teams.',
    category: 'SaaS Platform',
    platforms: ['Web', 'Mobile', 'Desktop'],
    year: '2026',
    role: 'Software Engineer',
    client: 'Hawkish Group',
    tint: '#FD5A5F',
    featured: true,
    cover: {
      src: bexoraDashboard,
      alt: 'Bexora dashboard showing the welcome panel, getting-started steps and organisation stats',
    },
    overview: [
      'Bexora replaces the pile of disconnected tools a young company usually runs on. Company formation, team chat, CRM, project and case management, invoicing, a services marketplace and an AI assistant all live in one workspace, and it ships on the web, on phones and as a desktop app.',
      'I work on Bexora with a small engineering team at Hawkish Group. Most of my time goes into the Next.js web app, with regular work in the Expo mobile app, the Supabase database and Bexora Fleet, a sister product for transport and haulage operators.',
    ],
    highlights: [
      {
        title: 'The core web app',
        text: 'Dashboards, cases and workstreams with a drag-and-drop Kanban board, a CRM pipeline, documents and workspace settings, built on the Next.js App Router with TypeScript and Tailwind CSS.',
      },
      {
        title: 'Real-time team comms',
        text: 'Channels, direct messages, mentions and presence powered by Supabase Realtime, so a team can talk where the work already is.',
      },
      {
        title: 'Payments in two currencies',
        text: 'Subscription billing and checkout through Stripe for pounds and Paystack for naira, with webhooks keeping plans and invoices in sync.',
      },
      {
        title: 'Khalvo AI assistant',
        text: 'A built-in business assistant that runs on Claude and GPT-4o and answers in the context of the workspace it is opened in.',
      },
      {
        title: 'The Bexora mobile app',
        text: 'A full React Native and Expo app for iOS and Android that matches the web product: comms with read receipts and mentions, the CRM pipeline, meetings, voice-dictated notes with AI clean-up, a document vault that uploads straight from the phone, digital ID cards with camera capture and QR codes, billing and push notifications.',
      },
      {
        title: 'Desktop app',
        text: 'An Electron desktop app for Windows, macOS and Linux with deep links and automatic updates.',
      },
      {
        title: 'Data and access control',
        text: 'Postgres schema migrations, row-level security policies for eight user roles, edge functions and transactional email.',
      },
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Stripe',
      'Paystack',
      'React Native',
      'Expo',
      'Electron',
      'Claude + GPT-4o',
    ],
    gallery: [
      { src: bexoraComms, alt: 'Bexora team comms with channels, direct messages and member list' },
      { src: bexoraMobile1, alt: 'Bexora mobile app home dashboard', portrait: true },
      { src: bexoraMobile2, alt: 'Bexora mobile app project management screen', portrait: true },
      { src: bexoraAnalytics, alt: 'Bexora analytics view' },
      { src: bexoraLanding, alt: 'Bexora marketing site hero' },
    ],
    link: { label: 'bexoraos.com', url: 'https://www.bexoraos.com' },
  },
  {
    slug: 'cleanpro-os',
    title: 'CleanPro OS',
    tagline: 'AI-powered software that runs UK cleaning businesses end to end.',
    category: 'B2B SaaS',
    platforms: ['Web', 'Mobile'],
    year: '2026',
    role: 'Software Engineer',
    client: 'Hawkish Group',
    tint: '#2BBDB5',
    featured: true,
    cover: {
      src: cleanproOverview,
      alt: 'CleanPro OS owner dashboard with revenue, jobs, utilisation and churn-risk cards',
    },
    overview: [
      'CleanPro OS gives a cleaning company one place to run the whole operation: scheduling and dispatch, customers, staff and HR, payroll, quotes, invoicing and reporting. Owners work from a data-dense web dashboard, and their customers book through a mobile app.',
      'I built across the whole product: the owner dashboard, the customer and cleaner mobile app, the internal admin console, the marketing site and the Supabase backend that ties them together.',
    ],
    highlights: [
      {
        title: 'Owner dashboard',
        text: 'Live KPI cards for recurring revenue, jobs, utilisation and churn risk, with revenue charts and CSV export on every table. Built with React, Tailwind and shadcn/ui.',
      },
      {
        title: 'SmartDispatch',
        text: 'A job board where the AI recommends the best cleaner for each booking with a match score and its reasons, and the owner assigns in one click.',
      },
      {
        title: 'Staff, HR and payroll',
        text: 'Leave, hiring pipeline, training records, document compliance and UK payroll covering PAYE, National Insurance and pension.',
      },
      {
        title: 'The CleanPro mobile app',
        text: 'A React Native and Expo app for iOS and Android where customers pick a location, service and time, track bookings, rate completed jobs and receive push notifications.',
      },
      {
        title: 'Admin console',
        text: 'A redesigned internal console for onboarding businesses, checking documents, and managing notifications, earnings and invoices.',
      },
      {
        title: 'Multi-tenant backend',
        text: 'A Postgres schema scoped per business, with migrations, edge functions and a shared query layer used by every app.',
      },
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'shadcn/ui',
      'Recharts',
      'React Native',
      'Expo',
      'Supabase',
      'PostgreSQL',
      'Stripe',
    ],
    gallery: [
      { src: cleanproDispatch, alt: 'SmartDispatch screen with AI cleaner recommendations and the live job board' },
      { src: cleanproMobile, alt: 'CleanPro mobile app, book a service screen', portrait: true },
      { src: cleanproLanding, alt: 'CleanPro OS marketing site hero' },
    ],
    link: { label: 'cleanprogrp.com', url: 'https://www.cleanprogrp.com' },
  },
  {
    slug: 'style-synchrony',
    title: 'Style Synchrony',
    tagline: 'A storefront and back office for a ready-to-wear fashion brand.',
    category: 'E-commerce',
    platforms: ['Web'],
    year: '2026',
    role: 'Design & Development',
    client: 'Style Synchrony',
    tint: '#8A1F33',
    featured: true,
    cover: {
      src: styleHome,
      alt: 'Style Synchrony home page with a wine-coloured hero and a model in a lime two-piece',
    },
    overview: [
      'Style Synchrony is a fashion brand making ready-to-wear and made-to-fit pieces for women, men and kids. The owner needed more than a lookbook. She needed a shop she could run herself, without calling a developer every time a new piece dropped.',
      'I designed and built the whole thing on my own: an editorial storefront with collections, films and a gallery, a full checkout, and an admin dashboard that puts every product, order and photo in her hands.',
    ],
    highlights: [
      {
        title: 'Editorial storefront',
        text: 'A warm serif-led design with collections, a brand story, films and a lightbox gallery, tuned to feel like a fashion magazine and still load fast.',
      },
      {
        title: 'Shop and bag',
        text: 'Product pages with quick view, sizes and sale prices, an audience switch for women, men and kids, search, and a bag that persists in the browser.',
      },
      {
        title: 'Checkout that fits Nigeria',
        text: 'Pay by card, bank transfer or USSD through Paystack, send a manual bank transfer for confirmation, or place the order straight on WhatsApp.',
      },
      {
        title: 'Order tracking',
        text: 'Shoppers follow an order on any device with just their reference and phone number. No account needed.',
      },
      {
        title: 'Admin dashboard',
        text: 'Products, orders, enquiries, films, gallery and site settings managed from one screen, secured with Supabase auth and row-level security.',
      },
      {
        title: 'Built to be found',
        text: 'An automated image pipeline, share previews for WhatsApp and Instagram, structured data and a generated sitemap.',
      },
    ],
    stack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Supabase',
      'PostgreSQL',
      'Paystack',
      'Netlify Functions',
    ],
    gallery: [{ src: styleStory, alt: 'Style Synchrony story page' }],
    link: { label: 'stylesynchrony.com', url: 'https://stylesynchrony.com' },
  },
  {
    slug: 'quilox',
    title: 'Quilox',
    tagline: 'Wallet and QR payments for one of the busiest nightclubs in Lagos.',
    category: 'Fintech App',
    platforms: ['Mobile'],
    year: '2024',
    role: 'Lead Frontend Engineer',
    client: 'Dosh Services',
    tint: '#D7262E',
    featured: true,
    cover: {
      src: quilox,
      alt: 'Quilox mobile app showing upcoming events and available tickets',
      portrait: true,
    },
    overview: [
      'On a packed night, paying at the bar should not be the slow part. Quilox gives club guests a wallet on their phone. They fund it, scan a QR code on a card, and the purchase is done.',
      'I led the frontend build at Dosh Services, from the wallet and checkout flow to events and tickets.',
    ],
    highlights: [
      {
        title: 'QR code payments',
        text: 'Guests buy items by scanning a QR code, with the wallet balance updating the moment the purchase clears.',
      },
      {
        title: 'Wallet and transactions',
        text: 'Wallet funding through Paystack, a live transaction history and real-time wallet synchronisation.',
      },
      {
        title: 'Events and tickets',
        text: 'Upcoming events with ticket tiers from dance floor to VIP, bookable from the same app.',
      },
      {
        title: 'A fast checkout',
        text: 'Redux Toolkit for state and React Query for server data keep the app responsive when the network is not.',
      },
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'React Query', 'Paystack'],
    gallery: [],
    link: {
      label: 'Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.quilox.mobile',
    },
  },
  {
    slug: 'oyasync-hbl',
    title: 'OyaSync HBL',
    tagline: 'Point-of-sale and sales management for businesses across Nigeria.',
    category: 'Desktop Software',
    platforms: ['Desktop', 'Web'],
    year: '2025',
    role: 'Software Engineer',
    client: 'OyaSync Ltd',
    tint: '#3B82F6',
    cover: { src: hbl, alt: 'OyaSync HBL desktop application' },
    overview: [
      'HBL is the sales system behind restaurants, bars, filling stations and retail outlets. It runs as a desktop app at the counter and on the web for owners who want to check in from anywhere.',
      'At OyaSync I built and maintained features across the Electron desktop app and its web companion, and contributed to internal web tools.',
    ],
    highlights: [
      {
        title: 'Sales, stock and reports',
        text: 'Features for sales tracking, inventory management and reporting that owners rely on to close out each day.',
      },
      {
        title: 'One codebase, two platforms',
        text: 'The same React app ships to the Microsoft Store through Electron and to the browser.',
      },
      {
        title: 'Predictable data flow',
        text: 'Redux Toolkit and RTK Query handle state, caching and API calls, with MUI for a consistent interface.',
      },
      {
        title: 'Faster and safer',
        text: 'Performance, security and usability improvements across the app for the people who use it all day.',
      },
    ],
    stack: ['Electron', 'React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'MUI'],
    gallery: [],
    link: {
      label: 'Microsoft Store',
      url: 'https://apps.microsoft.com/detail/9N9TRMZDRQ2L?hl=en-us&gl=GB&ocid=pdpshare',
    },
  },
  {
    slug: 'playsafari',
    title: 'PlaySafari',
    tagline: 'Party and event booking for a family entertainment business in Canada.',
    category: 'Booking Website',
    platforms: ['Web'],
    year: '2025',
    role: 'Frontend Engineer',
    client: 'PlaySafari',
    tint: '#F59E0B',
    cover: { src: playsafari, alt: 'PlaySafari website home page' },
    overview: [
      'PlaySafari runs children’s parties and educational play sessions. The site lets a parent see what is on offer, book an event and get a follow-up to settle the details, all without picking up the phone.',
      'I built the frontend with React and TypeScript, with a playful look that still keeps the booking path short and clear.',
    ],
    highlights: [
      {
        title: 'Simple booking',
        text: 'Parents choose an event, send their details and receive a follow-up to arrange everything.',
      },
      {
        title: 'Made for busy parents',
        text: 'A responsive layout that works as well on a phone in a car park as on a laptop.',
      },
      {
        title: 'Playful, not noisy',
        text: 'Bright, friendly styling written in SCSS, kept in check so the content stays easy to scan.',
      },
    ],
    stack: ['React', 'TypeScript', 'SCSS'],
    gallery: [],
    link: { label: 'playsafari.ca', url: 'https://playsafari.ca' },
  },
]

// Intrinsic sizes, so every frame can reserve the right space before its image loads.
const sizes = new Map<string, [number, number]>([
  [bexoraDashboard, [1920, 912]],
  [bexoraComms, [1920, 912]],
  [bexoraAnalytics, [1920, 886]],
  [bexoraLanding, [1920, 1080]],
  [bexoraMobile1, [720, 1564]],
  [bexoraMobile2, [720, 1564]],
  [cleanproOverview, [1048, 593]],
  [cleanproDispatch, [1073, 586]],
  [cleanproMobile, [720, 1477]],
  [cleanproLanding, [1920, 975]],
  [styleHome, [1920, 1000]],
  [styleStory, [1920, 1080]],
  [quilox, [900, 1600]],
  [hbl, [1920, 857]],
  [playsafari, [1897, 849]],
])
for (const p of projects) {
  for (const image of [p.cover, ...p.gallery]) {
    const size = sizes.get(image.src)
    if (size) [image.w, image.h] = size
  }
}

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
