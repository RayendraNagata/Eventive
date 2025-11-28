import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In | Eventive",
    description: "Sign in to your Eventive account.",
};

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue to Eventive"
        >
            <LoginForm />
        </AuthLayout>
    );
}
