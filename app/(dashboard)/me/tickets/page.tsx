import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import TicketCard from "@/components/dashboard/TicketCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Tickets | Eventive",
  description: "View and manage your event tickets.",
};

export default async function MyTicketsPage() {
  const user = await getCurrentUser();

  if (!user) return null;

  const tickets = await prisma.registration.findMany({
    where: {
      userId: user.id,
      status: "CONFIRMED",
    },
    include: {
      event: {
        select: {
          title: true,
          slug: true,
          startTime: true,
          location: true,
          price: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Tickets</h1>
        <p className="text-foreground-secondary">
          Manage your upcoming events and tickets.
        </p>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-2xl">
          <div className="text-4xl mb-4">🎫</div>
          <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
          <p className="text-foreground-secondary mb-6">
            You haven't booked any events yet.
          </p>
          <a
            href="/events"
            className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition-all"
          >
            Browse Events
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}