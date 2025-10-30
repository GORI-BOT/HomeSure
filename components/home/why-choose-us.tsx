import { CheckCircle } from "lucide-react"

export function WhyChooseUs() {
  const benefits = [
    "Certified & experienced technicians",
    "Same-day service available",
    "90-day warranty on all repairs",
    "Competitive pricing with no hidden fees",
    "Wide selection of top appliance brands",
    "Free delivery on appliance purchases",
    "Emergency repair services",
    "Customer satisfaction guaranteed",
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/appliance-repair-technician.png"
              alt="Professional technician repairing appliance"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Trusted by Thousands of Homeowners</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With over 15 years of experience, we've built our reputation on quality service, honest pricing, and
              customer satisfaction. Whether you need a quick repair or a brand new appliance, we're here to help.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
