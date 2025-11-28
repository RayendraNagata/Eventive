import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container px-4 mx-auto relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full glass border border-blue-500/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4 animate-fade-in">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            The Future of Event Management
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-slide-up">
            Discover Events <br />
            <span className="text-gradient">Reimagined</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto animate-slide-up delay-100">
            Experience the most elegant way to discover, book, and manage events. 
            Seamless ticketing with a touch of glass.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
            <Link 
              href="/events" 
              className="px-8 py-4 rounded-full bg-primary text-white font-medium hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              Browse Events
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/auth/register" 
              className="px-8 py-4 rounded-full glass hover:bg-white/80 dark:hover:bg-black/40 transition-all hover:scale-105 font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Stats or Social Proof (Optional) */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-300">
            {[
              { label: "Active Events", value: "500+" },
              { label: "Users", value: "10k+" },
              { label: "Cities", value: "20+" },
              { label: "Rating", value: "4.9/5" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-foreground-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
