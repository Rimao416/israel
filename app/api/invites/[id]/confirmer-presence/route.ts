import prisma from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Récupérer l'invité avec ses infos de table
    const invite = await prisma.invite.findUnique({
      where: { id },
      include: {
        table: true,
      },
    });

    if (!invite) {
      return NextResponse.json(
        { error: 'Invité non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si déjà confirmé
    const alreadyConfirmed = invite.assiste === true;

    // Mettre à jour le champ assiste à true
    const updatedInvite = await prisma.invite.update({
      where: { id },
      data: {
        assiste: true,
      },
      include: {
        table: true,
      },
    });

    return NextResponse.json({
      ...updatedInvite,
      alreadyConfirmed,
    });
  } catch (error) {
    console.error('Erreur lors de la confirmation de présence:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}