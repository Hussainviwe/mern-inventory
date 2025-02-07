import React from 'react';
import { motion } from 'framer-motion';
import { FaGem, FaStar } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-purple-900 to-indigo-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background shimmer effect */}
      <div className="absolute inset-0 bg-opacity-30 bg-gradient-to-t from-indigo-700 to-transparent animate-pulse" />
      
      {/* Floating gemstone animation */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full shadow-xl blur-lg opacity-50"
      />

      <h1 className="text-6xl font-extrabold mb-6 text-center drop-shadow-lg flex items-center">
        <FaGem className="mr-3 text-yellow-400" /> Welcome to Gem Inventory
      </h1>
      <p className="text-lg max-w-3xl text-center mb-8 opacity-90">
        Discover a world of exquisite gemstones, carefully curated to offer you the finest selection. 
        Each gem holds a story of elegance, rarity, and timeless beauty. Let your journey into the world of precious stones begin.
      </p>
      
      <div className="flex space-x-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg shadow-md transition-transform flex items-center"
        >
          <FaStar className="mr-2" /> Explore Collection
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-transform flex items-center"
        >
          <FaGem className="mr-2" /> Learn More
        </motion.button>
      </div>
      
      {/* Featured Gems Section */}
      <div className="mt-16 w-full max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-6">Featured Gems</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Ruby", "Emerald", "Sapphire"].map((gem, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <FaGem className="text-5xl text-yellow-400 mb-4" />
              <h3 className="text-2xl font-semibold">{gem}</h3>
              <p className="opacity-80 mt-2">A precious gemstone of timeless beauty.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
