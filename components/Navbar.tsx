"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-gradient">
                Eventive
              </div>
            </Link>

            {/* Nav Links - positioned more to the left */}
            <div className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-smooth",
                    pathname === link.href
                      ? "text-foreground bg-background-secondary"
                      : "text-foreground-secondary hover:text-foreground hover:bg-background-secondary/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {session ? (
                <Link href={session.user.role === "ADMIN" ? "/admin" : session.user.role === "ORGANIZER" ? "/organizer/events" : "/me/tickets"}>
                  <Button variant="primary" size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
