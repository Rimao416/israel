// app/api/invites/[id]/livre-or/route.ts

import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * PUT /api/invites/[id]/livre-or
 * Ajoute ou met à jour un message dans le livre d'or
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
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message manquant' },
        { status: 400 }
      );
    }

    // Vérifier si un message existe déjà
    const existingLivreOr = await prisma.livreOr.findUnique({
      where: { inviteId: id },
    });

    if (existingLivreOr) {
      // Mettre à jour le message existant
      await prisma.livreOr.update({
        where: { inviteId: id },
        data: { message },
      });
    } else {
      // Créer un nouveau message
      await prisma.livreOr.create({
        data: {
          inviteId: id,
          message,
        },
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
    console.error('Erreur lors de la mise à jour du livre d\'or:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
