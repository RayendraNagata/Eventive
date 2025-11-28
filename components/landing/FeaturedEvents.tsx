import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Tag } from "lucide-react";
import Image from "next/image";

// Mock data for now
const featuredEvents = [
    {
        id: 1,
        title: "Tech Conference 2025",
        category: "Technology",
        date: "Dec 15, 2025",
        location: "Jakarta Convention Center",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000",
        price: "Rp 150.000"
    },
    {
        id: 2,
        title: "Jazz Night Live",
        category: "Music",
        date: "Dec 20, 2025",
        location: "Grand Indonesia Hall",
        image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=2000",
        price: "Rp 250.000"
    },
    {
        id: 3,
        title: "Digital Art Exhibition",
        category: "Art",
        date: "Jan 05, 2026",
        location: "National Gallery",
        image: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?auto=format&fit=crop&q=80&w=2000",
        price: "Free"
    }
];

export default function FeaturedEvents() {
    return (
        <section className="py-24 bg-subtle-gradient">
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Events</h2>
                        <p className="text-foreground-secondary">Don't miss out on these popular experiences.</p>
                    </div>
                    <Link
                        href="/events"
                        className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                        View all events
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredEvents.map((event) => (
                        <Link href={`/events/sample-slug`} key={event.id} className="group">
                            <div className="glass-card overflow-hidden h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                {/* Image Container */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-medium backdrop-blur-md">
                                        {event.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-foreground-secondary mb-3">
                                        <Calendar className="w-4 h-4" />
                                        <span>{event.date}</span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-foreground-secondary mb-4">
                                        <MapPin className="w-4 h-4" />
                                        <span className="truncate">{event.location}</span>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <span className="font-semibold text-lg">{event.price}</span>
                                        <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Get Ticket <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-primary font-medium"
                    >
                        View all events
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
