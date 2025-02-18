import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center px-4 py-12 mt-16 bg-gradient-to-b from-[#004b8f] via-[#002B5B] to-[#001B3B] -mb-1">
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
              backfaceVisibility: 'hidden'
            }}
            loading="eager"
          />
        </picture>
        
        {/* Content Container */}
        <div className="relative min-h-[650px] sm:aspect-[16/10] flex flex-col items-center justify-center text-center p-4 sm:p-8">
          {/* Badge */}
          <div className="mb-6 sm:mb-8 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm sm:text-base font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] whitespace-nowrap">
            ✨ #1 Home Appliance Solutions in Chennai
          </div>
          
          {/* Main Title */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-[28px] sm:text-4xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] font-poppins leading-[1.15] sm:leading-tight max-w-[90%] sm:max-w-full mx-auto">
              Experts in Tech That<br></br>
              Keeps You Cool and Clean
            </h1>
          </div>
            
          <h2 className="text-[20px] sm:text-2xl md:text-4xl font-black mb-8 sm:mb-12 text-white tracking-wide font-poppins
                       bg-white/10 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl
                       border border-white/20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]
                       transition-all duration-300
                       max-w-[90%] sm:max-w-full mx-auto leading-[1.2] sm:leading-tight">
            AC & Appliance Repair and<br className="block sm:hidden"/> Rentals in Chennai
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 w-full max-w-[95%] sm:max-w-xl mx-auto mt-8">
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium font-poppins w-full sm:w-auto
                       bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] rounded-lg
                       hover:from-[#38BDF8] hover:to-[#0EA5E9] transition-all duration-300
                       shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
            >
              <div className="relative flex items-center justify-center gap-2 text-white whitespace-nowrap">
                <span>Book Service Now</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </button>
            <button
              onClick={() => {
                const productsSection = document.getElementById('products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium font-poppins w-full sm:w-auto
                       border border-white/30 hover:border-white/50 rounded-lg
                       bg-white/10 hover:bg-white/20 backdrop-blur-md
                       transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-2 text-white whitespace-nowrap">
                <span>Explore Products</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;