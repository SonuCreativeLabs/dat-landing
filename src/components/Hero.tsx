import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center px-4 py-4 mt-20 bg-gradient-to-b from-[#001B3B] via-[#001B3B] to-[#001B3B]">
      <div className="container max-w-[1400px] relative rounded-[2.5rem] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-[2.5rem]"
          style={{
            backgroundImage: 'url("https://ik.imagekit.io/projectassets/Background%20PNGs/2BG.png?updatedAt=1739620681478")'
          }}
        />
        
        {/* Content Container */}
        <div className="relative aspect-[16/10] flex flex-col items-center justify-center text-center p-8">
          {/* Top Badge */}
          <div className="bg-[#003366] px-6 py-2.5 rounded-full mb-12 border border-white/20 shadow-lg backdrop-blur-sm">
            <p className="text-lg font-semibold flex items-center gap-2 text-white font-sans">
              <span className="text-xl">✨</span> #1 Home Appliance Solutions in Chennai
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-7xl font-black mb-8 text-white tracking-tight drop-shadow-xl font-sans leading-tight">
            Experts in Tech That Keeps<br/>
            <span className="text-[#003366] bg-white/90 px-4 py-2 rounded-lg backdrop-blur-sm">You Cool and Clean</span>
          </h1>
          <h2 className="text-3xl font-bold mb-12 text-white drop-shadow-lg font-sans">
            AC & Appliance Repair and Rentals in Chennai
          </h2>

          {/* CTA Buttons */}
          <div className="flex gap-6">
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#003366] text-white px-8 py-4 rounded-full text-xl font-bold 
                       hover:bg-[#002B5B] transition-all duration-300 flex items-center gap-2 
                       border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl
                       backdrop-blur-sm font-sans"
            >
              Book Service Now <span className="text-2xl">→</span>
            </button>
            <button
              onClick={() => {
                const productsSection = document.getElementById('products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-[#001B3B] px-8 py-4 rounded-full text-xl font-bold 
                       hover:bg-white/90 transition-all duration-300 flex items-center gap-2 
                       shadow-lg hover:shadow-xl backdrop-blur-sm font-sans"
            >
              Explore Products <span className="text-2xl">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;