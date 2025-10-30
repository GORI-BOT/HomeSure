import { Wrench, ShoppingBag, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ServicesSection() {
  const services = [
    {
      icon: Wrench,
      title: "Expert Repairs",
      description:
        "Certified technicians for all major appliance brands. Fast, reliable service you can trust.",
    },
    {
      icon: ShoppingBag,
      title: "Quality Appliances",
      description:
        "Shop top brands at competitive prices. Wide selection of refrigerators, washers, dryers & more.",
    },
    {
      icon: Clock,
      title: "Same-Day Service",
      description:
        "Emergency repairs available. Most repairs completed the same day you call.",
    },
    {
      icon: Shield,
      title: "Warranty Protection",
      description:
        "All repairs backed by our 90-day warranty. New appliances come with manufacturer warranties.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose HomeSure Appliances?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine expert repair services with quality appliance sales to be
            your one-stop solution.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-colors"
            >
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
