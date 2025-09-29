// src/app/user/[id]/page.jsx

'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

export default function UserPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser, loading, error, fetchUserById, scans, fetchUserScans } = useUser();

  useEffect(() => {
    if (params.id) {
      fetchUserById(params.id);
      fetchUserScans(params.id);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <h2 className="font-bold text-xl mb-2">Erreur</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex items-end -mt-16">
              <div className="bg-white rounded-full p-2 shadow-lg">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{currentUser.name}</h1>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informations */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Informations personnelles */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Informations</h2>
            <div className="space-y-3">
              {currentUser.phone && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">{currentUser.phone}</span>
                </div>
              )}
              {currentUser.city && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">{currentUser.city}, {currentUser.country}</span>
                </div>
              )}
              {currentUser.address && (
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-gray-700">{currentUser.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Statistiques</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Total des scans</span>
                <span className="text-2xl font-bold text-blue-600">{scans.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Code QR</span>
                <span className="text-sm font-mono text-green-600">{currentUser.qrCode}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">Membre depuis</span>
                <span className="text-sm text-purple-600">
                  {new Date(currentUser.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {currentUser.bio && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-800">À propos</h2>
            <p className="text-gray-700 leading-relaxed">{currentUser.bio}</p>
          </div>
        )}

        {/* Historique des scans */}
        {scans.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Historique des scans</h2>
            <div className="space-y-3">
              {scans.slice(0, 5).map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">
                      {new Date(scan.scannedAt).toLocaleString('fr-FR')}
                    </p>
                    {scan.location && (
                      <p className="text-xs text-gray-500">{scan.location}</p>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {scan.ipAddress}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bouton retour */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Scanner un autre QR Code
          </button>
        </div>
      </div>
    </div>
  );
}