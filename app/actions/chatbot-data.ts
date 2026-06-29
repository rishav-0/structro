"use server";

import { adminDb } from "@/lib/firebase-admin";
import { servicesData, featuredProductsData, projectsData, companyVision } from "@/lib/data";

export interface ChatbotService {
  id: string;
  title: string;
  description: string;
  features: string[];
  catalog?: { title: string; description: string }[];
  advantages?: { title: string; description: string }[];
  applications?: string | { category: string; items: string[] }[];
  type: "service";
}

export interface ChatbotProduct {
  id: string;
  title: string;
  description: string;
  specs: string;
  features?: string[];
  type: "product";
}

export interface ChatbotProject {
  id: string;
  title: string;
  location: string;
  client?: string;
  quantity?: string;
  period?: string;
  category: string;
  serviceId: string;
  type: "project";
}

export interface ChatbotFAQ {
  id: string;
  question: string;
  answer: string;
  type: "faq";
}

export interface ChatbotCompany {
  name: string;
  tagline: string;
  description: string;
  founded: string;
  registered: string;
  iso: string;
  foundedBy: string;
  philosophy: string;
  principles: string[];
  stats: {
    projects: string;
    team: string;
    satisfaction: string;
  };
  values: {
    title: string;
    desc: string;
  }[];
  contact: {
    phones: string[];
    email: string;
    headOffice: string;
    workshop: string;
    hours: string;
    whatsapp: string;
  };
  type: "company";
}

export interface ChatbotProcess {
  steps: { num: string; title: string; desc: string; tags: string[] }[];
  deepTech: { title: string; desc: string }[];
  regulatory: { title: string; desc: string }[];
  type: "process";
}

export interface ChatbotData {
  services: ChatbotService[];
  products: ChatbotProduct[];
  projects: ChatbotProject[];
  faqs: ChatbotFAQ[];
  company: ChatbotCompany;
  process: ChatbotProcess;
}

async function fetchDbCollection<T>(collectionName: string, limit = 50): Promise<T[]> {
  try {
    const snapshot = await adminDb.collection(collectionName).limit(limit).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  } catch {
    return [];
  }
}

async function fetchDbCollectionWithFilter<T>(
  collectionName: string,
  field: string,
  value: string,
  limit = 50
): Promise<T[]> {
  try {
    const snapshot = await adminDb
      .collection(collectionName)
      .where(field, "==", value)
      .limit(limit)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  } catch {
    return [];
  }
}

function extractServiceFeatures(service: Record<string, unknown>): string[] {
  const features: string[] = [];
  if (Array.isArray(service.features)) {
    features.push(...service.features.map(String));
  }
  if (Array.isArray(service.catalog)) {
    service.catalog.forEach((c: unknown) => {
      if (typeof c === "object" && c !== null && "title" in c) {
        features.push(String((c as { title: string }).title));
      }
    });
  }
  return features;
}

function transformDbService(dbService: Record<string, unknown>): Partial<ChatbotService> {
  return {
    id: String(dbService.id || ""),
    title: String(dbService.title || ""),
    description: String(dbService.description || ""),
    features: extractServiceFeatures(dbService),
    type: "service",
  };
}

function transformDbProduct(dbProduct: Record<string, unknown>): Partial<ChatbotProduct> {
  return {
    id: String(dbProduct.id || ""),
    title: String(dbProduct.title || ""),
    description: String(dbProduct.description || ""),
    specs: String(dbProduct.specs || ""),
    type: "product",
  };
}

function transformDbProject(dbProject: Record<string, unknown>): Partial<ChatbotProject> {
  return {
    id: String(dbProject.id || ""),
    title: String(dbProject.title || ""),
    location: String(dbProject.location || ""),
    client: dbProject.client ? String(dbProject.client) : undefined,
    quantity: dbProject.quantity ? String(dbProject.quantity) : undefined,
    period: dbProject.period ? String(dbProject.period) : undefined,
    category: String(dbProject.category || ""),
    serviceId: String(dbProject.serviceId || ""),
    type: "project",
  };
}

function transformDbFaq(dbFaq: Record<string, unknown>): Partial<ChatbotFAQ> {
  return {
    id: String(dbFaq.id || ""),
    question: String(dbFaq.question || ""),
    answer: String(dbFaq.answer || ""),
    type: "faq",
  };
}

async function fetchServices(): Promise<ChatbotService[]> {
  const dbServices = await fetchDbCollection<Record<string, unknown>>("services");
  const dbTransformed = dbServices.map(transformDbService).filter((s) => s.title);

  const libServices: ChatbotService[] = servicesData.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    features: s.features || [],
    catalog: s.catalog as ChatbotService["catalog"],
    advantages: s.advantages as ChatbotService["advantages"],
    applications: s.applications,
    type: "service",
  }));

  const merged = [...libServices];
  dbTransformed.forEach((dbSvc) => {
    if (dbSvc.title && !merged.some((m) => m.title.toLowerCase() === dbSvc.title?.toLowerCase())) {
      merged.push(dbSvc as ChatbotService);
    }
  });

  return merged;
}

