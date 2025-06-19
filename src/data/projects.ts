import hblImg from "../assets/hbl.png";
import playSafari from "../assets/play-safari.png";
import dilusso from "../assets/dilusso.png";
import quilox from "../assets/quilox.webp";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link: string;
}

export const projects = <Project[]>[
  {
    id: 2,
    title: "DiLusso Store",
    description:
      "A modern e-commerce platform featuring responsive design, user authentication, and payment integration.",
    image: dilusso,
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    link: "https://dilussostore.shop",
  },
  {
    id: 3,
    title: "PlaySafari",
    description:
      "A gamification platform for educational content with interactive learning modules and progress tracking.",
    image: playSafari,
    technologies: ["Vue.js", "JavaScript", "SCSS", "Supabase"],
    category: "Web Application",
    link: "https://playsafari.ca",
  },
  {
    id: 4,
    title: "Quilox Mobile App",
    description:
      "A mobile application for event management and ticket booking with real-time notifications.",
    image: quilox,
    technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
    category: "Mobile App",
    link: "https://play.google.com/store/apps/details?id=com.quilox.mobile",
  },
  {
    id: 5,
    title: "OyaSync HBL",
    description:
      "A task management and collaboration tool for teams with real-time updates and file sharing capabilities.",
    image: hblImg,
    technologies: ["Vue.js", "TypeScript", "TailwindCSS", "Supabase"],
    category: "Web Application",
    link: "https://apps.microsoft.com/detail/9N9TRMZDRQ2L?hl=en-us&gl=GB&ocid=pdpshare",
  },
];
