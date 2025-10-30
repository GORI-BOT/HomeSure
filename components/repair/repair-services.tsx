import { Card, CardContent } from "@/components/ui/card";
import {
  Refrigerator,
  WashingMachine,
  Microwave,
  UtensilsCrossed,
  Droplets,
  Snowflake,
} from "lucide-react";

export function RepairServices() {
  const services = [
    {
      icon: Refrigerator,
      title: "Refrigerator Repair",
      description: "Not cooling, ice maker issues, water leaks, and more",
      image: "/modern-refrigerator-repair-service.jpg",
    },
    {
      icon: WashingMachine,
      title: "Washer & Dryer Repair",
      description: "Won't spin, drain issues, heating problems, noise",
      image: "/washing-machine-and-dryer-repair.jpg",
    },
    {
      icon: UtensilsCrossed,
      title: "Oven & Range Repair",
      description: "Not heating, burner issues, temperature problems",
      image: "/oven-and-stove-repair-service.jpg",
    },
    {
      icon: Droplets,
      title: "Dishwasher Repair",
      description: "Won't drain, not cleaning, leaking, door issues",
      image: "/dishwasher-repair-technician.jpg",
    },
    {
      icon: Microwave,
      title: "Microwave Repair",
      description: "Not heating, turntable issues, door problems",
      image: "/microwave-oven-repair.jpg",
    },
    {
      icon: Snowflake,
      title: "Freezer Repair",
      description: "Temperature issues, frost buildup, not freezing",
      image: "/freezer-repair-service.jpg",
    },
    {
      icon: Refrigerator,
      title: "Ice Maker Repair",
      description: "Ice production issues, water line problems, freezing",
      image: "/modern-refrigerator-repair-service.jpg",
    },
    {
      icon: WashingMachine,
      title: "Garbage Disposal Repair",
      description: "Clogging, grinding issues, leaks, motor problems",
      image: "/washing-machine-and-dryer-repair.jpg",
    },
    {
      icon: UtensilsCrossed,
      title: "Cooktop Repair",
      description: "Electric and gas cooktop issues, burner problems",
      image: "/oven-and-stove-repair-service.jpg",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Appliances We Repair
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Expert repair services for all major appliance types
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="aspect-video relative bg-muted overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="block w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex p-2 rounded-lg bg-white/90 backdrop-blur-sm">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
