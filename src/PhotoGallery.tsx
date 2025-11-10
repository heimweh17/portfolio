import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Calendar,
  ArrowLeft,
  Clock,
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
    location: "Tampa Bay!",
    date: "Aug 2022",
    description: "seeking for dolphins",
  },
  {
    id: 4,
    src: "/photos/photo4.jpg",
    title: "Photo 4",
    location: "University of Florida",
    date: "Nov 2025",
    description: "My first hackathon!",
  },
];

// ====== FLOATING PARTICLES ======
function FloatingParticles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.03, y: -8 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white"
      >
        {/* Photo */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        </div>

        {/* Info overlay - shows on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-900/95 via-blue-800/90 to-transparent text-white"
        >
          <h3 className="text-2xl font-bold mb-3">{photo.title}</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-cyan-300" />
              <span>{photo.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-cyan-300" />
              <span>{photo.date}</span>
            </div>
            
            
            {photo.description && (
              <div className="flex items-start gap-2 text-sm mt-3 pt-3 border-t border-cyan-300/30">
                <Info className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                <span className="text-blue-100">{photo.description}</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative corner accent */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg z-10"
      >
        <Camera className="w-6 h-6 text-white" />
      </motion.div>
    </motion.div>
  );
}

// ====== MAIN PAGE ======
export default function PhotoGallery() {
  return (
    <div className="font-mono antialiased text-gray-900 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 min-h-screen relative overflow-x-hidden">
      <FloatingParticles />

      {/* HEADER */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
          <motion.a
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </motion.a>
          
          <motion.div
            className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Photo Gallery
          </motion.div>
          
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Camera className="w-5 h-5" />
              My Photo Collection
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
              Photo Gallery
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A collection of moments from my journey — capturing experiences, events, and adventures.
            </p>
          </motion.div>

          {/* PHOTO GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PHOTOS.map((photo, index) => (
              <PhotoCard key={photo.id} photo={photo} index={index} />
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-8 bg-white rounded-2xl px-8 py-6 shadow-lg border border-gray-200">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {PHOTOS.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Photos</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  2025
                </div>
                <div className="text-sm text-gray-600 mt-1">Year</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  ∞
                </div>
                <div className="text-sm text-gray-600 mt-1">Memories</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-gray-200 bg-white/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Alex Liu. All photos are my own.
            </div>
            <motion.a
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              ← Back to Portfolio
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}