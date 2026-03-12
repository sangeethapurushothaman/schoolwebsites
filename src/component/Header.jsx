import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', id: 'about' },
    { name: 'PROGRAMS', id: 'programs' },
    { name: 'TESTIMONIALS', id: 'testimonial' },
    { name: 'ADMISSIONS', id: 'admission1' },
  ];

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open

    if (location.pathname !== "/") {
      // If NOT on home page, navigate home first, then scroll
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // If already on home page, just scroll
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 px-6 
        backdrop-blur-md border-b border-white/10 
        ${isScrolled
          ? "py-3 bg-[#1a2e4c]/95 shadow-xl"
          : "py-6 bg-transparent shadow-none"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <Link 
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center group cursor-pointer"
        >
          <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-white">
            Idea <span className="text-[#d4a34d]">Academy</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-[11px] font-bold tracking-[0.2em]">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className="text-white/90 hover:text-[#d4a34d] transition-colors duration-300 uppercase cursor-pointer"
            >
              {link.name}
            </button>
          ))}

          <button
            onClick={() => handleNavClick('admission1')}
            className="bg-[#d4a34d] text-[#1a2e4c] px-6 py-2 rounded-full font-bold 
            shadow-[0_4px_0_rgb(184,138,62)] hover:shadow-[0_2px_0_rgb(184,138,62)] 
            hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] 
            transition-all duration-150"
          >
            APPLY NOW
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 bg-white/5 border border-white/10 rounded-lg"
          >
            {isMobileMenuOpen ? (
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#1a2e4c] border-b border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col p-6 space-y-4 text-[12px] font-bold tracking-widest text-white uppercase">
          {navLinks.map((link) => (
            <button 
                key={link.name} 
                onClick={() => handleNavClick(link.id)}
                className="text-left py-2 border-b border-white/5 hover:text-[#d4a34d]"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('admission1')}
            className="bg-[#d4a34d] text-[#1a2e4c] py-3 rounded-lg text-center shadow-lg"
          >
            APPLY NOW
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;