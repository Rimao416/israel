"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, ChevronDown, Sparkles, Heart } from 'lucide-react';
import PhotosSection from './components/PhotoSection';
import RSVPSection from './components/RSVP';
import DrinksSection from './components/Boissons';
import GuestbookSection from './components/GuestbookSection';

export default function Hero() {
  // Generate random positions once during component initialization with useState
  const [sparklePositions] = useState(() =>
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5
    }))
  );

  const [petalPositions] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      left: Math.random() * 100,
      xOffset: Math.sin(i * 2) * 200,
      duration: 12 + Math.random() * 8,
      delay: Math.random() * 5
    }))
  );

  return (
    <>
    <div className="h-screen w-screen bg-[#34453D] relative overflow-hidden font-['Montserrat']">
      {/* Animated Dark Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.15) 0%, rgba(52,69,61,0) 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
     
      <motion.div
        className="absolute bottom-40 right-32 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.12) 0%, rgba(52,69,61,0) 70%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(232,220,196,0.08) 0%, rgba(52,69,61,0) 70%)'
        }}
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Hearts Animation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-[#c9a961]/20"
          style={{
            left: `${15 + i * 15}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [-50, -800],
            x: [0, Math.sin(i) * 100],
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        >
          <Heart size={20 + i * 3} fill="currentColor" />
        </motion.div>
      ))}

      {/* Sparkles Animation */}
      {sparklePositions.map((pos, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-[#c9a961]"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pos.delay,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={12} />
        </motion.div>
      ))}

      {/* Floating Petals */}
      {petalPositions.map((pos, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-3 h-3 bg-[#e8dcc4]/30 rounded-full"
          style={{
            left: `${pos.left}%`,
            top: '-5%',
          }}
          animate={{
            y: [0, 1000],
            x: [0, pos.xOffset],
            rotate: [0, 360 * 3],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: pos.duration,
            repeat: Infinity,
            delay: pos.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* Main Content Container */}
      <div className="h-full w-full flex items-center px-10 lg:px-16 pb-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1600px] mx-auto">
         
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-6"
            >
              <motion.h1 
                className="text-[#e8dcc4] font-light text-3xl lg:text-4xl xl:text-5xl flex items-center gap-3 mb-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(201, 169, 97, 0.3)',
                      '0 0 30px rgba(201, 169, 97, 0.5)',
                      '0 0 20px rgba(201, 169, 97, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Israël
                </motion.span>
                <motion.span 
                  className="text-[#c9a961]"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Heart size={28} fill="currentColor" className="inline-block" />
                </motion.span>
                <motion.span
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(201, 169, 97, 0.3)',
                      '0 0 30px rgba(201, 169, 97, 0.5)',
                      '0 0 20px rgba(201, 169, 97, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  Justesse
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-[#c9a961] text-xl lg:text-2xl font-light italic tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Unissent leurs cœurs
              </motion.p>
            </motion.div>

            <motion.p
              className="text-[#b8c4b8] text-base lg:text-lg leading-relaxed max-w-xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              Deux âmes qui se sont trouvées, deux cœurs qui battent à l{"'"}unisson. 
              Avec une infinie tendresse et une joie débordante, nous vous invitons à célébrer 
              notre amour et à partager le plus beau jour de notre vie.
            </motion.p>

            <motion.p
              className="text-[#c9a961]/70 text-sm lg:text-base italic font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              Votre présence sera notre plus précieux cadeau.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(201, 169, 97, 0.5)",
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    '0 10px 30px rgba(201, 169, 97, 0.2)',
                    '0 15px 40px rgba(201, 169, 97, 0.35)',
                    '0 10px 30px rgba(201, 169, 97, 0.2)',
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                className="group px-8 py-4 bg-[#c9a961] text-[#34453D] font-medium text-sm rounded-full flex items-center gap-3 transition-all duration-300"
              >
                <Heart size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                <span>Réserver ma place</span>
                <motion.div
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={18} strokeWidth={2} />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(201, 169, 97, 0.6)',
                  backgroundColor: 'rgba(201, 169, 97, 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-[#c9a961]/30 text-[#e8dcc4] font-medium text-sm rounded-full flex items-center gap-3 transition-all duration-300"
              >
                <motion.div
                  className="w-8 h-8 bg-[#3d5a4e] rounded-full flex items-center justify-center"
                  whileHover={{
                    backgroundColor: '#c9a961',
                    rotate: 360
                  }}
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Play size={14} fill="currentColor" className="text-[#e8dcc4] ml-0.5" />
                </motion.div>
                <span>Notre histoire</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Image Section */}
          <motion.div
            className="relative h-[550px] flex items-center justify-center"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 left-0 w-36 h-36 border-[3px] border-[#c9a961]/20 rounded-tl-[90px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                borderColor: ['rgba(201, 169, 97, 0.2)', 'rgba(201, 169, 97, 0.4)', 'rgba(201, 169, 97, 0.2)']
              }}
              transition={{
                opacity: { duration: 1, delay: 1.2 },
                scale: { duration: 1, delay: 1.2 },
                borderColor: { duration: 3, repeat: Infinity }
              }}
            />

            <motion.div
              className="absolute bottom-0 right-0 w-36 h-36 border-[3px] border-[#c9a961]/20 rounded-br-[90px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                borderColor: ['rgba(201, 169, 97, 0.2)', 'rgba(201, 169, 97, 0.4)', 'rgba(201, 169, 97, 0.2)']
              }}
              transition={{
                opacity: { duration: 1, delay: 1.4 },
                scale: { duration: 1, delay: 1.4 },
                borderColor: { duration: 3, repeat: Infinity, delay: 1 }
              }}
            />

            {/* Main Image Container with arch */}
            <motion.div
              className="relative w-[380px] h-[520px]"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 1, 0, -1, 0]
              }}
              transition={{
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-t-full rounded-b-3xl"
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(201, 169, 97, 0.2)',
                    '0 0 60px rgba(201, 169, 97, 0.4)',
                    '0 0 40px rgba(201, 169, 97, 0.2)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
             
              {/* Arch background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#4a5f54] to-[#3d5248] rounded-t-full rounded-b-3xl shadow-2xl p-5">
                <div className="w-full h-full bg-[#e8dcc4] rounded-t-full rounded-b-2xl overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=90"
                    alt="Cérémonie de mariage"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Decorative pattern dots */}
      <motion.div
        className="absolute top-1/3 right-14 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="w-1.5 h-1.5 bg-[#c9a961] rounded-full"
              initial={{ scale: 0 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                opacity: { duration: 2, repeat: Infinity, delay: i * 0.2 }
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
    <PhotosSection/>
    <RSVPSection/>
    <DrinksSection/>
    <GuestbookSection/>
    </>
  );
}