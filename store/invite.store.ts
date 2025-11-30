// store/invite.store.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { InviteComplet, StatutConfirmation, TypeBoisson } from '@/types/invite.types';
import { inviteService } from '@/lib/services/invite.service';

interface InviteStore {
  // State
  invite: InviteComplet | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadInvite: (id: string) => Promise<void>;
  updateConfirmation: (confirme: StatutConfirmation) => Promise<void>;
  updateBoissons: (boissons: { boisson: TypeBoisson; quantite: number }[]) => Promise<void>;
  updateLivreOr: (message: string) => Promise<void>;
  addCadeau: (cadeau: any) => Promise<void>;
  deleteCadeau: (cadeauId: string) => Promise<void>;
  clearInvite: () => void;
  setError: (error: string | null) => void;
}

export const useInviteStore = create<InviteStore>()(
  devtools(
    persist(
      (set, get) => ({
        // État initial
        invite: null,
        isLoading: false,
        error: null,

        // Charger un invité
        loadInvite: async (id: string) => {
          set({ isLoading: true, error: null });
          try {
            const invite = await inviteService.getInviteById(id);
            set({ invite, isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        // Mettre à jour la confirmation
        updateConfirmation: async (confirme: StatutConfirmation) => {
          const { invite } = get();
          if (!invite) throw new Error('Aucun invité chargé');

          set({ isLoading: true, error: null });
          try {
            const updatedInvite = await inviteService.updateConfirmation(invite.id, confirme);
            set({ invite: updatedInvite, isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        // Mettre à jour les boissons
        updateBoissons: async (boissons: { boisson: TypeBoisson; quantite: number }[]) => {
          const { invite } = get();
          if (!invite) throw new Error('Aucun invité chargé');

          set({ isLoading: true, error: null });
          try {
            const updatedInvite = await inviteService.updateBoissons(invite.id, boissons);
            set({ invite: updatedInvite, isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        // Mettre à jour le livre d'or
        updateLivreOr: async (message: string) => {
          const { invite } = get();
          if (!invite) throw new Error('Aucun invité chargé');

          set({ isLoading: true, error: null });
          try {
            const updatedInvite = await inviteService.updateLivreOr(invite.id, message);
            set({ invite: updatedInvite, isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        // Ajouter un cadeau
        addCadeau: async (cadeau: any) => {
          const { invite } = get();
          if (!invite) throw new Error('Aucun invité chargé');

          set({ isLoading: true, error: null });
          try {
            const updatedInvite = await inviteService.addCadeau(invite.id, cadeau);
            set({ invite: updatedInvite, isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        // Supprimer un cadeau
        deleteCadeau: async (cadeauId: string) => {
          const { invite } = get();
          if (!invite) throw new Error('Aucun invité chargé');

          set({ isLoading: true, error: null });
          try {
            const updatedInvite = await inviteService.deleteCadeau(invite.id, cadeauId);
            set({ invite: updatedInvite, isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        // Effacer l'invité
        clearInvite: () => {
          set({ invite: null, error: null, isLoading: false });
        },

        // Définir une erreur
        setError: (error: string | null) => {
          set({ error });
        },
      }),
      {
        name: 'invite-storage', // Nom pour le localStorage
        partialize: (state) => ({ invite: state.invite }), // Persister seulement l'invité
      }
    )
  )
);