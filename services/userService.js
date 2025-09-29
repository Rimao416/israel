// src/services/userService.js

export const userService = {
  // Récupérer un utilisateur par son code QR
  async getUserByQrCode(qrCode) {
    try {
      const response = await fetch(`/api/users/qr/${qrCode}`);
      if (!response.ok) {
        throw new Error('Utilisateur non trouvé');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
  },

  // Récupérer un utilisateur par son ID
  async getUserById(id) {
    try {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Utilisateur non trouvé');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
  },

  // Enregistrer un scan
  async recordScan(userId, scanData = {}) {
    try {
      const response = await fetch('/api/scans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...scanData,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement du scan');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du scan:', error);
      throw error;
    }
  },

  // Récupérer l'historique des scans d'un utilisateur
  async getUserScans(userId) {
    try {
      const response = await fetch(`/api/users/${userId}/scans`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des scans');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des scans:', error);
      throw error;
    }
  },
};