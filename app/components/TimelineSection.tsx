"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Clock, Gift, Music, Cake, Users, PartyPopper } from 'lucide-react';

export default function TimelineSection() {
  const timelineEvents = [
    {
      id: 1,
      time: "16h00 - 17h30",
      title: "Arrivée et réception des invités",
      description: "Accueil chaleureux dans une ambiance conviviale",
      icon: Users,
      color: "#c9a961"
    },
    {
      id: 2,
      time: "17h30 - 17h45",
      title: "Entrée des mariés",
      description: "Le moment tant attendu où nous ferons notre entrée",
      icon: Heart,
      color: "#c9a961",
      highlight: true
    },
    {
      id: 3,
      time: "17h45 - 18h00",
      title: "Mot de bienvenue et présentation des mariés",
      description: "Discours d'ouverture et présentation officielle",
      icon: Sparkles,
      color: "#c9a961"
    },
    {
      id: 4,
      time: "18h00 - 18h15",
      title: "Ouverture de bal",
      description: "Notre première danse en tant que couple marié",
      icon: Music,
      color: "#c9a961",
      highlight: true
    },
    {
      id: 5,
      time: "18h15 - 18h45",
      title: "Remise des cadeaux",
      description: "Moment d'émotion et de partage",
      icon: Gift,
      color: "#c9a961"
    },
    {
      id: 6,
      time: "18h45 - 20h30",
      title: "Ouverture du buffet",
      description: "Délices culinaires et moments de convivialité",
      icon: "🍽️",
      color: "#c9a961"
    },
    {
      id: 7,
      time: "20h30 - 21h00",
      title: "Jeux et animations",
      description: "Divertissements et rires partagés",
      icon: PartyPopper,
      color: "#c9a961"
    },
    {
      id: 8,
      time: "21h00 - 22h00",
      title: "Coupe du gâteau",
      description: "Tradition sucrée et photos mémorables",
      icon: Cake,
      color: "#c9a961",
      highlight: true
    },
    {
      id: 9,
      time: "22h00 - 00h00",
      title: "Danse et ambiance collective",
      description: "Piste de danse enflammée jusqu'au bout de la nuit",
      icon: Music,
      color: "#c9a961"
    },
    {
      id: 10,
      time: "00h00 - 00h10",
      title: "Mot de clôture et remerciements",
      description: "Derniers mots et gratitude infinie",
      icon: Heart,
      color: "#c9a961"
    }
  ];

  // Sparkles positions
  const [sparklePositions] = useState(() =>
    Array.from({ length: 25 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5
    }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] via-[#e8dcc4] to-[#f5f1e8] relative overflow-hidden py-20 px-6 font-['Montserrat']">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-40 left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 50, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-32 right-40 w-[550px] h-[550px] rounded-full blur-3xl opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(52,69,61,0.25) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1.15, 1, 1.15],
          x: [0, -60, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(232,220,196,0.4) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
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
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-[#c9a961]/20"
          style={{
            left: `${8 + i * 8}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [-50, -1200],
            x: [0, Math.sin(i * 1.8) * 100],
            rotate: [0, 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 12 + i * 1.2,
            repeat: Infinity,
            delay: i * 1.1,
            ease: "linear"
          }}
        >
          <Heart size={16 + i * 1.5} fill="currentColor" />
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Clock size={48} className="text-[#c9a961]" strokeWidth={1.5} />
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
              <PartyPopper size={48} className="text-[#c9a961]" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-light text-[#34453D] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Programme de l{"'"}Événement
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-[#34453D]/70 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Une journée d{"'"}amour, de joie et de célébration
            <br />
            <span className="text-[#c9a961] italic font-medium">Chaque moment est une étoile dans notre constellation</span>
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c9a961]/30 via-[#c9a961] to-[#c9a961]/30"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Content Card */}
                <motion.div
                  className={`w-full md:w-[calc(50%-4rem)] ml-20 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 transition-all duration-300 ${
                      event.highlight
                        ? 'border-[#c9a961] shadow-[#c9a961]/30'
                        : 'border-[#c9a961]/20 hover:border-[#c9a961]/50'
                    }`}
                  >
                    {/* Icon and Time */}
                    <div className="flex items-start gap-4 mb-3">
                      <motion.div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          event.highlight ? 'bg-[#c9a961]' : 'bg-[#c9a961]/20'
                        }`}
                        animate={event.highlight ? {
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 0 20px rgba(201, 169, 97, 0.3)',
                            '0 0 30px rgba(201, 169, 97, 0.6)',
                            '0 0 20px rgba(201, 169, 97, 0.3)',
                          ]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {typeof event.icon === 'string' ? (
                          <span className="text-2xl">{event.icon}</span>
                        ) : (
                          <event.icon
                            size={28}
                            className={event.highlight ? 'text-white' : 'text-[#34453D]'}
                            strokeWidth={1.5}
                            fill={event.highlight && event.icon === Heart ? 'currentColor' : 'none'}
                          />
                        )}
                      </motion.div>

                      <div className="flex-1">
                        <motion.div
                          className="inline-flex items-center gap-2 bg-[#c9a961]/10 px-3 py-1 rounded-full mb-2"
                          animate={{
                            backgroundColor: event.highlight 
                              ? ['rgba(201, 169, 97, 0.1)', 'rgba(201, 169, 97, 0.2)', 'rgba(201, 169, 97, 0.1)']
                              : 'rgba(201, 169, 97, 0.1)'
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        >
                          <Clock size={14} className="text-[#c9a961]" />
                          <span className="text-[#c9a961] text-sm font-medium">
                            {event.time}
                          </span>
                        </motion.div>
                        <h3 className="text-xl font-medium text-[#34453D] mb-2">
                          {event.title}
                        </h3>
                        <p className="text-[#34453D]/60 text-sm font-light leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Highlight indicator */}
                    {event.highlight && (
                      <motion.div
                        className="flex items-center gap-2 mt-3 pt-3 border-t border-[#c9a961]/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Sparkles size={14} className="text-[#c9a961]" />
                        <span className="text-[#c9a961] text-xs font-medium italic">
                          Moment phare de la soirée
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Center Circle Node */}
                <motion.div
                  className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: index * 0.1 + 0.2
                  }}
                >
                  <motion.div
                    className={`w-8 h-8 rounded-full border-4 ${
                      event.highlight
                        ? 'bg-[#c9a961] border-white shadow-lg shadow-[#c9a961]/50'
                        : 'bg-white border-[#c9a961]'
                    }`}
                    animate={event.highlight ? {
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        '0 0 20px rgba(201, 169, 97, 0.5)',
                        '0 0 30px rgba(201, 169, 97, 0.8)',
                        '0 0 20px rgba(201, 169, 97, 0.5)',
                      ]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {event.highlight && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Heart size={14} className="text-white" fill="currentColor" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Pulse rings for highlights */}
                  {event.highlight && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#c9a961]"
                        animate={{
                          scale: [1, 2],
                          opacity: [0.6, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#c9a961]"
                        animate={{
                          scale: [1, 2],
                          opacity: [0.6, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 1
                        }}
                      />
                    </>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={`bottom-heart-${i}`}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3],
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15
              }}
            >
              <Heart size={12 + i * 2} className="text-[#c9a961]" fill="currentColor" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}