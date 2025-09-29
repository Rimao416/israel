// src/app/layout.jsx

import './globals.css';

export const metadata = {
  title: 'QR Scan App',
  description: 'Application de scan de codes QR pour afficher les profils utilisateur',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}