// app/api/invites/[id]/cadeaux/route.ts

import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/invites/[id]/cadeaux
 * Ajoute un cadeau
 */
export async function POST(
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
    const cadeau = body;

    await prisma.cadeau.create({
      data: {
        inviteId: id,
        ...cadeau,
      },
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
    console.error('Erreur lors de l\'ajout du cadeau:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
