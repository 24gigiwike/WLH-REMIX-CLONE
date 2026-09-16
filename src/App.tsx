/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ShieldCheck, 
  MapPin, 
  Home,
  FileCheck, 
  Video, 
  Phone, 
  Mail, 
  User, 
  ArrowRight,
  Menu,
  X,
  MessageCircle,
  Eye,
  Target,
  Building,
  Wrench,
  Briefcase,
  Users,
  TrendingUp,
  HardHat,
  BookOpen
} from "lucide-react";
import { useState, FormEvent } from "react";
import PremiumPropertyCarousel from "./components/PremiumPropertyCarousel";
import BuildingConstructionSection from "./components/BuildingConstructionSection";
import BlogSection from "./components/BlogSection";

// Navigation menu anchors for seamless site exploration
const NAV_ITEMS = [
  { label: "Featured", href: "#featured-properties", icon: Home },
  { label: "About", href: "#about", icon: Users },
  { label: "Verification", href: "#verification", icon: ShieldCheck },
  { label: "Profile", href: "#profile", icon: Target },
  { label: "Construction", href: "#building-construction", icon: HardHat },
  { label: "Leadership", href: "#leadership", icon: Briefcase },
  { label: "Audit Registry", href: "#audit-registry", icon: FileCheck },
  { label: "Blog & Advisory", href: "#blog", icon: BookOpen },
  { label: "Contact", href: "#contact", icon: Phone },
];

