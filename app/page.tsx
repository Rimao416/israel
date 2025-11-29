"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, ChevronDown, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Hero() {
  return (
    <div className="h-screen w-screen bg-[#34453D] relative overflow-hidden font-['Montserrat']">
      {/* Animated Dark Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(45,60,52,0.6) 0%, rgba(52,69,61,0) 70%)'
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
          background: 'radial-gradient(circle, rgba(60,75,67,0.5) 0%, rgba(52,69,61,0) 70%)'
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
          background: 'radial-gradient(circle, rgba(55,70,62,0.4) 0%, rgba(52,69,61,0) 70%)'
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

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-10 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2.5"
        >
          <div className="relative">
            <motion.div
              className="w-8 h-8 bg-[#c9a961] rounded-full"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-[#34453D]"></div>
            </div>
          </div>
          <span className="text-[#e8dcc4] font-light text-lg tracking-[0.25em]">RIASIN</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex gap-2.5"
        >
          {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.15, backgroundColor: 'rgba(201, 169, 97, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full border border-[#c9a961]/25 flex items-center justify-center text-[#e8dcc4] transition-all duration-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Icon size={16} strokeWidth={1.5} />
            </motion.button>
          ))}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            className="w-9 h-9 bg-[#c9a961] rounded-full flex items-center justify-center text-[#34453D] font-semibold cursor-pointer text-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            ?
          </motion.div>
        </motion.div>
      </nav>

      {/* Main Content Container */}
      <div className="h-full w-full flex items-center px-10 lg:px-16">
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
            >
              <h1 className="text-[#e8dcc4] font-light leading-[1.1]">
                <motion.span 
                  className="block text-5xl lg:text-6xl xl:text-7xl mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  WHERE LOVE
                </motion.span>
                <motion.span 
                  className="block text-5xl lg:text-6xl xl:text-7xl mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  STORIES
                </motion.span>
                <motion.span 
                  className="block text-5xl lg:text-6xl xl:text-7xl text-[#c9a961]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  TAKE FLIGHT
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              className="text-[#b8c4b8] text-sm lg:text-base leading-relaxed max-w-xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              RIASIN Weddings is more than just wedding planning; it's about crafting unforgettable experiences that become the cherished memories forming the foundation of a love story. We believe your wedding is not just a celebration; it's the foundation of a lifetime together.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(201, 169, 97, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-3.5 bg-[#c9a961] text-[#34453D] font-medium text-sm rounded-full flex items-center gap-2.5 transition-all duration-300 shadow-lg"
              >
                <span>Get Started</span>
                <motion.div
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <ArrowRight size={18} strokeWidth={2} />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(201, 169, 97, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 border-2 border-[#c9a961]/25 text-[#e8dcc4] font-medium text-sm rounded-full flex items-center gap-2.5 transition-all duration-300"
              >
                <motion.div
                  className="w-8 h-8 bg-[#3d5a4e] rounded-full flex items-center justify-center"
                  whileHover={{ backgroundColor: '#c9a961' }}
                >
                  <Play size={14} fill="currentColor" className="text-[#e8dcc4] ml-0.5" />
                </motion.div>
                <span>See Video</span>
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
              className="absolute top-0 left-0 w-36 h-36 border-[3px] border-[#c9a961]/15 rounded-tl-[90px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-36 h-36 border-[3px] border-[#c9a961]/15 rounded-br-[90px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            />

            {/* Main Image Container with arch */}
            <motion.div
              className="relative w-[380px] h-[520px]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Arch background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#4a5f54] to-[#3d5248] rounded-t-full rounded-b-3xl shadow-2xl p-5">
                <div className="w-full h-full bg-[#e8dcc4] rounded-t-full rounded-b-2xl overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=90"
                    alt="Beach Wedding Ceremony"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating leaf decoration */}
             
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 bg-[#c9a961] rounded-full flex items-center justify-center cursor-pointer shadow-2xl"
        >
          <ChevronDown size={24} className="text-[#34453D]" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      {/* Decorative pattern dots */}
      <motion.div
        className="absolute top-1/3 right-14 opacity-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-[#c9a961] rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 2 + i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}