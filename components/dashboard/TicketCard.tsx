"use client";

import { QRCodeSVG } from "qrcode.react";
import { Calendar, MapPin, Ticket as TicketIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TicketCardProps {
    ticket: {
        id: string;
        ticketCode: string;
        status: string;
        event: {
            title: string;
            slug: string;
            startTime: Date;
            location: string;
            price: number;
        };
    };
}

export default function TicketCard({ ticket }: TicketCardProps) {
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(ticket.event.startTime));

    return (
        <Card variant="glass" className="overflow-hidden flex flex-col md:flex-row">
            <div className="flex-1 p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <TicketIcon className="w-4 h-4" />
                    <span>{ticket.ticketCode}</span>
                </div>

                <h3 className="text-2xl font-bold">{ticket.event.title}</h3>

                <div className="space-y-2 text-foreground-secondary">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{ticket.event.location}</span>
                    </div>
                </div>

                <div className="pt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
                        {ticket.status}
                    </span>
                </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-white p-6 flex items-center justify-center border-l border-gray-100 dark:border-gray-800">
                <div className="text-center space-y-2">
                    <QRCodeSVG
                        value={ticket.ticketCode}
                        size={120}
                        level="H"
                        includeMargin
                    />
                    <p className="text-xs text-gray-500 font-mono">Scan to check-in</p>
                </div>
            </div>
        </Card>
    );
}
