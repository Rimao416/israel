"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function PhotosSection() {
  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=800&fit=crop&q=90",
      alt: "Couple enlacé",
      rotation: -8,
      delay: 0,
      size: "large"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&h=700&fit=crop&q=90",
      alt: "Moment tendre",
      rotation: 5,
      delay: 0.2,
      size: "medium"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=550&h=750&fit=crop&q=90",
      alt: "Rires partagés",
      rotation: -12,
      delay: 0.4,
      size: "large"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&h=650&fit=crop&q=90",
      alt: "Complicité",
      rotation: 10,
      delay: 0.6,
      size: "small"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=600&h=800&fit=crop&q=90",
      alt: "Tendresse",
      rotation: -6,
      delay: 0.8,
      size: "medium"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=550&h=750&fit=crop&q=90",
      alt: "Amour éternel",
      rotation: 8,
      delay: 1,
      size: "large"
    }
  ];

  const getSizeClasses = (size) => {
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
    <div className="min-h-screen bg-[#d4c5a0] relative overflow-hidden py-20 px-6 lg:px-12">
      {/* Background Hearts */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`bg-heart-${i}`}
          className="absolute text-[#c9a961]/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Heart size={40 + i * 5} fill="currentColor" />
        </motion.div>
      ))}

      {/* Floating Sparkles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-[#c9a961]/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
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
        <motion.div
          className="inline-block"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Heart size={40} className="text-[#c9a961] mx-auto mb-4" fill="currentColor" />
        </motion.div>
        
        <motion.h2
          className="text-5xl lg:text-6xl font-light text-[#34453D] mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Notre Histoire
        </motion.h2>
        
        <motion.p
          className="text-xl text-[#34453D]/70 font-light italic max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Chaque instant partagé, chaque sourire échangé, chaque battement de cœur synchronisé
        </motion.p>
      </motion.div>

      {/* Photos Grid - Masonry Layout */}
      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className={`relative ${getSizeClasses(photo.size)} mx-auto`}
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
              {/* Polaroid Frame */}
              <motion.div
                className="bg-white p-4 pb-16 shadow-2xl relative"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden bg-gray-200">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#c9a961]/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6"
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-white font-light text-lg">{photo.alt}</p>
                  </motion.div>
                </div>

                {/* Handwritten Note */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: photo.delay + 0.5 }}
                >
                  <p className="text-[#34453D]/60 font-['Brush_Script_MT',cursive] text-xl">
                    {photo.alt}
                  </p>
                </motion.div>

                {/* Corner Heart */}
                <motion.div
                  className="absolute -top-3 -right-3 w-10 h-10 bg-[#c9a961] rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  <Heart size={18} fill="white" className="text-white" />
                </motion.div>

                {/* Tape Effect */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-[#e8dcc4]/50 rotate-[-5deg] shadow-sm"></div>
              </motion.div>

              {/* Floating Hearts around photo */}
              <motion.div
                className="absolute -top-6 -left-6 text-[#c9a961]/40"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                <Heart size={24} fill="currentColor" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -right-6 text-[#c9a961]/40"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -360],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: index * 0.7
                }}
              >
                <Heart size={20} fill="currentColor" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Message */}
      <motion.div
        className="text-center mt-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.p
          className="text-2xl lg:text-3xl text-[#34453D] font-light italic"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        >
          Et ce n'est que le début de notre aventure...
        </motion.p>
      </motion.div>
    </div>
  );
}