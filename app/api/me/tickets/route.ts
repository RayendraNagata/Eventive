import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

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

        return NextResponse.json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
