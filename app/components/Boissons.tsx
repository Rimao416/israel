"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Check, Wine } from 'lucide-react';

export default function DrinksSection() {
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);

  const drinks = [
    { id: 'coca', name: 'Coca-Cola', color: '#c9a961', icon: '🥤' },
    { id: 'fanta', name: 'Fanta', color: '#c9a961', icon: '🍊' },
    { id: 'boga', name: 'Boga', color: '#c9a961', icon: '🍋' },
    { id: 'jus', name: 'Jus de Fruit', color: '#c9a961', icon: '🧃' }
  ];

  const toggleDrink = (drinkId: string) => {
    setSelectedDrinks(prev =>
      prev.includes(drinkId)
        ? prev.filter(id => id !== drinkId)
        : [...prev, drinkId]
    );
  };

  // Sparkles positions
  const [sparklePositions] = useState(() =>
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4
    }))
  );

  return (
    <div className="min-h-screen bg-[#34453D] relative overflow-hidden py-20 px-6 font-['Montserrat']">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 right-20 w-[450px] h-[450px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.15) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-32 left-32 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(232,220,196,0.1) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 16,
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
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-[#c9a961]/15"
          style={{
            left: `${15 + i * 15}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [-50, -1000],
            x: [0, Math.sin(i * 2) * 100],
            rotate: [0, 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 9 + i * 1.5,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear"
          }}
        >
          <Heart size={22} fill="currentColor" />
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
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
              y: [0, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Wine size={48} className="text-[#c9a961]" />
            </motion.div>
            <Heart size={40} className="text-[#c9a961]" fill="currentColor" />
            <motion.div
              animate={{
                rotate: [0, -15, 15, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Wine size={48} className="text-[#c9a961]" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#e8dcc4] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Vos boissons préférées
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-[#e8dcc4]/70 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Pour vous faire plaisir, choisissez vos boissons favorites
            <br />
            <span className="text-[#c9a961] italic">Sélection multiple possible</span>
          </motion.p>
        </motion.div>

        {/* Drinks Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {drinks.map((drink, index) => {
            const isSelected = selectedDrinks.includes(drink.id);
           
            return (
              <motion.button
                key={drink.id}
                onClick={() => toggleDrink(drink.id)}
                className={`relative overflow-hidden rounded-3xl p-8 border-2 transition-all duration-500 ${
                  isSelected
                    ? 'bg-[#c9a961] border-[#c9a961] shadow-2xl'
                    : 'bg-[#3d5248]/40 backdrop-blur-sm border-[#c9a961]/30 hover:border-[#c9a961]/60 hover:bg-[#3d5248]/60'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Glow Effect */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Sparkle Effect on Selection */}
                {isSelected && [...Array(8)].map((_, i) => (
                  <motion.div
                    key={`sparkle-drink-${drink.id}-${i}`}
                    className="absolute text-white"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 150],
                      y: [0, (Math.random() - 0.5) * 150],
                      rotate: [0, Math.random() * 360],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    <Sparkles size={12} />
                  </motion.div>
                ))}

                <div className="relative z-10 flex items-center gap-6">
                  {/* Icon Container */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl ${
                      isSelected ? 'bg-white/90' : 'bg-[#c9a961]/20'
                    }`}
                    animate={isSelected ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{
                      duration: 0.6,
                      repeat: isSelected ? Infinity : 0,
                      repeatDelay: 1
                    }}
                  >
                    {drink.icon}
                  </motion.div>

                  {/* Drink Name */}
                  <div className="flex-1 text-left">
                    <h3 className={`text-2xl font-medium transition-colors duration-300 ${
                      isSelected ? 'text-white' : 'text-[#e8dcc4]'
                    }`}>
                      {drink.name}
                    </h3>
                  </div>

                  {/* Check Icon */}
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-white' : 'bg-[#c9a961]/20'
                    }`}
                    animate={isSelected ? {
                      scale: [1, 1.2, 1],
                    } : {}}
                    transition={{
                      duration: 0.3
                    }}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        <Check size={24} className="text-[#c9a961]" strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Selection Counter */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-[#3d5248]/60 backdrop-blur-sm border border-[#c9a961]/30 rounded-full px-8 py-4"
            animate={{
              boxShadow: selectedDrinks.length > 0
                ? [
                    '0 0 20px rgba(201, 169, 97, 0.2)',
                    '0 0 30px rgba(201, 169, 97, 0.4)',
                    '0 0 20px rgba(201, 169, 97, 0.2)',
                  ]
                : []
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <Heart
              size={20}
              className={selectedDrinks.length > 0 ? 'text-[#c9a961]' : 'text-[#e8dcc4]/50'}
              fill={selectedDrinks.length > 0 ? 'currentColor' : 'none'}
            />
            <span className="text-[#e8dcc4] font-light">
              {selectedDrinks.length === 0
                ? 'Aucune boisson sélectionnée'
                : selectedDrinks.length === 1
                ? '1 boisson sélectionnée'
                : `${selectedDrinks.length} boissons sélectionnées`
              }
            </span>
          </motion.div>
        </motion.div>
      </div>

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
        className="absolute bottom-1/4 right-10 opacity-20"
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