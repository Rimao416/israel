// src/hooks/useUser.js

import { useUserStore } from '@/store/userStore';

export const useUser = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const scans = useUserStore((state) => state.scans);
  
  const fetchUserByQrCode = useUserStore((state) => state.fetchUserByQrCode);
  const fetchUserById = useUserStore((state) => state.fetchUserById);
  const recordScan = useUserStore((state) => state.recordScan);
  const fetchUserScans = useUserStore((state) => state.fetchUserScans);
  const reset = useUserStore((state) => state.reset);
  const clearError = useUserStore((state) => state.clearError);

  return {
    currentUser,
    loading,
    error,
    scans,
    fetchUserByQrCode,
    fetchUserById,
    recordScan,
    fetchUserScans,
    reset,
    clearError,
  };
};