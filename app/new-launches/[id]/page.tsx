import { newLaunchesData } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Tag, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function NewLaunchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const launch = newLaunchesData.find((item) => item.id === id);

  if (!launch) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-gray-900 flex items-center">
        <Image 
          src={launch.image} 
          alt={launch.title} 
          fill 
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
        
        <Container className="relative z-10">
        
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-accent text-white font-bold px-4 py-1.5 uppercase tracking-wider rounded-md text-sm shadow-lg flex items-center gap-2">
              <Tag className="w-4 h-4" /> {launch.type}
            </span>
            <span className="text-sm font-bold text-gray-300 uppercase flex items-center gap-2 bg-gray-800/50 px-4 py-1.5 rounded-md backdrop-blur-sm">
              <MapPin className="w-4 h-4" /> {launch.region}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl leading-tight">
            {launch.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            {launch.description}
          </p>
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
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
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