async function fetchProducts(): Promise<ChatbotProduct[]> {
  const dbProducts = await fetchDbCollection<Record<string, unknown>>("products");
  const dbTransformed = dbProducts.map(transformDbProduct).filter((p) => p.title);

  const libProducts: ChatbotProduct[] = featuredProductsData.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    specs: p.specs,
    features: p.features,
    type: "product",
  }));

  const merged = [...libProducts];
  dbTransformed.forEach((dbProd) => {
    if (dbProd.title && !merged.some((m) => m.title.toLowerCase() === dbProd.title?.toLowerCase())) {
      merged.push(dbProd as ChatbotProduct);
    }
  });

  return merged;
}

async function fetchProjects(): Promise<ChatbotProject[]> {
  const dbProjects = await fetchDbCollection<Record<string, unknown>>("projects");
  const dbTransformed = dbProjects.map(transformDbProject).filter((p) => p.title);

  const libProjects: ChatbotProject[] = (projectsData.completed || []).map((p) => ({
    id: String(p.id),
    title: p.title,
    location: p.location,
    client: p.client,
    quantity: p.quantity,
    period: p.period,
    category: p.category || "",
    serviceId: p.serviceId || "",
    type: "project",
  }));

  const merged = [...libProjects];
  dbTransformed.forEach((dbProj) => {
    if (dbProj.title && !merged.some((m) => m.title.toLowerCase() === dbProj.title?.toLowerCase())) {
      merged.push(dbProj as ChatbotProject);
    }
  });

  return merged;
}

async function fetchFaqs(): Promise<ChatbotFAQ[]> {
  const dbFaqs = await fetchDbCollectionWithFilter<Record<string, unknown>>("faqs", "status", "active");
  return dbFaqs
    .map(transformDbFaq)
    .filter((f) => f.question && f.answer) as ChatbotFAQ[];
}

function buildCompanyInfo(): ChatbotCompany {
  return {
    name: "Structro Infratech",
    tagline: companyVision.philosophy,
    description:
      "A leading steel engineering company in Northeast India, specializing in bridge construction, PEB buildings, and industrial infrastructure.",
    founded: "July 6, 2018",
    registered: "July 6, 2018",
    iso: "ISO 9001:2015 Certified",
    foundedBy: "4 professionals",
    philosophy: companyVision.philosophy,
    principles: companyVision.principles,
    stats: {
      projects: "500+",

      team: "400+",
      satisfaction: "95%",
    },
    values: [
      {
        title: "Integrity",
        desc: "We uphold the highest ethical standards. No hidden costs, no broken promises—just honest communication.",
      },
      {
        title: "Quality",
        desc: "Zero compromise on quality. Every project undergoes rigorous checks for durability and safety.",
      },
      {
        title: "Sustainability",
        desc: "Building for the future with eco-conscious materials and efficient construction methods.",
      },
      {
        title: "Innovation",
        desc: "Embracing cutting-edge technology and modern engineering techniques for future-ready solutions.",
      },
    ],
    contact: {
      phones: ["+91-9678027684"],
      email: "structro.infratech@gmail.com",
      headOffice:
        "1st Floor, Silver Square, Christian Basti, G.S Road, Guwahati, Assam - 781005",
      workshop: "Guwahati-Accoland-Rani Rd, South Rani, Guwahati-31",
      hours: "Mon - Sat: 10AM - 7PM | Sun: Closed",
      whatsapp: "+91-9678027684",
    },
    type: "company",
  };
}

function buildProcessInfo(): ChatbotProcess {
  return {
    steps: [
      { num: "01", title: "Consultation", desc: "We analyze your vision, constraints, and site conditions to eliminate uncertainty early.", tags: ["Survey", "Budget", "Alignment"] },
      { num: "02", title: "Engineering & Design", desc: "Advanced CAD + structural simulations tailored for seismic conditions.", tags: ["Blueprints", "3D Models", "Seismic"] },
      { num: "03", title: "Approval & Procurement", desc: "Permits, compliance, and sourcing high-grade materials.", tags: ["Permits", "Sourcing", "QA"] },
      { num: "04", title: "Construction", desc: "Execution with strict monitoring, safety, and quality control.", tags: ["Fabrication", "Safety", "Execution"] },
      { num: "05", title: "Final Handoff", desc: "Audit, certification, and delivery of a ready-to-use structure.", tags: ["Audit", "Certification", "Delivery"] },
    ],
    deepTech: [
      { title: "Elastic Resilience", desc: "Structures absorb seismic stress without failure." },
      { title: "Tensile Integrity", desc: "High-strength welded joints exceed load requirements." },
      { title: "Corrosion Resistance", desc: "Multi-stage coating for humid environments." },
      { title: "Precision Geometry", desc: "Laser-aligned fabrication with FEA validation." },
    ],
    regulatory: [
      { title: "Safety Standards", desc: "Zero-incident policy with full PPE enforcement." },
      { title: "Building Laws", desc: "Strict compliance with zoning & FAR rules." },
      { title: "IS Codes", desc: "Aligned with national engineering standards." },
      { title: "Project Audits", desc: "Transparent audits for stakeholders." },
    ],
    type: "process",
  };
}

export async function fetchChatbotData(): Promise<ChatbotData> {
  const [services, products, projects, faqs] = await Promise.all([
    fetchServices(),
    fetchProducts(),
    fetchProjects(),
    fetchFaqs(),
  ]);

  return {
    services,
    products,
    projects,
    faqs,
    company: buildCompanyInfo(),
    process: buildProcessInfo(),
  };
}

export async function refreshChatbotData(): Promise<ChatbotData> {
  return fetchChatbotData();
}