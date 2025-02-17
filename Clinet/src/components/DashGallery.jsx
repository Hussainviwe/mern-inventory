import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Image paths relative to the public folder
const images = [
  "/images/h.jpg",
  "/images/j.jpg",
  "/images/k.jpg",
  "/images/g.jpg",
  "/images/i.jpg",
  "/images/l.jpg",
  "/images/m.jpg",
];

export default function DashGallery() {
  const [index, setIndex] = useState(0);

  const nextImage = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevImage = useCallback(() => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white px-6 py-12">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-widest text-center drop-shadow-lg">
        Timeless Gemstone Elegance
      </h1>

      <p className="text-lg md:text-xl text-gray-300 text-center mb-8 max-w-2xl">
        Discover the finest collection of gemstones, each with a story of its own. From luxurious 
        diamonds to exotic rare crystals, indulge in a world of timeless beauty.
      </p>

      <div className="w-full md:w-2/3 lg:w-1/2 overflow-hidden rounded-3xl shadow-2xl relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`Gallery image ${index + 1}`}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-[400px] md:h-[450px] object-cover rounded-3xl"
          />
        </AnimatePresence>
      </div>

      <div className="mt-6 flex space-x-3 justify-center">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to image ${i + 1}`}
            className={`w-4 h-4 rounded-full transition-all ${
              i === index ? "bg-white scale-125" : "bg-gray-600 hover:bg-gray-400"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
          <h3 className="text-xl font-bold mb-2">💎 Rare Collection</h3>
          <p className="text-gray-300">
            Explore exquisite gems sourced from the rarest locations worldwide.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
          <h3 className="text-xl font-bold mb-2">✨ Authenticity Guaranteed</h3>
          <p className="text-gray-300">
            Each gemstone is certified for its authenticity and brilliance.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
          <h3 className="text-xl font-bold mb-2">🏆 Award-Winning Craftsmanship</h3>
          <p className="text-gray-300">
            Designed by expert artisans to reflect elegance and luxury.
          </p>
        </div>
      </div>

      
    </div>
  );
}
