import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center px-4 py-4 mt-20 bg-transparent">
      <div className="container max-w-[1400px] relative rounded-[2.5rem] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-[2.5rem]"
          style={{
            backgroundImage: 'url("https://ik.imagekit.io/projectassets/Background%20PNGs/2BG.png?updatedAt=1739620681478")',
            objectFit: 'cover'
          }}
        />
        
        {/* Content Container */}
        <div className="relative aspect-[16/10] flex flex-col items-center justify-center text-center text-white p-8">
          {/* Top Badge */}
          <div className="bg-[#0891B2]/80 backdrop-blur-sm px-6 py-2 rounded-full mb-12 shadow-xl">
            <p className="text-lg font-semibold flex items-center gap-2 text-white [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)]">
              <span className="text-xl">✨</span> #1 Home Appliance Solutions in Chennai
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-7xl font-extrabold mb-8 [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)] tracking-tight">
            Experts in Tech That Keeps<br/>You Cool and Clean
          </h1>
          <h2 className="text-3xl font-medium mb-12 [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)] text-white/90">
            AC & Appliance Repair and Rentals in Chennai
          </h2>

          {/* CTA Buttons */}
          <div className="flex gap-6">
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-[#0891B2] px-8 py-4 rounded-full text-xl font-semibold hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Book Service Now <span className="text-2xl">→</span>
            </button>
            <button
              onClick={() => {
                const productsSection = document.getElementById('products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#0891B2] border-2 border-white text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-[#0891B2]/90 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
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