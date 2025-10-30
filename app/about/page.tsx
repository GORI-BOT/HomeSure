import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Clock, ThumbsUp } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | AppliFix Pro",
  description:
    "Learn about AppliFix Pro - your trusted partner for appliance repair and sales. Over 15 years of experience serving homeowners.",
}

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: Clock, label: "Years Experience", value: "15+" },
    { icon: Award, label: "Certified Technicians", value: "25+" },
    { icon: ThumbsUp, label: "Customer Satisfaction", value: "98%" },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative h-[90vh] overflow-hidden">
        {/* Animated Background Slider */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
          <div className="animate-slide-slow absolute inset-0 flex">
            <div className="min-w-full h-full relative">
              <img
                src="/professional-appliance-repair-technician-working-o.jpg"
                alt="Professional Technician"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-full h-full relative">
              <img
                src="/team-of-appliance-repair-experts-in-uniform.jpg"
                alt="Expert Team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-full h-full relative">
              <img
                src="/modern-appliance-service-center-with-tools-and-equ.jpg"
                alt="Service Center"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Hero Content with Glassmorphism */}
        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-white drop-shadow-lg text-balance">
                About AppliFix Pro
              </h1>
              {/* Glassmorphism Card */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 lg:p-12 shadow-2xl backdrop-blur-xl">
                <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed text-pretty">
                  Your trusted partner for appliance repair and sales since 2009
                </p>
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

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow hover:scale-105 transition-transform">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2009, AppliFix Pro started with a simple mission: to provide honest, reliable appliance
                repair services at fair prices. What began as a small family business has grown into one of the most
                trusted appliance service providers in the region.
              </p>
              <p>
                Over the years, we've expanded our services to include not just repairs, but also sales of quality
                appliances from top brands. We believe in offering our customers a complete solution - whether you need
                a quick repair or a brand new appliance, we're here to help.
              </p>
              <p>
                Our team of certified technicians brings decades of combined experience, and we're committed to staying
                up-to-date with the latest appliance technologies. We take pride in our work and stand behind every
                repair with our 90-day warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Values</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Honesty & Transparency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in upfront pricing with no hidden fees. You'll always know what you're paying for before we
                  start any work.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Quality Service</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every repair is performed to the highest standards by certified technicians using quality parts.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Customer Satisfaction</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your satisfaction is our priority. We're not happy until you're happy with our service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
