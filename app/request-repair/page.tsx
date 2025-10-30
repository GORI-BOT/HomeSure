import type { Metadata } from "next";
import { RepairRequestForm } from "@/components/repair/repair-request-form";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Shield, Wrench, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Request Appliance Repair | Fast & Reliable Service",
  description:
    "Request professional appliance repair service. Fill out our form and choose to contact us via WhatsApp or email. Same-day service available for emergency repairs.",
  keywords:
    "request appliance repair, schedule repair, appliance service request, emergency repair, same-day repair",
};

export default function RequestRepairPage() {
  const benefits = [
    {
      icon: Clock,
      title: "Fast Response",
      description: "We respond to all requests within 2 hours",
    },
    {
      icon: Shield,
      title: "90-Day Warranty",
      description: "All repairs backed by our warranty",
    },
    {
      icon: Wrench,
      title: "Expert Technicians",
      description: "Certified professionals with years of experience",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Emergency service available anytime",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              Request a Repair
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-pretty">
              Fill out the form below and choose how to send your request. Our
              team will get back to you shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all hover:scale-105"
              >
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <RepairRequestForm />
          </div>
        </div>
      </section>
    </div>
  );
}
