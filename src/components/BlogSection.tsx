import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Building, 
  PhoneCall, 
  FileText, 
  Users, 
  Sparkles,
  Share2,
  Check
} from "lucide-react";

export default function BlogSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConsultationClick = () => {
    setIsModalOpen(false);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="blog" className="scroll-mt-24 w-full py-20 md:py-28 px-6 md:px-12 border-b border-art-gray bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F1F5F9] text-emerald-regal text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-3 rounded-full border border-art-gray">
              <BookOpen className="w-3.5 h-3.5 text-emerald-regal" />
              Property Advisory & Insights
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy-regal tracking-tight">
              WiseLiving Insights & Articles
            </h2>
            <p className="text-sm text-navy-regal/60 mt-2 max-w-xl font-light leading-relaxed">
              Professional guidance, tenancy best practices, and investment safeguards for landlords and property investors across Lagos and Nigeria.
            </p>
          </div>

          <div className="text-xs font-semibold text-emerald-regal flex items-center gap-1.5 self-start md:self-end">
            <Sparkles className="w-4 h-4 text-[#cfc070]" />
            <span>Curated by Wise-Living Property Management</span>
          </div>
        </div>

        {/* Featured Blog Card */}
        <div className="bg-white border border-art-gray rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-stretch">
            
            {/* Image / Graphic column */}
            <div className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-full bg-slate-900 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80" 
                alt="Property Management & Tenancy Advisory" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6 sm:p-8">
                <span className="inline-block bg-[#1f8266] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow w-fit">
                  Landlord Advisory
                </span>
                
                <div className="text-white space-y-1.5">
                  <div className="flex items-center gap-4 text-xs text-white/80 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#cfc070]" />
                      Latest Advisory
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#cfc070]" />
                      6 min read
                    </span>
                  </div>
                  <p className="text-xs text-white/70 italic">Essential reading for Nigerian landlords & diaspora property owners</p>
                </div>
              </div>
            </div>

            {/* Content Preview Column */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-regal bg-emerald-regal/10 px-2.5 py-1 rounded-md">
                    Tenancy Management
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy-regal/50 bg-slate-100 px-2.5 py-1 rounded-md">
                    Lagos & Nigeria
                  </span>
                </div>

                {/* Clickable Title */}
                <h3 
                  onClick={() => setIsModalOpen(true)}
                  className="text-xl sm:text-2xl font-black text-navy-regal tracking-tight leading-snug cursor-pointer hover:text-emerald-regal transition-colors mb-4 group flex items-start justify-between gap-2"
                >
                  <span>7 Signs You Have a Problem Tenant — And What Landlords Can Do About It</span>
                </h3>

                <p className="text-sm text-navy-regal/70 leading-relaxed font-light mb-6">
                  Renting out a property can be a rewarding investment, but managing tenants can sometimes present challenges. While not every disagreement makes a tenant a "problem tenant," certain patterns of behaviour should not be ignored. Recognising these warning signs early helps prevent avoidable property damage, financial losses, and prolonged disputes.
                </p>

                {/* Key Warning Signs Sneak Peek Chips */}
                <div className="space-y-2 mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-navy-regal/60">
                    Warning Signs Analyzed Inside:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Late or Missed Rent",
                      "Neighbour Complaints",
                      "Property Neglect & Damage",
                      "Unauthorised Occupants",
                      "Communication Avoidance",
                      "Breach of Agreement",
                      "Constant Landlord Stress"
                    ].map((item, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-medium"
                      >
                        {idx + 1}. {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-art-gray flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2.5 bg-emerald-regal hover:bg-[#186a53] text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 text-[#cfc070]" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-bold text-emerald-regal hover:text-[#0F172A] underline underline-offset-4 cursor-pointer"
                >
                  Open Article Modal →
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* ================================================================= */}
      {/* BLOG ARTICLE MODAL                                                */}
      {/* ================================================================= */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 transition-all duration-300 animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Sticky Modal Top Bar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-art-gray flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-regal/10 flex items-center justify-center text-emerald-regal shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-regal block">
                    WiseLiving Property Advisory
                  </span>
                  <span className="text-xs font-semibold text-slate-800 line-clamp-1">
                    7 Signs You Have a Problem Tenant — And What Landlords Can Do About It
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  title="Copy Article Link"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="hidden sm:inline text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Article Body */}
            <div className="overflow-y-auto px-6 sm:px-10 py-8 text-slate-800 space-y-8 selection:bg-[#cfc070] selection:text-slate-900">
              
              {/* Article Header Header */}
              <div className="border-b border-art-gray pb-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                  <span className="bg-[#1f8266] text-white px-2.5 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider">
                    Official Advisory
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#1f8266]" />
                    6 min read
                  </span>
                  <span>•</span>
                  <span>Published by Wise-Living Homes and Property Ltd.</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-4">
                  7 Signs You Have a Problem Tenant — And What Landlords Can Do About It
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                  Renting out a property can be a rewarding investment, but managing tenants can sometimes present challenges. While not every disagreement makes a tenant a "problem tenant," certain patterns of behaviour should not be ignored.
                </p>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light mt-3">
                  For landlords in Lagos and other parts of Nigeria, recognising these warning signs early can help prevent avoidable property damage, financial losses and prolonged disputes.
                </p>

                <div className="mt-4 p-3 bg-emerald-regal/5 border-l-4 border-emerald-regal text-sm font-semibold text-emerald-900">
                  Here are 7 signs that you may have a problem tenant and what you can do about them.
                </div>
              </div>

              {/* The 7 Signs */}
              <div className="space-y-8">
                
                {/* Sign 1 */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-[#1f8266] text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm">
                      1
                    </span>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
                        Consistently Late or Missed Rent Payments
                      </h2>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        One of the clearest warning signs is a recurring pattern of late rent payments or failure to meet agreed payment obligations.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        An occasional delay may have a reasonable explanation. However, repeated delays, excuses or failure to communicate about payments can become a serious concern.
                      </p>
                    </div>
                  </div>

                  {/* What can a landlord do box */}
                  <div className="mt-3 bg-white p-4 rounded-lg border-l-4 border-[#cfc070] border-t border-r border-b border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      What can a landlord do?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Keep proper records of all rent payments and communicate clearly with the tenant about payment expectations. Your tenancy agreement should also clearly state the applicable payment terms and procedures for dealing with defaults.
                    </p>
                  </div>
                </div>

                {/* Sign 2 */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-[#1f8266] text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm">
                      2
                    </span>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
                        Frequent Complaints From Neighbours
                      </h2>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        If neighbours or other occupants repeatedly complain about a tenant's behaviour, it deserves attention.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        Complaints may involve excessive noise, disorderly conduct, inappropriate use of common areas, harassment, frequent disturbances or other behaviour that affects other residents.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 bg-white p-4 rounded-lg border-l-4 border-[#cfc070] border-t border-r border-b border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      What can a landlord do?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Do not rely solely on hearsay. Investigate complaints objectively, document relevant incidents and give the tenant an opportunity to respond. Where necessary, remind the tenant of the obligations contained in the tenancy agreement and applicable rules governing the property.
                    </p>
                  </div>
                </div>

                {/* Sign 3 */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-[#1f8266] text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm">
                      3
                    </span>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
                        The Property Is Being Neglected or Damaged
                      </h2>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        A tenant is expected to use the property responsibly.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        Warning signs may include poor cleanliness, deliberate damage, unauthorised alterations, broken fixtures that are not reported or general neglect of the premises. Small problems can become expensive repairs when they are ignored.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 bg-white p-4 rounded-lg border-l-4 border-[#cfc070] border-t border-r border-b border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      What can a landlord do?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Carry out appropriate periodic inspections, subject to the terms of the tenancy and applicable requirements. Document the condition of the property and address maintenance concerns promptly. It is also advisable to clearly distinguish between normal wear and tear and damage caused by misuse.
                    </p>
                  </div>
                </div>

                {/* Sign 4 */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-[#1f8266] text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm">
                      4
                    </span>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
                        Unauthorised Occupants or Unapproved Use of the Property
                      </h2>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        A landlord may discover that a tenant has allowed additional people to occupy the property without approval or has started using the property for a purpose different from what was agreed.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        For example, a residential property may be used for commercial activities or other purposes that were not authorised.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 bg-white p-4 rounded-lg border-l-4 border-[#cfc070] border-t border-r border-b border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      What can a landlord do?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Review the tenancy agreement and communicate with the tenant immediately when such issues arise. Clear documentation at the beginning of the tenancy can help prevent misunderstandings about who may occupy the property and how it may be used.
                    </p>
                  </div>
                </div>

                {/* Sign 5 */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-[#1f8266] text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm">
                      5
                    </span>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
                        The Tenant Avoids Communication
                      </h2>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        Another warning sign is a tenant who consistently refuses to respond to calls, messages or reasonable requests from the landlord or property manager.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        Communication becomes especially important when there is a maintenance issue, inspection, payment concern or other matter requiring attention.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 bg-white p-4 rounded-lg border-l-4 border-[#cfc070] border-t border-r border-b border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      What can a landlord do?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Maintain a clear and professional communication channel and keep records of important correspondence. If communication repeatedly breaks down, consider involving a professional property manager who can provide a structured channel between the landlord and tenant.
                    </p>
                  </div>
                </div>

                {/* Sign 6 */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-[#1f8266] text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm">
                      6
                    </span>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
                        Repeated Breaches of the Tenancy Agreement
                      </h2>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        A tenancy agreement exists to establish clear expectations between the landlord and tenant.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        Repeated violations—despite being brought to the tenant's attention—should be treated seriously. Examples may include unauthorised alterations, prohibited activities, persistent non-payment, unauthorised subletting or other breaches specifically addressed in the agreement.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 bg-white p-4 rounded-lg border-l-4 border-[#cfc070] border-t border-r border-b border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      What can a landlord do?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Document the breach and follow the appropriate procedures under the tenancy agreement and applicable law. Landlords should avoid taking matters into their own hands. Where a serious dispute arises, obtaining appropriate legal or professional advice is advisable.
                    </p>
                  </div>
                </div>

                {/* Sign 7 */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-[#1f8266] text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm">
                      7
                    </span>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
                        The Tenant Creates Constant Stress for the Landlord
                      </h2>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        Sometimes the biggest warning sign is the overall pattern.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2 font-normal">
                        If a landlord is constantly dealing with rent issues, complaints, maintenance disputes, unauthorised activities, property damage or communication problems, the issue may no longer be a single incident. It may indicate that the property needs a more structured management system.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 bg-white p-4 rounded-lg border-l-4 border-[#cfc070] border-t border-r border-b border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      What can a landlord do?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Instead of personally handling every issue, consider engaging a professional property management company. A professional property manager can help coordinate tenant communication, inspections, maintenance, documentation, rent-related processes and other day-to-day property management responsibilities.
                    </p>
                  </div>
                </div>

              </div>

              {/* Section: What Should a Landlord Do When a Tenant Becomes Difficult? */}
              <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#cfc070]">
                  <AlertTriangle className="w-4 h-4 text-[#cfc070]" />
                  Strategic Landlord Protocol
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  What Should a Landlord Do When a Tenant Becomes Difficult?
                </h3>
                
                <p className="text-sm sm:text-base text-slate-300 font-light">
                  The first step is <span className="font-semibold text-white">not to react emotionally</span>. A landlord should:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Review the tenancy agreement.",
                    "Document relevant incidents and communications.",
                    "Communicate clearly and professionally.",
                    "Address problems early rather than allowing them to escalate.",
                    "Keep proper records of payments, inspections and maintenance.",
                    "Follow the appropriate legal and tenancy procedures.",
                    "Seek professional or legal advice when necessary."
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-white/5 p-3 rounded-lg border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-[#cfc070] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-normal">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 leading-relaxed">
                  <span className="font-bold text-amber-300 uppercase block mb-1">Important Legal Warning:</span>
                  Most importantly, landlords should avoid unlawful self-help measures such as changing locks, removing a tenant's belongings or cutting off essential services simply because there is a dispute. The appropriate procedure depends on the circumstances and applicable tenancy laws.
                </div>
              </div>

              {/* Section: How Professional Property Management Can Help */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                    How Professional Property Management Can Help
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 font-light leading-relaxed">
                    Managing a rental property requires more than collecting rent. For landlords who have multiple properties, live outside Lagos, have demanding careers or simply prefer not to deal with the day-to-day challenges of property management, professional assistance can make a significant difference.
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mt-3">
                    A structured property management service can help with areas such as:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Tenant Management",
                      desc: "Communication, coordination and handling routine tenant-related matters.",
                      icon: Users
                    },
                    {
                      title: "Property Inspections",
                      desc: "Monitoring the condition of the property and identifying issues early.",
                      icon: ShieldCheck
                    },
                    {
                      title: "Maintenance Coordination",
                      desc: "Organising repairs and maintenance when required.",
                      icon: Building
                    },
                    {
                      title: "Documentation & Records",
                      desc: "Maintaining relevant property, tenant, inspection and maintenance records.",
                      icon: FileText
                    },
                    {
                      title: "Property Oversight",
                      desc: "Helping landlords maintain better visibility and control over their investment.",
                      icon: CheckCircle2
                    }
                  ].map((pillar, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-regal/30 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-emerald-regal/10 flex items-center justify-center text-emerald-regal mb-3">
                        <pillar.icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{pillar.title}</h4>
                      <p className="text-xs text-slate-600 font-light leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conclusion Section */}
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-3">
                <h4 className="text-lg font-bold text-emerald-950">Conclusion</h4>
                <p className="text-sm text-emerald-900 leading-relaxed font-light">
                  A difficult tenant does not always become a problem overnight. In many cases, the warning signs appear gradually.
                </p>
                <p className="text-sm text-emerald-900 leading-relaxed font-light">
                  Late payments, repeated complaints, property neglect, unauthorised occupants, poor communication and repeated breaches of tenancy conditions can all indicate that a landlord needs to pay closer attention.
                </p>
                <p className="text-sm font-semibold text-emerald-950 leading-relaxed">
                  The goal is not simply to remove difficult tenants. The goal is to manage the property professionally, protect the landlord's investment and maintain a healthy landlord-tenant relationship.
                </p>
                <p className="text-sm italic text-emerald-800">
                  If managing your property has become stressful or time-consuming, professional property management may be the solution.
                </p>
              </div>

              {/* Company Sign-off & Consultation Call-to-action */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#1f8266] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#cfc070]">
                    Wise-Living Homes and Property Ltd.
                  </span>
                  <h4 className="text-xl font-bold tracking-tight">Property. Managed Wisely.</h4>
                  <p className="text-xs sm:text-sm text-white/80 font-light max-w-lg leading-relaxed">
                    Wise-Living Homes and Property Ltd. provides real estate, property management, facilities management, maintenance and related property solutions designed to help property owners protect and manage their investments more effectively.
                  </p>
                </div>

                <div className="shrink-0 flex flex-col gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleConsultationClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#cfc070] text-navy-regal px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-navy-regal" />
                    Contact WiseLiving Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto text-center text-xs text-white/80 hover:text-white underline underline-offset-4 py-1 cursor-pointer"
                  >
                    Close Article
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Modal Footer */}
            <div className="sticky bottom-0 z-20 bg-slate-50 px-6 py-3.5 border-t border-art-gray flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Wise-Living Homes and Property Ltd. • Official Editorial
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
