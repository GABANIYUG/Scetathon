import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://scetathon.scet.ac.in";
  const lastModified = new Date();

  const routes = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/challenges", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/schedule", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/updates", changeFrequency: "hourly" as const, priority: 0.9 },
    { path: "/experience", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/register", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/login", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/signup", changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

