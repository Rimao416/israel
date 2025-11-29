"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X } from 'lucide-react';

export default function DresscodeSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const dressCodeItems = [
    {
      id: 1,
      title: "Élégance Féminine",
      category: "Pour Elle",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1200&fit=crop&q=90",
      description: "Robes longues fluides, tons pastel ou dorés, élégance raffinée"
    },
    {
      id: 2,
      title: "Sophistication Masculine",
      category: "Pour Lui",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=1200&fit=crop&q=90",
      description: "Costume sombre ou beige, chemise claire, cravate élégante"
    },
    {
      id: 3,
      title: "Harmonie Chromatique",
      category: "Palette",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop&q=90",
      description: "Tons champagne, or, beige, vert sauge et blanc cassé"
    },
    {
      id: 4,
      title: "Accessoires Raffinés",
      category: "Détails",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1200&fit=crop&q=90",
      description: "Bijoux délicats, pochette élégante, chaussures raffinées"
    },
    {
      id: 5,
      title: "Style Romantique",
      category: "Inspiration",
      image: "https://images.unsplash.com/photo-1594552072238-3ccb2f8d1e0d?w=800&h=1200&fit=crop&q=90",
      description: "Dentelle, tissus fluides, broderies délicates, douceur"
    },
    {
      id: 6,
      title: "Élégance Intemporelle",
      category: "Classique",
      image: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&h=1200&fit=crop&q=90",
      description: "Coupes classiques, matières nobles, finitions soignées"
    }
  ];

  // Sparkles positions - useState pour éviter la regénération à chaque render
  const [sparklePositions] = useState(() =>
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4
    }))
  );

  // Positions pour les sparkles du modal
  const [modalSparklePositions] = useState(() =>
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3
    }))
  );

  return (
    <div className="min-h-screen bg-[#34453D] relative overflow-hidden py-20 px-6 font-['Montserrat']">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 right-32 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.15) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-[550px] h-[550px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(232,220,196,0.1) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, 60, 0],
          y: [0, -50, 0],
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
            left: `${12 + i * 12}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [-50, -1000],
            x: [0, Math.sin(i * 2) * 90],
            rotate: [0, 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 9 + i * 1.5,
            repeat: Infinity,
            delay: i * 1.4,
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
            <motion.span
              className="text-5xl"
              animate={{
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              👗
            </motion.span>
            <Heart size={40} className="text-[#c9a961]" fill="currentColor" />
            <motion.span
              className="text-5xl"
              animate={{
                rotate: [0, -10, 10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              🤵
            </motion.span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#e8dcc4] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Code Vestimentaire
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-[#e8dcc4]/70 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Laissez-vous inspirer par notre palette de couleurs
            <br />
            <span className="text-[#c9a961] italic">Élégance et raffinement pour cette journée unique</span>
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {dressCodeItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <motion.button
                onClick={() => setExpandedCard(item.id)}
                className="w-full h-[400px] rounded-3xl overflow-hidden relative group cursor-pointer"
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image */}
                <motion.img
  src={item.image}
  alt={item.title}
  className="w-full h-full object-cover"
  initial={{ scale: 1.2 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.6 }}
/>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#34453D] via-[#34453D]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <motion.div
                    className="inline-flex items-center gap-2 mb-3 bg-[#c9a961]/90 backdrop-blur-sm px-4 py-2 rounded-full w-fit"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(201, 169, 97, 0.3)',
                        '0 0 30px rgba(201, 169, 97, 0.5)',
                        '0 0 20px rgba(201, 169, 97, 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles size={14} className="text-white" />
                    <span className="text-white text-sm font-medium">{item.category}</span>
                  </motion.div>
                  <h3 className="text-2xl font-light text-[#e8dcc4] mb-2 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#e8dcc4]/70 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Cliquez pour voir les détails
                  </p>
                </div>
                {/* Decorative corner */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#c9a961]/50 rounded-tr-2xl"
                  animate={{
                    borderColor: ['rgba(201, 169, 97, 0.5)', 'rgba(201, 169, 97, 1)', 'rgba(201, 169, 97, 0.5)']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                {/* Hover heart effect */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart size={60} className="text-[#c9a961]" fill="currentColor" />
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {expandedCard && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#34453D]/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedCard(null)}
          >
            {/* Floating sparkles in modal */}
            {modalSparklePositions.map((pos, i) => (
              <motion.div
                key={`modal-sparkle-${i}`}
                className="absolute text-[#c9a961]"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: pos.delay,
                  ease: "easeInOut"
                }}
              >
                <Sparkles size={16} />
              </motion.div>
            ))}

            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setExpandedCard(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-[#c9a961] rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} className="text-white" />
              </motion.button>

              {dressCodeItems.filter(item => item.id === expandedCard).map(item => (
                <div key={item.id} className="relative">
                  {/* Image Section */}
                  <div className="relative h-[400px] rounded-t-3xl overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#34453D] via-[#34453D]/40 to-transparent" />
                   
                    {/* Floating hearts in image */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={`modal-heart-${i}`}
                        className="absolute text-[#c9a961]"
                        style={{
                          left: `${20 + i * 15}%`,
                          bottom: '-5%',
                        }}
                        animate={{
                          y: [-30, -400],
                          x: [0, Math.sin(i) * 50],
                          rotate: [0, 360],
                          opacity: [0, 0.7, 0],
                        }}
                        transition={{
                          duration: 6 + i,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: "linear"
                        }}
                      >
                        <Heart size={18} fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content Section */}
                  <div className="p-8 md:p-12">
                    <motion.div
                      className="inline-flex items-center gap-2 mb-4 bg-[#c9a961] px-5 py-2 rounded-full"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Sparkles size={16} className="text-white" />
                      <span className="text-white font-medium">{item.category}</span>
                    </motion.div>
                    <motion.h3
                      className="text-4xl md:text-5xl font-light text-[#34453D] mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      className="text-xl text-[#34453D]/70 font-light leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {item.description}
                    </motion.p>

                    {/* Decorative hearts */}
                    <motion.div
                      className="flex items-center justify-center gap-3 mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`bottom-heart-${i}`}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        >
                          <Heart size={14 + i * 2} className="text-[#c9a961]" fill="currentColor" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative pattern dots */}
      <motion.div
        className="absolute top-1/4 left-10 opacity-20"
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
        className="absolute bottom-1/3 right-10 opacity-20"
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