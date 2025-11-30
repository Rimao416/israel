"use client"
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function ConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already'>('loading');
  const [inviteInfo, setInviteInfo] = useState<any>(null);

  useEffect(() => {
    const confirmPresence = async () => {
      try {
        const response = await fetch(`/api/invites/${params.id}/confirmer-presence`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setInviteInfo(data);
          if (data.alreadyConfirmed) {
            setStatus('already');
          } else {
            setStatus('success');
          }
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Erreur:', error);
        setStatus('error');
      }
    };

    if (params.id) {
      confirmPresence();
    }
  }, [params.id]);

  return (
    <div className="min-h-screen bg-[#34453D] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(201,169,97,0.1) 0%, transparent 50%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />



      <div className="max-w-2xl w-full relative z-10">
        <motion.div
          className="bg-[#3d5248]/80 backdrop-blur-xl rounded-3xl p-12 border-2 border-[#c9a961]/30 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Loading State */}
          {status === 'loading' && (
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Loader2 size={64} className="text-[#c9a961]" />
              </motion.div>
              <h2 className="text-3xl font-light text-[#e8dcc4] mb-4">
                Vérification en cours...
              </h2>
              <p className="text-[#e8dcc4]/70">
                Merci de patienter un instant
              </p>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: 0.2 
                }}
                className="mb-6 inline-block"
              >
                <CheckCircle2 size={80} className="text-green-400" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-light text-[#e8dcc4] mb-4"
              >
                Bienvenue {inviteInfo?.prenom} ! 🎉
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-[#e8dcc4]/80 mb-8"
              >
                Votre présence a été confirmée avec succès
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#c9a961]/10 rounded-2xl p-6 border border-[#c9a961]/30 mb-8"
              >
                <p className="text-[#e8dcc4] text-lg mb-2">
                  <strong>Table :</strong> {inviteInfo?.table?.numero}
                </p>
                {inviteInfo?.table?.nom && (
                  <p className="text-[#c9a961] text-xl font-light italic">
                    {inviteInfo.table.nom}
                  </p>
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[#e8dcc4]/70 mb-8"
              >
                Profitez bien de la soirée ! 💝
              </motion.p>
            </motion.div>
          )}

          {/* Already Confirmed State */}
          {status === 'already' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-6 inline-block"
              >
                <CheckCircle2 size={80} className="text-[#c9a961]" />
              </motion.div>
              
              <h2 className="text-4xl font-light text-[#e8dcc4] mb-4">
                Vous êtes déjà enregistré(e) ! ✨
              </h2>
              
              <p className="text-xl text-[#e8dcc4]/80 mb-8">
                {inviteInfo?.prenom}, votre présence avait déjà été confirmée
              </p>

              <div className="bg-[#c9a961]/10 rounded-2xl p-6 border border-[#c9a961]/30 mb-8">
                <p className="text-[#e8dcc4] text-lg mb-2">
                  <strong>Table :</strong> {inviteInfo?.table?.numero}
                </p>
                {inviteInfo?.table?.nom && (
                  <p className="text-[#c9a961] text-xl font-light italic">
                    {inviteInfo.table.nom}
                  </p>
                )}
              </div>

              <p className="text-[#e8dcc4]/70">
                Profitez bien de la soirée ! 💝
              </p>
            </motion.div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-6 inline-block"
              >
                <XCircle size={80} className="text-red-400" />
              </motion.div>
              
              <h2 className="text-4xl font-light text-[#e8dcc4] mb-4">
                Oups, une erreur est survenue
              </h2>
              
              <p className="text-xl text-[#e8dcc4]/80 mb-8">
                Impossible de confirmer votre présence
              </p>

              <p className="text-[#e8dcc4]/70 mb-8">
                Veuillez contacter l{"'"}organisateur ou réessayer plus tard
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}