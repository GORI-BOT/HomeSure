"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/contemporary-kitchen-with-built-in-appliances-and-.jpg",
    "/professional-appliance-repair-technician-working-o.jpg",
    "/modern-kitchen-with-stainless-steel-appliances-ref.jpg ",
    "/luxury-home-appliances-showroom-with-washing-machi.jpg      ",
    "/team-of-appliance-repair-experts-in-uniform.jpg",
    "/modern-appliance-service-center-with-tools-and-equ.jpg",
    "/professional-appliance-repair-service-technician-f.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide || "/placeholder.svg"}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Subtle overlay for text readability without obscuring image */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-white text-balance leading-tight drop-shadow-lg">
              Expert Appliance Repair & Quality Sales
            </h1>
            <p className="text-lg lg:text-xl text-white/90 text-pretty leading-relaxed drop-shadow-md">
              Fast, reliable appliance repair services and top-brand appliances
              at competitive prices. Same-day service available for most
              repairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/request-repair">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Repair
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/20 text-white border-white hover:bg-white/30"
                >
                  Shop Appliances
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-white">
                <Phone className="h-5 w-5" />
                <div>
                  <p className="text-sm text-white/80">
                    24/7 Emergency Service
                  </p>
                  <a
                    href="tel:+1234567890"
                    className="text-lg font-semibold text-white"
                  >
                    (263) 717064945
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
