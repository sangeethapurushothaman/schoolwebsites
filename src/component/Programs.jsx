import React from "react";
import { motion } from "framer-motion";
import { 
  PiBookOpenLight, 
  PiPaletteLight, 
  PiTrophyLight, 
  PiFlaskLight 
} from "react-icons/pi";

const Programs = () => {
  const programData = [
    {
      title: "STEM Excellence",
      icon: <PiBookOpenLight />,
      image: "/stem_class.png", // Replace with your image path
      desc: "Advanced programs in science, technology, engineering and mathematics with hands-on lab experiences."
    },
    {
      title: "Arts & Humanities",
      icon: <PiPaletteLight />,
      image: "/school_art.png", // Replace with your image path
      desc: "Nurturing creativity through visual arts, music, theater, and a comprehensive liberal arts curriculum."
    },
    {
      title: "Athletics",
      icon: <PiTrophyLight />,
      image: "/school_sports.png", // Replace with your image path
      desc: "Competitive sports programs that build teamwork, discipline, and physical wellness."
    },
    {
      title: "Innovation Lab",
      icon: <PiFlaskLight />,
      image: "/school_lab.png", // Replace with your image path
      desc: "Cutting-edge maker spaces and robotics programs where students bring ideas to life."
    }
  ];

  return (
    <section id="programs"className="py-20 bg-[#DFE0E1]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-[#d4a34d] font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-3">
            Our Programs
          </p>
          <h2 className="text-[#1a2e4c] text-4xl md:text-5xl font-serif font-bold">
            Discover Your <span className="text-[#d4a34d]">Path</span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>

              {/* Card Content */}
              <div className="p-8 space-y-4">
                <div className="text-[#d4a34d] text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-[#1a2e4c] text-xl font-bold font-serif">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;