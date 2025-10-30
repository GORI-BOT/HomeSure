import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact Us | AppliFix Pro",
  description:
    "Get in touch with AppliFix Pro for appliance repair services or sales inquiries. Contact us via phone, email, or WhatsApp.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We're here to help. Reach out via phone, email, or WhatsApp.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
