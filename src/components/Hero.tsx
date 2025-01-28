import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate normalized mouse position (-0.5 to 0.5)
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
    <section className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-gradient-to-b from-[#0EA5E9] to-[#0284C7]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0EA5E9]/10 via-[#0284C7]/30 to-[#0EA5E9]/80" />
        
        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[url('/appliances-pattern.svg')] bg-repeat bg-[length:200px_200px]"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360
            }}
            transition={{ 
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-8 h-8 text-white/20"
          >
            <div className="w-full h-full rounded-full bg-current" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-full">
        <div className="grid lg:grid-cols-2 gap-16 h-full items-center py-24">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium">
                #1 Home Appliance Solutions in Chennai
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Expert Home Appliance
              <br />
              <span className="text-sky-100 relative">
                Sales, Service & Rentals
                <motion.div
                  className="absolute -right-8 top-0 text-yellow-400"
                  animate={{ rotate: [0, 10, 0] }}
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
              className="text-lg text-white/90 max-w-xl leading-relaxed"
            >
              Chennai's trusted partner for AC, Refrigerator, Washing Machine, and Water Purifier solutions. Professional installation, maintenance, and 24/7 support at competitive prices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0EA5E9] rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Service Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-sky-600/20 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-sky-600/30 transition-all duration-300"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D AC */}
          <div className="relative w-full h-full min-h-[600px] flex items-center justify-center">
            <motion.div
              ref={containerRef}
              style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-3xl mx-auto"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-400/30 to-blue-500/20 blur-3xl rounded-[32px]" />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 via-blue-500/20 to-blue-400/10 blur-2xl rounded-[32px]" />
              
              {/* AC Container */}
              <div className="relative transform-gpu">
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src="/ac-realistic.png" 
                    alt="3D Air Conditioner" 
                    width={800}
                    height={600}
                    className="w-full h-auto select-none drop-shadow-2xl"
                    draggable="false"
                  />
                </motion.div>
                
                {/* Cool Air Effect */}
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-full h-80 overflow-hidden">
                  {/* Primary Airflow */}
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      y: [0, 100],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      background: 'linear-gradient(180deg, rgba(148, 214, 255, 0.3) 0%, rgba(148, 214, 255, 0) 100%)',
                      filter: 'blur(8px)',
                    }}
                  />
                  
                  {/* Secondary Airflow Particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-0 w-16 h-16"
                      initial={{ 
                        opacity: 0,
                        x: Math.random() * 300 - 150,
                        y: -20
                      }}
                      animate={{ 
                        opacity: [0, 0.3, 0],
                        x: Math.random() * 400 - 200,
                        y: 200,
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "linear"
                      }}
                      style={{
                        background: 'radial-gradient(circle, rgba(148, 214, 255, 0.2) 0%, rgba(148, 214, 255, 0) 70%)',
                        filter: 'blur(4px)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;