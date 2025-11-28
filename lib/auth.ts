import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    return session?.user;
}

export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/auth/login");
    }
    return user;
}

export async function requireRole(allowedRoles: string[]) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/auth/login");
    }

    if (!allowedRoles.includes(user.role)) {
        redirect("/"); // Or a 403 Forbidden page
    }

    return user;
}
