// src/app/api/scans/route.js

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, location } = body;

    // Récupérer les informations de la requête
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const scan = await prisma.scan.create({
      data: {
        userId,
        ipAddress,
        userAgent,
        location: location || null,
      },
    });

    return NextResponse.json(scan);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du scan:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement du scan' },
      { status: 500 }
    );
  }
}