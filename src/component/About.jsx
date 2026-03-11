import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Container uses items-stretch by default in Tailwind flexbox */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
          
          {/* LEFT SIDE: Image Column */}
          <div className="w-full lg:w-1/2 flex">
            {/* The wrapper div is set to h-full (full height of its parent flex item) */}
            <div className="relative w-full h-full">
              <img 
                src="/about.png" // Replace with your actual image path
                alt="Students studying" 
                // w-full h-full ensures the image itself fills the stretched container
                // object-cover is critical—it crops the image automatically without stretching it
                className="rounded-2xl shadow-2xl w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* RIGHT SIDE: Content Column */}
          {/* This column determines the overall height of the section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 py-4">
            <p className="text-[#d4a34d] font-bold tracking-[0.2em] text-xs uppercase">
              About Us
            </p>
            
            <h2 className="text-[#1a2e4c] text-4xl md:text-5xl font-serif font-bold leading-tight">
              A Legacy of <br /> 
              <span className="text-[#d4a34d]">Academic Excellences</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                Founded with a vision to cultivate lifelong learners, <span className="font-semibold text-[#1a2e4c]">Idea Academy</span> combines rigorous academics 
                with a holistic approach to education. Our dedicated faculty, state-of-the-art facilities, 
                and inclusive community create the perfect environment for every student to thrive.
              </p>
              
              <p>
                We believe education is more than textbooks — it's about developing character, 
                creativity, and the confidence to navigate an ever-changing world.
              </p>
            </div>

            <div className="pt-4">
               <button className="text-[#1a2e4c] font-bold border-b-2 border-[#d4a34d] pb-1 hover:text-[#d4a34d] transition-colors">
                 Learn More About Our Values
               </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;