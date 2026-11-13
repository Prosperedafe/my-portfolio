export type Platform = 'Web' | 'Mobile' | 'Desktop'

export interface ProjectImage {
  src: string
  alt: string
  /** Portrait images (phone screens) sit in a narrower frame. */
  portrait?: boolean
  /** Pixel size, filled in from the lookup in data/projects.ts. */
  w?: number
  h?: number
}

export interface Project {
  slug: string
  title: string
  /** One line shown in lists and cards. */
  tagline: string
  category: string
  platforms: Platform[]
  year: string
  role: string
  client: string
  cover: ProjectImage
  /** Brand colour of the product, used for small tints. */
  tint: string
  overview: string[]
  highlights: { title: string; text: string }[]
  stack: string[]
  gallery: ProjectImage[]
  link?: { label: string; url: string }
  featured?: boolean
}

export interface ExperienceItem {
  company: string
  position: string
  period: string
  location: string
  description: string
  skills: string[]
}

export interface FormData {
  name: string
  email: string
  subject: string
  message: string
}
