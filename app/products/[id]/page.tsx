import type { Metadata } from 'next';
import { getPublicCollectionData } from "@/lib/public-db-server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Ruler, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { ImageGallery } from "@/components/image-gallery";
import { BackButton } from "@/components/ui/back-button";

interface GalleryImage {
  url: string;
  alt?: string;
}

interface Product {
  id: string;
  title: string;
  specs: string;
  description: string;
  features: string[];
  image: string;
  images?: GalleryImage[];
  subtitle?: string;
  materialGrade?: string;
  tags?: string[];
  badge?: string;
  imageAlt?: string;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const dbProducts = await getPublicCollectionData<Product>("products");
    return dbProducts.find((productItem) => {
      const dbId = String(productItem.id).trim().toLowerCase();
      const searchId = id.trim().toLowerCase();
      return dbId === searchId;
    }) || null;
  } catch (e) {
    console.error("Error fetching product:", e);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) {
    return { title: 'Product Not Found | Structro Infratech' };
  }
  
  return {
    title: `${product.title} | Structro Infratech`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-white pb-20 text-gray-900">
      {/* 1. Industrial Hero Section */}
      <section className="border-b border-gray-200 bg-gray-50 py-12 pt-32 md:py-16 md:pt-36">
        <Container>
          <BackButton fallbackUrl="/products" text="Back to Products" className="mb-4" />
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-red-600" />
                <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase">
                  {product.badge || "Industrial Grade"}
                </span>
              </div>
              <h1 className="mb-4 text-5xl font-black leading-none tracking-tighter text-gray-900 md:text-7xl">
                {product.title}
              </h1>
              <p className="max-w-xl border-l-2 border-gray-300 pl-6 text-xl text-gray-600">
                {product.subtitle || (
                  <>
                    Engineered for resilience. Built with precision-grade materials to meet{" "}
                    <span className="font-semibold text-gray-900">{product.specs}</span> structural requirements.
                  </>
                )}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-600">
                {product.tags && product.tags.length > 0 ? (
                  product.tags.map((tag, idx) => (
                    <span key={idx} className="rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold">
                      {tag}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold">
                      Built for industrial use
                    </span>
                    <span className="rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold">
                      Durable steel construction
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <ImageGallery
                mainImage={product.image}
                mainAlt={product.title}
                mainImageAlt={product.imageAlt}
                images={product.images}
                priority
                containerClassName="relative aspect-5/4 overflow-hidden rounded-lg bg-transparent"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Technical Content Section */}
      <Container className="pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Main Specs & Overview */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview with "Blueprint" feel */}
            <div>
              <h2 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                <ChevronRight className="w-4 h-4 text-red-600" /> 01. Overview
              </h2>
              <p className="text-xl font-light leading-relaxed text-gray-600">
                {product.description || `The ${product.title} represents the pinnacle of heavy engineering. Optimized for durability in extreme conditions, this solution integrates modular design with high-tensile structural integrity.`}
              </p>
            </div>

            {/* Features as Technical Cards */}
            <div>
              <h2 className="mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                <ChevronRight className="w-4 h-4 text-red-600" /> 02. Core Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features?.map((feature, idx) => (
                  <div key={idx} className="group rounded-xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:border-red-300 hover:bg-white hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-white p-2 text-gray-600 shadow-sm transition-colors group-hover:text-red-600">
                        <Shield className="w-5 h-5" />
                      </div>
                      <span className="font-medium tracking-tight text-gray-800">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar: Action & Data */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              
              {/* Data Card */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="p-1 bg-red-600" /> {/* Top accent line */}
                <div className="p-8">
                  <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-500">Technical Specifications</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Ruler className="w-4 h-4" />
                        <span className="text-sm">Standard Size</span>
                      </div>
                      <span className="font-bold text-gray-900">{product.specs}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm">Material Grade</span>
                      </div>
                      <span className="font-bold uppercase text-gray-900">
                        {product.materialGrade || "Industrial"}
                      </span>
                    </div>
                  </div>

                  <Link href="/contact" className="block mt-10">
                    <Button variant="red" size="xl" className="w-full h-16 text-lg font-black group">
                      REQUEST A QUOTE
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <CheckCircle2 className="text-red-600 w-8 h-8" />
                <p className="text-xs font-medium leading-snug text-gray-600">
                  All Structro Infratech products are <span className="font-semibold text-gray-900">ISO 9001:2015</span> certified for quality assurance.
                </p>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}