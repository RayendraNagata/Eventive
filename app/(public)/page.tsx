import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import FeaturedEvents from "@/components/landing/FeaturedEvents";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedEvents />
      <FeatureSection />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 -skew-y-3 transform origin-left scale-110" />
        <div className="container px-4 mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Experience More?</h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto mb-10">
            Join thousands of people discovering amazing events every day.
          </p>
          <a
            href="/auth/register"
            className="inline-block px-8 py-4 rounded-full bg-foreground text-background font-bold hover:scale-105 transition-transform shadow-xl"
          >
            Create Free Account
          </a>
        </div>
      </section>
    </main>
  );
}
