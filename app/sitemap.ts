import type { MetadataRoute } from "next";

import { featuredProductsData, newLaunchesData, projectsData, servicesData } from "@/lib/data";
import { getPublicCollectionData } from "@/lib/public-db-server";
import { getSiteUrl, publicTopLevelRoutes } from "@/lib/site";

type RouteEntry = {
  url: string;
  lastModified?: string | Date;
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

function buildRoute(pathname: string, siteUrl: URL, lastModified?: string | Date): RouteEntry {
  return {
    url: new URL(pathname, siteUrl).toString(),
    lastModified,
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

  const staticRoutes = publicTopLevelRoutes.map((pathname) => buildRoute(pathname, siteUrl, now));

  const hardcodedProjectIds = [
    ...projectsData.ongoing.map((project) => String(project.id)),
    ...projectsData.completed.map((project) => String(project.id)),
    ...projectsData.homeProjects.map((project) => String(project.id)),
  ];

  const hardcodedRoutes = [
    ...servicesData.map((service) => buildRoute(`/services/${service.id}`, siteUrl, now)),
    ...featuredProductsData.map((product) => buildRoute(`/products/${product.id}`, siteUrl, now)),
    ...newLaunchesData.map((launch) => buildRoute(`/new-launches/${launch.id}`, siteUrl, now)),
    ...Array.from(new Set(hardcodedProjectIds)).map((id) => buildRoute(`/projects/${id}`, siteUrl, now)),
  ];

  const [blogs, services, products, projects, launches] = await Promise.all([
    getPublicCollectionData<BlogEntry>("blogs").catch(() => []),
    getPublicCollectionData<ResourceEntry>("services").catch(() => []),
    getPublicCollectionData<ResourceEntry>("products").catch(() => []),
    getPublicCollectionData<ResourceEntry>("projects").catch(() => []),
    getPublicCollectionData<ResourceEntry>("new-launches").catch(() => []),
  ]);

  const dynamicRoutes = [
    ...blogs.map((post) => buildRoute(`/blogs/${post.id}`, siteUrl, toDate(post.updatedAt ?? post.createdAt))),
    ...services.map((service) => buildRoute(`/services/${service.id}`, siteUrl, toDate(service.updatedAt ?? service.createdAt))),
    ...products.map((product) => buildRoute(`/products/${product.id}`, siteUrl, toDate(product.updatedAt ?? product.createdAt))),
    ...projects.map((project) => buildRoute(`/projects/${project.id}`, siteUrl, toDate(project.updatedAt ?? project.createdAt))),
    ...launches.map((launch) => buildRoute(`/new-launches/${launch.id}`, siteUrl, toDate(launch.updatedAt ?? launch.createdAt))),
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