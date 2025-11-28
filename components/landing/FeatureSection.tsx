import { Calendar, Ticket, QrCode, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: Calendar,
        title: "Discover Events",
        description: "Find the best events happening around you with our curated discovery feed."
    },
    {
        icon: Ticket,
        title: "Instant Booking",
        description: "Secure your spot in seconds with our seamless digital ticketing system."
    },
    {
        icon: QrCode,
        title: "QR Check-in",
        description: "Forget paper tickets. Just show your unique QR code at the entrance."
    },
    {
        icon: ShieldCheck,
        title: "Secure Platform",
        description: "Your data and payments are protected with enterprise-grade security."
    }
];

export default function FeatureSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Eventive?</h2>
                    <p className="text-foreground-secondary">
                        Everything you need to experience events like never before.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card p-6 hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
