import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a2e4c] text-gray-300 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Main Grid Section */}
        <div className="grid md:grid-cols-3 gap-16 text-left">

          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-white">
              Idea <span className="text-[#d4a34d]">Academy</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              Empowering students with knowledge, character, and a passion for 
              lifelong learning since 2005.
            </p>
          </div>

          {/* Column 2: Quick Links */}
         {/* Column 2: Quick Links */}
<div className="space-y-6">
  <h3 className="text-white font-bold tracking-widest text-sm uppercase">Quick Links</h3>
  <ul className="space-y-3 text-sm">
    {[
      { name: "About Us", id: "about" },
      { name: "Programs", id: "programs" },
      { name: "Admissions", id: "admission1" },
      { name: "Testimonials", id: "testimonial" }
    ].map((link) => (
      <li key={link.id}>
        <button
          onClick={() => {
            document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className="hover:text-[#d4a34d] transition text-gray-400 cursor-pointer"
        >
          {link.name}
        </button>
      </li>
    ))}
  </ul>
</div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase">Contact</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <FiMapPin className="mt-1 text-[#d4a34d]" size={18} />
                <p>123 Academy Drive, Education City</p>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-[#d4a34d]" size={18} />
                <p>(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-[#d4a34d]" size={18} />
                <p>info@ideaacademy.edu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - The Legal Link */}
        <div className="border-t border-gray-700/50 mt-16 pt-8 text-center">
          <Link 
            to="/legalpage" 
            className="text-xs text-gray-500 hover:text-[#d4a34d] transition-colors duration-300"
          >
            © {currentYear} Idea Academy. All rights reserved.
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;