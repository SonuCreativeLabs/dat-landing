import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center px-4 py-4 mt-20">
      <div className="container max-w-[1400px] relative rounded-[2.5rem] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-[2.5rem] bg-[#0891B2]"
          style={{
            backgroundImage: 'url("https://ik.imagekit.io/projectassets/Background%20PNGs/2BG.png?updatedAt=1739620681478")',
            objectFit: 'cover'
          }}
        />
        
        {/* Very Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 rounded-[2.5rem]" />

        {/* Content Container */}
        <div className="relative aspect-[16/10] flex flex-col items-center justify-center text-center text-white p-8">
          {/* Top Badge */}
          <div className="bg-[#0891B2]/80 backdrop-blur-sm px-6 py-2 rounded-full mb-12 shadow-xl">
            <p className="text-lg font-semibold flex items-center gap-2 text-white [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)]">
              <span className="text-xl">✨</span> #1 Home Appliance Solutions in Chennai
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl font-bold mb-4 [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
            Dreams Air Tech
          </h1>
          <h2 className="text-5xl font-bold mb-6 [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
            AC & Appliance Repair
          </h2>
          <h3 className="text-4xl font-medium mb-12 [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
            and Rentals in Chennai
          </h3>

          {/* Description */}
          <p className="text-xl max-w-[800px] mb-12 font-medium [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)]">
            Expert solutions for ACs, refrigerators, washing machines, and water purifiers. 
            We offer professional installation, maintenance, and 24/7 support at competitive prices.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6">
            <Link
              href="/contact"
              className="bg-white text-[#0891B2] px-8 py-4 rounded-full text-xl font-semibold hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = 'https://wa.me/+919176333334';
              }}
            >
              Book Service Now <span className="text-2xl">→</span>
            </Link>
            <Link
              href="/products"
              className="bg-[#0891B2] border-2 border-white text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-[#0891B2]/90 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/products';
              }}
            >
              Explore Products <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;