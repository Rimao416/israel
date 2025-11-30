// types/invite.types.ts

export enum StatutConfirmation {
  OUI = 'OUI',
  NON = 'NON',
  EN_ATTENTE = 'EN_ATTENTE'
}

export enum TypeBoisson {
  COCA_COLA = 'COCA_COLA',
  FANTA = 'FANTA',
  BOGA = 'BOGA',
  JUS_DE_FRUIT = 'JUS_DE_FRUIT',
  CELESTIA = 'CELESTIA'
}

export enum CategorieCadeau {
  APPAREILS_ELECTROMENAGERS = 'APPAREILS_ELECTROMENAGERS',
  MEUBLES = 'MEUBLES',
  USTENSILES_CUISINE = 'USTENSILES_CUISINE',
  DONS_ESPECES = 'DONS_ESPECES'
}

export enum AppareilElectromenager {
  AIR_FRYER = 'AIR_FRYER',
  MACHINE_A_LAVER = 'MACHINE_A_LAVER',
  FRIGO = 'FRIGO',
  MIXEUR = 'MIXEUR',
  TELEVISION = 'TELEVISION',
  MINI_FOUR_ELECTRIQUE = 'MINI_FOUR_ELECTRIQUE'
}

export interface BoissonPreference {
  id: string;
  boisson: TypeBoisson;
  quantite: number;
  createdAt: Date;
}

export interface LivreOr {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cadeau {
  id: string;
  categorie: CategorieCadeau;
  appareilElectromenager?: AppareilElectromenager;
  description?: string;
  montantEspeces?: number;
  estOffert: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Table {
  id: string;
  numero: number;
  nom: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InviteComplet {
  id: string;
  nom: string;
  prenom: string;
  email?: string;
  telephone?: string;
  confirme: StatutConfirmation;
  assiste?: boolean;
  table: Table;
  boissons: BoissonPreference[];
  livreOr?: LivreOr;
  cadeaux: Cadeau[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InviteState {
  invite: InviteComplet | null;
  isLoading: boolean;
  error: string | null;
}