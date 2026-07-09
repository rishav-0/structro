import { HomeClient } from "./home-client";
import { getPublicCollectionData } from "@/lib/public-db-server";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 60; // ISR: revalidate every 60s as safety net (admin changes trigger immediate revalidation via tags)

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

// FAQ Schema for Google Rich Results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Structro Infratech specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We specialize in heavy steel engineering, including Pre-Engineered Buildings (PEBs), Industrial Sheds, Bridge Construction, and large-scale infrastructure projects across Northeast India.",
      },
    },
    {
      "@type": "Question",
      name: "Can Structro customize designs for specific project needs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our in-house engineering and design team provides fully customized structural solutions tailored to your specific architectural requirements, load-bearing needs, and site conditions.",
      },
    },
    {
      "@type": "Question",
      name: "Is Structro Infratech ISO certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We are an ISO 9001:2015 certified company, ensuring our quality management, safety protocols, and operational workflows meet international standards.",
      },
    },
    {
      "@type": "Question",
      name: "How can I request a consultation with Structro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can easily request a consultation by clicking the 'Request Technical Consultation' button on our site or visiting the Contact Us page to submit your project details and drawings.",
      },
    },
    {
      "@type": "Question",
      name: "Where does Structro Infratech operate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While our head office is located in Guwahati, Assam, we execute and deliver projects across the entire Northeast India region covering 8 states.",
      },
    },
  ],
};

export default async function Page() {
  const siteUrl = getSiteUrl();
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

  // BreadcrumbList for homepage
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl.toString(),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomeClient 
        initialServices={services}
        initialProducts={products}
        initialProjects={projects}
        initialLaunches={launches}
      />
    </>
  );
}

