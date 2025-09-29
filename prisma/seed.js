import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding...')

  // Nettoyer les données existantes
  await prisma.scan.deleteMany()
  await prisma.user.deleteMany()

  // Créer des utilisateurs avec leurs codes QR
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice.martin@example.com',
        name: 'Alice Martin',
        phone: '+33 6 12 34 56 78',
        qrCode: 'QR_ALICE_2024_001',
        bio: 'Développeuse Full Stack passionnée par les nouvelles technologies',
        address: '123 Rue de la Paix',
        city: 'Paris',
        country: 'France',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob.dupont@example.com',
        name: 'Bob Dupont',
        phone: '+33 6 98 76 54 32',
        qrCode: 'QR_BOB_2024_002',
        bio: "Designer UI/UX avec 5 ans d'expérience",
        address: '45 Avenue des Champs',
        city: 'Lyon',
        country: 'France',
      },
    }),
    prisma.user.create({
      data: {
        email: 'claire.bernard@example.com',
        name: 'Claire Bernard',
        phone: '+33 7 11 22 33 44',
        qrCode: 'QR_CLAIRE_2024_003',
        bio: 'Chef de projet digital et consultante',
        address: '78 Boulevard Victor Hugo',
        city: 'Marseille',
        country: 'France',
      },
    }),
    prisma.user.create({
      data: {
        email: 'david.rousseau@example.com',
        name: 'David Rousseau',
        phone: '+33 6 55 44 33 22',
        qrCode: 'QR_DAVID_2024_004',
        bio: 'Entrepreneur et développeur mobile',
        address: '12 Rue du Commerce',
        city: 'Toulouse',
        country: 'France',
      },
    }),
    prisma.user.create({
      data: {
        email: 'emma.laurent@example.com',
        name: 'Emma Laurent',
        phone: '+33 7 88 99 00 11',
        qrCode: 'QR_EMMA_2024_005',
        bio: 'Data Scientist spécialisée en IA',
        address: '56 Rue de la République',
        city: 'Bordeaux',
        country: 'France',
      },
    }),
  ])

  console.log(`✅ ${users.length} utilisateurs créés`)

  // Créer des scans pour simuler l'historique
  const scans = []

  for (const user of users) {
    const scanCount = Math.floor(Math.random() * 4) + 2

    for (let i = 0; i < scanCount; i++) {
      const daysAgo = Math.floor(Math.random() * 30)
      const scannedAt = new Date()
      scannedAt.setDate(scannedAt.getDate() - daysAgo)

      const scan = await prisma.scan.create({
        data: {
          userId: user.id,
          scannedAt,
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
            Math.random() * 255
          )}`,
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
          location: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'][
            Math.floor(Math.random() * 5)
          ],
        },
      })

      scans.push(scan)
    }
  }

  console.log(`✅ ${scans.length} scans créés`)
  console.log('✨ Seeding terminé avec succès !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
