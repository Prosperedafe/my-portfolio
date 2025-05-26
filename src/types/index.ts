export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link: string;
  github?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}