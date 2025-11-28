import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const slug = (await params).slug;

        const event = await prisma.event.findUnique({
            where: {
                slug,
            },
            include: {
                organizer: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
