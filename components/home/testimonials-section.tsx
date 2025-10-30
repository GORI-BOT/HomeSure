import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Quick response and excellent service! My refrigerator was fixed the same day I called. Highly recommend!",
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Great prices on appliances and the delivery was free. The team was professional and helpful.",
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      text: "The technician was knowledgeable and fixed my washing machine in under an hour. Very satisfied!",
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground">Don't just take our word for it</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
