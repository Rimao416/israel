"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Edit3, BookHeart, Loader2, Check } from 'lucide-react';
import { useLivreOr } from '@/hooks/useInvite';

export default function GuestbookSection() {
  const defaultMessage = "Toutes nos félicitations pour votre mariage ! Nous vous souhaitons tout le bonheur du monde et une vie remplie d'amour, de joie et de complicité. Que votre union soit bénie et que chaque jour soit une nouvelle célébration de votre amour.";
 
  const { message: savedMessage, saveMessage, isLoading } = useLivreOr();
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempMessage, setTempMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Le message affiché est soit savedMessage, soit le message par défaut
  const displayMessage = savedMessage || defaultMessage;

  const handleEdit = () => {
    setTempMessage(displayMessage);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (tempMessage.trim()) {
      await saveMessage(tempMessage);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleCancel = () => {
    setTempMessage(displayMessage);
    setIsEditing(false);
  };

  // Sparkles positions
  const [sparklePositions] = useState(() =>
    Array.from({ length: 18 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4
    }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] to-[#e8dcc4] relative overflow-hidden py-20 px-6 font-['Montserrat']">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-32 left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 right-32 w-[450px] h-[450px] rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(52,69,61,0.25) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -50, 0],
          y: [0, 40, 0],
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
          <Sparkles size={14} />
        </motion.div>
      ))}

      {/* Floating Hearts */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-[#c9a961]/20"
          style={{
            left: `${10 + i * 10}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [-50, -1100],
            x: [0, Math.sin(i * 1.5) * 80],
            rotate: [0, 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + i * 1.2,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "linear"
          }}
        >
          <Heart size={18 + i * 2} fill="currentColor" />
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <BookHeart size={56} className="text-[#c9a961]" strokeWidth={1.5} />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#34453D] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Livre d{"'"}Or
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-[#34453D]/70 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Laissez-nous un message qui restera gravé dans nos cœurs
            <br />
            <span className="text-[#c9a961] italic">Vos mots sont notre plus beau cadeau</span>
          </motion.p>
        </motion.div>

        {/* Guestbook Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Decorative corners */}
          <motion.div
            className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-[#c9a961]/30 rounded-tl-3xl"
            animate={{
              borderColor: ['rgba(201, 169, 97, 0.3)', 'rgba(201, 169, 97, 0.6)', 'rgba(201, 169, 97, 0.3)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-[#c9a961]/30 rounded-br-3xl"
            animate={{
              borderColor: ['rgba(201, 169, 97, 0.3)', 'rgba(201, 169, 97, 0.6)', 'rgba(201, 169, 97, 0.3)']
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-[#c9a961]/20 relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle, #c9a961 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />

            <div className="relative z-10">
              {/* Hearts decoration */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart size={20} className="text-[#c9a961]" fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  <Heart size={24} className="text-[#c9a961]" fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  <Heart size={20} className="text-[#c9a961]" fill="currentColor" />
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {!isEditing ? (
                  // Display Mode
                  <motion.div
                    key="display"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-8">
                      <p className="text-[#34453D] text-lg leading-relaxed font-light whitespace-pre-wrap">
                        {displayMessage}
                      </p>
                    </div>
                    
                    {/* Success message */}
                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-4 p-3 bg-green-100 text-green-800 rounded-xl flex items-center gap-2 justify-center"
                        >
                          <Check size={18} />
                          <span className="text-sm font-medium">Message enregistré avec succès !</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      onClick={handleEdit}
                      className="w-full py-4 bg-[#c9a961] text-white font-medium rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl"
                      whileHover={{ scale: 1.02, y: -2 }}
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
                    >
                      <Edit3 size={20} />
                      <span>Modifier mon message</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  // Edit Mode
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-6">
                      <textarea
                        value={tempMessage}
                        onChange={(e) => setTempMessage(e.target.value)}
                        className="w-full h-64 p-6 bg-[#f5f1e8]/50 border-2 border-[#c9a961]/30 rounded-2xl text-[#34453D] text-lg font-light resize-none focus:outline-none focus:border-[#c9a961] transition-all duration-300"
                        placeholder="Écrivez votre message aux mariés..."
                        style={{ lineHeight: '1.8' }}
                        disabled={isLoading}
                      />
                      <div className="flex items-center justify-between mt-2 px-2">
                        <span className="text-sm text-[#34453D]/50 font-light">
                          {tempMessage.length} caractères
                        </span>
                        <motion.div
                          animate={{
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        >
                          <Heart size={16} className="text-[#c9a961]" fill="currentColor" />
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <motion.button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex-1 py-4 bg-[#34453D]/10 text-[#34453D] font-medium rounded-2xl transition-all duration-300 hover:bg-[#34453D]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                      >
                        Annuler
                      </motion.button>
                      <motion.button
                        onClick={handleSave}
                        disabled={isLoading || !tempMessage.trim()}
                        className="flex-1 py-4 bg-[#c9a961] text-white font-medium rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Enregistrement...</span>
                          </>
                        ) : (
                          <>
                            <Heart size={18} fill="currentColor" />
                            <span>Enregistrer</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`bottom-heart-${i}`}
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
              <Heart size={12 + i * 2} className="text-[#c9a961]" fill="currentColor" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative pattern dots */}
      <motion.div
        className="absolute top-1/3 left-8 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="grid grid-cols-4 gap-2">
          {[...Array(12)].map((_, i) => (
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
                delay: i * 0.15
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-8 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div className="grid grid-cols-4 gap-2">
          {[...Array(12)].map((_, i) => (
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
                delay: i * 0.15 + 0.5
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}