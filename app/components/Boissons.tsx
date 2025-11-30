"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Check, Wine, Save, AlertCircle } from 'lucide-react';
import { useBoissons, useInviteInfo } from '@/hooks/useInvite';
import { TypeBoisson } from '@/types/invite.types';

export default function DrinksSection() {
  const { boissons, saveBoissonPreferences, isLoading } = useBoissons();
  const { prenom, nomComplet } = useInviteInfo();
  
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const drinks = [
    { id: TypeBoisson.COCA_COLA, name: 'Coca-Cola', color: '#c9a961', icon: '🥤' },
    { id: TypeBoisson.FANTA, name: 'Fanta', color: '#c9a961', icon: '🍊' },
    { id: TypeBoisson.BOGA, name: 'Boga', color: '#c9a961', icon: '🍋' },
    { id: TypeBoisson.JUS_DE_FRUIT, name: 'Jus de Fruit', color: '#c9a961', icon: '🧃' },
    { id: TypeBoisson.CELESTIA, name: 'Celestia', color: '#c9a961', icon: '💧' }
  ];

  // Charger les préférences existantes
  useEffect(() => {
    if (boissons && boissons.length > 0) {
      const selected = boissons.map(b => b.boisson);
      setSelectedDrinks(selected);
    }
  }, [boissons]);

  const toggleDrink = (drinkId: string) => {
    setSelectedDrinks(prev => {
      const isCurrentlySelected = prev.includes(drinkId);
      
      if (isCurrentlySelected) {
        return prev.filter(id => id !== drinkId);
      } else {
        return [...prev, drinkId];
      }
    });
    
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const preferences = selectedDrinks.map(drinkId => ({
        boisson: drinkId as TypeBoisson,
        quantite: 1
      }));

      await saveBoissonPreferences(preferences);
      setSaveSuccess(true);

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Erreur lors de la sauvegarde. Veuillez réessayer.');
      console.error('Erreur sauvegarde boissons:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = () => {
    if (boissons.length !== selectedDrinks.length) return true;
    
    for (const drink of selectedDrinks) {
      const existing = boissons.find(b => b.boisson === drink);
      if (!existing) return true;
    }
    
    return false;
  };


  return (
    <div className="min-h-screen bg-[#34453D] relative overflow-hidden py-20 px-6 font-['Montserrat']">
      {/* Animated Background Orbs - Simplifiés */}
      <motion.div
        className="absolute top-20 right-20 w-[450px] h-[450px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.15) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
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
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />


      {/* Floating Hearts - Réduit de 6 à 3 */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-[#c9a961]/15"
          style={{
            left: `${25 + i * 25}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [-50, -1000],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        >
          <Heart size={22} fill="currentColor" />
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header - Animations simplifiées */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <Wine size={48} className="text-[#c9a961]" />
            <Heart size={40} className="text-[#c9a961]" fill="currentColor" />
            <Wine size={48} className="text-[#c9a961]" />
          </div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#e8dcc4] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Vos boissons préférées
          </motion.h2>

          {prenom && (
            <motion.p
              className="text-xl text-[#c9a961] font-light mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {prenom}, faites-nous savoir vos préférences
            </motion.p>
          )}

          <motion.p
            className="text-lg md:text-xl text-[#e8dcc4]/70 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Pour vous faire plaisir, choisissez vos boissons favorites
            <br />
            <span className="text-[#c9a961] italic">Sélection multiple possible</span>
          </motion.p>
        </motion.div>

        {/* Messages */}
        {error && (
          <motion.div
            className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={24} className="text-red-500 flex-shrink-0" />
            <p className="text-red-300">{error}</p>
          </motion.div>
        )}

        {saveSuccess && (
          <motion.div
            className="bg-green-500/10 border-2 border-green-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Check size={24} className="text-green-400 flex-shrink-0" />
            <p className="text-green-300">Vos préférences ont été enregistrées avec succès !</p>
          </motion.div>
        )}

        {/* Drinks Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {drinks.map((drink, index) => {
            const isSelected = selectedDrinks.includes(drink.id);
           
            return (
              <motion.button
                key={drink.id}
                onClick={() => toggleDrink(drink.id)}
                disabled={isLoading || isSaving}
                className={`relative overflow-hidden rounded-3xl p-8 border-2 transition-all duration-500 disabled:opacity-50 ${
                  isSelected
                    ? 'bg-[#c9a961] border-[#c9a961] shadow-2xl'
                    : 'bg-[#3d5248]/40 backdrop-blur-sm border-[#c9a961]/30'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Glow Effect */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                )}

                {/* Sparkle Effect - Réduit de 8 à 3 */}
                {isSelected && [...Array(3)].map((_, i) => (
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
                      x: [0, (Math.random() - 0.5) * 100],
                      y: [0, (Math.random() - 0.5) * 100],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <Sparkles size={12} />
                  </motion.div>
                ))}

                <div className="relative z-10 flex items-center gap-6">
                  {/* Icon Container */}
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl ${
                    isSelected ? 'bg-white/90' : 'bg-[#c9a961]/20'
                  }`}>
                    {drink.icon}
                  </div>

                  {/* Drink Name */}
                  <div className="flex-1 text-left">
                    <h3 className={`text-2xl font-medium transition-colors duration-300 ${
                      isSelected ? 'text-white' : 'text-[#e8dcc4]'
                    }`}>
                      {drink.name}
                    </h3>
                  </div>

                  {/* Check Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-white' : 'bg-[#c9a961]/20'
                  }`}>
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
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Selection Counter & Save Button */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 bg-[#3d5248]/60 backdrop-blur-sm border border-[#c9a961]/30 rounded-full px-8 py-4">
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
          </div>

          {/* Save Button */}
          {hasChanges() && (
            <motion.button
              onClick={handleSave}
              disabled={selectedDrinks.length === 0 || isLoading || isSaving}
              className={`px-8 py-4 rounded-full font-medium text-lg flex items-center justify-center gap-3 mx-auto transition-all duration-300 ${
                selectedDrinks.length > 0 && !isSaving
                  ? 'bg-[#c9a961] text-white hover:shadow-2xl'
                  : 'bg-[#3d5248]/40 text-[#e8dcc4]/40 cursor-not-allowed'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={selectedDrinks.length > 0 && !isSaving ? { scale: 1.05 } : {}}
              whileTap={selectedDrinks.length > 0 && !isSaving ? { scale: 0.95 } : {}}
            >
              {isSaving ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Enregistrer mes préférences</span>
                </>
              )}
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Decorative dots - Statiques */}
      <div className="absolute top-1/4 left-10 opacity-20">
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <div key={`dot-left-${i}`} className="w-1.5 h-1.5 bg-[#c9a961] rounded-full" />
          ))}
        </div>
      </div>

      <div className="absolute bottom-1/4 right-10 opacity-20">
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <div key={`dot-right-${i}`} className="w-1.5 h-1.5 bg-[#c9a961] rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}