/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { 
  ArrowLeft, 
  Search, 
  Video, 
  Image as ImageIcon, 
  MapPin, 
  ShieldCheck, 
  X, 
  Filter, 
  Play, 
  Phone, 
  MessageCircle, 
  Maximize2,
  ExternalLink,
  Building,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export interface RegistryVideoItem {
  id: string;
  name: string;
  video: string;
  status: string;
  location: string;
  description: string;
}

export interface RegistryPhotoItem {
  id: string;
  title: string;
  image: string;
  location?: string;
  status?: string;
}

interface RegistryCollectionPageProps {
  onBack: () => void;
}

// Dynamically glob files loaded through Pages CMS
const videoModules = (import.meta as any).glob("../data/registry_videos/*.json", { eager: true });
const photoModules = (import.meta as any).glob("../data/registry_photos/*.json", { eager: true });

// Also load legacy audit homes so nothing is ever missed
const auditHomeModules = (import.meta as any).glob("../data/audit_homes/*.json", { eager: true });

export default function RegistryCollectionPage({ onBack }: RegistryCollectionPageProps) {
  // Load & normalize data
  const videos: RegistryVideoItem[] = useMemo(() => {
    const directVideos = Object.values(videoModules).map((m: any) => m.default || m);
    // Legacy videos from audit_homes that aren't duplicated
    const legacyVideos = Object.values(auditHomeModules)
      .map((m: any) => m.default || m)
      .filter((h: any) => h.isVideo && h.videoUrl)
      .map((h: any) => ({
        id: `legacy-${h.id}`,
        name: h.title || "Verified Property Walkthrough",
        video: h.videoUrl,
        status: h.status || "Fully Managed",
        location: h.loc || "Lagos, Nigeria",
        description: h.desc || "On-ground verified property inspection walkthrough."
      }));

    // Combine avoiding exact URL duplicates
    const combined = [...directVideos];
    legacyVideos.forEach(lv => {
      if (!combined.some(v => v.video === lv.video || v.name === lv.name)) {
        combined.push(lv);
      }
    });

    return combined.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, []);

  const photos: RegistryPhotoItem[] = useMemo(() => {
    const directPhotos = Object.values(photoModules).map((m: any) => m.default || m);
    // Legacy photos from audit_homes that aren't duplicated
    const legacyPhotos = Object.values(auditHomeModules)
      .map((m: any) => m.default || m)
      .filter((h: any) => !h.isVideo && h.image)
      .map((h: any) => ({
        id: `legacy-${h.id}`,
        title: h.title || "Verified Inspection Photo",
        image: h.image,
        location: h.loc || "Lagos, Nigeria",
        status: h.status || "Verified"
      }));

    // Combine avoiding duplicate images
    const combined = [...directPhotos];
    legacyPhotos.forEach(lp => {
      if (!combined.some(p => p.image === lp.image || p.title === lp.title)) {
        combined.push(lp);
      }
    });

    return combined.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  }, []);

  // Filter state
  const [activeTab, setActiveTab] = useState<"all" | "videos" | "photos">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Modals state
  const [activeVideoModal, setActiveVideoModal] = useState<RegistryVideoItem | null>(null);
  const [activePhotoModal, setActivePhotoModal] = useState<RegistryPhotoItem | null>(null);

  // Keyboard navigation for escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideoModal(null);
        setActivePhotoModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Extract unique locations and statuses for filter dropdowns
  const uniqueLocations = useMemo(() => {
    const locs = new Set<string>();
    videos.forEach(v => v.location && locs.add(v.location.trim()));
    photos.forEach(p => p.location && locs.add(p.location.trim()));
    return Array.from(locs).sort();
  }, [videos, photos]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set<string>();
    videos.forEach(v => v.status && statuses.add(v.status.trim()));
    photos.forEach(p => p.status && statuses.add(p.status.trim()));
    return Array.from(statuses).sort();
  }, [videos, photos]);

  // Filter items
  const filteredVideos = useMemo(() => {
    if (activeTab === "photos") return [];
    return videos.filter(item => {
      const matchesSearch = 
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = 
        selectedLocation === "all" || 
        item.location.toLowerCase() === selectedLocation.toLowerCase();

      const matchesStatus = 
        selectedStatus === "all" || 
        item.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesLocation && matchesStatus;
    });
  }, [videos, activeTab, searchQuery, selectedLocation, selectedStatus]);

  const filteredPhotos = useMemo(() => {
    if (activeTab === "videos") return [];
    return photos.filter(item => {
      const matchesSearch = 
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.status && item.status.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLocation = 
        selectedLocation === "all" || 
        (item.location && item.location.toLowerCase() === selectedLocation.toLowerCase());

      const matchesStatus = 
        selectedStatus === "all" || 
        (item.status && item.status.toLowerCase() === selectedStatus.toLowerCase());

      return matchesSearch && matchesLocation && matchesStatus;
    });
  }, [photos, activeTab, searchQuery, selectedLocation, selectedStatus]);

  const totalResultsCount = filteredVideos.length + filteredPhotos.length;

  // Status badge styling helper
  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("managed")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (s.includes("titled") || s.includes("verified")) {
      return "bg-sky-50 text-sky-700 border-sky-200";
    }
    if (s.includes("letting")) {
      return "bg-purple-50 text-purple-700 border-purple-200";
    }
    if (s.includes("care") || s.includes("facility")) {
      return "bg-amber-50 text-amber-800 border-amber-200";
    }
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-white text-navy-regal flex flex-col selection:bg-[#cfc070] selection:text-[#0F172A]">
      {/* HEADER WITH BRANDING & RETURN ACTION */}
      <header className="sticky top-0 z-40 w-full bg-[#1f8266] border-b border-[#cfc070]/25 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Back button and Branding */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/15 cursor-pointer shadow-sm"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-4 h-4 text-[#cfc070]" />
              <span className="hidden xs:inline">Back to Main Site</span>
              <span className="xs:hidden">Back</span>
            </button>

            <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />

            {/* Logo and Brand */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center bg-white p-1 rounded-md shadow-sm border border-white/20 shrink-0">
                <img 
                  src="https://res.cloudinary.com/dtkluxukm/image/upload/v1788147995/wlh-logo_orubpv.jpg" 
                  alt="WiseLiving Logo"
                  className="h-7 w-auto object-contain rounded"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className="font-playfair font-extrabold text-white text-lg sm:text-xl tracking-tight">
                  WiseLiving
                </span>
                <span className="font-montserrat font-bold text-[#cfc070] text-[8px] sm:text-[9px] tracking-[0.16em] uppercase">
                  HOMES AND PROPERTY LTD.
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:09064468706"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#cfc070]" />
              <span>09064468706</span>
            </a>

            <a
              href="https://wa.me/2349064468706"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#cfc070] hover:bg-white text-[#0F172A] px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* BREADCRUMB STRIP */}
      <div className="bg-[#F8FAFC] border-b border-art-gray py-2.5 px-4 sm:px-6 md:px-8 text-xs text-navy-regal/60">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={onBack} className="hover:text-[#1f8266] transition-colors font-medium">Home</button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-[#1f8266] transition-colors font-medium">Audit Registry</button>
          <span>/</span>
          <span className="text-navy-regal font-bold">Verified Media Archive Vault</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-art-gray py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#1f8266]/10 text-[#1f8266] text-[11px] font-bold uppercase tracking-widest px-3 py-1 mb-4 rounded-full border border-[#1f8266]/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Comprehensive Evidence Archive & CMS Registry
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-regal tracking-tight leading-[1.15]">
              Verified On-Ground <span className="text-[#1f8266]">Property Collection</span>
            </h1>
            
            <p className="mt-3 text-sm sm:text-base text-navy-regal/70 leading-relaxed font-light">
              Access the complete repository of field-verified video tours, ongoing structural documentation, and photographic records managed with absolute transparency across Lagos and Nigeria.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-art-gray">
              <div className="bg-white p-3.5 rounded-lg border border-art-gray shadow-xs">
                <span className="text-xs uppercase tracking-wider font-semibold text-navy-regal/50 block">Total Records</span>
                <span className="text-2xl font-black text-navy-regal">{videos.length + photos.length}</span>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-art-gray shadow-xs">
                <span className="text-xs uppercase tracking-wider font-semibold text-navy-regal/50 block">Video Audits</span>
                <span className="text-2xl font-black text-[#1f8266]">{videos.length}</span>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-art-gray shadow-xs">
                <span className="text-xs uppercase tracking-wider font-semibold text-navy-regal/50 block">Photo Audits</span>
                <span className="text-2xl font-black text-[#cfc070]">{photos.length}</span>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-art-gray shadow-xs">
                <span className="text-xs uppercase tracking-wider font-semibold text-navy-regal/50 block">Inspection Rate</span>
                <span className="text-2xl font-black text-[#0369A1]">100% Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH CONTROLS */}
      <section className="bg-white border-b border-art-gray sticky top-[57px] sm:top-[61px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs: All / Videos / Photos */}
          <div className="flex items-center gap-1.5 bg-[#F1F5F9] p-1 rounded-lg border border-art-gray w-fit">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-navy-regal shadow-xs"
                  : "text-navy-regal/60 hover:text-navy-regal"
              }`}
            >
              All Content ({videos.length + photos.length})
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === "videos"
                  ? "bg-[#1f8266] text-white shadow-xs"
                  : "text-navy-regal/60 hover:text-navy-regal"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videos ({videos.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === "photos"
                  ? "bg-[#cfc070] text-[#0F172A] shadow-xs"
                  : "text-navy-regal/60 hover:text-navy-regal"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos ({photos.length})</span>
            </button>
          </div>

          {/* Search Input & Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-1 md:justify-end">
            
            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 text-navy-regal/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location..."
                className="w-full pl-9 pr-8 py-2 bg-[#F8FAFC] border border-art-gray rounded-lg text-xs font-medium focus:outline-none focus:border-[#1f8266] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy-regal/40 hover:text-navy-regal text-xs p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Location Filter */}
            {uniqueLocations.length > 0 && (
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="py-2 px-3 bg-[#F8FAFC] border border-art-gray rounded-lg text-xs font-medium text-navy-regal/80 focus:outline-none focus:border-[#1f8266] cursor-pointer"
              >
                <option value="all">All Locations</option>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            )}

            {/* Status Filter */}
            {uniqueStatuses.length > 0 && (
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="py-2 px-3 bg-[#F8FAFC] border border-art-gray rounded-lg text-xs font-medium text-navy-regal/80 focus:outline-none focus:border-[#1f8266] cursor-pointer"
              >
                <option value="all">All Statuses</option>
                {uniqueStatuses.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </section>

      {/* MAIN GALLERY GRID */}
      <main className="flex-1 py-12 px-4 sm:px-6 md:px-8 bg-[#FAFCFD]">
        <div className="max-w-7xl mx-auto">
          
          {/* Results count banner */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-art-gray/80">
            <p className="text-xs font-semibold text-navy-regal/70 uppercase tracking-wider">
              Showing <span className="text-navy-regal font-bold">{totalResultsCount}</span> verified {totalResultsCount === 1 ? 'record' : 'records'}
            </p>
            {(searchQuery || selectedLocation !== "all" || selectedStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocation("all");
                  setSelectedStatus("all");
                }}
                className="text-xs font-bold text-[#1f8266] hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Empty State */}
          {totalResultsCount === 0 && (
            <div className="bg-white border border-art-gray rounded-xl p-12 text-center max-w-lg mx-auto shadow-xs my-8">
              <Filter className="w-12 h-12 text-navy-regal/20 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-navy-regal mb-2">No Matching Records Found</h3>
              <p className="text-xs text-navy-regal/60 mb-6 leading-relaxed">
                We couldn't find any property media matching your search criteria. Try modifying your keywords or resetting filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocation("all");
                  setSelectedStatus("all");
                  setActiveTab("all");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1f8266] hover:bg-[#186a53] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                View All Media
              </button>
            </div>
          )}

          {/* GRID OF VIDEOS */}
          {filteredVideos.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#1f8266]/10 text-[#1f8266] flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-navy-regal tracking-tight">
                    Verified Video Walkthroughs
                  </h2>
                  <p className="text-xs text-navy-regal/50">
                    Live recorded walkthroughs, site documentation, and road network verifications
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white border border-art-gray rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
                  >
                    {/* Video Player Box */}
                    <div 
                      className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-pointer"
                      onClick={() => setActiveVideoModal(video)}
                    >
                      <video
                        src={video.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      
                      {/* Badge overlay: Video tag & Status */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                          <Video className="w-3 h-3 text-[#cfc070]" /> Video Tour
                        </span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase border shadow-xs ${getStatusBadge(video.status)}`}>
                          {video.status}
                        </span>
                      </div>

                      {/* Centered Play Button overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 flex items-center justify-center transition-colors">
                        <div className="w-12 h-12 rounded-full bg-white/95 text-navy-regal flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current text-[#1f8266] ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Location */}
                        <div className="flex items-center gap-1 text-[11px] font-bold text-[#1f8266] uppercase tracking-wider mb-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{video.location}</span>
                        </div>

                        {/* Name */}
                        <h3 className="text-base font-extrabold text-navy-regal group-hover:text-[#1f8266] transition-colors mb-2 line-clamp-1">
                          {video.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-navy-regal/65 leading-relaxed line-clamp-2 font-light">
                          {video.description}
                        </p>
                      </div>

                      {/* Card Action */}
                      <div className="pt-4 mt-4 border-t border-art-gray flex items-center justify-between">
                        <button
                          onClick={() => setActiveVideoModal(video)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1f8266] hover:text-[#186a53] uppercase tracking-wider cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Full Tour</span>
                        </button>
                        <span className="text-[10px] text-navy-regal/40 uppercase font-semibold">
                          WiseLiving Verified
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GRID OF PHOTOS */}
          {filteredPhotos.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#cfc070]/20 text-[#cfc070] flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-navy-regal tracking-tight">
                    On-Ground Inspection Photography
                  </h2>
                  <p className="text-xs text-navy-regal/50">
                    High-resolution perimeter, structural, and interior photographic inspections
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white border border-art-gray rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
                    onClick={() => setActivePhotoModal(photo)}
                  >
                    {/* Image frame */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Photo Badge overlay */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-[#cfc070]" /> Photo Inspection
                        </span>
                        {photo.status && (
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase border shadow-xs ${getStatusBadge(photo.status)}`}>
                            {photo.status}
                          </span>
                        )}
                      </div>

                      {/* Zoom hint on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 flex items-center justify-center transition-colors">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 w-10 h-10 rounded-full bg-white/95 text-navy-regal flex items-center justify-center shadow-lg">
                          <Maximize2 className="w-4 h-4 text-[#1f8266]" />
                        </div>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {photo.location && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-navy-regal/50 uppercase tracking-wider mb-1">
                            <MapPin className="w-3 h-3 text-[#1f8266]" />
                            <span>{photo.location}</span>
                          </div>
                        )}
                        <h3 className="text-sm font-extrabold text-navy-regal group-hover:text-[#1f8266] transition-colors leading-snug">
                          {photo.title}
                        </h3>
                      </div>

                      <div className="pt-3 mt-3 border-t border-art-gray flex items-center justify-between text-xs text-[#1f8266] font-bold">
                        <span className="inline-flex items-center gap-1 uppercase tracking-wider text-[11px]">
                          <Maximize2 className="w-3 h-3" /> Click to Expand
                        </span>
                        <span className="text-[10px] text-navy-regal/40 uppercase font-semibold">
                          On-Ground Proof
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* BOTTOM PROMPT CALLOUT */}
      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 md:px-8 border-t border-art-gray">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[10px] font-bold text-[#cfc070] uppercase tracking-widest block mb-2">
              Diaspora & Local Landlord Protection
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have Property Requiring Physical Audit or Management?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 mt-2 font-light leading-relaxed">
              We deploy our boots-on-the-ground team for live inspections, video walkthroughs, boundary documentation, and facility management across Lagos and surrounding states.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:09064468706"
              className="w-full sm:w-auto text-center px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/15"
            >
              Call 09064468706
            </a>
            <a
              href="https://wa.me/2349064468706"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-6 py-2.5 rounded-lg bg-[#cfc070] hover:bg-white text-[#0F172A] text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              WhatsApp Verification Desk
            </a>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL THEATER */}
      {activeVideoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveVideoModal(null)}
        >
          <div 
            className="bg-[#0F172A] border border-white/15 rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="p-4 bg-slate-900 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${getStatusBadge(activeVideoModal.status)}`}>
                  {activeVideoModal.status}
                </span>
                <span className="text-xs font-semibold text-white/70 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#cfc070]" />
                  {activeVideoModal.location}
                </span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
                title="Close modal (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black w-full overflow-hidden">
              <video
                src={activeVideoModal.video}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Video Description & Action */}
            <div className="p-5 bg-[#0F172A] border-t border-white/10 overflow-y-auto">
              <h2 className="text-lg font-bold text-white mb-1.5">{activeVideoModal.name}</h2>
              <p className="text-xs text-white/75 leading-relaxed font-light mb-4">
                {activeVideoModal.description}
              </p>
              
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="text-[11px] text-[#cfc070] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#cfc070]" />
                  Verified On-Ground Footage By WiseLiving Audit Team
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/2349064468706?text=${encodeURIComponent(`Hello WiseLiving, I watched the verified video for "${activeVideoModal.name}" in ${activeVideoModal.location} and would like more details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#cfc070] hover:bg-white text-[#0F172A] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire About Property</span>
                  </a>
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO LIGHTBOX MODAL */}
      {activePhotoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActivePhotoModal(null)}
        >
          <div 
            className="bg-[#0F172A] border border-white/15 rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="p-4 bg-slate-900 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 truncate">
                {activePhotoModal.status && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${getStatusBadge(activePhotoModal.status)}`}>
                    {activePhotoModal.status}
                  </span>
                )}
                {activePhotoModal.location && (
                  <span className="text-xs font-semibold text-white/70 flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#cfc070] shrink-0" />
                    {activePhotoModal.location}
                  </span>
                )}
              </div>
              <button
                onClick={() => setActivePhotoModal(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer shrink-0"
                title="Close modal (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photo Preview */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-2 min-h-[300px] max-h-[65vh] overflow-hidden">
              <img
                src={activePhotoModal.image}
                alt={activePhotoModal.title}
                className="max-w-full max-h-[65vh] object-contain rounded"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Caption & Actions */}
            <div className="p-4 sm:p-5 bg-[#0F172A] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  {activePhotoModal.title}
                </h3>
                <p className="text-xs text-white/60">
                  {activePhotoModal.location ? `${activePhotoModal.location} • ` : ""}Official physical verification record
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/2349064468706?text=${encodeURIComponent(`Hello WiseLiving, I am inquiring about the verified property photo: "${activePhotoModal.title}"`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#cfc070] hover:bg-white text-[#0F172A] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Inquire Now</span>
                </a>
                <button
                  onClick={() => setActivePhotoModal(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
