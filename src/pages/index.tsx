import React, { useState, useEffect  } from 'react';
import { ExternalLink, Menu, X, Github } from 'lucide-react';
import {
  sections, 
  projects, 
  skills, 
  sectionButtons, 
  socialButtons, 
  selfDescriptions,
  aboutMeParagraphs
} from '@/constants/homepage';
import { Section } from '@/types/homepage';

// Add type for wheel event
type Direction = 'up' | 'down' | null;


const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle wheel events to control section navigation (desktop only)
  useEffect(() => {
    if (isMobile) return;
    
    let scrollCount = 0;
    let scrollDirection: Direction = null;
    let isScrolling = false;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;
    const requiredScrolls = 3;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      
      const currentDirection: Direction = e.deltaY > 0 ? 'down' : 'up';
      
      if (scrollDirection !== currentDirection) {
        scrollCount = 0;
        scrollDirection = currentDirection;
      }
      
      scrollCount++;
      if (resetTimer) clearTimeout(resetTimer);
      
      resetTimer = setTimeout(() => {
        scrollCount = 0;
        scrollDirection = null;
      }, 500);
      
      if (scrollCount >= requiredScrolls) {
        const nextSection = currentDirection === 'down' ? 
          Math.min(activeSection + 1, sections.length - 1) : 
          Math.max(activeSection - 1, 0);

        if (nextSection !== activeSection) {
          setActiveSection(nextSection);
          setIsProgrammaticScroll(true);
          document.getElementById(sections[nextSection])?.scrollIntoView({ behavior: 'smooth' });
          
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
  }, [activeSection, isMobile, sections]);

  // Smooth scroll to section
  const scrollToSection = (sectionIndex: number) => {
    setActiveSection(sectionIndex);
    setIsProgrammaticScroll(true);
    document.getElementById(sections[sectionIndex])?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setTimeout(() => setIsProgrammaticScroll(false), 2500);
  };

  // Track scroll and determine active section with fade calculations
  useEffect(() => {
    if (isProgrammaticScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll) return;
        
        const mostVisible = entries.reduce((acc, entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > acc.visibility) {
            const sectionIndex = sections.indexOf(entry.target.id as Section);
            return sectionIndex !== -1 ? { index: sectionIndex, visibility: entry.intersectionRatio } : acc;
          }
          return acc;
        }, { index: -1, visibility: 0 });
        
        if (mostVisible.index !== -1 && mostVisible.visibility > 0.7) {
          setActiveSection(mostVisible.index);
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7, 0.9] }
    );

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isProgrammaticScroll, sections]);


  // Carousel navigation functions
  const nextProject = () => setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);

  // Get projects for desktop carousel (current + adjacent)
  const getDesktopProjects = () => {
    const prevIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentProjectIndex + 1) % projects.length;
    
    return [
      { ...projects[prevIndex], position: 'prev' },
      { ...projects[currentProjectIndex], position: 'current' },
      { ...projects[nextIndex], position: 'next' }
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
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
        
        /* Fix mobile viewport issues */
        .mobile-section {
          min-height: 100vh;
          min-height: 100dvh;
        }
        
        /* Desktop sections */
        @media (min-width: 768px) {
          .mobile-section {
            height: 100vh;
            height: 100dvh;
          }
        }
        
        /* Ensure proper mobile viewport */
        @supports (-webkit-touch-callout: none) {
          .mobile-section {
            min-height: -webkit-fill-available;
          }
          
          @media (min-width: 768px) {
            .mobile-section {
              height: -webkit-fill-available;
            }
          }
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
              {sectionButtons.map(({ id, label, icon: Icon }, index) => (
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

      <main className="flex-grow md:overflow-hidden overflow-y-auto scrollbar-hide">
        {/* Home Section */}
        <section 
          id="home" 
          className={`mobile-section flex items-center justify-center px-4 fade-section pt-20 md:pt-0 ${!isMobile ? (activeSection === 0 ? 'block' : 'hidden') : 'block'}`}
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
              Developing technological solutions as well as the talent behind them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection(2)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                View My Work
              </button>
              <a 
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-purple-400 text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-all flex items-center justify-center space-x-2"
              >
                <ExternalLink size={20} />
                <span>View My Resume</span>
              </a>
            </div>

            <div className="flex justify-center space-x-6 mt-12">
              {socialButtons.map(({ type: Icon, size, href, className, target, rel }, index) => (
                <a key={index} href={href} className={className} target={target} rel={rel}>
                  <Icon size={size} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section 
          id="about" 
          className={`mobile-section flex items-center justify-center px-4 fade-section pt-20 md:pt-0 ${!isMobile ? (activeSection === 1 ? 'block' : 'hidden') : 'block'}`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-4">About Me</h2>
            <div className="flex justify-center mb-8 md:mb-16">
              <div className="flex flex-wrap gap-1.5 justify-center">
                {selfDescriptions.map((description, index) => (
                  <span key={index} className="bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-full text-xs md:text-sm md:px-3 md:py-1">{description}</span>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {aboutMeParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 text-lg leading-relaxed">{paragraph}</p>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <h3 className="text-purple-400 font-semibold mb-3 text-center md:text-left">{skillGroup.category}</h3>
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-2 px-4 md:px-0">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <li key={skillIndex} className="text-gray-300 text-sm text-center md:text-left">{skill}</li>
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
          className={`min-h-screen flex items-center px-4 fade-section overflow-hidden pt-24 md:pt-28 ${!isMobile ? (activeSection === 2 ? 'block' : 'hidden') : 'block'}`}
        >
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Projects</h2>
            
            {/* Mobile Carousel - Single Project */}
            <div className="md:hidden mb-4">
              <div className="relative">
                <div 
                  className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all max-h-[70vh] overflow-y-auto"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={projects[currentProjectIndex].image} 
                      alt={projects[currentProjectIndex].title} 
                      className="w-full h-full object-contain p-4" 
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{projects[currentProjectIndex].title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">{projects[currentProjectIndex].description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {projects[currentProjectIndex].tech.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      {projects[currentProjectIndex].github || projects[currentProjectIndex].live ? (
                        <>
                          {projects[currentProjectIndex].github && (
                            <a href={projects[currentProjectIndex].github} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                              <Github size={20} />
                            </a>
                          )}
                          {projects[currentProjectIndex].live && (
                            <a href={projects[currentProjectIndex].live} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm italic">Coming soon</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation Arrows */}
                <button 
                  onClick={prevProject}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                >
                  <span className="text-2xl font-bold">‹</span>
                </button>
                <button 
                  onClick={nextProject}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                >
                  <span className="text-2xl font-bold">›</span>
                </button>
                
                {/* Mobile Dots Indicator */}
                <div className="flex justify-center mt-6 space-x-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProjectIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentProjectIndex ? 'bg-purple-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Carousel - Three Projects */}
            <div className="hidden md:block mb-4">
              <div className="relative">
                <div className="flex items-center justify-center space-x-8">
                  {getDesktopProjects().map((project, index) => (
                    <div 
                      key={index}
                      className={`transition-all duration-500 ${
                        project.position === 'current' 
                          ? 'scale-100 opacity-100 z-10' 
                          : 'scale-75 opacity-40 hover:opacity-60'
                      } ${project.position === 'prev' ? '-translate-x-4' : project.position === 'next' ? 'translate-x-4' : ''}`}
                    >
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all w-80">
                        <div className="h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-contain p-4" 
                          />
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
                            {project.github || project.live ? (
                              <>
                                {project.github && (
                                  <a href={project.github} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                                    <Github size={20} />
                                  </a>
                                )}
                                {project.live && (
                                  <a href={project.live} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink size={20} />
                                  </a>
                                )}
                              </>
                            ) : (
                              <span className="text-gray-400 text-sm italic">Coming soon</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Desktop Navigation */}
                <button 
                  onClick={prevProject}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                >
                  <span className="text-2xl font-bold">‹</span>
                </button>
                <button 
                  onClick={nextProject}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                >
                  <span className="text-2xl font-bold">›</span>
                </button>
                
                {/* Desktop Dots Indicator */}
                <div className="flex justify-center space-x-3">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProjectIndex(index)}
                      className={`w-4 h-4 rounded-full transition-all ${
                        index === currentProjectIndex ? 'bg-purple-400' : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
