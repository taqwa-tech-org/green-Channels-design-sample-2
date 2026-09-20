import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const routes = ["", "/company", "/products", "/services", "/quality", "/sustainability", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/contact" ? 0.9 : 0.7,
  }));
}
