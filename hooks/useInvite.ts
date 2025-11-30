// hooks/useInvite.ts
import { useEffect } from 'react';
import { useInviteStore } from '@/store/invite.store';
import { StatutConfirmation, TypeBoisson } from '@/types/invite.types';

/**
 * Hook principal pour accéder aux données de l'invité
 */
export const useInvite = (inviteId?: string) => {
  const {
    invite,
    isLoading,
    error,
    loadInvite,
    updateConfirmation,
    updateBoissons,
    updateLivreOr,
    addCadeau,
    deleteCadeau,
    clearInvite,
    setError,
  } = useInviteStore();

  // Charger automatiquement l'invité si un ID est fourni
  useEffect(() => {
    if (inviteId && !invite) {
      loadInvite(inviteId);
    }
  }, [inviteId, invite, loadInvite]);

  return {
    invite,
    isLoading,
    error,
    loadInvite,
    updateConfirmation,
    updateBoissons,
    updateLivreOr,
    addCadeau,
    deleteCadeau,
    clearInvite,
    setError,
  };
};

/**
 * Hook spécifique pour la confirmation RSVP
 */
export const useRSVP = () => {
  const { invite, isLoading, updateConfirmation } = useInviteStore();

  const confirmer = async (statut: StatutConfirmation) => {
    await updateConfirmation(statut);
  };

  return {
    statut: invite?.confirme,
    confirmer,
    isLoading,
    isConfirmed: invite?.confirme === StatutConfirmation.OUI,
    isDeclined: invite?.confirme === StatutConfirmation.NON,
    isPending: invite?.confirme === StatutConfirmation.EN_ATTENTE,
  };
};

/**
 * Hook spécifique pour les boissons
 */
export const useBoissons = () => {
  const { invite, isLoading, updateBoissons } = useInviteStore();

  const saveBoissonPreferences = async (boissons: { boisson: TypeBoisson; quantite: number }[]) => {
    await updateBoissons(boissons);
  };

  return {
    boissons: invite?.boissons || [],
    saveBoissonPreferences,
    isLoading,
  };
};

/**
 * Hook spécifique pour le livre d'or
 */
export const useLivreOr = () => {
  const { invite, isLoading, updateLivreOr } = useInviteStore();

  const saveMessage = async (message: string) => {
    await updateLivreOr(message);
  };

  return {
    livreOr: invite?.livreOr,
    message: invite?.livreOr?.message || '',
    hasMessage: !!invite?.livreOr,
    saveMessage,
    isLoading,
  };
};

/**
 * Hook spécifique pour les cadeaux
 */
export const useCadeaux = () => {
  const { invite, isLoading, addCadeau, deleteCadeau } = useInviteStore();

  const ajouterCadeau = async (cadeau: any) => {
    await addCadeau(cadeau);
  };

  const supprimerCadeau = async (cadeauId: string) => {
    await deleteCadeau(cadeauId);
  };

  return {
    cadeaux: invite?.cadeaux || [],
    ajouterCadeau,
    supprimerCadeau,
    totalCadeaux: invite?.cadeaux.length || 0,
    isLoading,
  };
};

/**
 * Hook spécifique pour les informations de table
 */
export const useTable = () => {
  const { invite } = useInviteStore();

  return {
    table: invite?.table,
    tableNumero: invite?.table.numero,
    tableNom: invite?.table.nom,
    hasTable: !!invite?.table,
  };
};

/**
 * Hook pour obtenir les informations de base de l'invité
 */
export const useInviteInfo = () => {
  const { invite } = useInviteStore();

  return {
    nom: invite?.nom,
    prenom: invite?.prenom,
    nomComplet: invite ? `${invite.prenom} ${invite.nom}` : '',
    email: invite?.email,
    telephone: invite?.telephone,
    assiste: invite?.assiste,
  };
};