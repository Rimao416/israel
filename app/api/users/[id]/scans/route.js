// src/app/api/users/[id]/scans/route.js

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const scans = await prisma.scan.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        scannedAt: 'desc',
      },
    });

    return NextResponse.json(scans);
  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}