import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Star, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { Container, Section } from "./Container";
import { HERO_IMAGES } from "@/config/assets";

const ParticleEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          opacity: 0,
          scale: Math.random() * 0.5 + 0.5,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        }}
        animate={{ 
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.2, 1],
          x: [
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth
          ],
          y: [
            Math.random() * window.innerHeight,
            Math.random() * window.innerHeight,
            Math.random() * window.innerHeight
          ],
          rotate: 360
        }}
        transition={{ 
          duration: 20 + Math.random() * 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          filter: "blur(1px)"
        }}
      />
    ))}
  </div>
);

const FloatingIcons = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[
      { icon: <Star className="w-full h-full" />, size: "w-8 h-8" },
      { icon: <Sparkles className="w-full h-full" />, size: "w-6 h-6" },
      { icon: <Zap className="w-full h-full" />, size: "w-7 h-7" }
    ].map((item, index) => (
      [...Array(4)].map((_, i) => (
        <motion.div
          key={`${index}-${i}`}
          initial={{ 
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            rotate: 360
          }}
          transition={{ 
            duration: 15 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          className={`absolute ${item.size} text-white/10`}
        >
          {item.icon}
        </motion.div>
      ))
    ))}
  </div>
);

const GradientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      animate={{
        background: [
          "radial-gradient(600px circle at 0% 0%, rgba(14, 165, 233, 0.15), transparent 80%)",
          "radial-gradient(600px circle at 100% 0%, rgba(14, 165, 233, 0.15), transparent 80%)",
          "radial-gradient(600px circle at 100% 100%, rgba(14, 165, 233, 0.15), transparent 80%)",
          "radial-gradient(600px circle at 0% 100%, rgba(14, 165, 233, 0.15), transparent 80%)",
          "radial-gradient(600px circle at 0% 0%, rgba(14, 165, 233, 0.15), transparent 80%)",
        ]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute inset-0"
    />
  </div>
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20
  });

  // SEO metadata setup
  useEffect(() => {
    // Update document title
    document.title = "Dreams Air Tech - Best AC & Appliance Service in Chennai | Sales, Service & Rentals";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Chennai's leading air conditioner and home appliance service provider. Expert AC repair, maintenance, and rental services. 24/7 support for refrigerator, washing machine, and water purifier solutions.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Chennai's leading air conditioner and home appliance service provider. Expert AC repair, maintenance, and rental services. 24/7 support for refrigerator, washing machine, and water purifier solutions.";
      document.head.appendChild(meta);
    }

    // Update keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "AC service Chennai, air conditioner repair, appliance rental Chennai, refrigerator service, washing machine repair, water purifier maintenance, home appliance solutions, 24/7 AC support Chennai, Dreams Air Tech");
    } else {
      const meta = document.createElement('meta');
      meta.name = "keywords";
      meta.content = "AC service Chennai, air conditioner repair, appliance rental Chennai, refrigerator service, washing machine repair, water purifier maintenance, home appliance solutions, 24/7 AC support Chennai, Dreams Air Tech";
      document.head.appendChild(meta);
    }

    // Update Open Graph tags
    const updateOrCreateMeta = (property: string, content: string) => {
      const meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        const newMeta = document.createElement('meta');
        newMeta.setAttribute("property", property);
        newMeta.setAttribute("content", content);
        document.head.appendChild(newMeta);
      }
    };

    updateOrCreateMeta("og:title", "Dreams Air Tech - Premium Appliance Services in Chennai");
    updateOrCreateMeta("og:description", "Expert AC and home appliance solutions in Chennai. Professional installation, maintenance, and 24/7 support at competitive prices.");
    updateOrCreateMeta("og:type", "website");
    updateOrCreateMeta("og:url", window.location.href);
    updateOrCreateMeta("og:site_name", "Dreams Air Tech");

    // Add Twitter Card tags
    updateOrCreateMeta("twitter:card", "summary_large_image");
    updateOrCreateMeta("twitter:title", "Dreams Air Tech - Premium Appliance Services in Chennai");
    updateOrCreateMeta("twitter:description", "Expert AC and home appliance solutions in Chennai. Professional installation, maintenance, and 24/7 support at competitive prices.");

    // Add structured data for local business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Dreams Air Tech",
      "image": "https://ik.imagekit.io/projectassets/Assets/DAT%20NEW%20LOGO-04.png?updatedAt=1737985280218",
      "description": "Chennai's leading air conditioner and home appliance service provider.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Your Street Address",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "Your Postal Code",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "Your Latitude",
        "longitude": "Your Longitude"
      },
      "url": window.location.href,
      "telephone": "+919043726424",
      "priceRange": "₹₹",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    };

    const scriptTag = document.querySelector('#structured-data');
    if (scriptTag) {
      scriptTag.textContent = JSON.stringify(structuredData);
    } else {
      const script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const normalizedX = (e.clientX - centerX) / rect.width;
      const normalizedY = (e.clientY - centerY) / rect.height;
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#0EA5E9] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-[url('/appliances-pattern.svg')] bg-repeat bg-[length:200px_200px] rotate-3"
        />
      </div>

      <ParticleEffect />
      <FloatingIcons />
      <GradientOrbs />

      {/* Main Content */}
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6 lg:space-y-10 max-w-2xl text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <motion.span 
                className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full text-xs lg:text-sm font-medium border border-white/20 shadow-xl inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Sparkles className="w-3 h-3 lg:w-4 lg:h-4" />
                #1 Home Appliance Solutions in Chennai
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              <span className="inline-block">Expert Home</span>
              <br />
              <span className="text-sky-100 relative inline-block bg-gradient-to-r from-white to-sky-100 bg-clip-text text-transparent">
                Appliance Solutions
                <motion.div
                  className="absolute -right-6 lg:-right-8 -top-1 text-yellow-400"
                  animate={{ rotate: [0, 10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.div>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base lg:text-xl text-white/90 max-w-xl leading-relaxed mx-auto lg:mx-0"
            >
              Chennai's trusted partner for AC, Refrigerator, Washing Machine, and Water Purifier solutions. Professional installation, maintenance, and 24/7 support at competitive prices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0EA5E9] rounded-xl font-semibold overflow-hidden text-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sky-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative">Book Service Now</span>
                <ArrowRight className="w-6 h-6 relative group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection("products")}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-sky-600/20 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold overflow-hidden text-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  className="absolute inset-0 bg-sky-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative">Explore Products</span>
                <ArrowRight className="w-6 h-6 relative group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Logo */}
          <div ref={containerRef} className="flex-1 relative w-full min-h-[300px] lg:min-h-[500px] flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000
              }}
              className="relative w-full max-w-lg lg:max-w-xl"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-500 opacity-20 blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <img 
                  src="https://ik.imagekit.io/projectassets/Assets/DAT%20NEW%20LOGO-04.png?updatedAt=1737985280218" 
                  alt="Dreams Air Tech - Best AC Service in Chennai"
                  width={600}
                  height={450}
                  className="w-full h-auto select-none object-contain relative transform hover:scale-105 transition-transform duration-300 max-w-[80%] mx-auto"
                  draggable="false"
                  loading="eager"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;