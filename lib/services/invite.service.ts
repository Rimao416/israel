// services/invite.service.ts
import { InviteComplet, StatutConfirmation, TypeBoisson } from '@/types/invite.types';

class InviteService {
  private baseUrl = '/api/invites';

  /**
   * Récupère toutes les informations d'un invité par son ID
   */
  async getInviteById(id: string): Promise<InviteComplet> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de l'invité: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Convertir les dates string en objets Date
    return this.transformInviteData(data);
  }

  /**
   * Met à jour le statut de confirmation
   */
  async updateConfirmation(id: string, confirme: StatutConfirmation): Promise<InviteComplet> {
    const response = await fetch(`${this.baseUrl}/${id}/confirmation`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ confirme }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour de la confirmation`);
    }

    return this.transformInviteData(await response.json());
  }

  /**
   * Met à jour les préférences de boissons
   */
  async updateBoissons(id: string, boissons: { boisson: TypeBoisson; quantite: number }[]): Promise<InviteComplet> {
    const response = await fetch(`${this.baseUrl}/${id}/boissons`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ boissons }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour des boissons`);
    }

    return this.transformInviteData(await response.json());
  }

  /**
   * Ajoute ou met à jour un message dans le livre d'or
   */
  async updateLivreOr(id: string, message: string): Promise<InviteComplet> {
    const response = await fetch(`${this.baseUrl}/${id}/livre-or`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour du livre d'or`);
    }

    return this.transformInviteData(await response.json());
  }

  /**
   * Ajoute un cadeau
   */
  async addCadeau(id: string, cadeau: any): Promise<InviteComplet> {
    const response = await fetch(`${this.baseUrl}/${id}/cadeau`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cadeau),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'ajout du cadeau`);
    }

    return this.transformInviteData(await response.json());
  }

  /**
   * Supprime un cadeau
   */
  async deleteCadeau(inviteId: string, cadeauId: string): Promise<InviteComplet> {
    const response = await fetch(`${this.baseUrl}/${inviteId}/cadeau/${cadeauId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression du cadeau`);
    }

    return this.transformInviteData(await response.json());
  }

  /**
   * Transforme les données reçues de l'API (convertit les dates)
   */
  private transformInviteData(data: any): InviteComplet {
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      table: {
        ...data.table,
        createdAt: new Date(data.table.createdAt),
        updatedAt: new Date(data.table.updatedAt),
      },
      boissons: data.boissons?.map((b: any) => ({
        ...b,
        createdAt: new Date(b.createdAt),
      })) || [],
      livreOr: data.livreOr ? {
        ...data.livreOr,
        createdAt: new Date(data.livreOr.createdAt),
        updatedAt: new Date(data.livreOr.updatedAt),
      } : undefined,
      cadeaux: data.cadeaux?.map((c: any) => ({
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
      })) || [],
    };
  }
}

export const inviteService = new InviteService();