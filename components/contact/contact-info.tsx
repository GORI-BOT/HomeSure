import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactInfo() {
  const whatsappNumber = "1234567890";

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <a
                href="tel:+263717064945"
                className="text-muted-foreground hover:text-primary"
              >
                (263) 717064945
              </a>
              <p className="text-sm text-muted-foreground mt-1">
                24/7 Emergency Service
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <a
                href="mailto:info@applifixpro.com"
                className="text-muted-foreground hover:text-primary"
              >
                info@applifixpro.com
              </a>
              <p className="text-sm text-muted-foreground mt-1">
                We'll respond within 24 hours
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Address</h3>
              <p className="text-muted-foreground">123 Service Street</p>
              <p className="text-muted-foreground">City, State 12345</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Business Hours</h3>
              <p className="text-muted-foreground">
                Monday - Friday: 8am - 8pm
              </p>
              <p className="text-muted-foreground">Saturday: 9am - 6pm</p>
              <p className="text-muted-foreground">Sunday: 10am - 4pm</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <a
        href={`https://wa.me/${+263717064945}?text=${encodeURIComponent(
          "Hi, I have a question about your services."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button className="w-full" size="lg">
          <MessageCircle className="mr-2 h-5 w-5" />
          Chat on WhatsApp
        </Button>
      </a>
    </div>
  );
}
