import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated navigation data to match your component IDs
  const navLinks = [
    { name: 'ABOUT', id: 'about' },
    { name: 'PROGRAMS', id: 'programs' },
    { name: 'TESTIMONIALS', id: 'testimonial' },
    { name: 'ADMISSIONS', id: 'admission1' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 
        backdrop-blur-md border-b border-white/10 
        ${isScrolled
          ? "py-3 bg-[#1a2e4c]/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
          : "py-6 bg-transparent shadow-none"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo Section */}
        {/* Logo Section */}
<button 
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
  className="flex items-center group cursor-pointer"
>
  <span className="text-2xl font-serif font-bold tracking-tight text-white">
    Idea <span className="text-[#d4a34d]">Academy</span>
  </span>
</button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-10 text-[11px] font-bold tracking-[0.2em]">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-white/90 hover:text-[#d4a34d] transition-colors duration-300 uppercase cursor-pointer"
            >
              {link.name}
            </button>
          ))}

          {/* 3D Apply Now Button - links to the Journey/Admission section */}
          <button
            onClick={() => scrollToSection('admission')}
            className="bg-[#d4a34d] text-[#1a2e4c] px-7 py-2.5 rounded-full font-bold 
            shadow-[0_4px_0_rgb(184,138,62)] hover:shadow-[0_2px_0_rgb(184,138,62)] 
            hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] 
            transition-all duration-150"
          >
            APPLY NOW
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-white p-2 bg-white/5 border border-white/10 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;