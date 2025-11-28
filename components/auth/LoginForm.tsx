"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const registered = searchParams.get("registered");
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginInput) {
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                // If there's a specific callbackUrl (not default /), use it
                if (callbackUrl && callbackUrl !== "/") {
                    router.push(callbackUrl);
                    router.refresh();
                    return;
                }

                // Otherwise, fetch session to determine role-based redirect
                const sessionRes = await fetch("/api/auth/session");
                const session = await sessionRes.json();

                if (session?.user?.role === "ADMIN") {
                    router.push("/admin");
                } else if (session?.user?.role === "ORGANIZER") {
                    router.push("/organizer/events");
                } else {
                    router.push("/me/tickets");
                }

                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {registered && (
                <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    Account created successfully! Please sign in.
                </div>
            )}

            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    {error}
                </div>
            )}

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
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                        Password
                    </label>
                    <Link
                        href="/auth/forgot-password"
                        className="text-xs text-primary hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>
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

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    "Sign In"
                )}
            </button>

            <div className="text-center text-sm text-foreground-secondary">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                    Create account
                </Link>
            </div>
        </form>
    );
}
