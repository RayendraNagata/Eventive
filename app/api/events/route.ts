import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { eventSchema } from "@/lib/validations/event";
import { generateSlug } from "@/lib/slugify";
import { z } from "zod";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");
        const category = searchParams.get("category");

        const whereClause: any = {
            status: "PUBLISHED",
        };

        if (query) {
            whereClause.OR = [
                { title: { contains: query } }, // SQLite doesn't support mode: 'insensitive' easily, but for dev it's fine
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
            include: {
                organizer: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        if (user.role !== "ORGANIZER" && user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Forbidden: Only organizers can create events" },
                { status: 403 }
            );
        }

        const body = await req.json();
        const data = eventSchema.parse(body);

        const slug = generateSlug(data.title);

        const event = await prisma.event.create({
            data: {
                ...data,
                slug,
                organizerId: user.id,
                status: "PUBLISHED", // Auto publish for MVP simplicity
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid input data", errors: error.issues },
                { status: 400 }
            );
        }

        console.error("Error creating event:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
