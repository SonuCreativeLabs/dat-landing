import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center px-4 py-12 mt-16 bg-gradient-to-b from-[#003366] via-[#002B5B] to-[#001B3B]">
      <div className="container max-w-[1400px] relative rounded-[2.5rem] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-[2.5rem]"
          style={{
            backgroundImage: 'url("https://ik.imagekit.io/projectassets/Background%20PNGs/2BG.png?updatedAt=1739620681478&tr=w-1400,h-800,f-auto")',
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          role="img"
          aria-label="Background pattern"
        />
        
        {/* Content Container */}
        <div className="relative aspect-[16/10] flex flex-col items-center justify-center text-center p-8">
          {/* Badge */}
          <div className="mb-8 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            ✨ #1 Home Appliance Solutions in Chennai
          </div>
          
          {/* Main Title */}
          <h1 className="text-7xl font-black mb-8 text-white tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] font-poppins leading-tight">
            Experts in Tech That Keeps<br/>
            <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-xl inline-block mt-2 border border-white/20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              You Cool and Clean
            </span>
          </h1>
          <h2 className="text-4xl font-black mb-12 text-white tracking-wide font-poppins
                       px-6 py-3 rounded-xl
                       drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]
                       [text-shadow:_2px_2px_8px_rgba(14,165,233,0.8),_0_4px_12px_rgba(0,0,0,0.8)]
                       hover:[text-shadow:_2px_2px_12px_rgba(14,165,233,0.9),_0_4px_16px_rgba(0,0,0,0.9)]
                       transition-all duration-300">
            AC & Appliance Repair and Rentals in Chennai
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-xl mx-auto">
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-3.5 text-base font-medium font-poppins w-full sm:w-auto min-w-[200px]
                       bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] rounded-lg
                       hover:from-[#38BDF8] hover:to-[#0EA5E9] transition-all duration-300
                       shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
            >
              <div className="relative flex items-center justify-center gap-2 text-white">
                <span>Book Service Now</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </button>
            <button
              onClick={() => {
                const productsSection = document.getElementById('products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-3.5 text-base font-medium font-poppins w-full sm:w-auto min-w-[200px]
                       border border-white/30 hover:border-white/50 rounded-lg
                       bg-white/10 hover:bg-white/20 backdrop-blur-md
                       transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-2 text-white">
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