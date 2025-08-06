import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash password for demo accounts
  const hashedPassword = await bcrypt.hash('demo123', 12);

  // Create demo organizations
  const demoOrg1 = await prisma.organization.upsert({
    where: { slug: 'demo-admin-org' },
    update: {},
    create: {
      name: 'Demo Admin Organization',
      slug: 'demo-admin-org',
      description: 'Demo organization for admin testing',
    },
  });

  const demoOrg2 = await prisma.organization.upsert({
    where: { slug: 'demo-organizer-org' },
    update: {},
    create: {
      name: 'Demo Organizer Organization',
      slug: 'demo-organizer-org',
      description: 'Demo organization for organizer testing',
    },
  });

  const demoOrg3 = await prisma.organization.upsert({
    where: { slug: 'demo-user-org' },
    update: {},
    create: {
      name: 'Demo User Organization',
      slug: 'demo-user-org',
      description: 'Demo organization for user testing',
    },
  });

  // Create demo users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@eventive.com' },
    update: {},
    create: {
      email: 'admin@eventive.com',
      name: 'Admin Demo',
      password: hashedPassword,
      role: UserRole.ADMIN,
      organizationId: demoOrg1.id,
      emailVerified: new Date(),
    },
  });

  const organizerUser = await prisma.user.upsert({
    where: { email: 'organizer@eventive.com' },
    update: {},
    create: {
      email: 'organizer@eventive.com',
      name: 'Organizer Demo',
      password: hashedPassword,
      role: UserRole.ORGANIZER,
      organizationId: demoOrg2.id,
      emailVerified: new Date(),
    },
  });

  const attendeeUser = await prisma.user.upsert({
    where: { email: 'user@eventive.com' },
    update: {},
    create: {
      email: 'user@eventive.com',
      name: 'User Demo',
      password: hashedPassword,
      role: UserRole.ATTENDEE,
      organizationId: demoOrg3.id,
      emailVerified: new Date(),
    },
  });

  console.log('Demo accounts created:');
  console.log('Admin:', adminUser.email);
  console.log('Organizer:', organizerUser.email);
  console.log('User:', attendeeUser.email);
  console.log('Password for all: demo123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
