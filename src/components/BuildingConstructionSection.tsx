import { 
  Building2, 
  Compass, 
  Layers, 
  Hammer, 
  Wrench, 
  HardHat, 
  ShieldCheck, 
  Clock, 
  Award, 
  TrendingUp, 
  ArrowUpRight,
  MapPin
} from "lucide-react";

export default function BuildingConstructionSection() {
  const services = [
    {
      num: "01",
      title: "Building Construction",
      desc: "Full-scale construction of luxury residential estates, private villas, and commercial facilities executed with structural precision and high-grade materials.",
      icon: Building2
    },
    {
      num: "02",
      title: "Structural Engineering",
      desc: "Comprehensive structural design, foundation analysis, load calculations, and reinforcement engineering by licensed structural specialists.",
      icon: Compass
    },
    {
      num: "03",
      title: "Project Management",
      desc: "End-to-end site administration, strict schedule adherence, budget governance, and quality compliance from initial concept through project handover.",
      icon: Layers
    },
    {
      num: "04",
      title: "Renovation & Remodeling",
      desc: "Structural modifications, spatial reconfiguration, contemporary interior retrofitting, and high-value architectural revitalization.",
      icon: Hammer
    },
    {
      num: "05",
      title: "Civil Works",
      desc: "Earthworks, specialized foundation engineering, retaining structures, and heavy civil construction engineered for long-term stability.",
      icon: Wrench
    },
    {
      num: "06",
      title: "Infrastructure Development",
      desc: "Master-planned site utilities, paved arterial access roads, stormwater drainage networks, and integrated estate systems.",
      icon: HardHat
    }
  ];

  const standards = [
    {
      title: "Quality & Durability",
      desc: "Rigorous material selection, tested concrete grades, and craftsmanship engineered to endure.",
      icon: Award
    },
    {
      title: "Engineering & Safety",
      desc: "Certified structural engineers on site, strict site safety protocols, and zero-compromise compliance.",
      icon: ShieldCheck
    },
    {
      title: "Cost-Effectiveness",
      desc: "Accurate bill of quantities, value engineering, and transparent procurement without quality trade-offs.",
      icon: TrendingUp
    },
    {
      title: "Timely Delivery",
      desc: "Milestone-driven project scheduling, proactive supply-chain management, and predictable handovers.",
      icon: Clock
    }
  ];

  return (
    <section id="building-construction" className="scroll-mt-24 w-full py-20 lg:py-28 px-6 md:px-12 bg-white text-slate-900 border-b border-art-gray">
      <div className="max-w-7xl mx-auto">

        {/* Top Eyebrow & Category */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[#1F8266]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1F8266]">
            Engineering & Building Construction Department
          </span>
        </div>

        {/* Section Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-14 border-b border-slate-200">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-[1.1] mb-6">
              Engineering Expertise. <br />
              <span className="text-[#1F8266]">
                Professional Construction Solutions.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              The Engineering & Building Construction Department of Wise-Living Homes and Property Ltd provides professional building and construction solutions, combining engineering expertise, quality workmanship, safety, and effective project management.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-7 rounded-none">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Our Core Commitment
            </div>
            <p className="font-playfair text-2xl sm:text-3xl font-bold text-slate-950 leading-tight mb-3">
              "Building Excellence. Creating Legacies."
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              We manage projects from concept and planning through construction and completion, with an uncompromising focus on quality, durability, cost-effectiveness, and timely delivery.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1F8266] hover:text-slate-950 transition-colors"
            >
              <span>Consult Our Engineering Team</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Active Site Operations Banner (Mainland Lagos) */}
        <div className="my-14 p-6 sm:p-8 bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-11 h-11 bg-white/10 text-[#cfc070] flex items-center justify-center shrink-0 mt-1">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#cfc070] mb-1">
                Active Operations
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                Executing Building Projects Across Mainland Lagos
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                We are currently executing building projects across Mainland Lagos, working with skilled engineers and construction professionals to deliver safe, functional, and sustainable structures.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 bg-[#1F8266] hover:bg-[#186851] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            <span>Request Site Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Core Services Grid */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Department Capabilities
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1">
                Services & Engineering Scope
              </h3>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">
              Turnkey Project Delivery
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.num}
                  className="p-8 border border-slate-200 bg-white hover:border-[#1F8266] transition-colors duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 bg-slate-100 text-slate-800 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-900" />
                      </div>
                      <span className="text-sm font-mono font-semibold text-slate-400">
                        {service.num}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-950 mb-3">
                      {service.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>WiseLiving Engineering</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Execution & Quality Standards Matrix */}
        <div className="pt-12 border-t border-slate-200">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Operational Tenets
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1">
              Guaranteed Project Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((std, i) => {
              const Icon = std.icon;
              return (
                <div key={i} className="p-6 bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 bg-white border border-slate-200 text-[#1F8266] flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-slate-950 mb-2">
                    {std.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
