import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const slug = (await params).slug;

        // Find event
        const event = await prisma.event.findUnique({
            where: { slug },
            include: {
                registrations: {
                    where: { status: "CONFIRMED" },
                },
            },
        });

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        if (event.status !== "PUBLISHED") {
            return NextResponse.json(
                { message: "Event is not available for registration" },
                { status: 400 }
            );
        }

        // Check capacity
        if (event.registrations.length >= event.capacity) {
            return NextResponse.json({ message: "Event is sold out" }, { status: 400 });
        }

        // Check if user already registered
        const existingRegistration = await prisma.registration.findFirst({
            where: {
                eventId: event.id,
                userId: user.id,
                status: "CONFIRMED",
            },
        });

        if (existingRegistration) {
            return NextResponse.json(
                { message: "You are already registered for this event" },
                { status: 400 }
            );
        }

        // Create registration
        const ticketCode = `EVT-${nanoid(8).toUpperCase()}`;

        const registration = await prisma.registration.create({
            data: {
                eventId: event.id,
                userId: user.id,
                status: "CONFIRMED",
                ticketCode,
            },
        });

        return NextResponse.json(registration, { status: 201 });
    } catch (error) {
        console.error("Error registering for event:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
