import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Users, Calendar, Ticket } from "lucide-react";

export default async function AdminDashboardPage() {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
        redirect("/me/tickets");
    }

    const [userCount, eventCount, ticketCount] = await Promise.all([
        prisma.user.count(),
        prisma.event.count(),
        prisma.registration.count(),
    ]);

    const stats = [
        { label: "Total Users", value: userCount, icon: Users, color: "text-blue-500" },
        { label: "Total Events", value: eventCount, icon: Calendar, color: "text-purple-500" },
        { label: "Tickets Sold", value: ticketCount, icon: Ticket, color: "text-green-500" },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold mb-2">Admin Overview</h1>
                <p className="text-foreground-secondary">
                    System statistics and management.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-3xl font-bold">{stat.value}</span>
                            </div>
                            <div className="text-foreground-secondary font-medium">
                                {stat.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="glass-card p-8 text-center">
                <p className="text-foreground-secondary">
                    More admin features coming soon...
                </p>
            </div>
        </div>
    );
}
