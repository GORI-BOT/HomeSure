import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://applifixpro.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account/", "/auth/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
