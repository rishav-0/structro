import { HomeClient } from "./home-client";
import { getPublicCollectionData } from "@/lib/public-db-server";

export default async function Page() {
  const [dbServices, dbProducts, dbProjects, dbLaunches] = await Promise.all([
    getPublicCollectionData<any>("services").catch(() => []),
    getPublicCollectionData<any>("products").catch(() => []),
    getPublicCollectionData<any>("projects").catch(() => []),
    getPublicCollectionData<any>("new-launches").catch(() => []),
  ]);

  const services = dbServices.slice(0, 3);
  const products = dbProducts.slice(0, 4);
  const projects = dbProjects
    .filter((project: any) => project.src)
    .slice(0, 6)
    .map((project: any) => ({ ...project, className: project.className || "md:col-span-2" }));
  const launches = dbLaunches;

  return (
    <HomeClient 
      initialServices={services}
      initialProducts={products}
      initialProjects={projects}
      initialLaunches={launches}
    />
  );
}
