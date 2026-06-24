import type { Metadata } from 'next';
import { adminDb } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MapPin, Tag, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface LaunchSpecification {
  label: string;
  value: string;
}

interface NewLaunch {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  type: string;
  region: string;
  features?: string[];
  specifications?: LaunchSpecification[];
  status?: "active" | "inactive";
}

async function getLaunch(id: string): Promise<NewLaunch | null> {
  try {
    const snapshot = await adminDb.collection("new-launches").get();
    const launches = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as NewLaunch));
    const launch = launches.find((l) => {
      const dbId = String(l.id).trim().toLowerCase();
      const searchId = id.trim().toLowerCase();
      return dbId === searchId;
    });
    return launch && launch.status !== "inactive" ? launch : null;
  } catch (e) {
    console.error("Error fetching launch project:", e);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const launch = await getLaunch(id);
  
  if (!launch) {
    return { title: 'Project Not Found | Structro Infratech' };
  }
  
  return {
    title: `${launch.title} | Structro Infratech`,
    description: launch.description,
  };
}

export default async function NewLaunchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const launch = await getLaunch(id);

  if (!launch) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
              <div className="relative aspect-4/3 min-h-80 w-full">
                <Image
                  src={launch.image}
                  alt={launch.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/35 via-transparent to-transparent" />
              </div>
            </div>

            <div>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-2 rounded-md bg-accent px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg">
                  <Tag className="w-4 h-4" /> {launch.type}
                </span>
                <span className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-1.5 text-sm font-bold uppercase text-gray-700 backdrop-blur-sm">
                  <MapPin className="w-4 h-4" /> {launch.region}
                </span>
              </div>

              <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                {launch.title}
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                {launch.description}
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About The Project</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              {launch.longDescription || launch.description}
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Engineering Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {launch.features?.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-gray-800 font-medium text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sticky top-32">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Specifications</h3>
              <div className="space-y-6">
                {launch.specifications?.map((spec, idx) => (
                  <div key={idx} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider block mb-2">{spec.label}</span>
                    <span className="text-lg font-bold text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4 text-center">Interested in a similar project?</p>
                <Link href="/contact" className="block w-full">
                  <Button variant="saffron" size="lg" className="w-full text-lg h-14">
                    Contact Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
