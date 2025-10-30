import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title:
    "HomeSure Appliances - Expert Appliance Repair & Sales | Same-Day Service",
  description:
    "Professional appliance repair services and quality appliance sales. We fix refrigerators, washers, dryers, ovens, dishwashers & more. Same-day service available. Shop top brands at competitive prices.",
  keywords:
    "appliance repair, appliance sales, refrigerator repair, washing machine repair, dryer repair, oven repair, dishwasher repair, appliance store, same-day repair, emergency appliance repair",
  authors: [{ name: "HomeSure Appliance" }],
  openGraph: {
    title: "HomeSure Appliances - Expert Appliance Repair & Sales",
    description:
      "Professional appliance repair services and quality appliance sales. Same-day service available.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code-here",
  },
  alternates: {
    canonical: "https://applifixpro.com",
  },
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-XXXXXXXXXX');
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "HomeSure Appliances",
              image: "https://applifixpro.com/logo.png",
              "@id": "https://applifixpro.com",
              url: "https://applifixpro.com",
              telephone: "+263717064945",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Main Street",
                addressLocality: "Your City",
                addressRegion: "State",
                postalCode: "12345",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.7128,
                longitude: -74.006,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              sameAs: [
                "https://www.facebook.com/applifixpro",
                "https://www.instagram.com/applifixpro",
                "https://twitter.com/applifixpro",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "500",
              },
            }),
          }}
        />
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
