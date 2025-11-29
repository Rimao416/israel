"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin, Users, QrCode, Navigation } from 'lucide-react';

export default function PracticalInfoSection() {
  // Sparkles positions
  const [sparklePositions] = useState(() =>
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4
    }))
  );

  return (
    <div className="min-h-screen bg-[#34453D] relative overflow-hidden py-20 px-6 font-['Montserrat']">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-32 left-20 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.15) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-40 right-32 w-[550px] h-[550px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(232,220,196,0.12) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -60, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Sparkles */}
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
            opacity: [0, 0.7, 0],
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

      {/* Floating Hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-[#c9a961]/15"
          style={{
            left: `${10 + i * 12}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [-50, -1000],
            x: [0, Math.sin(i * 2) * 90],
            rotate: [0, 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + i * 1.5,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "linear"
          }}
        >
          <Heart size={20} fill="currentColor" />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MapPin size={48} className="text-[#c9a961]" strokeWidth={1.5} />
            </motion.div>
            <Heart size={40} className="text-[#c9a961]" fill="currentColor" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={48} className="text-[#c9a961]" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#e8dcc4] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Informations Pratiques
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-[#e8dcc4]/70 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tout ce qu'il vous faut savoir pour nous rejoindre
            <br />
            <span className="text-[#c9a961] italic">Nous avons hâte de vous accueillir</span>
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Lieu de réception - Full width on mobile, left column on desktop */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-[#3d5248]/60 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#c9a961]/30 shadow-2xl hover:border-[#c9a961]/50 transition-all duration-300">
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-16 h-16 bg-[#c9a961] rounded-2xl flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(201, 169, 97, 0.3)',
                      '0 0 30px rgba(201, 169, 97, 0.6)',
                      '0 0 20px rgba(201, 169, 97, 0.3)',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MapPin size={32} className="text-white" strokeWidth={2} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-medium text-[#e8dcc4] mb-1">
                    Lieu de la réception
                  </h3>
                  <p className="text-[#c9a961] font-light italic">
                    Où notre histoire s'écrira
                  </p>
                </div>
              </div>

              {/* Venue Name */}
              <motion.div
                className="bg-[#c9a961]/10 rounded-2xl p-6 mb-6 border border-[#c9a961]/20"
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-3xl font-light text-[#e8dcc4] text-center">
                  Salle des fêtes Zitouna
                </p>
              </motion.div>

              {/* Map */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#c9a961]/30"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3193.4458414327496!2d10.123777610801003!3d36.83179706580309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2stn!4v1764428694823!5m2!1sfr!2stn" 
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </motion.div>

              {/* Get Directions Button */}
              <motion.a
                href="https://www.google.com/maps/place/36.83179706580309,10.123777610801003"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-4 bg-[#c9a961] text-white font-medium rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Navigation size={20} />
                <span>Obtenir l'itinéraire</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Numéro de table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="bg-[#3d5248]/60 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#c9a961]/30 shadow-2xl h-full hover:border-[#c9a961]/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="w-16 h-16 bg-[#c9a961] rounded-2xl flex items-center justify-center"
                  animate={{
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Users size={32} className="text-white" strokeWidth={2} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-medium text-[#e8dcc4] mb-1">
                    Votre table
                  </h3>
                  <p className="text-[#c9a961] font-light italic">
                    Votre place réservée
                  </p>
                </div>
              </div>

              {/* Table Number Display */}
              <div className="flex flex-col items-center justify-center py-12">
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Decorative circles */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#c9a961]/30"
                    animate={{
                      scale: [1, 1.2],
                      opacity: [0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#c9a961]/30"
                    animate={{
                      scale: [1, 1.2],
                      opacity: [0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 1
                    }}
                  />

                  <div className="relative bg-[#c9a961] w-32 h-32 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <p className="text-white/70 text-sm font-light mb-1">Table</p>
                      <p className="text-white text-5xl font-light">1</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8 bg-[#c9a961]/10 px-8 py-4 rounded-full border border-[#c9a961]/30"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(201, 169, 97, 0.2)',
                      '0 0 30px rgba(201, 169, 97, 0.4)',
                      '0 0 20px rgba(201, 169, 97, 0.2)',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <p className="text-[#e8dcc4] text-2xl font-light">Grace</p>
                </motion.div>
              </div>

              {/* Decorative hearts */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`table-heart-${i}`}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <Heart size={10 + i * 2} className="text-[#c9a961]" fill="currentColor" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="bg-[#3d5248]/60 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#c9a961]/30 shadow-2xl h-full hover:border-[#c9a961]/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="w-16 h-16 bg-[#c9a961] rounded-2xl flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <QrCode size={32} className="text-white" strokeWidth={2} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-medium text-[#e8dcc4] mb-1">
                    Votre invitation
                  </h3>
                  <p className="text-[#c9a961] font-light italic">
                    À présenter le jour J
                  </p>
                </div>
              </div>

              {/* QR Code Display */}
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  className="relative"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {/* Decorative border rotating */}
                  <div className="absolute -inset-4 rounded-3xl border-2 border-[#c9a961]/30" />
                </motion.div>

                <motion.div
                  className="relative bg-white p-6 rounded-2xl shadow-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 30px rgba(201, 169, 97, 0.3)',
                      '0 0 50px rgba(201, 169, 97, 0.5)',
                      '0 0 30px rgba(201, 169, 97, 0.3)',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  {/* QR Code Placeholder - Replace with actual QR code */}
                  <div className="w-48 h-48 bg-white flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                      {[...Array(64)].map((_, i) => (
                        <motion.div
                          key={`qr-${i}`}
                          className={`w-4 h-4 ${
                            Math.random() > 0.5 ? 'bg-[#34453D]' : 'bg-white'
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.01 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  className="mt-6 text-[#e8dcc4]/70 text-sm font-light text-center"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  Scannez ce code à l'entrée
                </motion.p>
              </div>

              {/* Sparkles decoration */}
              <div className="flex items-center justify-center gap-3 mt-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`qr-sparkle-${i}`}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    <Sparkles size={16} className="text-[#c9a961]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative pattern dots */}
      <motion.div
        className="absolute top-1/3 left-8 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={`dot-left-${i}`}
              className="w-1.5 h-1.5 bg-[#c9a961] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-8 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 1.7 }}
      >
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={`dot-right-${i}`}
              className="w-1.5 h-1.5 bg-[#c9a961] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2 + 0.5
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}