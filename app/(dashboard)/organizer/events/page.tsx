import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Users } from "lucide-react";
import Link from "next/link";

export default async function OrganizerEventsPage() {
    const user = await getCurrentUser();

    if (!user || user.role !== "ORGANIZER") {
        redirect("/me/tickets");
    }

    const events = await prisma.event.findMany({
        where: {
            organizerId: user.id,
        },
        include: {
            _count: {
                select: { registrations: true },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Events</h1>
                    <p className="text-foreground-secondary">
                        Manage your events and track registrations.
                    </p>
                </div>
                <Link href="/organizer/events/new">
                    <Button variant="primary" className="gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Create Event
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6">
                {events.map((event) => (
                    <div key={event.id} className="glass-card p-6 flex items-center justify-between group hover:border-primary/50 transition-colors">
                        <div>
                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(event.startTime).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {event._count.registrations} / {event.capacity} registered
                                </div>
                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${event.status === "PUBLISHED"
                                        ? "bg-green-500/20 text-green-600 dark:text-green-400"
                                        : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                                    }`}>
                                    {event.status}
                                </div>
                            </div>
                        </div>

                        <Link href={`/events/${event.slug}`}>
                            <Button variant="ghost" size="sm">View</Button>
                        </Link>
                    </div>
                ))}

                {events.length === 0 && (
                    <div className="text-center py-20 glass-card rounded-2xl">
                        <div className="text-4xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold mb-2">No events created</h3>
                        <p className="text-foreground-secondary mb-6">
                            Start creating amazing events for your audience.
                        </p>
                        <Link href="/organizer/events/new">
                            <Button variant="primary">Create First Event</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
