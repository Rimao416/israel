"use client"
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CheckCircle2, XCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

interface ScanResult {
  status: 'success' | 'error' | 'already';
  name?: string;
  table?: {
    numero: number;
    nom?: string;
  };
  message: string;
}

export default function QRScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasScannedRef = useRef(false);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const startScanner = async () => {
    try {
      setError('');
      setScanResult(null);
      hasScannedRef.current = false;

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        onScanSuccess,
        onScanError
      );

      setIsScanning(true);
    } catch (err: any) {
      console.error('Erreur démarrage scanner:', err);
      setError('Impossible d\'accéder à la caméra. Vérifiez les permissions.');
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
        scannerRef.current = null;
      }
      setIsScanning(false);
    } catch (err) {
      console.error('Erreur arrêt scanner:', err);
    }
  };

  const onScanSuccess = async (decodedText: string) => {
    // Éviter les scans multiples
    if (hasScannedRef.current || isProcessing) return;
    
    hasScannedRef.current = true;
    setIsProcessing(true);

    try {
      // Extraire l'ID depuis l'URL scannée
      const url = new URL(decodedText);
      const pathParts = url.pathname.split('/');
      const inviteId = pathParts[pathParts.length - 1];

      if (!inviteId) {
        throw new Error('QR code invalide');
      }

      // Arrêter le scanner
      await stopScanner();

      // Confirmer la présence
      const response = await fetch(`/api/invites/${inviteId}/confirmer-presence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (data.alreadyConfirmed) {
          setScanResult({
            status: 'already',
            name: `${data.prenom} ${data.nom}`,
            table: data.table,
            message: 'Cet invité est déjà enregistré'
          });
        } else {
          setScanResult({
            status: 'success',
            name: `${data.prenom} ${data.nom}`,
            table: data.table,
            message: 'Présence confirmée avec succès'
          });
        }
      } else {
        setScanResult({
          status: 'error',
          message: data.error || 'Erreur lors de la confirmation'
        });
      }
    } catch (err: any) {
      console.error('Erreur scan:', err);
      setScanResult({
        status: 'error',
        message: 'QR code invalide ou erreur réseau'
      });
      await stopScanner();
    } finally {
      setIsProcessing(false);
      // Réinitialiser après 3 secondes
      setTimeout(() => {
        hasScannedRef.current = false;
      }, 3000);
    }
  };

  const onScanError = (errorMessage: string) => {
    // Ignorer les erreurs de scan normales (pas de QR code détecté)
    if (!errorMessage.includes('NotFoundException')) {
      console.error('Scan error:', errorMessage);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError('');
    hasScannedRef.current = false;
  };

  return (
    <div className="min-h-screen bg-[#34453D] py-8 px-4 font-['Montserrat']">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Camera size={48} className="text-[#c9a961]" />
          </div>
          <h1 className="text-4xl font-light text-[#e8dcc4] mb-2">
            Scanner QR Code
          </h1>
          <p className="text-[#e8dcc4]/70">
            Scannez les invitations pour confirmer les présences
          </p>
        </motion.div>

        {/* Scanner Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#3d5248]/60 backdrop-blur-sm rounded-3xl p-6 border-2 border-[#c9a961]/30 shadow-2xl mb-6"
        >
          {!isScanning && !scanResult && (
            <div className="text-center py-12">
              <Camera size={80} className="text-[#c9a961] mx-auto mb-6" />
              <button
                onClick={startScanner}
                className="px-8 py-4 bg-[#c9a961] text-white font-medium rounded-2xl flex items-center gap-3 mx-auto transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Camera size={24} />
                <span>Démarrer le scan</span>
              </button>
              {error && (
                <div className="mt-6 flex items-center gap-2 text-red-400 justify-center">
                  <AlertCircle size={20} />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          )}

          {isScanning && (
            <div>
              <div 
                id="qr-reader" 
                className="rounded-2xl overflow-hidden border-2 border-[#c9a961]/50"
              />
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 text-[#e8dcc4]/70">
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Traitement en cours...</span>
                    </>
                  ) : (
                    <>
                      <Camera size={20} />
                      <span>Positionnez le QR code dans le cadre</span>
                    </>
                  )}
                </div>
                <button
                  onClick={stopScanner}
                  disabled={isProcessing}
                  className="px-6 py-3 bg-red-500/80 text-white font-medium rounded-xl transition-all duration-300 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Arrêter le scan
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          <AnimatePresence mode="wait">
            {scanResult && (
              <motion.div
                key={scanResult.status}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-8"
              >
                {/* Success */}
                {scanResult.status === 'success' && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mb-6 inline-block"
                    >
                      <CheckCircle2 size={80} className="text-green-400" />
                    </motion.div>
                    <h2 className="text-3xl font-light text-[#e8dcc4] mb-2">
                      ✅ {scanResult.message}
                    </h2>
                    <p className="text-2xl text-[#c9a961] mb-6">
                      {scanResult.name}
                    </p>
                    {scanResult.table && (
                      <div className="bg-[#c9a961]/10 rounded-2xl p-4 border border-[#c9a961]/30 mb-6">
                        <p className="text-[#e8dcc4] text-lg">
                          <strong>Table :</strong> {scanResult.table.numero}
                        </p>
                        {scanResult.table.nom && (
                          <p className="text-[#c9a961] italic">
                            {scanResult.table.nom}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Already confirmed */}
                {scanResult.status === 'already' && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mb-6 inline-block"
                    >
                      <AlertCircle size={80} className="text-yellow-400" />
                    </motion.div>
                    <h2 className="text-3xl font-light text-[#e8dcc4] mb-2">
                      ⚠️ {scanResult.message}
                    </h2>
                    <p className="text-2xl text-[#c9a961] mb-6">
                      {scanResult.name}
                    </p>
                    {scanResult.table && (
                      <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/30 mb-6">
                        <p className="text-[#e8dcc4] text-lg">
                          <strong>Table :</strong> {scanResult.table.numero}
                        </p>
                        {scanResult.table.nom && (
                          <p className="text-yellow-400 italic">
                            {scanResult.table.nom}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Error */}
                {scanResult.status === 'error' && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mb-6 inline-block"
                    >
                      <XCircle size={80} className="text-red-400" />
                    </motion.div>
                    <h2 className="text-3xl font-light text-[#e8dcc4] mb-2">
                      ❌ Erreur
                    </h2>
                    <p className="text-xl text-red-400 mb-6">
                      {scanResult.message}
                    </p>
                  </div>
                )}

                {/* Reset Button */}
                <button
                  onClick={() => {
                    resetScanner();
                    startScanner();
                  }}
                  className="w-full px-6 py-4 bg-[#c9a961] text-white font-medium rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <RefreshCw size={24} />
                  <span>Scanner un autre QR code</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#3d5248]/40 backdrop-blur-sm rounded-2xl p-6 border border-[#c9a961]/20"
        >
          <h3 className="text-xl font-medium text-[#e8dcc4] mb-4 flex items-center gap-2">
            <AlertCircle size={24} className="text-[#c9a961]" />
            Instructions
          </h3>
          <ul className="space-y-2 text-[#e8dcc4]/70">
            <li>• Autorisez l{"'"}accès à la caméra</li>
            <li>• Positionnez le QR code dans le cadre</li>
            <li>• La confirmation se fait automatiquement</li>
            <li>• Le système détecte les doublons</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}