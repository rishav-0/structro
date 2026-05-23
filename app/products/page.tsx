import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getPublicCollectionData } from "@/lib/public-db-server";

type Product = {
  id: string;
  title: string;
  specs: string;
  description: string;
  features: string[];
  image: string;
};

export const metadata: Metadata = {
  title: "Products | Structro Infratech Industrial Product Range",
  description:
    "Explore Structro Infratech's industrial product range, including portable PEB homes, movable sheds, industrial containers, and readymade steel staircases.",
  keywords: [
    "Structro products",
    "Portable PEB houses",
    "Movable sheds Assam",
    "Industrial containers Guwahati",
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
              <Link href={`/products/${product.id}`} key={product.id} className="block h-full w-full">
                <article className="group h-full overflow-hidden rounded-md border border-gray-200 bg-white transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/45 via-black/10 to-transparent opacity-80" />
                  </div>

                  <div className="h-full p-6">
                    <h3 className="mb-2 min-h-12 text-lg font-bold leading-tight text-gray-900">
                      {product.title}
                    </h3>
                    <div className="flex items-center text-sm font-semibold text-gray-700">
                      <span className="w-full rounded-sm border border-gray-200 bg-gray-50 px-2 py-1 text-center backdrop-blur-sm">
                        {product.specs}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}