import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create sample users
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "user@eventive.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "user@eventive.com",
      passwordHash: hashedPassword,
      role: "USER",
    },
  });

  const organizer = await prisma.user.upsert({
    where: { email: "organizer@eventive.com" },
    update: {},
    create: {
      name: "Event Organizer",
      email: "organizer@eventive.com",
      passwordHash: hashedPassword,
      role: "ORGANIZER",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@eventive.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@eventive.com",
      passwordHash: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Created users");

  // Create sample events
  const events = [
    {
      title: "Jazz Night Under The Stars",
      slug: "jazz-night-under-the-stars",
      description:
        "Experience an enchanting evening of smooth jazz under the open sky. Featuring renowned local and international artists performing classic and contemporary jazz pieces.",
      category: "music",
      location: "Grand Garden Arena, Jakarta",
      startTime: new Date("2025-12-15T19:00:00"),
      endTime: new Date("2025-12-15T23:00:00"),
      capacity: 500,
      price: 250000,
      status: "PUBLISHED" as const,
      organizerId: organizer.id,
    },
    {
      title: "TechTalk 2025: Future of AI",
      slug: "techtalk-2025-future-of-ai",
      description:
        "Join industry leaders and AI experts as they discuss the future of artificial intelligence, machine learning, and their impact on various industries. Includes networking sessions.",
      category: "tech",
      location: "Innovation Hub, Bandung",
      startTime: new Date("2025-12-20T09:00:00"),
      endTime: new Date("2025-12-20T17:00:00"),
      capacity: 300,
      price: 0,
      status: "PUBLISHED" as const,
      organizerId: organizer.id,
    },
    {
      title: "Startup Founders Meetup",
      slug: "startup-founders-meetup",
      description:
        "Connect with fellow entrepreneurs, share experiences, and learn from successful startup founders. Perfect for early-stage founders and aspiring entrepreneurs.",
      category: "business",
      location: "Co-Working Space Central, Surabaya",
      startTime: new Date("2025-12-18T18:00:00"),
      endTime: new Date("2025-12-18T21:00:00"),
      capacity: 150,
      price: 50000,
      status: "PUBLISHED" as const,
      organizerId: organizer.id,
    },
    {
      title: "Food Festival: Taste of Indonesia",
      slug: "food-festival-taste-of-indonesia",
      description:
        "Celebrate Indonesian culinary heritage with dishes from across the archipelago. Live cooking demonstrations, food stalls, and cultural performances.",
      category: "food",
      location: "City Park, Yogyakarta",
      startTime: new Date("2025-12-22T10:00:00"),
      endTime: new Date("2025-12-22T20:00:00"),
      capacity: 1000,
      price: 0,
      status: "PUBLISHED" as const,
      organizerId: organizer.id,
    },
    {
      title: "Digital Art Exhibition 2025",
      slug: "digital-art-exhibition-2025",
      description:
        "Explore the intersection of technology and art with immersive digital installations, NFT showcases, and interactive exhibits from emerging digital artists.",
      category: "art",
      location: "Modern Art Gallery, Jakarta",
      startTime: new Date("2025-12-25T12:00:00"),
      endTime: new Date("2025-12-25T21:00:00"),
      capacity: 400,
      price: 75000,
      status: "PUBLISHED" as const,
      organizerId: organizer.id,
    },
    {
      title: "Marathon for Charity 2025",
      slug: "marathon-for-charity-2025",
      description:
        "Run for a cause! Join thousands of runners in this annual charity marathon. All proceeds go to local children's hospitals. Multiple distance categories available.",
      category: "sports",
      location: "National Stadium, Jakarta",
      startTime: new Date("2025-12-28T06:00:00"),
      endTime: new Date("2025-12-28T12:00:00"),
      capacity: 2000,
      price: 150000,
      status: "PUBLISHED" as const,
      organizerId: organizer.id,
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    });
  }

  console.log("✅ Created sample events");
  console.log("\n📝 Sample credentials:");
  console.log("User: user@eventive.com / password123");
  console.log("Organizer: organizer@eventive.com / password123");
  console.log("Admin: admin@eventive.com / password123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
