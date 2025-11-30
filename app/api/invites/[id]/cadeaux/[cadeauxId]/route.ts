// app/api/invites/[id]/cadeaux/[cadeauId]/route.ts

import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * DELETE /api/invites/[id]/cadeaux/[cadeauId]
 * Supprime un cadeau
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string; cadeauId: string }> }
) {
  try {
    const { id, cadeauId } = await context.params;

    if (!id || !cadeauId) {
      return NextResponse.json(
        { error: 'ID manquant' },
        { status: 400 }
      );
    }

    await prisma.cadeau.delete({
      where: { id: cadeauId },
    });

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
    console.error('Erreur lors de la suppression du cadeau:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}