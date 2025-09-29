// src/components/QRScanner.jsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useUser } from '@/hook/useUser';

export default function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const scannerRef = useRef(null);
  const router = useRouter();
  const { fetchUserByQrCode, recordScan } = useUser();

  useEffect(() => {
    if (!scannerRef.current) {
      // Configuration du scanner
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
        },
        false
      );

      // Callback de succès
      const onScanSuccess = async (decodedText) => {
        console.log('QR Code scanné:', decodedText);
        setScanning(true);
        setScanError(null);

        try {
          // Récupérer l'utilisateur
          const user = await fetchUserByQrCode(decodedText);
          
          // Enregistrer le scan
          await recordScan(user.id);

          // Arrêter le scanner
          scanner.clear();

          // Rediriger vers la page utilisateur
          router.push(`/user/${user.id}`);
        } catch (error) {
          console.error('Erreur:', error);
          setScanError('Utilisateur non trouvé. Veuillez réessayer avec un autre QR Code.');
          setScanning(false);
        }
      };

      // Callback d'erreur
      const onScanError = (error) => {
        // On ignore les erreurs de scan normales
        console.warn('Scan error:', error);
      };

      // Démarrer le scanner
      scanner.render(onScanSuccess, onScanError);
      scannerRef.current = scanner;

      // Indiquer que la caméra est prête après un court délai
      setTimeout(() => setCameraReady(true), 1000);
    }

    // Cleanup
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err) => {
          console.error('Erreur lors du nettoyage du scanner:', err);
        });
        scannerRef.current = null;
      }
    };
  }, [fetchUserByQrCode, recordScan, router]);

  return (
    <div className="w-full mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        {/* Header du scanner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8">
          <div className="flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Scanner QR Code
            </h2>
          </div>
        </div>

        {/* Contenu du scanner */}
        <div className="p-6 sm:p-8">
          {/* Message d'erreur */}
          {scanError && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-red-800 font-semibold">Erreur de scan</h3>
                  <p className="text-red-700 text-sm mt-1">{scanError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Message de chargement */}
          {scanning && (
            <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                <div>
                  <h3 className="text-blue-800 font-semibold">Chargement en cours...</h3>
                  <p className="text-blue-700 text-sm mt-1">Récupération des informations utilisateur</p>
                </div>
              </div>
            </div>
          )}

          {/* Zone du scanner */}
          <div className="relative">
            {!cameraReady && (
              <div className="absolute inset-0 bg-gray-100 rounded-xl flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Initialisation de la caméra...</p>
                </div>
              </div>
            )}
            
            <div id="qr-reader" className="w-full rounded-xl overflow-hidden"></div>
          </div>

          {/* Instructions visuelles */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center space-x-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Centrez le QR</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Bon éclairage</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Scan rapide</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <p className="text-center text-sm text-gray-700">
                <span className="font-semibold">Astuce :</span> Tenez votre appareil stable et assurez-vous que le QR Code est bien visible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}