import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/website-design", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/social-media", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/growth-strategy", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/digital-products", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
