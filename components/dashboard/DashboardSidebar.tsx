"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Ticket,
    Calendar,
    Settings,
    LogOut,
    PlusCircle,
    Users,
    BarChart3
} from "lucide-react";

interface DashboardSidebarProps {
    userRole: string;
}

export default function DashboardSidebar({ userRole }: DashboardSidebarProps) {
    const pathname = usePathname();

    const commonLinks = [
        { href: "/me/tickets", label: "My Tickets", icon: Ticket },
        { href: "/me/settings", label: "Settings", icon: Settings },
    ];

    const organizerLinks = [
        { href: "/organizer/events", label: "My Events", icon: Calendar },
        { href: "/organizer/events/new", label: "Create Event", icon: PlusCircle },
    ];

    const adminLinks = [
        { href: "/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/users", label: "Manage Users", icon: Users },
        { href: "/admin/events", label: "Manage Events", icon: BarChart3 },
    ];

    let links = [...commonLinks];

    if (userRole === "ORGANIZER") {
        links = [...organizerLinks, ...commonLinks];
    } else if (userRole === "ADMIN") {
        links = [...adminLinks, ...organizerLinks, ...commonLinks];
    }

    return (
        <aside className="w-64 fixed inset-y-0 left-0 z-50 bg-background/80 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 hidden lg:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-white/10">
                <Link href="/" className="text-2xl font-bold text-gradient">
                    Eventive
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "text-foreground-secondary hover:bg-gray-100 dark:hover:bg-white/5 hover:text-foreground"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-white/10">
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
