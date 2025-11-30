// app/api/invites/[id]/boissons/route.ts

import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * PUT /api/invites/[id]/boissons
 * Met à jour les préférences de boissons
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID manquant' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { boissons } = body;

    // Supprimer les anciennes préférences
    await prisma.boissonPreference.deleteMany({
      where: { inviteId: id },
    });

    // Créer les nouvelles préférences
    if (boissons && boissons.length > 0) {
      await prisma.boissonPreference.createMany({
        data: boissons.map((b: any) => ({
          inviteId: id,
          boisson: b.boisson,
          quantite: b.quantite,
        })),
      });
    }

    // Récupérer l'invité mis à jour
    const invite = await prisma.invite.findUnique({
      where: { id },
      include: {
        table: true,
        boissons: true,
        livreOr: true,
        cadeaux: true,
      },
    });

    return NextResponse.json(invite);
  } catch (error) {
    console.error('Erreur lors de la mise à jour des boissons:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}