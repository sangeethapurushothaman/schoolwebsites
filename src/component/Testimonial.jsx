import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiDoubleQuotesL } from "react-icons/ri";

const Testimonials = () => {
  // State to track if the mouse is hovering over the container
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      quote: "Idea Academy transformed my daughter's confidence. The teachers truly care about every student's growth.",
      name: "Sarah Mitchell",
      role: "Parent, Class of 2025"
    },
    {
      quote: "The STEM program prepared me incredibly well for college. I felt years ahead of my peers in university.",
      name: "James Rodriguez",
      role: "Alumni, Class of 2023"
    },
    {
      quote: "The community here is unlike any other school. Students support each other and celebrate every achievement.",
      name: "Dr. Emily Chen",
      role: "Faculty Member"
    },
    // Duplicated items for seamless loop
    {
      quote: "The community here is unlike any other school. Students support each other and celebrate every achievement.",
      name: "Dr. Emily Chen",
      role: "Faculty Member"
    },
    {
      quote: "The community here is unlike any other school. Students support each other and celebrate every achievement.",
      name: "Dr. Emily Chen",
      role: "Faculty Member"
    },
  ];

  return (
    <section id="testimonial" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <p className="text-[#d4a34d] font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-3">
          Testimonials
        </p>
        <h2 className="text-[#1a2e4c] text-4xl md:text-5xl font-serif font-bold">
          Voices of Our <span className="text-[#d4a34d]">Community</span>
        </h2>
      </div>

      <div 
        className="flex cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-8 flex-nowrap"
          animate={{
            // The animation stops if isHovered is true
            x: isHovered ? undefined : ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              // Small animation when hovering on a specific card
              whileHover={{ 
                scale: 1.05, 
                rotate: 1,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" 
              }}
              className="w-[350px] md:w-[450px] flex-shrink-0 p-10 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col justify-between transition-colors hover:border-[#d4a34d]/30"
            >
              <div>
                <RiDoubleQuotesL className="text-[#d4a34d] text-4xl mb-6 opacity-40" />
                <p className="text-gray-600 italic leading-relaxed mb-8">
                  "{item.quote}"
                </p>
              </div>
              
              <div>
                <h4 className="text-[#1a2e4c] font-bold text-lg">
                  {item.name}
                </h4>
                <p className="text-[#d4a34d] text-xs font-semibold uppercase tracking-wider mt-1">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;