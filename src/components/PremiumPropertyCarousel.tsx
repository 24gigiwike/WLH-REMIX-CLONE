import React, { useState, useEffect, useRef, ReactNode, TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Home, MapPin, ShieldCheck, Building, Sparkles } from "lucide-react";

interface CarouselSlide {
  id: number;
  url: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: ReactNode;
}

export default function PremiumPropertyCarousel() {
  const slides: CarouselSlide[] = [
    {
      id: 1,
      url: "https://res.cloudinary.com/dtkluxukm/image/upload/v1781854699/IMG-20260619-WA0056_a782ga.jpg",
      title: "Quality Homes. Prime Locations.",
      subtitle: "Exquisite architectural masterpieces tailored to your elevated lifestyle.",
      badge: "ULTRA LUXURY VILLA",
      icon: <Home className="h-4 w-4" />
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/dtkluxukm/image/upload/v1781854698/IMG-20260619-WA0054_imtgat.jpg",
      title: "Premium Residential Developments",
      subtitle: "Stunning contemporary family estates built with absolute investment certainty.",
      badge: "EXQUISITE ESTATE",
      icon: <Building className="h-4 w-4" />
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/dtkluxukm/image/upload/v1781854698/IMG-20260619-WA0055_onunf6.jpg",
      title: "Trusted Real Estate Solutions",
      subtitle: "Where visual ergonomic aesthetics match robust, long-term asset value.",
      badge: "INTERIOR COMFORT",
      icon: <ShieldCheck className="h-4 w-4" />
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/dtkluxukm/image/upload/v1781854698/IMG-20260618-WA0273_anbaag.jpg",
      title: "Bespoke Architectural Mastery",
      subtitle: "Unique builds designed by high-end architects to define luxury living.",
      badge: "CUSTOM BUILD",
      icon: <Sparkles className="h-4 w-4" />
    },
    {
      id: 5,
      url: "https://res.cloudinary.com/dtkluxukm/image/upload/v1781006504/IMG-20260606-WA0308_gj1gew.jpg",
      title: "Prime Investment Opportunities",
      subtitle: "High-yielding commercial assets positioned in highly sought-after urban corridors.",
      badge: "COMMERCIAL PORTFOLIO",
      icon: <MapPin className="h-4 w-4" />
    },
    {
      id: 6,
      url: "https://res.cloudinary.com/dtkluxukm/image/upload/v1781864653/siteraw_orcrxt.jpg",
      title: "Premium Modern Apartments",
      subtitle: "Breathtaking sky terraces and stylish apartment modules with outstanding facilities.",
      badge: "METROPOLITAN RESIDENCE",
      icon: <Building className="h-4 w-4" />
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const slideDuration = 4500; // 4.5 seconds

  // Handle slide changes
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Swiping support for touch devices
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPlaying(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
    setIsPlaying(true);
  };

  // Autoplay intervals and progress bar effect
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    // Set progress updates every 50ms
    const intervalStep = 50;
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (intervalStep / slideDuration) * 100;
      });
    }, intervalStep);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentIndex]);

  // Image preloading for ultra-smooth rendering
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.url;
    });
  }, []);

  return (
    <div 
      id="premium-showcase-carousel"
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="relative w-full h-[320px] xs:h-[380px] sm:h-[460px] md:h-[550px] lg:h-[650px] bg-slate-900 group">
        
        {/* Animated Slide Window */}
        <div 
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0.6, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.6, scale: 0.98 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background property image */}
              <img 
                src={slides[currentIndex].url} 
                alt={slides[currentIndex].title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Ultra-subtle luxury gradient overlay (approx 10-20% opacity maximum, keeping properties perfectly bright and vibrant) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

              {/* Slide Caption Text Overlays */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end">
                <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 md:px-16 pb-8 sm:pb-12 md:pb-16 text-white flex flex-col items-start gap-3 sm:gap-4">
                  
                  {/* Premium Golden Badge with slide icon */}
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#cfc070] text-slate-950 text-[10px] sm:text-xs font-bold font-montserrat uppercase tracking-widest rounded-full shadow-md leading-none">
                    {slides[currentIndex].icon}
                    {slides[currentIndex].badge}
                  </span>

                  {/* Caption Headline (Playfair Display) */}
                  <h2 className="font-playfair text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black max-w-4xl leading-[1.1] tracking-tight drop-shadow-xl text-white">
                    {slides[currentIndex].title}
                  </h2>

                  {/* Caption Subtitle */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-slate-100 max-w-2xl font-montserrat tracking-wide leading-relaxed drop-shadow">
                    {slides[currentIndex].subtitle}
                  </p>
                  
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide navigation controls (Desktop hover trigger, fully active on touch targets for mobile) */}
        <button
          id="carousel-btn-prev"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-transparent sm:bg-slate-950/40 backdrop-blur-none sm:backdrop-blur-md text-white hover:bg-[#cfc070] hover:border-[#cfc070] hover:text-slate-950 transition-all duration-300 shadow-md sm:opacity-0 sm:group-hover:opacity-100 transform active:scale-95"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
        </button>

        <button
          id="carousel-btn-next"
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-transparent sm:bg-slate-950/40 backdrop-blur-none sm:backdrop-blur-md text-white hover:bg-[#cfc070] hover:border-[#cfc070] hover:text-slate-950 transition-all duration-300 shadow-md sm:opacity-0 sm:group-hover:opacity-100 transform active:scale-95"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
        </button>

        {/* Small Navigation Indicators (Dots with gold highlight) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-25 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/50 backdrop-blur-sm border border-white/5">
          {slides.map((_, index) => (
            <button
              id={`carousel-dot-${index}`}
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "bg-[#cfc070] w-5 sm:w-6" 
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Golden Autoplay Timing Bar */}
        <div className="absolute bottom-0 left-0 h-[4px] bg-[#cfc070] z-30 transition-all ease-linear" style={{ width: `${progress}%` }} />

      </div>
    </div>
  );
}
