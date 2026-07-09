import type { MetadataRoute } from "next";

import { featuredProductsData, newLaunchesData, projectsData, servicesData } from "@/lib/data";
import { getPublicCollectionData } from "@/lib/public-db-server";
import { getSiteUrl, publicTopLevelRoutes } from "@/lib/site";

export const dynamic = "force-static";

type RouteEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

type BlogEntry = {
  id: string;
  updatedAt?: number | string;
  createdAt?: number | string;
};

type ResourceEntry = {
  id: string | number;
  updatedAt?: number | string;
  createdAt?: number | string;
};

// Routes that should NOT be indexed in the sitemap
const excludedRoutes = ["/login"];

// Priority map for important pages
const routePriorityMap: Record<string, { priority: number; changeFrequency: RouteEntry["changeFrequency"] }> = {
  "": { priority: 1.0, changeFrequency: "weekly" },
  "/services": { priority: 0.9, changeFrequency: "weekly" },
  "/projects": { priority: 0.9, changeFrequency: "weekly" },
  "/products": { priority: 0.8, changeFrequency: "weekly" },
  "/about": { priority: 0.8, changeFrequency: "monthly" },
  "/contact": { priority: 0.8, changeFrequency: "monthly" },
  "/blogs": { priority: 0.7, changeFrequency: "daily" },
  "/process": { priority: 0.6, changeFrequency: "monthly" },
  "/careers": { priority: 0.6, changeFrequency: "weekly" },
  "/stakeholder/contractor": { priority: 0.5, changeFrequency: "monthly" },
  "/stakeholder/vendor": { priority: 0.5, changeFrequency: "monthly" },
};

function buildRoute(
  pathname: string,
  siteUrl: URL,
  lastModified?: string | Date,
  changeFrequency?: RouteEntry["changeFrequency"],
  priority?: number,
): RouteEntry {
  return {
    url: new URL(pathname, siteUrl).toString(),
    lastModified,
    changeFrequency,
    priority,
  };
}

function toDate(value?: number | string): Date | undefined {
  if (typeof value === "number") {
    return new Date(value);
  }

  if (typeof value === "string") {
    return new Date(value);
  }

  return undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes = publicTopLevelRoutes
    .filter((pathname) => !excludedRoutes.includes(pathname))
    .map((pathname) => {
      const config = routePriorityMap[pathname];
      return buildRoute(
        pathname,
        siteUrl,
        now,
        config?.changeFrequency || "monthly",
        config?.priority || 0.5,
      );
    });

  const hardcodedProjectIds = [
    ...projectsData.ongoing.map((project) => String(project.id)),
    ...projectsData.completed.map((project) => String(project.id)),
    ...projectsData.homeProjects.map((project) => String(project.id)),
  ];

  const hardcodedRoutes = [
    ...servicesData.map((service) => buildRoute(`/services/${service.id}`, siteUrl, now, "weekly", 0.8)),
    ...featuredProductsData.map((product) => buildRoute(`/products/${product.id}`, siteUrl, now, "monthly", 0.7)),
    ...newLaunchesData.map((launch) => buildRoute(`/new-launches/${launch.id}`, siteUrl, now, "monthly", 0.6)),
    ...Array.from(new Set(hardcodedProjectIds)).map((id) => buildRoute(`/projects/${id}`, siteUrl, now, "monthly", 0.6)),
  ];

  const [blogs, services, products, projects, launches] = await Promise.all([
    getPublicCollectionData<BlogEntry>("blogs").catch(() => []),
    getPublicCollectionData<ResourceEntry>("services").catch(() => []),
    getPublicCollectionData<ResourceEntry>("products").catch(() => []),
    getPublicCollectionData<ResourceEntry>("projects").catch(() => []),
    getPublicCollectionData<ResourceEntry>("new-launches").catch(() => []),
  ]);

  const dynamicRoutes = [
    ...blogs.map((post) => buildRoute(`/blogs/${post.id}`, siteUrl, toDate(post.updatedAt ?? post.createdAt), "weekly", 0.7)),
    ...services.map((service) => buildRoute(`/services/${service.id}`, siteUrl, toDate(service.updatedAt ?? service.createdAt), "weekly", 0.8)),
    ...products.map((product) => buildRoute(`/products/${product.id}`, siteUrl, toDate(product.updatedAt ?? product.createdAt), "monthly", 0.7)),
    ...projects.map((project) => buildRoute(`/projects/${project.id}`, siteUrl, toDate(project.updatedAt ?? project.createdAt), "monthly", 0.6)),
    ...launches.map((launch) => buildRoute(`/new-launches/${launch.id}`, siteUrl, toDate(launch.updatedAt ?? launch.createdAt), "monthly", 0.6)),
  ];

  const routes = [...staticRoutes, ...hardcodedRoutes, ...dynamicRoutes];
  const uniqueRoutes = new Map<string, RouteEntry>();

  routes.forEach((route) => {
    const existing = uniqueRoutes.get(route.url);

    if (!existing || (route.lastModified && (!existing.lastModified || route.lastModified > existing.lastModified))) {
      uniqueRoutes.set(route.url, route);
    }
  });

  return Array.from(uniqueRoutes.values());
}