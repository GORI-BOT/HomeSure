import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  const whatsappNumber = "+263717064945";
  const whatsappMessage = encodeURIComponent(
    "Hi, I need help with my appliance repair/purchase."
  );

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Need Help? We're Here for You!
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Contact us today for fast appliance repair or to shop our selection of
          quality appliances.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${+263717064945}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
          </a>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
