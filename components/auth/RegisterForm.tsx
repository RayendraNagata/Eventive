"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

export default function RegisterForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(data: RegisterInput) {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed");
            }

            // Redirect to login page on success
            router.push("/auth/login?registered=true");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                </label>
                <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                />
                {errors.name && (
                    <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                    Email
                </label>
                <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                />
                {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                    Password
                </label>
                <input
                    {...register("password")}
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="••••••••"
                />
                {errors.password && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                </label>
                <input
                    {...register("confirmPassword")}
                    type="password"
                    id="confirmPassword"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="••••••••"
                />
                {errors.confirmPassword && (
                    <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating account...
                    </>
                ) : (
                    "Create Account"
                )}
            </button>

            <div className="text-center text-sm text-foreground-secondary">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    Sign in
                </Link>
            </div>
        </form>
    );
}
