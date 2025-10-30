import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Wrench,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">
                Home<span className="text-primary">Sure</span> Appliances
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted partner for appliance repair and sales. Quality
              service, competitive prices.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/repair"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Repair Services
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Shop Appliances
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Refrigerator Repair</li>
              <li>Washing Machine Repair</li>
              <li>Dryer Repair</li>
              <li>Oven & Range Repair</li>
              <li>Dishwasher Repair</li>
              <li>Appliance Sales</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+1234567890"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    (263) 717064945
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:info@applifixpro.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    info@homesure.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Service Street, City, State 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} HomeSure Appliances. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