// ==========================================
// AUDIT REGISTRY HARDWARE CONFIGURATION
// ==========================================
// Dynamically loaded properties managed via Pages CMS inside /src/data/audit_homes
const auditHomeModules = (import.meta as any).glob("./data/audit_homes/*.json", { eager: true });
const AUDIT_HOMES = Object.values(auditHomeModules)
  .map((mod: any) => mod.default || mod)
  .sort((a: any, b: any) => {
    const idA = String(a.id || "");
    const idB = String(b.id || "");
    return idA.localeCompare(idB, undefined, { numeric: true, sensitivity: "base" });
  });

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function App() {
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Consultation Request: Property Investment");
    const body = encodeURIComponent(
      `Hello WiseLiving Homes and Property LTD. Team,\n\nI want to request a property investment consultation.\n\nInvestment Profile:\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Phone: ${formData.phone}\n- Desired Investment Type: ${formData.type}\n\nPlease contact me at your earliest convenience.`
    );
    window.location.href = `mailto:info@wiselivinghomes.com.ng?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-white text-navy-regal flex flex-col selection:bg-orange-regal selection:text-navy-regal">
      {/* STICKY HEADER WITH GLOBAL NAVIGATION */}
      <header className="sticky top-0 z-50 w-full bg-[#1f8266] border-b border-[#cfc070]/25 shadow-md">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 flex flex-col gap-2">
          
          {/* Main Top Bar */}
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo and Brand */}
            <a href="#hero" className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4 shrink-0 group">
              <div className="flex items-center shrink-0 bg-white p-1 sm:p-1.5 rounded-lg shadow-sm border border-white/20">
                <img 
                  src="https://res.cloudinary.com/dtkluxukm/image/upload/v1788147995/wlh-logo_orubpv.jpg" 
                  alt="WiseLiving Homes and Property LTD. Logo"
                  className="h-8 xs:h-9 sm:h-11 md:h-12 w-auto object-contain rounded"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="h-8 xs:h-9 sm:h-11 md:h-12 w-[1.5px] bg-[#cfc070]/40 shrink-0 self-center" />

              <div className="flex flex-col justify-center select-none leading-none">
                <span className="font-playfair font-extrabold text-white text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl tracking-tight leading-[1.05] drop-shadow-sm group-hover:text-[#cfc070] transition-colors">
                  WiseLiving
                </span>
                <span className="font-montserrat font-bold text-[#cfc070] text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase leading-none mt-0.5 sm:mt-1">
                  HOMES AND PROPERTY LTD.
                </span>
              </div>
            </a>

            {/* Desktop Navigation Menu (for lg+ screens) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-2 xl:px-2.5 py-1.5 rounded-md text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    item.href === "#contact"
                      ? "bg-[#cfc070] text-[#0F172A] hover:bg-white shadow-sm ml-1"
                      : "text-white/90 hover:text-[#cfc070] hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right side Mobile/Tablet buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex lg:hidden items-center gap-1.5 bg-[#cfc070] text-[#0F172A] hover:bg-white px-3 py-1.5 rounded-md font-bold text-[11px] uppercase tracking-wider transition-colors shadow-sm"
              >
                <Phone className="w-3 h-3" />
                <span>Contact</span>
              </a>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white focus:outline-none transition-colors cursor-pointer"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#cfc070]" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

          </div>

          {/* Sub Bar: Trust and Value Badges (Desktop & Tablet) */}
          <div className="hidden md:flex items-center justify-between border-t border-[#cfc070]/20 pt-2 text-[11px] text-white/90">
            <div className="flex items-center gap-4 lg:gap-6 font-medium">
              <div className="flex items-center gap-1.5 text-white">
                <Home className="h-3.5 w-3.5 text-[#cfc070]" />
                <span className="font-montserrat">Quality Homes</span>
              </div>
              <div className="h-3 w-[1px] bg-[#cfc070]/30" />
              <div className="flex items-center gap-1.5 text-white">
                <MapPin className="h-3.5 w-3.5 text-[#cfc070]" />
                <span className="font-montserrat">Prime Locations</span>
              </div>
              <div className="h-3 w-[1px] bg-[#cfc070]/30" />
              <div className="flex items-center gap-1.5 text-white">
                <ShieldCheck className="h-3.5 w-3.5 text-[#cfc070]" />
                <span className="font-montserrat">Trusted Service</span>
              </div>
              <div className="h-3 w-[1px] bg-[#cfc070]/30" />
              <a href="#building-construction" className="flex items-center gap-1.5 text-[#cfc070] hover:text-white transition-colors">
                <HardHat className="h-3.5 w-3.5 text-[#cfc070]" />
                <span className="font-montserrat">Building & Construction</span>
              </a>
              <div className="h-3 w-[1px] bg-[#cfc070]/30" />
              <a href="#blog" className="flex items-center gap-1.5 text-[#cfc070] hover:text-white transition-colors">
                <BookOpen className="h-3.5 w-3.5 text-[#cfc070]" />
                <span className="font-montserrat">Landlord Advisory & Blog</span>
                <span className="bg-[#cfc070] text-[#0F172A] font-extrabold text-[9px] px-1.5 py-0.2 rounded-full uppercase leading-none">New</span>
              </a>
            </div>

            <div className="text-[10px] text-[#cfc070]/80 uppercase tracking-widest font-semibold hidden xl:block">
              Investment Certainty Bureau • Lagos, Nigeria
            </div>
          </div>

        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#186a53] border-t border-[#cfc070]/30 px-4 py-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    item.href === "#contact"
                      ? "bg-[#cfc070] text-[#0F172A]"
                      : "text-white hover:bg-white/10 hover:text-[#cfc070]"
                  }`}
                >
                  <item.icon className="w-4 h-4 text-[#cfc070]" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Quick Contact Actions inside mobile menu */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2">
              <a
                href="tel:09064468706"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#cfc070]" />
                <span>Call 09064468706</span>
              </a>
              <a
                href="https://wa.me/2349064468706"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-bold py-2.5 px-3 rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp Advisory</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full">
        
        {/* PREMIUM PROPERTY SHOWCASE CAROUSEL */}
        <div id="featured-properties" className="scroll-mt-24">
          <PremiumPropertyCarousel />
        </div>
        
        {/* SECTION 1: HERO (100% width block) */}
        <section id="hero" className="scroll-mt-24 relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center border-b border-art-gray py-24 px-6 md:px-12 overflow-hidden bg-slate-50">
          {/* Background Cover Image with high resolution luxury home placeholder */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 hover:scale-105"
            style={{ 
              backgroundImage: "url('https://res.cloudinary.com/dtkluxukm/image/upload/v1781662225/hero_cjemw0.jpg')",
            }}
          />
          
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="inline-block bg-[#1F8266] text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 mb-6 shadow-sm">
              REAL ESTATE COMPANY, LAGOS NIGERIA.
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black mb-6 leading-[1.2] text-black tracking-tight flex flex-col gap-1.5 sm:gap-2"
            >
              <span>ESTATE DEVELOPMENT.</span>
              <span>BUILDING AND CONSTRUCTION.</span>
              <span>FACILITIES MANAGEMENT.</span>
              <span>SALES AND MARKETING OF REAL ESTATE.</span>
              <span>REAL ESTATE CONSULTING.</span>
            </motion.h1>
            <p className="text-lg md:text-2xl text-black mb-10 font-medium italic max-w-2xl leading-relaxed">
              "We handle the uncertainty. You get the keys."
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center gap-3 bg-orange-regal text-navy-regal px-8 py-4 font-bold uppercase tracking-widest text-xs hover:brightness-110 shadow-lg shadow-orange-regal/20 transition-all active:scale-95"
            >
              Start Your Investment
              <ArrowRight className="w-4 h-4 text-navy-regal" />
            </a>
          </div>
        </section>

        {/* SECTION 2: FOUNDER & ABOUT US (100% width block) */}
        <section id="about" className="scroll-mt-24 w-full py-20 md:py-28 px-6 md:px-12 border-b border-white/10 bg-navy-regal text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
            
            {/* Founder column */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-regal shadow-md shrink-0">
                  <img 
                    src="https://res.cloudinary.com/dtkluxukm/image/upload/v1780635330/bod2_pdn3zp.jpg"
                    alt="Founder"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Vivian Ekanem</h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-regal">CEO & Co-Founder</p>
                </div>
              </div>
              <div>
                <p className="text-sm md:text-base leading-relaxed text-white/70 mb-4 font-light">
                  Vivian Ekanem is the founder of WiseLiving Homes and Property LTD., a real estate brand dedicated to helping Nigerians in the diaspora invest safely and confidently in property back home.
                </p>
                <p className="text-sm md:text-base italic font-semibold text-emerald-regal border-l-2 border-emerald-regal pl-4">
                  Trusted for helping Nigerians in the diaspora invest safely and confidently in property back home.
                </p>
              </div>
            </div>

            {/* About Us column */}
            <div className="flex flex-col h-full bg-[#1E293B] p-8 md:p-10 border border-white/5 rounded-lg shadow-xl">
              <h4 className="text-xs font-black uppercase tracking-widest text-orange-regal mb-4 relative flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-regal inline-block" />
                About Our Firm
              </h4>
              <p className="text-sm leading-relaxed text-white/80">
                At WiseLiving Homes and Property LTD., we specialize in offering secure property transactions with zero anxiety. Backed by ground-level site inspectors and professional legal partnerships, we perform complete property auditing so you can invest with bulletproof certainty from anywhere in the world.
              </p>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-white mb-3">Our Core Business Services</h5>
                <ul className="space-y-3.5 text-xs text-white/80">
                  <li className="flex gap-2">
                    <span className="font-extrabold text-orange-regal text-sm leading-none">1.</span>
                    <span>Real estate development, sales, leasing and management of residential and commercial properties.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-extrabold text-orange-regal text-sm leading-none">2.</span>
                    <span>Facilities management, maintenance, janitorial and property support services.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-extrabold text-[#cfc070] text-sm leading-none">3.</span>
                    <span>Property consulting, valuation, project management and general contracting services.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-medium text-white/60">
                <div>
                  <span className="block text-emerald-regal font-black">100% verified</span> on-site physical check
                </div>
                <div>
                  <span className="block text-orange-regal font-black">Verified records</span> certified by elite lawyers
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: THE PROBLEM & THE SOLUTION (100% width block) */}
        <section id="verification" className="scroll-mt-24 w-full py-20 md:py-28 px-6 md:px-12 border-b border-white/10 bg-navy-regal text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.90fr_1.1fr] gap-12 lg:gap-20 items-center">
            
            {/* Left side problem description */}
            <div className="flex flex-col justify-center">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-6">
                Distance.<br />Doubt.<br />Deception.
              </h2>
              <p className="text-sm md:text-base text-white/70 font-light border-l-2 border-orange-regal pl-5 max-w-md leading-relaxed">
                Nigerians abroad lose millions to fake listings, unconfirmed land titles, and ghost agents every year. We are here to dismantle this cycle.
              </p>
            </div>
            
            {/* Right side solutions list */}
            <div className="bg-[#1E293B] p-8 md:p-10 border border-white/5 rounded-lg shadow-xl flex flex-col justify-center space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-regal">Our Core Verification Protocol</h4>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Physical Verification", sub: "We stand on every block, document coordinate surveys, and walk the perimeter before you commit a single dollar.", color: "emerald-regal" },
                  { icon: FileCheck, title: "Legal Protection", sub: "Title verification, survey matching, and contract documentation managed by trusted, certified lawyers on ground.", color: "white" },
                  { icon: Video, title: "Progress Updates", sub: "Live raw video proof, drone feeds, and timestamps sent straight to your phone so you feel present every step of the way.", color: "orange-regal" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded shrink-0 bg-white/5 border border-white/10 mt-1 flex items-center justify-center shadow-sm">
                      <item.icon className={`w-4 h-4 text-${item.color}`} />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase text-white tracking-tight">{item.title}</p>
                      <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3.2: COMPANY PROFILE (100% width block) */}
        <section id="profile" className="scroll-mt-24 w-full py-20 md:py-28 px-6 md:px-12 border-b border-art-gray bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center md:text-left mb-16">
              <div className="inline-block bg-[#F1F5F9] text-emerald-regal text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-3 rounded-full border border-art-gray">
                Corporate Profile
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy-regal tracking-tight">
                Our Company Profile
              </h2>
              <p className="text-sm font-bold mt-2 uppercase tracking-wider bg-gradient-to-r from-[#1f8266] to-[#cfc070] bg-clip-text text-transparent w-fit">
                WiseLiving Homes and Property LTD.
              </p>
            </div>

            {/* Vision & Mission Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Vision */}
              <div className="p-8 border border-art-gray/80 rounded-xl bg-white flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#1f8266]/10 flex items-center justify-center text-[#1f8266]">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#1f8266] mb-2">Vision Statement</h3>
                  <p className="text-sm md:text-base text-navy-regal/85 leading-relaxed font-semibold italic">
                    "To be Nigeria’s most trusted real estate company, making decent, stress-free housing and property management accessible to every family and business."
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="p-8 border border-art-gray/80 rounded-xl bg-white flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#cfc070]/10 flex items-center justify-center text-[#cfc070]">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#cfc070] mb-2">Mission Statement</h3>
                  <p className="text-sm text-navy-regal/80 leading-relaxed font-light">
                    "To develop, lease, and manage residential and commercial properties with integrity, deliver professional facility solutions and maintenance, and provide property consulting and project management services. To treat every client, tenant, and investor like family through transparency, excellence, and measurable results."
                  </p>
                </div>
              </div>
            </div>

            {/* Core Objectives Section */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-navy-regal/60 mb-8 border-b border-art-gray pb-4">
                Core Objectives — Wise Living Homes & Properties Ltd
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    num: "01",
                    title: "Property Management & Leasing",
                    desc: "Deliver full-service leasing and management for residential and commercial assets, ensuring maximum value for landlords and peace of mind for tenants.",
                    icon: Building,
                    colorId: "emerald"
                  },
                  {
                    num: "02",
                    title: "Real Estate Development & Sales",
                    desc: "Develop, market, and sell quality residential and commercial property portfolios with professionalism and measurable results.",
                    icon: TrendingUp,
                    colorId: "gold"
                  },
                  {
                    num: "03",
                    title: "Facility Solutions & Maintenance",
                    desc: "Provide facilities management, maintenance, refurbishment, janitorial and property support services to preserve asset value and ensure operational efficiency.",
                    icon: Wrench,
                    colorId: "emerald"
                  },
                  {
                    num: "04",
                    title: "Property Consulting & Project Management",
                    desc: "Offer expert property consulting, valuation, and project management advisory services to guide clients in making sound real estate decisions.",
                    icon: Briefcase,
                    colorId: "gold"
                  },
                  {
                    num: "05",
                    title: "Client Trust & Relationships",
                    desc: "Build long-term trust with landlords, tenants, and investors through transparency, reliability, and client-focused service delivery.",
                    icon: Users,
                    colorId: "emerald"
                  },
                  {
                    num: "06",
                    title: "Strategic Growth & Investment",
                    desc: "Expand strategically into estate development and real estate investment opportunities that deliver sustainable value.",
                    icon: TrendingUp,
                    colorId: "gold"
                  }
                ].map((obj, i) => (
                  <div key={i} className="p-6 border border-art-gray rounded-lg bg-white hover:border-[#1f8266]/30 transition-all duration-300 flex flex-col justify-between group shadow-sm/30">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${obj.colorId === 'emerald' ? 'bg-[#1f8266]/10 text-[#1f8266]' : 'bg-[#cfc070]/10 text-[#cfc070]'}`}>
                          <obj.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black tracking-widest text-[#0F172A]/20">{obj.num}</span>
                      </div>
                      <h4 className="font-extrabold text-[#0F172A] text-sm tracking-tight mb-2 uppercase group-hover:text-[#1f8266] transition-colors">{obj.title}</h4>
                      <p className="text-xs text-navy-regal/60 leading-relaxed font-light">{obj.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3.3: ENGINEERING & BUILDING CONSTRUCTION DEPARTMENT (100% width block) */}
        <BuildingConstructionSection />

        {/* SECTION 3.5: BOARD OF DIRECTORS (100% width block) */}
        <section id="leadership" className="scroll-mt-24 w-full py-20 md:py-28 px-6 md:px-12 border-b border-art-gray bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center md:text-left mb-16">
              <div className="inline-block bg-[#F1F5F9] text-orange-regal text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-3 rounded-full border border-art-gray">
                Governance & Leadership
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy-regal tracking-tight">
                Board of Directors
              </h2>
              <p className="text-sm text-navy-regal/50 mt-2 max-w-xl">
                A distinguished panel of executives, consultants, and legal experts steering WiseLiving Homes and Property LTD. with absolute integrity and technical expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Mr Joe Samuel Udoh",
                  role: "Chairman",
                  image: "https://res.cloudinary.com/dtkluxukm/image/upload/v1780635330/bod1_s8q0xo.jpg"
                },
                {
                  name: "Consultant Vivian Ekanem",
                  role: "MD/CEO",
                  image: "https://res.cloudinary.com/dtkluxukm/image/upload/v1780635330/bod2_pdn3zp.jpg"
                },
                {
                  name: "Engr. Frankiln Akan",
                  role: "Structural Engineer",
                  image: "https://res.cloudinary.com/dtkluxukm/image/upload/v1781877355/Franklin0_tsmwjk.jpg"
                },
                {
                  name: "Barr Asuka Ndego",
                  role: "Lawyer",
                  image: "https://res.cloudinary.com/dtkluxukm/image/upload/v1786955481/wlhstaff_d4vsiv.jpg"
                },
                {
                  name: "Mrs Okeke Amarachi Grace",
                  role: "Director, Tenants and Landlord Relations",
                  image: "https://res.cloudinary.com/dtkluxukm/image/upload/v1780635330/bod3_yrwdyq.jpg"
                }
              ].map((member, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 border border-art-gray rounded-lg bg-[#F8FAFC] shadow-sm/30 hover:shadow-md transition-all duration-300">
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-emerald-regal shadow-md mb-4 shrink-0 bg-slate-100">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-extrabold text-navy-regal text-base tracking-tight mb-1">{member.name}</h3>
                  <p className="text-xs font-bold text-emerald-regal uppercase tracking-wider">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: VERIFIED INVESTMENTS PROOF (100% width block) */}
        <section id="audit-registry" className="scroll-mt-24 w-full py-20 md:py-28 px-6 md:px-12 border-b border-art-gray bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Header Control Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="text-center md:text-left">
                <div className="inline-block bg-[#F1F5F9] text-emerald-regal text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-3 rounded-full border border-art-gray">
                  Audit Registry
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-navy-regal tracking-tight">
                  Verified On-Ground Investments
                </h2>
                <p className="text-sm text-navy-regal/50 mt-2 max-w-xl font-light">
                  Real property portfolios successfully audited, cataloged, and managed with absolute transparency by our physical verification field experts.
                </p>
              </div>
            </div>

            {/* Audit Homes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {AUDIT_HOMES.map((prop) => (
                <div key={prop.id} className="relative group overflow-hidden border border-art-gray rounded-lg shadow-sm bg-[#F8FAFC]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    {prop.isVideo ? (
                      <div 
                        className="relative w-full h-full cursor-pointer"
                        onClick={() => prop.videoUrl && setPlayingVideoUrl(prop.videoUrl)}
                      >
                        {/* 
                          The videoUrl is pulled directly as a raw path string (e.g., '/images/filename.mp4').
                          Vite serves files in the public directory directly from the root-relative path.
                        */}
                        <video 
                          src={prop.videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/20">
                          {/* Custom play icon glassmorphic bubble */}
                          <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center text-navy-regal transform transition-transform group-hover:scale-110 duration-300">
                             <Video className="w-5 h-5 text-[#0F172A] fill-[#0F172A]/10" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* 
                        The image is pulled directly using the exact '/images/filename.jpg' path string 
                        stored in the JSON, serving it relative to the root without bundling or transformation.
                      */
                      <img 
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className="p-5 bg-white border-t border-art-gray">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#0F172A] tracking-tight uppercase">{prop.title}</span>
                      <span className="text-[9px] bg-[#E0F2FE] text-[#0369A1] font-extrabold px-2 py-0.5 rounded-full uppercase">{prop.status || "Verified"}</span>
                    </div>
                    <p className="text-[11px] font-medium text-emerald-regal uppercase tracking-wider mb-2">{prop.loc}</p>
                    <p className="text-xs text-navy-regal/60 leading-relaxed font-light">{prop.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4.5: BLOG & TENANCY ADVISORY (MODAL-ENABLED) */}
        <BlogSection />

        {/* SECTION 5: CONTACT & INQUIRY FORM (100% width block) */}
        <section id="contact" className="scroll-mt-24 w-full py-20 md:py-28 px-6 md:px-12 bg-[#0F172A] text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Contact details text */}
            <div className="flex flex-col justify-center h-full">
              <div className="inline-block bg-[#1E293B] text-orange-regal text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-4 rounded border border-white/5 w-fit">
                Consultation Request
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Ready for <span className="text-orange-regal block md:inline">Certainty?</span>
              </h2>
              <p className="text-white/75 text-sm md:text-base leading-relaxed font-light mb-8 max-w-md">
                Don't let distance compromise your hard-earned wealth. Reach out today for a prompt, verified initial assessment call.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="block text-orange-regal font-bold uppercase tracking-wider mb-1">Direct Lines</span>
                  <p className="text-white/80">09064468706</p>
                  <p className="text-white/60">07071969997</p>
                  <span className="block text-emerald-regal font-bold uppercase tracking-wider mt-3 mb-1">Email Info</span>
                  <p className="text-white/80">wiselivinghomespropertyltdgmail.com</p>
                </div>
                <div>
                  <span className="block text-emerald-regal font-bold uppercase tracking-wider mb-1">Office Location</span>
                  <p className="text-white/80">63, Ogunlana Drive,</p>
                  <p className="text-white/60">Surulere, Lagos, Nigeria</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form area */}
            <div className="bg-[#1E293B] p-8 md:p-10 rounded-lg border border-white/5 shadow-2xl">
              <h3 className="text-lg font-bold mb-6 uppercase tracking-tight text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-regal animate-pulse" />
                Investment Inquiry Panel
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-white/40">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 p-3 rounded text-sm text-white outline-none focus:bg-white/10 focus:border-orange-regal transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-white/40">Email (Abroad)</label>
                    <input 
                      type="email" 
                      placeholder="email@address.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 p-3 rounded text-sm text-white outline-none focus:bg-white/10 focus:border-orange-regal transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-white/40">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 / +44 / +234..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 p-3 rounded text-sm text-white outline-none focus:bg-white/10 focus:border-orange-regal transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-white/40">Investment Type</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Land, Residential"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 p-3 rounded text-sm text-white outline-none focus:bg-white/10 focus:border-orange-regal transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-orange-regal text-navy-regal py-3.5 rounded font-bold uppercase text-xs tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-orange-regal/10 mt-4"
                >
                  Request Consultation Call
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-art-gray bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-navy-regal/40 text-xs gap-4 font-light">
          <p>© 2026 WiseLiving Homes and Property LTD. All Rights Reserved.</p>
          <p className="uppercase tracking-[0.2em] font-medium text-[10px] text-emerald-regal">Integrity • Presence • Peace of mind</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/2349064468706"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Chat on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-white text-[#25D366]" />
      </a>

      {/* Video Modal Walkthrough Overlay */}
      {playingVideoUrl && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-300"
          onClick={() => setPlayingVideoUrl(null)}
        >
          {/* Main Modal container */}
          <div 
            className="relative w-full max-w-4xl bg-[#0F172A] rounded-xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal body click
          >
            {/* Header bar / Title / Close button */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#1E293B]/90">
              <span className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-2">
                <Video className="w-4 h-4 text-orange-regal" />
                Live Property Video Walkthrough
              </span>
              <button 
                onClick={() => setPlayingVideoUrl(null)}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                title="Close Video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Video Player wrapper */}
            <div className="relative aspect-video w-full bg-black">
              <video 
                src={playingVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

