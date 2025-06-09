import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Download, Menu, X, Code, Briefcase, User, MessageCircle } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);

  const sections = ['home', 'about', 'projects', 'contact'];

  // Handle wheel events to control section navigation
  useEffect(() => {
    let scrollCount = 0;
    let scrollDirection = null;
    let isScrolling = false;
    let resetTimer = null;
    const requiredScrolls = 3; // Require 3 distinct scroll actions to change sections
    
    const handleWheel = (e) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const currentDirection = e.deltaY > 0 ? 'down' : 'up';
      
      // Reset count if direction changes
      if (scrollDirection !== currentDirection) {
        scrollCount = 0;
        scrollDirection = currentDirection;
      }
      
      // Increment scroll count
      scrollCount++;
      
      // Clear existing reset timer
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
      
      // Reset scroll count if user stops scrolling for 500ms
      resetTimer = setTimeout(() => {
        scrollCount = 0;
        scrollDirection = null;
      }, 500);
      
      // Only change sections after required number of scrolls
      if (scrollCount >= requiredScrolls) {
        if (currentDirection === 'down' && activeSection < sections.length - 1) {
          // Scroll down - go to next section
          const nextSection = activeSection + 1;
          setActiveSection(nextSection);
          setIsProgrammaticScroll(true);
          document.getElementById(sections[nextSection])?.scrollIntoView({ 
            behavior: 'smooth'
          });
          
          // Reset everything and block for 2 seconds
          scrollCount = 0;
          scrollDirection = null;
          isScrolling = true;
          setTimeout(() => { 
            isScrolling = false;
            setIsProgrammaticScroll(false);
          }, 3000);
          
        } else if (currentDirection === 'up' && activeSection > 0) {
          // Scroll up - go to previous section
          const prevSection = activeSection - 1;
          setActiveSection(prevSection);
          setIsProgrammaticScroll(true);
          document.getElementById(sections[prevSection])?.scrollIntoView({ 
            behavior: 'smooth'
          });
          
          // Reset everything and block for 2 seconds
          scrollCount = 0;
          scrollDirection = null;
          isScrolling = true;
          setTimeout(() => { 
            isScrolling = false;
            setIsProgrammaticScroll(false);
          }, 3000);
        }
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleWheel);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [activeSection]);

  // Smooth scroll to section
  const scrollToSection = (sectionIndex) => {
    setActiveSection(sectionIndex);
    setIsProgrammaticScroll(true);
    document.getElementById(sections[sectionIndex])?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    
    // Re-enable observer after scroll completes with longer delay
    setTimeout(() => {
      setIsProgrammaticScroll(false);
    }, 2500);
  };

  // Track scroll and determine active section with fade calculations
  useEffect(() => {
    // Intersection Observer - only active when not programmatically scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        // Completely skip all intersection updates during programmatic scrolling
        if (isProgrammaticScroll) return;
        
        // Only update if we're not in the middle of any smooth scrolling
        let mostVisibleSection = null;
        let maxVisibility = 0;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
            maxVisibility = entry.intersectionRatio;
            const sectionId = entry.target.id;
            const sectionIndex = sections.indexOf(sectionId);
            if (sectionIndex !== -1) {
              mostVisibleSection = sectionIndex;
            }
          }
        });
        
        // Only update if we found a clearly visible section (>70% visible)
        if (mostVisibleSection !== null && maxVisibility > 0.7) {
          setActiveSection(mostVisibleSection);
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7, 0.9] }
    );

    // Only observe sections when not programmatically scrolling
    if (!isProgrammaticScroll) {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) observer.observe(element);
      });
    }

    return () => observer.disconnect();
  }, [isProgrammaticScroll]);

  // Calculate opacity for smooth fade effect
  const getSectionOpacity = (sectionIndex) => {
    // Simple approach: current active section gets full opacity, others fade
    if (sectionIndex === activeSection) {
      return 1; // Current section is fully visible
    }
    
    // Adjacent sections get partial opacity
    const distance = Math.abs(sectionIndex - activeSection);
    if (distance === 1) {
      return 0.6; // Adjacent sections
    }
    
    return 0.3; // All other sections
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution built with Next.js, Stripe, and PostgreSQL. Features include user authentication, product management, and payment processing.",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      github: "https://github.com/stevenjhomem/ecommerce-platform",
      live: "https://ecommerce-demo.stevenjhomem.dev",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      title: "Task Management Dashboard",
      description: "React-based project management tool with drag-and-drop functionality, real-time updates, and team collaboration features.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      github: "https://github.com/stevenjhomem/task-dashboard",
      live: "https://tasks.stevenjhomem.dev",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"
    },
    {
      title: "Weather Analytics App",
      description: "Weather tracking application with data visualization, location-based forecasts, and historical weather data analysis.",
      tech: ["Vue.js", "D3.js", "Python", "FastAPI", "Chart.js"],
      github: "https://github.com/stevenjhomem/weather-analytics",
      live: "https://weather.stevenjhomem.dev",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop"
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"] },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Express"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "Figma"] },
    { category: "AI/ML", items: ["Claude", "OpenAI API", "LangChain", "Prompt Engineering"] }
  ];

  return (
    <div className="h-screen overflow-hidden scrollbar-hide bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;
        }
        .fade-section {
          transition: opacity 0.4s ease-in-out;
        }
      `}</style>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white">
              Steven J. Homem
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home', icon: User },
                { id: 'about', label: 'About', icon: User },
                { id: 'projects', label: 'Projects', icon: Code },
                { id: 'contact', label: 'Contact', icon: MessageCircle }
              ].map(({ id, label, icon: Icon }, index) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(index)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                    activeSection === index
                      ? 'text-purple-400 bg-purple-400/10'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(index)}
                  className="block px-3 py-2 text-gray-300 hover:text-white capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="h-screen flex items-center justify-center px-4 fade-section"
        style={{ opacity: getSectionOpacity(0) }}
      >
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">SH</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Full-Stack Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Building modern web applications with cutting-edge technologies and AI integration
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection(2)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              View My Work
            </button>
            <button className="border border-purple-400 text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-all flex items-center justify-center space-x-2">
              <Download size={20} />
              <span>Download Resume</span>
            </button>
          </div>

          <div className="flex justify-center space-x-6 mt-12">
            <a href="https://github.com/stevenjhomem" className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/stevenjhomem" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:steven@stevenjhomem.dev" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="h-screen flex items-center justify-center px-4 fade-section"
        style={{ opacity: getSectionOpacity(1) }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate full-stack developer with a strong focus on creating efficient, scalable web applications. 
                My journey in tech has led me to explore the intersection of traditional development and AI-assisted workflows.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I specialize in modern JavaScript frameworks, cloud technologies, and have recently been diving deep into 
                AI integration and prompt engineering. I believe in leveraging AI tools like Claude to enhance productivity 
                and solve complex problems more efficiently.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">Problem Solver</span>
                <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">AI Enthusiast</span>
                <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">Continuous Learner</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {skills.map((skillGroup, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-purple-400 font-semibold mb-3">{skillGroup.category}</h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-gray-300 text-sm">{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="h-screen flex items-center justify-center px-4 fade-section overflow-hidden"
        style={{ opacity: getSectionOpacity(2) }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all group">
                <div className="h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={project.live} className="text-gray-400 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="h-screen flex items-center justify-center px-4 fade-section"
        style={{ opacity: getSectionOpacity(3) }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-12">
            I'm always interested in new opportunities and exciting projects. Let's connect!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <Mail className="mx-auto mb-4 text-purple-400" size={32} />
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-gray-300">steven@stevenjhomem.dev</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <Linkedin className="mx-auto mb-4 text-purple-400" size={32} />
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-300">linkedin.com/in/stevenjhomem</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <Github className="mx-auto mb-4 text-purple-400" size={32} />
              <h3 className="text-white font-semibold mb-2">GitHub</h3>
              <p className="text-gray-300">github.com/stevenjhomem</p>
            </div>
          </div>
          
          <a 
            href="mailto:steven@stevenjhomem.dev"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Steven J. Homem. Built with Next.js and ShadCN.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;