"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Check, Sparkles, UserCheck, UserX } from 'lucide-react';

export default function RSVPSection() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption) {
      setSubmitted(true);
    }
  };

  // Sparkles positions
  const [sparklePositions] = useState(() =>
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4
    }))
  );

  return (
    <div className="min-h-screen bg-[#f5f1e8] relative overflow-hidden py-20 px-6 font-['Montserrat']">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-40 left-20 w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.25) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-20 right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(52,69,61,0.2) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
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
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-bg-${i}`}
          className="absolute text-[#c9a961]/10"
          style={{
            left: `${10 + i * 12}%`,
            top: '100%',
          }}
          animate={{
            y: [0, -1200],
            x: [0, Math.sin(i) * 80],
            rotate: [0, 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + i * 1.5,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "linear"
          }}
        >
          <Heart size={24} fill="currentColor" />
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
            className="inline-block mb-4"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart size={48} className="text-[#c9a961]" fill="currentColor" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#34453D] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Confirmez votre présence
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-[#34453D]/70 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Votre présence nous ferait un immense plaisir. Merci de confirmer avant le{' '}
            <span className="text-[#c9a961] font-medium">11 octobre 2025</span>
          </motion.p>
        </motion.div>

        {!submitted ? (
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-[#c9a961]/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* RSVP Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Option: Je serai présent(e) */}
              <motion.button
                onClick={() => setSelectedOption('yes')}
                className={`relative overflow-hidden rounded-2xl p-8 border-3 transition-all duration-300 ${
                  selectedOption === 'yes'
                    ? 'bg-[#c9a961] border-[#c9a961] shadow-xl'
                    : 'bg-[#34453D]/5 border-[#34453D]/20 hover:border-[#c9a961]/50'
                }`}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedOption === 'yes' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedOption === 'yes' ? 'bg-white' : 'bg-[#c9a961]/20'
                    }`}
                    animate={selectedOption === 'yes' ? {
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ duration: 0.5, repeat: selectedOption === 'yes' ? Infinity : 0 }}
                  >
                    <UserCheck 
                      size={32} 
                      className={selectedOption === 'yes' ? 'text-[#c9a961]' : 'text-[#34453D]'} 
                    />
                  </motion.div>
                  
                  <span className={`text-xl font-medium ${
                    selectedOption === 'yes' ? 'text-white' : 'text-[#34453D]'
                  }`}>
                    Je serai présent(e)
                  </span>

                  {selectedOption === 'yes' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Check size={20} className="text-[#c9a961]" strokeWidth={3} />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.button>

              {/* Option: Je ne pourrai pas venir */}
              <motion.button
                onClick={() => setSelectedOption('no')}
                className={`relative overflow-hidden rounded-2xl p-8 border-3 transition-all duration-300 ${
                  selectedOption === 'no'
                    ? 'bg-[#34453D]/10 border-[#34453D] shadow-xl'
                    : 'bg-[#34453D]/5 border-[#34453D]/20 hover:border-[#34453D]/40'
                }`}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedOption === 'no' ? 'bg-[#34453D]' : 'bg-[#34453D]/10'
                    }`}
                  >
                    <UserX 
                      size={32} 
                      className={selectedOption === 'no' ? 'text-white' : 'text-[#34453D]'} 
                    />
                  </motion.div>
                  
                  <span className={`text-xl font-medium ${
                    selectedOption === 'no' ? 'text-[#34453D]' : 'text-[#34453D]'
                  }`}>
                    Je ne pourrai pas venir
                  </span>

                  {selectedOption === 'no' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="w-8 h-8 bg-[#34453D] rounded-full flex items-center justify-center">
                        <Check size={20} className="text-white" strokeWidth={3} />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`w-full py-5 rounded-full font-medium text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                selectedOption
                  ? 'bg-[#c9a961] text-white hover:shadow-2xl cursor-pointer'
                  : 'bg-[#34453D]/10 text-[#34453D]/40 cursor-not-allowed'
              }`}
              whileHover={selectedOption ? { scale: 1.02, y: -2 } : {}}
              whileTap={selectedOption ? { scale: 0.98 } : {}}
              animate={selectedOption ? {
                boxShadow: [
                  '0 10px 30px rgba(201, 169, 97, 0.2)',
                  '0 15px 40px rgba(201, 169, 97, 0.4)',
                  '0 10px 30px rgba(201, 169, 97, 0.2)',
                ]
              } : {}}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              <Mail size={20} />
              <span>Envoyer ma réponse</span>
            </motion.button>
          </motion.div>
        ) : (
          // Confirmation Message
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl border-2 border-[#c9a961]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="inline-block mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2
                }}
              >
                <div className="w-20 h-20 bg-[#c9a961] rounded-full flex items-center justify-center mx-auto">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {selectedOption === 'yes' ? (
                      <Heart size={40} fill="white" className="text-white" />
                    ) : (
                      <Check size={40} className="text-white" strokeWidth={3} />
                    )}
                  </motion.div>
                </div>
              </motion.div>

              <motion.h3
                className="text-3xl md:text-4xl font-light text-[#34453D] mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Merci pour votre confirmation !
              </motion.h3>

              <motion.p
                className="text-xl text-[#34453D]/70 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {selectedOption === 'yes' 
                  ? "Nous avons hâte de vous voir !" 
                  : "Nous espérons vous voir une prochaine fois."}
              </motion.p>

              {/* Confetti Hearts */}
              {selectedOption === 'yes' && [...Array(12)].map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute text-[#c9a961]"
                  style={{
                    left: `${50}%`,
                    top: `${50}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.5],
                    x: [0, (Math.random() - 0.5) * 300],
                    y: [0, (Math.random() - 0.5) * 300],
                    rotate: [0, Math.random() * 360],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.6 + i * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <Heart size={20} fill="currentColor" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}