import { Github, Linkedin, Mail, Code, User , Handshake } from 'lucide-react';

import { Section, Project, SectionButton, SocialButton } from "@/types/homepage";

export const sections: Section[] = ['home', 'about', 'projects'];

export const projects: Project[] = [
    {
        title: "Coffee Cabana",
        description: "A coffee shop website built with Next.js, TypeScript, and Tailwind CSS. Features include a menu, a blog, and a contact form.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS"],
        github: "",
        live: "",
        image: "/images/coffee_cabana_logo.png"
      },
      {
        title: "Core Health and Performance",
        description: "A React-Native app built with a focus on gamification, health tracking, performance metrics, and improving patient engagement.",
        tech: ["React Native", "Node.js", "PostgreSQL", "Express", "AWS S3", "MediaConvert", "Auth0", "Socket.io", "AWS", "Stripe"],
        github: "",
        live: "",
        image: "/images/core_1_orig.png"
      },
      {
        title: "Kindred Barn",
        description: "Developing a more comprehensive user management and reservation system for a Squarespace-based business, implementing " +
          "custom workflows that extend beyond the platform's current native capabilities.",
        tech: ["SquareSpace"],
        github: "",
        live: "https://www.kindredbarn.com/",
        image: "/images/kindred_barn_logo.png"
      },
      {
        title: "Banana Eco-Camp",
        description: "A custom web application designed to establish Banana Eco Camp&apos;s independent digital presence, consolidating their scattered " +
        "third-party listings into a cohesive, brand-controlled booking ecosystem.",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Firebase", "Stripe", "Resend"],
        github: "",
        live: "",
        image: "/images/banana_eco_camp_logo.png"
      }
    ];

export const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "ElasticUI", "Vue.js", "Angular.js", "Jest", "Playwright"] },
    { category: "Backend", items: ["Node.js", "Python", "Django", "Django Ninja", "FastAPI", "PostgreSQL", "Express"] },
    { category: "Infrastructure & DevOps", items: ["Git", "Docker", "Kubernetes", "Argo Workflows", "Linux"] },
    { category: "Observability & Logging", items: ["Splunk", "OpenSearch", "ElasticSearch", "Logstash", "Kibana"] }
  ];

export const sectionButtons: SectionButton[] = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: Handshake },
    { id: 'projects', label: 'Projects', icon: Code }
  ];

export const socialButtons: SocialButton[] = [
    { type: Github, size: 24, href: 'https://github.com/stevenjhomem', className: 'text-gray-400 hover:text-white transition-colors', target: '_blank', rel: 'noopener noreferrer' },
    { type: Linkedin, size: 24, href: 'https://linkedin.com/in/stevenjhomem', className: 'text-gray-400 hover:text-white transition-colors', target: '_blank', rel: 'noopener noreferrer' },
    { type: Mail, size: 24, href: 'mailto:steve.homem@gmail.com', className: 'text-gray-400 hover:text-white transition-colors', target: '', rel: '' }
  ];

  export const selfDescriptions = ["Builder & Cultivator", "Endurance-Minded", "Impact Driven"]

  export const aboutMeParagraphs = [
    "I am a passionate full-stack developer driven by dual missions: creating exceptional web applications and " +
    "cultivating the people who build them. My technical expertise spans modern JavaScript and Python frameworks, " +
    "cloud and containerization technologies, and Cybersecurity but I&apos;m equally invested in helping teams and " +
    "individuals thrive in their careers. ",
    "I believe technology is only as strong as the people behind it. Whether I&apos;m architecting scalable " +
    "applications or mentoring emerging developers, I approach each challenge with the same dedication " +
    "I bring to training for ultra marathons—persistence, strategic thinking, and a commitment to going the distance."
  ]
  