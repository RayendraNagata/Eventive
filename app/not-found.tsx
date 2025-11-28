import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md animate-fade-in">
        <div className="text-8xl">🔍</div>
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-foreground-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
