"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Simple Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#34453D] flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Heart size={60} className="text-[#c9a961] mx-auto mb-6" fill="currentColor" />
              <h1 className="text-5xl md:text-6xl font-light text-[#e8dcc4]">
                Bienvenue
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-screen w-screen bg-[#34453D] relative overflow-hidden font-['Montserrat'] flex items-center justify-center px-6">
          {/* Background Orbs */}
          <motion.div
            className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(201,169,97,0.15) 0%, rgba(52,69,61,0) 70%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
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
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Welcome Message */}
          <motion.div
            className="text-center z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Heart size={80} className="text-[#c9a961] mx-auto mb-8" fill="currentColor" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#e8dcc4] mb-4">
              Bienvenue
            </h1>
            
            <p className="text-2xl md:text-3xl text-[#c9a961] font-light italic">
              Au mariage d{"'"}Israël & Justesse
            </p>
          </motion.div>
        </div>

      </motion.div>
    </>
  );
}