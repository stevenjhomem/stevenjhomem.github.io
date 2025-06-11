import { Section, Project } from "@/types/homepage";

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

