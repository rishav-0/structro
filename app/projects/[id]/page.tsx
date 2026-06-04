import { getPublicCollectionData } from "@/lib/public-db-server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Calendar, Scale, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ImageGallery } from "@/components/image-gallery";

interface GalleryImage {
  url: string;
  alt?: string;
}

interface Project {
  id: string | number;
  title: string;
  location: string;
  category?: string;
  serviceId?: string;
  src: string;
  alt: string;
  images?: GalleryImage[];
  isVideo?: boolean;
  client?: string;
  scope?: string;
  quantity?: string;
  period?: string;
  description?: string;
  visible?: boolean;
}

function buildProjectNarrative(project: Project) {
  const details = [
    project.client ? `for ${project.client}` : null,
    project.location ? `at ${project.location}` : null,
    project.period ? `during ${project.period}` : null,
  ].filter(Boolean);

  const opening = project.scope || "This project combined structural planning, fabrication, and execution support.";
  const context = details.length > 0 ? `${opening} The work was delivered ${details.join(" ")}.` : opening;
  const scale = project.quantity ? ` The execution scale for this package was ${project.quantity}.` : "";

  return `${context}${scale}`;
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let project: Project | null = null;
  let serviceTitle = "";
  
  try {
    const dbProjects = (await getPublicCollectionData("projects")) as Project[];
    project = dbProjects.find((projectItem) => String(projectItem.id) === id) || null;

    if (project && project.serviceId) {
      const serviceId = project.serviceId;
      const dbServices = await getPublicCollectionData("services") as { id: string; title: string }[];
      const matchedService = dbServices.find((s) => s.id === serviceId);
      if (matchedService) {
        serviceTitle = matchedService.title;
      }
    }
  } catch (e) {
    console.error("Error fetching from DB:", e);
  }

  if (!project || project.visible === false) return notFound();

  const projectNarrative = buildProjectNarrative(project);
  const displayCategory = serviceTitle || project.category;

  return (
    <div className="bg-white">
      <article className="border-b border-gray-200 bg-gray-50 pt-28 pb-12 md:pt-32 md:pb-16">
        <Container>
          <ImageGallery
            mainImage={project.src}
            mainAlt={project.alt || "Project Image"}
            images={project.images}
            priority
            containerClassName="relative aspect-16/8 overflow-hidden rounded-lg bg-transparent md:aspect-16/7"
          />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              {displayCategory && (
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  {displayCategory}
                </span>
              )}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                {project.title || project.alt}
              </h1>

              <p className="mt-6 max-w-2xl border-l-2 border-gray-300 pl-6 text-lg leading-relaxed text-gray-600 md:text-xl">
                {project.description || project.scope || "Details for this project are currently being finalized."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-600">
                {project.location ? (
                  <span className="rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold">
                    {project.location}
                  </span>
                ) : null}
                {project.client ? (
                  <span className="rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold">
                    {project.client}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.location ? (
                  <ProjectStat label="Location" value={project.location} icon={<MapPin className="h-5 w-5" />} />
                ) : null}
                {project.client ? (
                  <ProjectStat label="Client" value={project.client} icon={<Building className="h-5 w-5" />} />
                ) : null}
                {project.period ? (
                  <ProjectStat label="Period" value={project.period} icon={<Calendar className="h-5 w-5" />} />
                ) : null}
                {project.quantity ? (
                  <ProjectStat label="Scale" value={project.quantity} icon={<Scale className="h-5 w-5" />} />
                ) : null}
              </div>

              <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-gray-900">Enquire About This Project</h2>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  Planning a similar bridge, fabrication, or site execution package? Send your project brief and Structro will get back with the right scope direction.
                </p>
                <Link href="/contact" className="block">
                  <Button variant="red" size="lg" className="h-14 w-full rounded-xl text-base font-bold">
                    Send Project Enquiry
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </section>
            </div>
          </div>
        </Container>
      </article>

      <article className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <section className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                  <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-500">Project Summary</h2>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {projectNarrative}
                  </p>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-500">Specifications</h2>
                  <div className="space-y-6">
                    {project.location && (
                      <DetailItem icon={<MapPin className="h-5 w-5" />} label="Location" value={project.location} />
                    )}
                    {project.client && (
                      <DetailItem icon={<Building className="h-5 w-5" />} label="Client" value={project.client} />
                    )}
                    {project.period && (
                      <DetailItem icon={<Calendar className="h-5 w-5" />} label="Period" value={project.period} />
                    )}
                    {project.quantity && (
                      <DetailItem icon={<Scale className="h-5 w-5" />} label="Scale" value={project.quantity} />
                    )}
                  </div>
                </section>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {project.description && (
                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
                  <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-400">Project Description</h2>
                  <div className="prose prose-slate prose-lg max-w-none">
                    <p className="whitespace-pre-line leading-relaxed text-gray-700">
                      {project.description}
                    </p>
                  </div>
                </section>
              )}

              <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
                <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-400">Project Scope</h2>
                <div className="prose prose-slate prose-lg max-w-none">
                  <p className="whitespace-pre-line leading-relaxed text-gray-700">
                    {project.scope || "Details for this project's scope are currently being finalized."}
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    {projectNarrative}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </article>
    </div>
  );
}

// Reusable Sub-component for clarity
function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-primary mt-1">{icon}</div>
      <div>
        <dt className="text-xs font-semibold text-gray-500 uppercase">{label}</dt>
        <dd className="text-gray-900 font-medium text-base mt-0.5">{value}</dd>
      </div>
    </div>
  );
}

function ProjectStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 text-primary">{icon}</div>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-900">{value}</p>
    </div>
  );
}