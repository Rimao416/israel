"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MapPin, Users, QrCode, Navigation, Download, Gift, X, Plus } from 'lucide-react';
import { useTable, useInviteInfo, useCadeaux } from '@/hooks/useInvite';
import { CategorieCadeau, AppareilElectromenager } from '@/types/invite.types';
import QRCodeStyling from 'qr-code-styling';

export default function PracticalInfoSection() {
  const { tableNumero, tableNom } = useTable();
  const { nomComplet } = useInviteInfo();
  const { cadeaux, ajouterCadeau, supprimerCadeau, totalCadeaux, isLoading } = useCadeaux();
  
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [giftForm, setGiftForm] = useState({
    categorie: '' as CategorieCadeau | '',
    appareilElectromenager: '' as AppareilElectromenager | '',
    description: '',
    montantEspeces: '',
    notes: ''
  });

  // Générer le QR Code avec l'URL de confirmation
  useEffect(() => {
    if (qrRef.current && !qrCodeRef.current) {
      const inviteId = window.location.pathname.split('/').pop();
      
      // URL de confirmation qui sera scannée
      const confirmationUrl = `${window.location.origin}/confirmation/${inviteId}`;
     
      qrCodeRef.current = new QRCodeStyling({
        width: 250,
        height: 250,
        data: confirmationUrl,
        dotsOptions: {
          color: "#34453D",
          type: "rounded"
        },
        backgroundOptions: {
          color: "#ffffff",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5
        },
        cornersSquareOptions: {
          color: "#c9a961",
          type: "extra-rounded"
        },
        cornersDotOptions: {
          color: "#c9a961",
          type: "dot"
        }
      });
      qrCodeRef.current.append(qrRef.current);
    }
  }, []);

  const categories = [
    { value: CategorieCadeau.APPAREILS_ELECTROMENAGERS, label: 'Appareils électroménagers' },
    { value: CategorieCadeau.MEUBLES, label: 'Meubles' },
    { value: CategorieCadeau.USTENSILES_CUISINE, label: 'Ustensiles de cuisine' },
    { value: CategorieCadeau.DONS_ESPECES, label: 'Don en espèces' }
  ];

  const appareils = [
    { value: AppareilElectromenager.AIR_FRYER, label: 'Air Fryer' },
    { value: AppareilElectromenager.MACHINE_A_LAVER, label: 'Machine à laver' },
    { value: AppareilElectromenager.FRIGO, label: 'Réfrigérateur' },
    { value: AppareilElectromenager.MIXEUR, label: 'Mixeur' },
    { value: AppareilElectromenager.TELEVISION, label: 'Télévision' },
    { value: AppareilElectromenager.MINI_FOUR_ELECTRIQUE, label: 'Mini four électrique' }
  ];

  const handleDownloadQR = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({
        name: `invitation-${nomComplet.replace(/\s+/g, '-')}`,
        extension: "png"
      });
    }
  };

  const handleSubmitGift = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!giftForm.categorie) return;

    const cadeauData: {
      categorie: CategorieCadeau;
      appareilElectromenager?: AppareilElectromenager;
      montantEspeces?: number;
      description?: string;
      notes?: string;
    } = {
      categorie: giftForm.categorie as CategorieCadeau,
    };

    if (giftForm.categorie === CategorieCadeau.APPAREILS_ELECTROMENAGERS && giftForm.appareilElectromenager) {
      cadeauData.appareilElectromenager = giftForm.appareilElectromenager as AppareilElectromenager;
    }

    if (giftForm.categorie === CategorieCadeau.DONS_ESPECES && giftForm.montantEspeces) {
      cadeauData.montantEspeces = parseFloat(giftForm.montantEspeces);
    }

    if ([CategorieCadeau.MEUBLES, CategorieCadeau.USTENSILES_CUISINE].includes(giftForm.categorie as CategorieCadeau) && giftForm.description) {
      cadeauData.description = giftForm.description;
    }

    if (giftForm.notes) {
      cadeauData.notes = giftForm.notes;
    }

    await ajouterCadeau(cadeauData);
    
    setGiftForm({
      categorie: '',
      appareilElectromenager: '',
      description: '',
      montantEspeces: '',
      notes: ''
    });
    setShowGiftForm(false);
  };

  const getCategoryLabel = (categorie: CategorieCadeau) => {
    return categories.find(c => c.value === categorie)?.label || categorie;
  };

  const getAppareilLabel = (appareil: AppareilElectromenager) => {
    return appareils.find(a => a.value === appareil)?.label || appareil;
  };

  return (
    <div className="min-h-screen bg-[#34453D] relative overflow-hidden py-20 px-6 font-['Montserrat']">
      {/* Background Orbs */}
      <motion.div
        className="absolute top-32 left-20 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.15) 0%, transparent 70%)'
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
        className="absolute bottom-40 right-32 w-[550px] h-[550px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(232,220,196,0.12) 0%, transparent 70%)'
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

      {/* Hearts */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-[#c9a961]/15"
          style={{
            left: `${15 + i * 20}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [-50, -1000],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: i * 2,
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
          <div className="inline-flex items-center gap-3 mb-6">
            <MapPin size={48} className="text-[#c9a961]" strokeWidth={1.5} />
            <Heart size={40} className="text-[#c9a961]" fill="currentColor" />
            <Sparkles size={48} className="text-[#c9a961]" />
          </div>
          
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#e8dcc4] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Informations Pratiques
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-[#e8dcc4]/70 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tout ce qu&apos;il vous faut savoir pour nous rejoindre
            <br />
            <span className="text-[#c9a961] italic">Nous avons hâte de vous accueillir</span>
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Lieu de réception */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[#3d5248]/60 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#c9a961]/30 shadow-2xl hover:border-[#c9a961]/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#c9a961] rounded-2xl flex items-center justify-center">
                  <MapPin size={32} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-[#e8dcc4] mb-1">
                    Lieu de la réception
                  </h3>
                  <p className="text-[#c9a961] font-light italic">
                    Où notre histoire s&apos;écrira
                  </p>
                </div>
              </div>

              <div className="bg-[#c9a961]/10 rounded-2xl p-6 mb-6 border border-[#c9a961]/20">
                <p className="text-3xl font-light text-[#e8dcc4] text-center">
                  Salle des fêtes Zitouna
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#c9a961]/30 mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3193.4458414327496!2d10.123777610801003!3d36.83179706580309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2stn!4v1764428694823!5m2!1sfr!2stn"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>

              <motion.a
                href="https://www.google.com/maps/place/36.83179706580309,10.123777610801003"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#c9a961] text-white font-medium rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Navigation size={20} />
                <span>Obtenir l&apos;itinéraire sur Google Maps</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Numéro de table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[#3d5248]/60 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#c9a961]/30 shadow-2xl h-full hover:border-[#c9a961]/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#c9a961] rounded-2xl flex items-center justify-center">
                  <Users size={32} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-[#e8dcc4] mb-1">
                    Votre table
                  </h3>
                  <p className="text-[#c9a961] font-light italic">
                    Votre place réservée
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <div className="relative bg-[#c9a961] w-32 h-32 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <p className="text-white/70 text-sm font-light mb-1">Table</p>
                      <p className="text-white text-5xl font-light">{tableNumero || '?'}</p>
                    </div>
                  </div>
                </div>
               
                {tableNom && (
                  <div className="mt-8 bg-[#c9a961]/10 px-8 py-4 rounded-full border border-[#c9a961]/30">
                    <p className="text-[#e8dcc4] text-2xl font-light">{tableNom}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Heart key={`table-heart-${i}`} size={10 + i * 2} className="text-[#c9a961] opacity-50" fill="currentColor" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[#3d5248]/60 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#c9a961]/30 shadow-2xl h-full hover:border-[#c9a961]/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#c9a961] rounded-2xl flex items-center justify-center">
                  <QrCode size={32} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-[#e8dcc4] mb-1">
                    Votre invitation
                  </h3>
                  <p className="text-[#c9a961] font-light italic">
                    À présenter le jour J
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-8">
                <div
                  ref={qrRef}
                  className="bg-white p-4 rounded-2xl shadow-2xl"
                />
                
                <p className="mt-6 text-[#e8dcc4]/70 text-sm font-light text-center">
                  Scannez ce code à l&apos;entrée
                </p>

                <motion.button
                  onClick={handleDownloadQR}
                  className="mt-6 px-6 py-3 bg-[#c9a961] text-white font-medium rounded-xl flex items-center gap-2 transition-all duration-300 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={18} />
                  <span>Télécharger le QR Code</span>
                </motion.button>
              </div>

              <div className="flex items-center justify-center gap-3 mt-4">
                {[...Array(3)].map((_, i) => (
                  <Sparkles key={`qr-sparkle-${i}`} size={16} className="text-[#c9a961] opacity-60" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Section Cadeaux */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[#3d5248]/60 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#c9a961]/30 shadow-2xl hover:border-[#c9a961]/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#c9a961] rounded-2xl flex items-center justify-center">
                    <Gift size={32} className="text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-[#e8dcc4] mb-1">
                      Offrir un cadeau
                    </h3>
                    <p className="text-[#c9a961] font-light italic">
                      Votre générosité nous touche
                    </p>
                  </div>
                </div>
                
                {!showGiftForm && (
                  <motion.button
                    onClick={() => setShowGiftForm(true)}
                    className="px-6 py-3 bg-[#c9a961] text-white font-medium rounded-xl flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={20} />
                    <span>Ajouter un cadeau</span>
                  </motion.button>
                )}
              </div>

              {/* Liste des cadeaux */}
              {cadeaux.length > 0 && (
                <div className="mb-6 space-y-4">
                  {cadeaux.map((cadeau) => (
                    <motion.div
                      key={cadeau.id}
                      className="bg-[#c9a961]/10 rounded-xl p-4 border border-[#c9a961]/20 flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div>
                        <p className="text-[#e8dcc4] font-medium">
                          {getCategoryLabel(cadeau.categorie)}
                        </p>
                        {cadeau.appareilElectromenager && (
                          <p className="text-[#e8dcc4]/70 text-sm">
                            {getAppareilLabel(cadeau.appareilElectromenager)}
                          </p>
                        )}
                        {cadeau.description && (
                          <p className="text-[#e8dcc4]/70 text-sm">{cadeau.description}</p>
                        )}
                        {cadeau.montantEspeces && (
                          <p className="text-[#c9a961] font-medium">{cadeau.montantEspeces} TND</p>
                        )}
                        {cadeau.notes && (
                          <p className="text-[#e8dcc4]/50 text-xs mt-1 italic">{cadeau.notes}</p>
                        )}
                      </div>
                      <button
                        onClick={() => supprimerCadeau(cadeau.id)}
                        className="text-[#e8dcc4]/50 hover:text-red-400 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Formulaire d'ajout de cadeau */}
              <AnimatePresence>
                {showGiftForm && (
                  <motion.form
                    onSubmit={handleSubmitGift}
                    className="space-y-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {/* Catégorie */}
                    <div>
                      <label className="block text-[#e8dcc4] mb-2 font-light">
                        Catégorie de cadeau *
                      </label>
                      <select
                        value={giftForm.categorie}
                        onChange={(e) => setGiftForm({ ...giftForm, categorie: e.target.value as CategorieCadeau | '' })}
                        required
                        className="w-full px-4 py-3 bg-[#34453D] text-[#e8dcc4] border border-[#c9a961]/30 rounded-xl focus:outline-none focus:border-[#c9a961]"
                      >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Appareil électroménager */}
                    {giftForm.categorie === CategorieCadeau.APPAREILS_ELECTROMENAGERS && (
                      <div>
                        <label className="block text-[#e8dcc4] mb-2 font-light">
                          Type d&apos;appareil *
                        </label>
                        <select
                          value={giftForm.appareilElectromenager}
                          onChange={(e) => setGiftForm({ ...giftForm, appareilElectromenager: e.target.value as AppareilElectromenager | '' })}
                          required
                          className="w-full px-4 py-3 bg-[#34453D] text-[#e8dcc4] border border-[#c9a961]/30 rounded-xl focus:outline-none focus:border-[#c9a961]"
                        >
                          <option value="">Sélectionnez un appareil</option>
                          {appareils.map(app => (
                            <option key={app.value} value={app.value}>{app.label}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Description pour meubles et ustensiles */}
                    {([CategorieCadeau.MEUBLES, CategorieCadeau.USTENSILES_CUISINE].includes(giftForm.categorie as CategorieCadeau)) && (
                      <div>
                        <label className="block text-[#e8dcc4] mb-2 font-light">
                          Description *
                        </label>
                        <input
                          type="text"
                          value={giftForm.description}
                          onChange={(e) => setGiftForm({ ...giftForm, description: e.target.value })}
                          required
                          placeholder="Décrivez votre cadeau"
                          className="w-full px-4 py-3 bg-[#34453D] text-[#e8dcc4] border border-[#c9a961]/30 rounded-xl focus:outline-none focus:border-[#c9a961] placeholder:text-[#e8dcc4]/30"
                        />
                      </div>
                    )}

                    {/* Montant pour dons en espèces */}
                    {giftForm.categorie === CategorieCadeau.DONS_ESPECES && (
                      <div>
                        <label className="block text-[#e8dcc4] mb-2 font-light">
                          Montant (TND) *
                        </label>
                        <input
                          type="number"
                          value={giftForm.montantEspeces}
                          onChange={(e) => setGiftForm({ ...giftForm, montantEspeces: e.target.value })}
                          required
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full px-4 py-3 bg-[#34453D] text-[#e8dcc4] border border-[#c9a961]/30 rounded-xl focus:outline-none focus:border-[#c9a961] placeholder:text-[#e8dcc4]/30"
                        />
                      </div>
                    )}

                    {/* Notes optionnelles */}
                    <div>
                      <label className="block text-[#e8dcc4] mb-2 font-light">
                        Notes (optionnel)
                      </label>
                      <textarea
                        value={giftForm.notes}
                        onChange={(e) => setGiftForm({ ...giftForm, notes: e.target.value })}
                        placeholder="Ajoutez une note personnelle..."
                        rows={3}
                        className="w-full px-4 py-3 bg-[#34453D] text-[#e8dcc4] border border-[#c9a961]/30 rounded-xl focus:outline-none focus:border-[#c9a961] resize-none placeholder:text-[#e8dcc4]/30"
                      />
                    </div>

                    {/* Boutons */}
                    <div className="flex gap-4">
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3 bg-[#c9a961] text-white font-medium rounded-xl transition-all duration-300 hover:shadow-xl disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? 'Ajout...' : 'Confirmer le cadeau'}
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => setShowGiftForm(false)}
                        className="px-6 py-3 bg-[#34453D] text-[#e8dcc4] border border-[#c9a961]/30 font-medium rounded-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Annuler
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {cadeaux.length === 0 && !showGiftForm && (
                <div className="text-center py-12">
                  <Gift size={48} className="text-[#c9a961]/30 mx-auto mb-4" />
                  <p className="text-[#e8dcc4]/50 font-light">
                    Aucun cadeau ajouté pour le moment
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute top-1/3 left-8 opacity-20">
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <div key={`dot-left-${i}`} className="w-1.5 h-1.5 bg-[#c9a961] rounded-full" />
          ))}
        </div>
      </div>

      <div className="absolute bottom-1/4 right-8 opacity-20">
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <div key={`dot-right-${i}`} className="w-1.5 h-1.5 bg-[#c9a961] rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}