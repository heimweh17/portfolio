import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Globe } from "lucide-react";

export default function VisitorMap() {
  const [location, setLocation] = useState<{
    city?: string;
    country?: string;
    region?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch visitor location using a free IP geolocation API
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        setLocation({
          city: data.city,
          country: data.country_name,
          region: data.region,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
        setLoading(false);
      });
  }, []);

  const getGreeting = () => {
    if (!location) return "Hello, friend! 👋";
    
    const { city, region, country } = location;
    
    if (city && region && country) {
      return `Hello, friend from ${city}, ${region}, ${country}! 👋`;
    } else if (region && country) {
      return `Hello, friend from ${region}, ${country}! 👋`;
    } else if (country) {
      return `Hello, friend from ${country}! 👋`;
    }
    
    return "Hello, friend! 👋";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
    >
      {/* Greeting */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-lg">Visitor Location</h3>
        </div>
        {loading ? (
          <p className="text-gray-600 animate-pulse">Detecting your location...</p>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-700 font-medium"
          >
            {getGreeting()}
          </motion.p>
        )}
      </div>

      {/* ClustrMaps Widget Container */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h4 className="font-bold">Global Visitors</h4>
        </div>
        <div id="clustrmaps-widget" className="flex justify-center">
          {/* The script will inject the map here */}
          <div className="text-center text-sm text-gray-500">
            Loading visitor map...
          </div>
        </div>
      </div>

      {/* Stats */}
      {location && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Your location: {location.country}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}