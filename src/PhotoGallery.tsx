import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Calendar,
  ArrowLeft,
  Info,
} from "lucide-react";

// ====== PHOTO DATA ======
const PHOTOS = [
  {
    id: 1,
    src: "/photos/photo1.jpg",
    title: "Pandas!",
    location: "Chengdu, China",
    date: "March 2025",
    description: "I love Pandas",
  },
  {
    id: 2,
    src: "/photos/photo2.jpg",
    title: "Photo 2",
    location: "Hangzhou, China",
    date: "March 2025",
    description: "West Lake",
  },
  {
    id: 3,
    src: "/photos/photo3.jpg",
    title: "Photo 3",
    location: "Tampa Bay, FL",
    date: "Aug 2022",
    description: "seeking for dolphins",
  },
  {
    id: 4,
    src: "/photos/photo4.jpeg",
    title: "Photo 4",
    location: "University of Florida",
    date: "Nov 2025",
    description: "My first hackathon!",
  },
];

// ====== FLOATING PARTICLES (subtle, dark) ======
function FloatingParticles() {
  if (typeof window === "undefined") return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-sky-500/15"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.4 + Math.random() * 0.4,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 18 + Math.random() * 14,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

// ====== PHOTO CARD COMPONENT ======
function PhotoCard({ photo, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          y: -6,
          boxShadow: "0 0 40px rgba(56,189,248,0.30)",
        }}
        transition={{ duration: 0.25 }}
        className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      >
        {/* Photo */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

          {/* Info overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-950/95 via-slate-900/90 to-transparent text-slate-50"
          >
            <h3 className="text-lg font-semibold mb-2">{photo.title}</h3>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin className="w-4 h-4 text-sky-300" />
                <span>{photo.location}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-sky-300" />
                <span>{photo.date}</span>
              </div>

              {photo.description && (
                <div className="flex items-start gap-2 mt-3 pt-3 border-t border-sky-400/25 text-slate-200">
                  <Info className="w-4 h-4 text-sky-300 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] leading-relaxed">
                    {photo.description}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Corner accent */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute -top-3 -right-3 w-11 h-11 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_24px_rgba(56,189,248,0.8)] z-10"
      >
        <Camera className="w-5 h-5 text-white" />
      </motion.div>
    </motion.div>
  );
}

// ====== MAIN PAGE ======
export default function PhotoGallery() {
  return (
    <div className="font-sans antialiased bg-slate-950 min-h-screen text-slate-100 relative overflow-x-hidden">
      <FloatingParticles />

      {/* HEADER - match portfolio style */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-200 hover:text-sky-300"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Portfolio</span>
          </motion.a>

          <motion.div
            className="font-semibold text-sm bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Photo Gallery
          </motion.div>

          <div className="w-28" />
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section className="relative py-16 overflow-hidden">
        {/* background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />
          <div className="absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18)_0,_transparent_55%)]" />
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(120deg,rgba(148,163,184,0.20)_1px,transparent_1px),linear-gradient(210deg,rgba(15,23,42,0.7)_1px,transparent_1px)] bg-[length:220px_220px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 text-[11px] font-medium text-slate-100 mb-5 shadow-[0_0_24px_rgba(56,189,248,0.2)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Camera className="w-4 h-4 text-sky-300" />
              Moments from my journey
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight text-slate-50">
              Photo Gallery
            </h1>

            <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A small collection of moments — travel、campus life、hackathons、
              and the places that made me want to keep exploring and building.
            </p>
          </motion.div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 relative z-10">
            {PHOTOS.map((photo, index) => (
              <PhotoCard key={photo.id} photo={photo} index={index} />
            ))}
          </div>

          {/* Stats strip matching dark style */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <div className="inline-flex items-center gap-8 rounded-2xl border border-slate-800 bg-slate-950/80 px-8 py-5 shadow-[0_0_30px_rgba(15,23,42,0.9)] text-center">
              <div className="min-w-[80px]">
                <div className="text-2xl font-semibold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                  {PHOTOS.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Photos</div>
              </div>
              <div className="h-10 w-px bg-slate-800" />
              <div className="min-w-[80px]">
                <div className="text-2xl font-semibold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                  3
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Cities</div>
              </div>
              <div className="h-10 w-px bg-slate-800" />
              <div className="min-w-[80px]">
                <div className="text-2xl font-semibold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                  ∞
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Memories</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER - match portfolio */}
      <footer className="relative z-10 py-10 border-t border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} Alex Liu · All photos are my own.
            </div>
            <motion.a
              href="/"
              className="text-[11px] font-medium text-sky-300 hover:text-sky-200"
              whileHover={{ x: -2 }}
            >
              ← Back to Portfolio
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}
