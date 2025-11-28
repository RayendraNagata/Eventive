import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account | Eventive",
    description: "Join Eventive to discover and book amazing events.",
};

export default function RegisterPage() {
    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join thousands of event enthusiasts"
        >
            <RegisterForm />
        </AuthLayout>
    );
}
