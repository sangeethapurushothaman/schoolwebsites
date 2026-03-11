import React from "react";
import { motion } from "framer-motion";
import { 
  PiBookOpenFill, 
  PiPencilCircleFill, 
  PiGraduationCapFill, 
  PiFlaskFill,
  PiApertureFill,    // New icon 1
  PiBrainFill,       // New icon 2
  PiGraphFill,       // New icon 3
  PiPaletteFill,     // New icon 4
  PiAtomFill,        // New small icon
  PiCompassFill      // New small icon
} from "react-icons/pi";

const Hero = () => {
  const statsData = [
    { number: "1,200+", label: "Students Enrolled" },
    { number: "15:1", label: "Student-Teacher Ratio" },
    { number: "98%", label: "College Acceptance Rate" },
    { number: "45+", label: "Clubs & Activities" },
  ];

  // Primary floating animation (Larger icons)
  const floating = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Secondary floating animation (Smaller/Detail icons)
  const floatingSlow = {
    animate: {
      y: [0, -10, 0],
      x: [0, 5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5 // varied delay to break synchronization
      }
    }
  };

  return (
    <div className="w-full">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[600px] md:h-[850px] flex items-start justify-center overflow-hidden">
        
        {/* BACKGROUND IMAGE LAYER */}
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{ 
            backgroundImage: `linear-gradient(rgba(41, 92, 170, 0.75), rgba(24, 46, 80, 0.85)), url('hero_image.png')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        {/* FLOATING ICONS (Layered constellations) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          
          {/* Main larger, very transparent icons (Layer 1) */}
          <motion.div variants={floating} animate="animate" className="absolute top-[20%] left-[10%] text-white/10 text-6xl md:text-8xl"><PiBookOpenFill /></motion.div>
          <motion.div variants={floating} animate="animate" className="absolute top-[60%] left-[5%] text-white/5 text-7xl md:text-9xl rotate-12"><PiGraduationCapFill /></motion.div>
          <motion.div variants={floating} animate="animate" className="absolute top-[15%] right-[10%] text-white/10 text-6xl md:text-8xl -rotate-12"><PiFlaskFill /></motion.div>
          <motion.div variants={floating} animate="animate" className="absolute top-[50%] right-[5%] text-white/5 text-7xl md:text-9xl"><PiPencilCircleFill /></motion.div>

          {/* New detailed icons (Layer 2) */}
          <motion.div variants={floatingSlow} animate="animate" className="absolute top-[10%] left-[45%] text-white/5 text-6xl"><PiPaletteFill /></motion.div>
          <motion.div variants={floatingSlow} animate="animate" className="absolute top-[35%] right-[25%] text-white/5 text-6xl rotate-45"><PiGraphFill /></motion.div>
          <motion.div variants={floatingSlow} animate="animate" className="absolute top-[75%] left-[30%] text-white/5 text-7xl"><PiApertureFill /></motion.div>
          <motion.div variants={floatingSlow} animate="animate" className="absolute top-[70%] right-[35%] text-white/5 text-6xl -rotate-12"><PiBrainFill /></motion.div>

          {/* New tiny, detailed icons (Layer 3) */}
          <motion.div variants={floatingSlow} animate="animate" className="absolute top-[40%] left-[15%] text-white/5 text-4xl"><PiAtomFill /></motion.div>
          <motion.div variants={floatingSlow} animate="animate" className="absolute top-[25%] right-[40%] text-white/5 text-4xl"><PiCompassFill /></motion.div>
        </div>

        {/* CONTENT BOX */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-6xl flex flex-col items-center pt-32 md:pt-48"
        >
          <p className="text-[#d4a34d] font-bold tracking-[0.3em] text-[10px] md:text-sm mb-4 uppercase">
            Where Curiosity Meets Excellence
          </p>

          <h1 className="text-white text-5xl md:text-[90px] font-serif font-bold leading-[1.1] mb-6">
            Shaping Tomorrow's <br /> 
            <span className="text-[#d4a34d]">Leaders Today</span>
          </h1>

          <p className="text-gray-200 text-sm md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            A nurturing environment where students discover their passions, develop critical 
            thinking, and build the confidence to make a difference.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full">
            <button className="bg-[#d4a34d] text-[#1a2e4c] px-10 py-3.5 rounded-lg font-bold text-sm hover:bg-[#c3923d] shadow-[0_4px_0_rgb(163,123,56)] active:shadow-none active:translate-y-1 transition-all duration-150 w-64 md:w-auto">
              Schedule a Visit
            </button>
            
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-3.5 rounded-lg font-bold text-sm hover:bg-white/20 transition duration-300 w-64 md:w-auto">
              Learn More
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- STATS COUNTER SECTION --- */}
      <div className="bg-[#1a2e4c] py-16 md:py-24 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {statsData.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center group"
              >
                <span className="text-[#d4a34d] text-4xl md:text-6xl font-serif font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </span>
                <span className="text-gray-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;