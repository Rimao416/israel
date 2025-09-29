// src/store/userStore.js

import { create } from 'zustand';
import { userService } from '@/services/userService';

export const useUserStore = create((set, get) => ({
  // État
  currentUser: null,
  scans: [],
  loading: false,
  error: null,

  // Actions
  setCurrentUser: (user) => set({ currentUser: user, error: null }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error, loading: false }),

  clearError: () => set({ error: null }),

  // Récupérer un utilisateur par code QR
  fetchUserByQrCode: async (qrCode) => {
    set({ loading: true, error: null });
    try {
      const user = await userService.getUserByQrCode(qrCode);
      set({ currentUser: user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.message, loading: false, currentUser: null });
      throw error;
    }
  },

  // Récupérer un utilisateur par ID
  fetchUserById: async (id) => {
    set({ loading: true, error: null });
    try {
      const user = await userService.getUserById(id);
      set({ currentUser: user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.message, loading: false, currentUser: null });
      throw error;
    }
  },

  // Enregistrer un scan
  recordScan: async (userId, scanData) => {
    try {
      const scan = await userService.recordScan(userId, scanData);
      set((state) => ({
        scans: [scan, ...state.scans],
      }));
      return scan;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du scan:', error);
      throw error;
    }
  },

  // Récupérer l'historique des scans
  fetchUserScans: async (userId) => {
    set({ loading: true, error: null });
    try {
      const scans = await userService.getUserScans(userId);
      set({ scans, loading: false });
      return scans;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Réinitialiser l'état
  reset: () => set({
    currentUser: null,
    scans: [],
    loading: false,
    error: null,
  }),
}));