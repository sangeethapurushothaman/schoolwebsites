import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. Import the hook

const Admission = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const handleStartApplication = () => {
    // 3. Define the path to your form page
    navigate("/application-form"); 
  };

  return (
    <section id="admission1" className="relative py-24 bg-[#1a2e4c] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(212,163,77,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
            Begin Your Journey at <br />
            <span className="text-[#d4a34d]">Idea Academy</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Applications for the 2026–2027 academic year are now open. Schedule a 
            campus tour or start your application today.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            {/* Primary Action Button with onClick */}
            <button 
              onClick={handleStartApplication}
              className="bg-[#d4a34d] text-[#1a2e4c] px-10 py-4 rounded-lg font-bold text-sm hover:bg-[#c3923d] shadow-[0_4px_0_rgb(163,123,56)] active:shadow-none active:translate-y-1 transition-all duration-150 w-full md:w-auto"
            >
              Start Application
            </button>

            <button className="bg-white text-[#1a2e4c] px-10 py-4 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors duration-300 w-full md:w-auto">
              Schedule a Tour
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Admission;