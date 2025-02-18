import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center px-4 py-12 sm:py-16 mt-16 bg-gradient-to-b from-[#004b8f] via-[#003D7A] to-[#003366] relative overflow-hidden z-[1]">
      <div className="container max-w-[1400px] relative rounded-[2.5rem] overflow-hidden">
        {/* Background Image with Picture element for responsive images */}
        <picture className="absolute inset-0 w-full h-full">
          {/* Mobile image - cropped and optimized for smaller screens */}
          <source
            media="(max-width: 640px)"
            srcSet="https://ik.imagekit.io/projectassets/Background%20PNGs/2BG.png?updatedAt=1739620681478&tr=w-640,h-800,fo-center,c-maintain_ratio"
          />
          {/* Tablet image */}
          <source
            media="(max-width: 1024px)"
            srcSet="https://ik.imagekit.io/projectassets/Background%20PNGs/2BG.png?updatedAt=1739620681478&tr=w-1024,h-800,fo-center,c-maintain_ratio"
          />
          {/* Desktop image */}
          <img
            src="https://ik.imagekit.io/projectassets/Background%20PNGs/2BG.png?updatedAt=1739620681478&tr=w-1400,h-800,fo-center"
            alt="Background pattern"
            className="w-full h-full object-cover sm:object-center object-[90%_center] rounded-[2.5rem]"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              filter: 'brightness(1.1) contrast(1.05)'
            }}
            loading="eager"
          />
        </picture>

        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 rounded-[2.5rem]"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,27,59,0.1) 0%, rgba(0,27,59,0.2) 100%)',
            backdropFilter: 'blur(0px)'
          }}
        />
        
        {/* Content Container */}
        <div className="relative min-h-[650px] sm:aspect-[16/10] flex flex-col items-center justify-center text-center p-4 sm:p-8">
          {/* Main Title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 sm:mb-6 max-w-[90%] sm:max-w-4xl mx-auto"
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white 
                          tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] font-poppins 
                          leading-[1.2] sm:leading-tight flex flex-col items-center"
            >
              <span className="mb-2">Experts in Tech That</span>
              <span className="whitespace-nowrap">Keeps You Cool and Clean</span>
            </h1>
          </motion.div>
            
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 
                     text-white tracking-wide font-poppins
                     bg-white/10 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl
                     border border-white/20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]
                     transition-all duration-300 inline-block"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:whitespace-nowrap">
              <span className="block sm:inline">AC & Appliance Repair</span>
              <span className="hidden sm:inline">&nbsp;</span>
              <span className="block sm:inline">and Rentals in Chennai</span>
            </div>
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1,
              delay: 0.4
            }}
            className="flex flex-row items-center justify-center flex-wrap
                     gap-3 sm:gap-6 w-full max-w-[320px] sm:max-w-xl mx-auto mt-6 sm:mt-8"
          >
            {/* Book Service Button */}
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17
              }}
              className="group relative px-4 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-medium font-poppins
                       min-w-[145px] sm:min-w-[180px]
                       bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] rounded-lg
                       hover:from-[#38BDF8] hover:to-[#0EA5E9] 
                       shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]
                       transition-[background,shadow] duration-300"
            >
              <div className="relative flex items-center justify-center gap-2 text-white whitespace-nowrap">
                <span>Book Service Now</span>
                <motion.span 
                  className="transition-transform duration-300"
                  whileHover={{ x: 4 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                >→</motion.span>
              </div>
            </motion.button>

            {/* Explore Products Button */}
            <motion.button
              onClick={() => {
                const productsSection = document.getElementById('products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17
              }}
              className="group relative px-4 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-medium font-poppins
                       min-w-[145px] sm:min-w-[180px]
                       border-2 border-white/30 hover:border-white/40 rounded-lg
                       bg-white/10 backdrop-blur-[2px]
                       hover:bg-white/15
                       shadow-lg hover:shadow-xl
                       overflow-hidden
                       transition-[border,background,shadow] duration-300"
            >
              <div className="flex items-center justify-center gap-2 text-white whitespace-nowrap">
                <span>Explore Products</span>
                <motion.span 
                  className="transition-transform duration-300"
                  whileHover={{ x: 4 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                >→</motion.span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;