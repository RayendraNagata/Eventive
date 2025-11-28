import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-subtle-gradient p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-foreground-secondary hover:text-primary transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">{title}</h1>
                    <p className="text-foreground-secondary">{subtitle}</p>
                </div>

                <div className="glass-card p-8 animate-fade-in">
                    {children}
                </div>
            </div>
        </div>
    );
}
