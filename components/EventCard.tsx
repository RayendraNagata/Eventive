import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Banknote } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    location: string;
    startTime: Date;
    price: number;
    capacity: number;
    status: string;
  };
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(event.startTime));

  const isFree = event.price === 0;

  return (
    <Card variant="glass" className="group hover:scale-[1.02] transition-smooth overflow-hidden">
      {/* Category badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="glass px-3 py-1 rounded-full text-xs font-medium">
          {event.category}
        </span>
      </div>

      <CardHeader>
        <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-smooth">
          {event.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {event.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Date & Time */}
        <div className="flex items-start gap-2 text-sm">
          <Calendar className="w-4 h-4 text-primary mt-0.5" />
          <span className="text-foreground-secondary">{formattedDate}</span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary mt-0.5" />
          <span className="text-foreground-secondary line-clamp-1">{event.location}</span>
        </div>

        {/* Price & Capacity */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Banknote className="w-4 h-4 text-primary" />
            <span className="font-semibold text-primary">
              {isFree ? "FREE" : `Rp ${event.price.toLocaleString("id-ID")}`}
            </span>
          </div>
          <div className="text-xs text-foreground-secondary">
            {event.capacity} seats
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/events/${event.slug}`} className="w-full">
          <Button variant="glass" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
