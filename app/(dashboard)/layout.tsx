import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar userRole={user.role} />

      <main className="lg:pl-64 min-h-screen transition-all">
        <div className="container mx-auto p-4 md:p-8 pt-24 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
