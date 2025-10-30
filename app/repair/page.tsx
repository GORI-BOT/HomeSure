import type { Metadata } from "next";
import { RepairServices } from "@/components/repair/repair-services";
import { RepairProcess } from "@/components/repair/repair-process";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Appliance Repair Services | Same-Day Service Available",
  description:
    "Professional appliance repair for refrigerators, washers, dryers, ovens, dishwashers & more. Same-day service available. Request repair via WhatsApp or email.",
  keywords:
    "appliance repair, refrigerator repair, washing machine repair, dryer repair, oven repair, dishwasher repair, same-day repair, emergency appliance repair",
};

export default function RepairPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/30 to-accent/40 z-10" />
          <img
            src="/professional-appliance-repair-service-technician-f.jpg"
            alt="Professional Appliance Repair"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 drop-shadow-2xl text-balance">
                Professional Appliance Repair Services
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 drop-shadow-xl leading-relaxed text-pretty">
                Fast, reliable repairs for all major appliance brands. Same-day
                service available.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                <div className="glass-strong rounded-lg px-4 md:px-6 py-2 md:py-3 shadow-lg">
                  <p className="text-xs md:text-sm font-semibold">
                    Same-Day Service
                  </p>
                </div>
                <div className="glass-strong rounded-lg px-4 md:px-6 py-2 md:py-3 shadow-lg">
                  <p className="text-xs md:text-sm font-semibold">
                    Certified Technicians
                  </p>
                </div>
                <div className="glass-strong rounded-lg px-4 md:px-6 py-2 md:py-3 shadow-lg">
                  <p className="text-xs md:text-sm font-semibold">
                    90-Day Warranty
                  </p>
                </div>
                <div className="glass-strong rounded-lg px-4 md:px-6 py-2 md:py-3 shadow-lg">
                  <p className="text-xs md:text-sm font-semibold">
                    24/7 Emergency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <RepairServices />
      <RepairProcess />

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Your Appliance Fixed?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Request a repair service now and our team will get back to you
            within 2 hours
          </p>
          <Link href="/request-repair">
            <Button size="lg" className="font-semibold px-8">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
