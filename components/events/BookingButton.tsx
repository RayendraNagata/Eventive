"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BookingButtonProps {
    eventSlug: string;
    isSoldOut: boolean;
    isRegistered: boolean;
}

export default function BookingButton({ eventSlug, isSoldOut, isRegistered }: BookingButtonProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleBooking = async () => {
        if (!session) {
            router.push(`/auth/login?callbackUrl=/events/${eventSlug}`);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/events/${eventSlug}/register`, {
                method: "POST",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Booking failed");
            }

            router.refresh();
            // Optional: Show success toast/message
        } catch (error) {
            console.error("Booking error:", error);
            alert("Failed to book ticket. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isRegistered) {
        return (
            <Button disabled className="w-full bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20">
                Already Registered
            </Button>
        );
    }

    if (isSoldOut) {
        return (
            <Button disabled className="w-full">
                Sold Out
            </Button>
        );
    }

    return (
        <Button
            onClick={handleBooking}
            disabled={isLoading}
            className="w-full"
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking...
                </>
            ) : (
                "Get Ticket"
            )}
        </Button>
    );
}
