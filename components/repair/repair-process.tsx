export function RepairProcess() {
  const steps = [
    {
      number: "1",
      title: "Request Service",
      description: "Submit a repair request via our form, WhatsApp, or email",
    },
    {
      number: "2",
      title: "Get Confirmation",
      description: "We'll contact you within 2 hours to confirm your appointment",
    },
    {
      number: "3",
      title: "Expert Diagnosis",
      description: "Our certified technician will diagnose the issue",
    },
    {
      number: "4",
      title: "Quick Repair",
      description: "Most repairs completed the same day with a 90-day warranty",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Simple, fast, and hassle-free repair process</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
