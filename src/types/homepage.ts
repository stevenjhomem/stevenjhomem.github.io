export type Section = 'home' 
    | 'about' 
    | 'projects' 
    | 'contact';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  position?: 'prev' | 'current' | 'next';
}

export interface SectionButton {
    id: Section;
    label: string;
    icon: React.ElementType;
}

export interface SocialButton {
    type: React.ElementType;
    size: number;
    href: string;
    className: string;
    target: string;
    rel: string;
}
