import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validations/auth";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = registerSchema.parse(body);

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const passwordHash = await hash(password, 12);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role: "USER", // Default role
            },
        });

        // Remove passwordHash from response
        const { passwordHash: _, ...userWithoutPassword } = newUser;

        return NextResponse.json(
            { message: "User created successfully", user: userWithoutPassword },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid input data", errors: error.issues },
                { status: 400 }
            );
        }

        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
