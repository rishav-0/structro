import { HomeClient } from "./home-client";
import { getPublicCollectionData } from "@/lib/public-db-server";

export const revalidate = 3600; // Cache page static response for 1 hour

interface ServiceInfo {
  id: string;
  title?: string;
  description?: string;
  homeDescription?: string | null;
  image?: string;
  alt?: string;
}

interface ProductInfo {
  id: string;
  title?: string;
  specs?: string;
  image?: string;
}

interface ProjectInfo {
  id: string;
  src?: string;
  alt?: string;
  isVideo?: boolean;
  visible?: boolean;
  className?: string;
}

interface LaunchInfo {
  id: string;
  image?: string;
  title?: string;
  type?: string;
  description?: string;
  region?: string;
}

export default async function Page() {
  const [dbServices, dbProducts, dbProjects, dbLaunches] = await Promise.all([
    getPublicCollectionData<ServiceInfo>("services").catch(() => []),
    getPublicCollectionData<ProductInfo>("products").catch(() => []),
    getPublicCollectionData<ProjectInfo>("projects").catch(() => []),
    getPublicCollectionData<LaunchInfo>("new-launches").catch(() => []),
  ]);

  const services = dbServices.slice(0, 3).map((s) => ({
    id: s.id,
    title: s.title || "",
    description: s.description || "",
    homeDescription: s.homeDescription || undefined,
    image: s.image || "",
    alt: s.alt || "",
  }));

  const products = dbProducts.slice(0, 4).map((p) => ({
    id: p.id,
    title: p.title || "",
    specs: p.specs || "",
    image: p.image || "",
  }));

  const projects = dbProjects
    .filter((project) => project.src && project.visible !== false)
    .slice(0, 6)
    .map((project) => ({
      id: project.id,
      src: project.src || "",
      alt: project.alt || "",
      isVideo: !!project.isVideo,
      className: project.className || "md:col-span-2",
    }));

  const launches = dbLaunches.map((l) => ({
    id: l.id,
    image: l.image || "",
    title: l.title || "",
    type: l.type || "",
    description: l.description || "",
    region: l.region || "",
  }));

  return (
    <HomeClient 
      initialServices={services}
      initialProducts={products}
      initialProjects={projects}
      initialLaunches={launches}
    />
  );
}
