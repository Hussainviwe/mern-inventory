import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://source.unsplash.com/1600x900/?gemstone,store",
  "https://source.unsplash.com/1600x900/?precious-stones",
  "https://source.unsplash.com/1600x900/?gem-mining",
  "https://source.unsplash.com/1600x900/?jewelry",
  "https://source.unsplash.com/1600x900/?luxury",
];

export default function DashGallery() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-widest text-center drop-shadow-lg">
        Nostalgic Gemstone Memories
      </h1>
      <div className="w-full md:w-3/4 lg:w-2/3 overflow-hidden rounded-2xl shadow-xl relative">
        <AnimatePresence>
          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Memorial Gem Gallery"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-[600px] md:h-[700px] object-cover rounded-2xl"
          />
        </AnimatePresence>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center text-center p-6">
          <p className="text-xl md:text-2xl font-semibold italic">
            "Every gem tells a story, every memory shines forever."
          </p>
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-5 h-5 rounded-full transition-all ${
              i === index ? "bg-white scale-125" : "bg-gray-600"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
      <div className="absolute bottom-6 flex space-x-4">
        <button
          onClick={() => setIndex((index - 1 + images.length) % images.length)}
          className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-lg font-semibold rounded-lg shadow-lg"
        >
          ⬅ Previous
        </button>
        <button
          onClick={() => setIndex((index + 1) % images.length)}
          className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-lg font-semibold rounded-lg shadow-lg"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
