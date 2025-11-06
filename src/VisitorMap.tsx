import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
export default function VisitorMap() {
  const [location, setLocation] = useState<{
    city?: string;
    country?: string;
    region?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (response.ok) {
          const data = await response.json();
          setLocation({
            city: data.city,
            country: data.country_name,
            region: data.region,
          });
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log("ipapi.co failed, trying geolocation-db...");
      }
      try {
        const response = await fetch("https://geolocation-db.com/json/");
        if (response.ok) {
          const data = await response.json();
          setLocation({
            city: data.city,
            country: data.country_name,
            region: data.state,
          });
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("All geolocation services failed:", error);
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);
const getGreeting = () => {
  if (!location) return "Welcome, friend!";
  
  const { city, region, country } = location;
  
  if (city && region && country) {
    return `Welcome, visitor from ${city}, ${region}, ${country}!`;
  } else if (city && country) {
    return `Welcome, visitor from ${city}, ${country}!`;
  } else if (country) {
    return `Welcome, visitor from ${country}!`;
  }
  
  return "Welcome, friend!";
};
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2">
      <div className="flex items-center justify-between gap-2">
        {/* Left side - Greeting text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
          style={{ maxWidth: '80%' }}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent geek-font">
                Detecting visitor...
              </h2>
            </div>
          ) : (
            <motion.h2 
              className="text-lg md:text-2xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent geek-font"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "linear" 
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              {getGreeting()} 
            </motion.h2>
          )}
        </motion.div>
        {/* Right side - Map with label */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-1 flex-shrink-0"
          style={{ left: '70%' }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            <a 
              href="https://clustrmaps.com/site/1c8ew" 
              title="Visit tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src="https://clustrmaps.com/map_v2.png?cl=ffffff&w=300&t=tt&d=X2vqsU7vh1lqhDkd2APPeaVP9au0ZEAyI0IC_jFVgMM&co=2d78ad&ct=ffffff" 
                alt="Visitor map"
                className="relative rounded-lg shadow-md border-2 border-cyan-400 hover:border-blue-500 transition-colors"
                style={{ width: '255px', height: 'auto' }}
              />
            </a>
          </motion.div>
          <motion.p 
            className="text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent tracking-wider"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
             ALL VISITORS 
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
