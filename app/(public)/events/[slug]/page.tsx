import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import BookingButton from "@/components/events/BookingButton";
import { Metadata } from "next";
import { Calendar, MapPin, Users, Tag } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const event = await prisma.event.findUnique({
    where: { slug },
  });

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.title} | Eventive`,
    description: event.description.substring(0, 160),
  };
}

export default async function EventDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const user = await getCurrentUser();

  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      organizer: {
        select: {
          name: true,
          email: true,
        },
      },
      registrations: {
        where: {
          userId: user?.id,
          status: "CONFIRMED",
        },
      },
      _count: {
        select: {
          registrations: {
            where: { status: "CONFIRMED" },
          },
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  const isSoldOut = event._count.registrations >= event.capacity;
  const isRegistered = event.registrations.length > 0;
  const isFree = event.price === 0;

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(event.startTime));

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20 p-8 md:p-12 mb-8 animate-fade-in">
          <div className="relative z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full glass text-sm font-medium mb-6">
              <Tag className="w-4 h-4 mr-2" />
              {event.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-foreground-secondary">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.location}
              </div>
            </div>
          </div>

          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 animate-slide-up">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">About Event</h2>
              <p className="text-foreground-secondary leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">Organizer</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                  {event.organizer.name?.[0] || "O"}
                </div>
                <div>
                  <div className="font-medium">{event.organizer.name}</div>
                  <div className="text-sm text-foreground-secondary">{event.organizer.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-slide-up delay-100">
            <div className="glass-card p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-sm text-foreground-secondary mb-1">Price</div>
                <div className="text-3xl font-bold text-primary">
                  {isFree ? "FREE" : `Rp ${event.price.toLocaleString("id-ID")}`}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-secondary">Capacity</span>
                  <span className="font-medium">{event.capacity} seats</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-secondary">Registered</span>
                  <span className="font-medium">{event._count.registrations} people</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((event._count.registrations / event.capacity) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <BookingButton
                eventSlug={slug}
                isSoldOut={isSoldOut}
                isRegistered={isRegistered}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}