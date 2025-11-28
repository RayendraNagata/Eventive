import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { EventCard } from "@/components/EventCard";
import EventSearch from "@/components/events/EventSearch";
import { Metadata } from "next";
import { SearchX } from "lucide-react";

export const metadata: Metadata = {
  title: "Discover Events | Eventive",
  description: "Browse upcoming events and book your tickets.",
};

async function EventsList({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const query = (await searchParams).q;
  const category = (await searchParams).category;

  const whereClause: any = {
    status: "PUBLISHED",
  };

  if (query) {
    whereClause.OR = [
      { title: { contains: query } },
      { description: { contains: query } },
    ];
  }

  if (category) {
    whereClause.category = category;
  }

  const events = await prisma.event.findMany({
    where: whereClause,
    orderBy: {
      startTime: "asc",
    },
  });

  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <SearchX className="w-16 h-16 mx-auto mb-4 text-foreground-secondary" />
        <h3 className="text-xl font-semibold mb-2">No events found</h3>
        <p className="text-foreground-secondary">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function EventsPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Discover Events</h1>
          <p className="text-foreground-secondary mb-8">
            Find and book tickets for the best events in town.
          </p>

          <Suspense fallback={<div>Loading search...</div>}>
            <EventSearch />
          </Suspense>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        }>
          <EventsList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
