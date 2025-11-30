// app/api/invites/[id]/confirmation/route.ts

import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * PATCH /api/invites/[id]/confirmation
 * Met à jour le statut de confirmation
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params pour Next.js 15
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID manquant' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { confirme } = body;

    if (!confirme) {
      return NextResponse.json(
        { error: 'Statut de confirmation manquant' },
        { status: 400 }
      );
    }

    const invite = await prisma.invite.update({
      where: { id },
      data: { confirme },
      include: {
        table: true,
        boissons: true,
        livreOr: true,
        cadeaux: true,
      },
    });

    return NextResponse.json(invite);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la confirmation:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
