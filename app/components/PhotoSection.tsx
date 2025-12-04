"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

type PhotoSize = 'small' | 'medium' | 'large';

interface Photo {
  id: number;
  url: string;
  alt: string;
  rotation: number;
  delay: number;
  size: PhotoSize;
}

// Réduit de 12 à 5 hearts
const BACKGROUND_HEARTS = Array.from({ length: 5 }, (_, i) => ({
  left: 20 + i * 20,
  top: 10 + (i % 3) * 30,
  index: i
}));

// Réduit de 20 à 6 sparkles
const SPARKLE_POSITIONS = Array.from({ length: 6 }, (_, i) => ({
  left: 15 + i * 15,
  top: 15 + (i % 2) * 40,
  index: i
}));

export default function PhotosSection() {
 const photos: Photo[] = [
  {
    id: 1,
    url: "/couple_1.jpeg",
    alt: "Couple enlacé",
    rotation: -8,
    delay: 0,
    size: "large"
  },
  {
    id: 2,
    url: "/couple_2.jpeg",
    alt: "Moment tendre",
    rotation: 5,
    delay: 0.1,
    size: "medium"
  },
  {
    id: 3,
    url: "/couple_3.jpeg",
    alt: "Rires partagés",
    rotation: -12,
    delay: 0.2,
    size: "large"
  },
  {
    id: 4,
    url: "/couple_4.jpeg",
    alt: "Complicité",
    rotation: 10,
    delay: 0.3,
    size: "small"
  },
  {
    id: 5,
    url: "/couple_5.jpeg",
    alt: "Tendresse",
    rotation: -6,
    delay: 0.4,
    size: "medium"
  },
  {
    id: 6,
    url: "/main.jpeg",
    alt: "Amour éternel",
    rotation: 8,
    delay: 0.5,
    size: "large"
  }
];


  const getSizeClasses = (size: PhotoSize): string => {
    switch(size) {
      case 'small':
        return 'w-[280px] h-[380px]';
      case 'medium':
        return 'w-[320px] h-[420px]';
      case 'large':
        return 'w-[350px] h-[480px]';
      default:
        return 'w-[320px] h-[420px]';
    }
  };

  return (
    <div className="min-h-screen bg-[#d4c5a0] relative overflow-hidden py-20 px-4 sm:px-6 lg:px-12">
      {/* Background Hearts - Réduit et simplifié */}
      {BACKGROUND_HEARTS.map((heart) => (
        <motion.div
          key={`bg-heart-${heart.index}`}
          className="absolute text-[#c9a961]/10"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: heart.index * 0.5,
          }}
        >
          <Heart size={40} fill="currentColor" />
        </motion.div>
      ))}

      {/* Floating Sparkles - Réduit */}
      {SPARKLE_POSITIONS.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.index}`}
          className="absolute text-[#c9a961]/30"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: sparkle.index * 0.5,
          }}
        >
          <Sparkles size={16} />
        </motion.div>
      ))}

      {/* Section Title */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Heart size={40} className="text-[#c9a961] mx-auto mb-4" fill="currentColor" />
       
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#34453D] mb-4 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Notre Histoire
        </motion.h2>
       
        <motion.p
          className="text-lg sm:text-xl text-[#34453D]/70 font-light italic max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Chaque instant partagé, chaque sourire échangé, chaque battement de cœur synchronisé
        </motion.p>
      </motion.div>

      {/* Photos Grid - Masonry Layout */}
      <div className="max-w-[1400px] mx-auto relative px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start justify-items-center">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className={`relative ${getSizeClasses(photo.size)} w-full max-w-[350px]`}
              initial={{ opacity: 0, y: 100, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: photo.rotation
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: photo.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 50,
                transition: { duration: 0.3 }
              }}
              style={{
                marginTop: index % 3 === 1 ? '40px' : '0'
              }}
            >
              {/* Polaroid Frame - Animation supprimée */}
              <div className="bg-white p-4 pb-16 shadow-2xl relative">
                {/* Photo */}
                <div className="relative overflow-hidden bg-gray-200 aspect-3/4">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                 
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#c9a961]/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <p className="text-white font-light text-lg">{photo.alt}</p>
                  </div>
                </div>

                {/* Handwritten Note */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-[#34453D]/60 font-light text-xl">
                    {photo.alt}
                  </p>
                </div>

                {/* Corner Heart - Statique */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#c9a961] rounded-full flex items-center justify-center shadow-lg">
                  <Heart size={18} fill="white" className="text-white" />
                </div>

                {/* Tape Effect */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-[#e8dcc4]/50 rotate-[-5deg] shadow-sm"></div>
              </div>

              {/* Floating Hearts - Supprimés pour performances */}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Message */}
      <motion.div
        className="text-center mt-20 relative z-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="text-xl sm:text-2xl lg:text-3xl text-[#34453D] font-light italic">
          Et ce n&apos;est que le début de notre aventure...
        </p>
      </motion.div>
    </div>
  );
}