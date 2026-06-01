import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getPublicCollectionData } from "@/lib/public-db-server";

export const revalidate = 3600; // Cache page static response for 1 hour

type Product = {
  id: string;
  title: string;
  specs: string;
  description: string;
  features: string[];
  image: string;
};

export const metadata: Metadata = {
  title: "Steel Products | Movable Sheds, Portable PEB Houses & Industrial Tanks | Structro Guwahati",
  description:
    "Explore Structro Infratech's industrial product range, including portable PEB homes, movable sheds, industrial storage tanks, and readymade steel staircases.",
  keywords: [
    "Structro products",
    "Portable PEB houses",
    "Movable sheds Assam",
    "Industrial Storage Tanks Guwahati",
    "Steel staircases Assam",
  ],
};

async function getProducts(): Promise<Product[]> {
  try {
    return await getPublicCollectionData<Product>("products");
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// WhatsApp pre-filled message per product
function getWhatsAppUrl(productTitle: string): string {
  const msg = encodeURIComponent(
    `Hi, I'm interested in ${productTitle}. Please share details and pricing.`
  );
  return `https://wa.me/919678027684?text=${msg}`;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-primary pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_30%),linear-gradient(135deg,#091522_0%,#13283d_52%,#0b1624_100%)]" />
        <Container className="relative">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Product Portfolio
            </p>
            <h1 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
              Engineered Products
              <br />
              Built for Practical Use.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg">
              Browse Structro Infratech&apos;s featured product range for industrial,
              residential, logistics, and site-use applications. Each solution is designed
              for fast deployment, reliable performance, and durable steel construction.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button variant="saffron" size="lg">
                  Request Product Quote
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-white/20 bg-white/5 text-white hover:bg-white hover:text-primary">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-gray-200 bg-gray-50 py-8">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Portable and modular deployment options",
              "Industrial-grade steel fabrication quality",
              "Custom specifications for project requirements",
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 rounded-md border border-gray-200 bg-white px-4 py-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-gray-200 bg-gray-50 py-20">
        <Container>
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Featured Range
              </p>
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
                Solutions for Site, Storage, and Structural Use
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              The current catalog covers rapid-install housing, industrial storage,
              movable shed systems, and fabricated access solutions. Each product page
              includes specifications, core capabilities, and a direct quote path.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="group h-full overflow-hidden rounded-md border border-gray-200 bg-white transition-all duration-300 hover:border-primary/30 hover:shadow-lg flex flex-col">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-80" />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900">
                      {product.title}
                    </h3>
                    <div className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <span className="w-full rounded-sm border border-gray-200 bg-gray-50 px-2 py-1 text-center">
                        {product.specs}
                      </span>
                    </div>
                  </div>
                </Link>
                {/* WhatsApp Quick Quote — per fix doc item #45 */}
                <div className="px-5 pb-5 mt-auto">
                  <a
                    href={getWhatsAppUrl(product.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-4 py-2.5 rounded-sm transition-colors duration-200 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.548 4.1 1.512 5.829L.057 23.786a.5.5 0 00.65.65l5.956-1.455A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.645-.5-5.175-1.372l-.371-.217-3.84.939.957-3.726-.233-.382A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    WhatsApp Quick Quote
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}