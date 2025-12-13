"use client"
import React from 'react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] via-[#e8dcc4] to-[#f5f1e8] relative overflow-hidden py-20 px-6 font-['Montserrat']">
      {/* Static Background Orbs */}
      <div
        className="absolute top-40 left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.3) 0%, transparent 70%)'
        }}
      />

      <div
        className="absolute bottom-32 right-40 w-[550px] h-[550px] rounded-full blur-3xl opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(52,69,61,0.25) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <Clock size={48} className="text-[#c9a961]" strokeWidth={1.5} />
            <Heart size={40} className="text-[#c9a961]" fill="currentColor" />
            <PartyPopper size={48} className="text-[#c9a961]" />
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#34453D] mb-6">
            Programme de l{"'"}Événement
          </h2>

          <p className="text-xl md:text-2xl text-[#34453D]/70 font-light max-w-3xl mx-auto">
            Une journée d{"'"}amour, de joie et de célébration
            <br />
            <span className="text-[#c9a961] italic font-medium">Chaque moment est une étoile dans notre constellation</span>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c9a961]/30 via-[#c9a961] to-[#c9a961]/30" />

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
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-4rem)] ml-20 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
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
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          event.highlight ? 'bg-[#c9a961]' : 'bg-[#c9a961]/20'
                        }`}
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
                      </div>

                      <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-[#c9a961]/10 px-3 py-1 rounded-full mb-2">
                          <Clock size={14} className="text-[#c9a961]" />
                          <span className="text-[#c9a961] text-sm font-medium">
                            {event.time}
                          </span>
                        </div>
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
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#c9a961]/20">
                        <Sparkles size={14} className="text-[#c9a961]" />
                        <span className="text-[#c9a961] text-xs font-medium italic">
                          Moment phare de la soirée
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Center Circle Node */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                  <div
                    className={`w-8 h-8 rounded-full border-4 ${
                      event.highlight
                        ? 'bg-[#c9a961] border-white shadow-lg shadow-[#c9a961]/50'
                        : 'bg-white border-[#c9a961]'
                    }`}
                  >
                    {event.highlight && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Heart size={14} className="text-white" fill="currentColor" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-3 mt-16">
          {[...Array(7)].map((_, i) => (
            <Heart key={`bottom-heart-${i}`} size={12 + i * 2} className="text-[#c9a961] opacity-50" fill="currentColor" />
          ))}
        </div>
      </div>
    </div>
  );
}