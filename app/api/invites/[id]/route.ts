import prisma from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
/**
 * GET /api/invites/[id]
 * Récupère toutes les informations d'un invité
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // IMPORTANT: Dans Next.js 15, params est une Promise qui doit être awaited
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID manquant' },
        { status: 400 }
      );
    }

    // Récupérer l'invité avec toutes ses relations
    const invite = await prisma.invite.findUnique({
      where: { id },
      include: {
        table: true,
        boissons: true,
        livreOr: true,
        cadeaux: true,
      },
    });

    if (!invite) {
      return NextResponse.json(
        { error: 'Invité non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(invite);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'invité:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}