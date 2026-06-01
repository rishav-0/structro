import { HomeClient } from "./home-client";
import { getPublicCollectionData } from "@/lib/public-db-server";

export const revalidate = 3600; // Cache page static response for 1 hour

export default async function Page() {
  const [dbServices, dbProducts, dbProjects, dbLaunches] = await Promise.all([
    getPublicCollectionData<any>("services").catch(() => []),
    getPublicCollectionData<any>("products").catch(() => []),
    getPublicCollectionData<any>("projects").catch(() => []),
    getPublicCollectionData<any>("new-launches").catch(() => []),
  ]);

  const services = dbServices.slice(0, 3).map((s: any) => ({
    id: s.id,
    title: s.title || "",
    description: s.description || "",
    homeDescription: s.homeDescription || null,
    image: s.image || "",
    alt: s.alt || "",
  }));

  const products = dbProducts.slice(0, 4).map((p: any) => ({
    id: p.id,
    title: p.title || "",
    specs: p.specs || "",
    image: p.image || "",
  }));

  const projects = dbProjects
    .filter((project: any) => project.src)
    .slice(0, 6)
    .map((project: any) => ({
      id: project.id,
      src: project.src,
      alt: project.alt || "",
      isVideo: !!project.isVideo,
      className: project.className || "md:col-span-2",
    }));

  const launches = dbLaunches.map((l: any) => ({
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
