"use client"
import React, { useState, useEffect } from 'react';
import { Heart, Mail, Check, UserCheck, UserX, AlertCircle } from 'lucide-react';
import { useRSVP, useInviteInfo, useTable } from '@/hooks/useInvite';
import { StatutConfirmation } from '@/types/invite.types';

export default function RSVPSection() {
  const { statut, confirmer, isLoading, isConfirmed, isDeclined, isPending } = useRSVP();
  const { nomComplet, prenom } = useInviteInfo();
  const { tableNumero, tableNom } = useTable();
  
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Synchroniser avec le statut existant au chargement
  useEffect(() => {
    if (statut) {
      const option = statut === StatutConfirmation.OUI ? 'yes' : 
                     statut === StatutConfirmation.NON ? 'no' : null;
      setSelectedOption(option);
      setSubmitted(statut !== StatutConfirmation.EN_ATTENTE);
    }
  }, [statut]);

  const handleSubmit = async () => {
    if (!selectedOption) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const newStatut = selectedOption === 'yes' 
        ? StatutConfirmation.OUI 
        : StatutConfirmation.NON;
      
      await confirmer(newStatut);
      setSubmitted(true);
      
      // Scroll smooth vers le message de confirmation
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('rsvp-section')?.offsetTop || 0,
          behavior: 'smooth'
        });
      }, 100);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Erreur RSVP:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeResponse = () => {
    setSubmitted(false);
  };

  return (
    <div id="rsvp-section" className="min-h-screen bg-[#f5f1e8] relative py-20 px-6 font-['Montserrat']">
      {/* Static Background Orbs */}
      <div
        className="absolute top-40 left-20 w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.25) 0%, transparent 70%)'
        }}
      />
      <div
        className="absolute bottom-20 right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(52,69,61,0.2) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Heart size={48} className="text-[#c9a961]" fill="currentColor" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#34453D] mb-4">
            Confirmez votre présence
          </h2>
          
          {/* Informations personnalisées */}
          {prenom && (
            <p className="text-2xl text-[#c9a961] font-light mb-2">
              Cher(e) {nomComplet}
            </p>
          )}

          {tableNumero && tableNom && (
            <p className="text-lg text-[#34453D]/60 mb-4">
              Table {tableNumero} • {tableNom}
            </p>
          )}

          <p className="text-lg md:text-xl text-[#34453D]/70 font-light max-w-2xl mx-auto">
            Votre présence nous ferait un immense plaisir. Merci de confirmer avant le{' '}
            <span className="text-[#c9a961] font-medium">01 Janvier 2025</span>
          </p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle size={24} className="text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!submitted ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-[#c9a961]/20">
            {/* Indicateur si déjà répondu */}
            {selectedOption && !isSubmitting && (
              <div className="mb-6 p-4 bg-[#c9a961]/10 border border-[#c9a961]/20 rounded-xl">
                <p className="text-[#34453D] text-center">
                  <span className="font-medium">Votre réponse actuelle :</span>{' '}
                  {selectedOption === 'yes' ? (
                    <span className="text-[#c9a961]">✓ Je serai présent(e)</span>
                  ) : (
                    <span className="text-[#34453D]/70">✗ Je ne pourrai pas venir</span>
                  )}
                  {' '}- Vous pouvez la modifier ci-dessous
                </p>
              </div>
            )}

            {/* RSVP Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Option: Je serai présent(e) */}
              <button
                onClick={() => setSelectedOption('yes')}
                disabled={isLoading || isSubmitting}
                className={`relative overflow-hidden rounded-2xl p-8 border-3 transition-all duration-300 ${
                  selectedOption === 'yes'
                    ? 'bg-[#c9a961] border-[#c9a961] shadow-xl'
                    : 'bg-[#34453D]/5 border-[#34453D]/20 hover:border-[#c9a961]/50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {selectedOption === 'yes' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/20 to-transparent" />
                )}
               
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedOption === 'yes' ? 'bg-white' : 'bg-[#c9a961]/20'
                    }`}
                  >
                    <UserCheck
                      size={32}
                      className={selectedOption === 'yes' ? 'text-[#c9a961]' : 'text-[#34453D]'}
                    />
                  </div>
                 
                  <span className={`text-xl font-medium ${
                    selectedOption === 'yes' ? 'text-white' : 'text-[#34453D]'
                  }`}>
                    Je serai présent(e)
                  </span>
                  {selectedOption === 'yes' && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Check size={20} className="text-[#c9a961]" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>
              </button>

              {/* Option: Je ne pourrai pas venir */}
              <button
                onClick={() => setSelectedOption('no')}
                disabled={isLoading || isSubmitting}
                className={`relative overflow-hidden rounded-2xl p-8 border-3 transition-all duration-300 ${
                  selectedOption === 'no'
                    ? 'bg-[#34453D]/10 border-[#34453D] shadow-xl'
                    : 'bg-[#34453D]/5 border-[#34453D]/20 hover:border-[#34453D]/40'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedOption === 'no' ? 'bg-[#34453D]' : 'bg-[#34453D]/10'
                    }`}
                  >
                    <UserX
                      size={32}
                      className={selectedOption === 'no' ? 'text-white' : 'text-[#34453D]'}
                    />
                  </div>
                 
                  <span className={`text-xl font-medium ${
                    selectedOption === 'no' ? 'text-[#34453D]' : 'text-[#34453D]'
                  }`}>
                    Je ne pourrai pas venir
                  </span>
                  {selectedOption === 'no' && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-[#34453D] rounded-full flex items-center justify-center">
                        <Check size={20} className="text-white" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedOption || isLoading || isSubmitting}
              className={`w-full py-5 rounded-full font-medium text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                selectedOption && !isSubmitting
                  ? 'bg-[#c9a961] text-white hover:shadow-2xl cursor-pointer'
                  : 'bg-[#34453D]/10 text-[#34453D]/40 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Mail size={20} />
                  <span>
                    {statut === StatutConfirmation.EN_ATTENTE 
                      ? 'Envoyer ma réponse' 
                      : 'Mettre à jour ma réponse'}
                  </span>
                </>
              )}
            </button>
          </div>
        ) : (
          // Confirmation Message
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl border-2 border-[#c9a961]">
            <div className="text-center relative">
              <div className="inline-block mb-6">
                <div className="w-20 h-20 bg-[#c9a961] rounded-full flex items-center justify-center mx-auto">
                  {selectedOption === 'yes' ? (
                    <Heart size={40} fill="white" className="text-white" />
                  ) : (
                    <Check size={40} className="text-white" strokeWidth={3} />
                  )}
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-light text-[#34453D] mb-4">
                Merci pour votre confirmation !
              </h3>
              <p className="text-xl text-[#34453D]/70 font-light mb-6">
                {selectedOption === 'yes'
                  ? "Nous avons hâte de vous voir !"
                  : "Nous espérons vous voir une prochaine fois."}
              </p>

              {/* Bouton pour modifier la réponse */}
              <button
                onClick={handleChangeResponse}
                className="text-[#c9a961] hover:text-[#34453D] font-medium underline transition-colors"
              >
                Modifier ma réponse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}