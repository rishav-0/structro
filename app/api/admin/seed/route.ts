import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Seed data — plain objects only (no React components)
// ---------------------------------------------------------------------------

const servicesData = [
  {
    id: "bridge",
    title: "Bridge Engineering",
    subtitle: "Excellence in Bridge Construction",
    description:
      "We specialize in designing and constructing various types of bridges with precision engineering and modern technology. Our expertise spans across multiple bridge categories to meet diverse infrastructure needs.",
    homeDescription:
      "Open Web, Railway, Highway, Foot Over, Composite, Arch, Baily, and Cable-Stayed Bridges",
    features: [
      "Open Web",
      "Composite Girder Bridge",
      "Arch Bridge",
      "Suspension Bridge",
      "Road Over Bridge",
      "Foot Over Bridge",
    ],
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
    alt: "Railway Bridge Construction Guwahati Assam",
    navDescription: "Open Web, Arch, Suspension...",
    catalog: [
      {
        title: "Railway Bridges",
        description:
          "Designed for goods and passenger trains, with variations based on railway type (high-speed, freight, etc.).",
      },
      {
        title: "Arch Bridges",
        description:
          "Features arched shapes that distribute weight to abutments/piers; suitable for medium to long spans with attractive architectural designs.",
      },
      {
        title: "Suspension Bridges",
        description:
          "Main cables hanging from towers with vertical hangers supporting the deck; used for major river crossings with long clear spans.",
      },
      {
        title: "Cable-Stayed Bridges",
        description:
          "Similar to suspension bridges but with shorter cables attached directly to the deck in a fan-like arrangement; efficient for medium to long spans.",
      },
      {
        title: "Truss Bridges",
        description:
          "Utilizes a truss framework (e.g., Warren or Double Warren) for structural support; suitable for short and long spans.",
      },
      {
        title: "Highway Bridges",
        description:
          "Designed for road traffic, including cars, trucks, and buses, with varied designs based on traffic volume.",
      },
      {
        title: "Foot Over / Pedestrian Bridges",
        description:
          "Specifically designed for safe crossing of railway tracks (near stations) or for aesthetic/functional use in urban areas and parks.",
      },
      {
        title: "Open Web Bridges",
        description: "Latticed open web steel girder bridges suitable for railway and highway applications."
      },
      {
        title: "Baily Bridges",
        description: "Modular portable military/emergency bridges for rapid deployment in remote and flood-affected areas."
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "peb",
    title: "PEB (Pre-Engineered Buildings)",
    subtitle: "Pre-Engineered Building Solutions",
    description:
      "Pre-Engineered Buildings (PEB) are steel structures built over a structural concept of primary members, secondary members, and roof/wall sheeting connected to each other.",
    homeDescription:
      "Pre-Engineered Buildings with modern technology and efficient construction",
    features: [
      "Reduced Construction Time",
      "Lower Cost",
      "Flexibility of Expansion",
      "Large Clear Spans",
      "Quality Control",
      "Low Maintenance",
    ],
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2070&auto=format&fit=crop",
    alt: "PEB Building Construction Assam",
    navDescription: "Standard, Customized & Hybrid PEB",
    catalog: [
      { title: "Primary Members", description: "Columns and rafters forming the main rigid frames." },
      { title: "Secondary Members", description: "Purlins (Z and C sections), girts, and eave struts." },
      {
        title: "SIT Tuff Roof",
        description: "High-strength Pre-painted Galvalume/Galvanized steel panels.",
      },
      {
        title: "Accessories",
        description: "Skylights, turbo vents, ridge vents, louvers, and more.",
      },
    ],
    advantages: [
      {
        title: "Reduced Construction Time",
        description:
          "Buildings are typically delivered in just a few weeks after approval of drawings. Foundation and anchor bolts are cast parallel with drawing, while fabrication is done in the factory.",
      },
      {
        title: "Lower Cost",
        description:
          "Significant savings in design, manufacturing, and site erection costs due to the systems approach.",
      },
      {
        title: "Flexibility of Expansion",
        description:
          "Buildings can be easily expanded in length by adding additional bays. Future expansion in width and height is also possible by pre-designing for it.",
      },
      {
        title: "Large Clear Spans",
        description: "Buildings can be supplied up to 80 meters clear span.",
      },
      {
        title: "Quality Control",
        description:
          "Since buildings are manufactured entirely in the factory under controlled conditions, the highest quality is assured.",
      },
      {
        title: "Low Maintenance",
        description:
          "Buildings are supplied with high-quality paint systems for steel and cladding to provide long durability and low maintenance costs.",
      },
    ],
    applications: [
      {
        category: "Industrial",
        items: ["Factories", "Warehouses", "Workshops", "Showrooms", "Gas Stations", "Aircraft Hangars"],
      },
      {
        category: "Commercial",
        items: ["Showrooms", "Distribution Centers", "Supermarkets", "Shopping Malls"],
      },
      {
        category: "Institutional",
        items: ["Schools", "Hospitals", "Auditoriums", "Theaters (on request)", "Museums (on request)", "Libraries (on request)", "Exhibition Halls (on request)"],
      },
      {
        category: "Other",
        items: ["Stadiums", "Indoor Swimming Pools", "Cold Storages", "Multi-story Buildings"],
      },
    ],
    specifications: [
      {
        section: "Primary System",
        details:
          "Consists of rigid frames including tapered columns and rafters fabricated using state-of-the-art technology.",
      },
      {
        section: "Secondary System",
        details:
          "Cold-rolled Z and C sections (Purlins, Girts, and Eave struts) used to support roof and wall panels.",
      },
      {
        section: "Roof & Wall Panels",
        details:
          "High-strength Pre-painted Galvalume/Galvanized steel with 28-30mm rib depth at 250mm c/c pitch.",
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "steel",
    title: "Steel Structures",
    subtitle: "Industrial Warehousing Solutions",
    description:
      "We provide robust steel structures and industrial sheds designed for durability and functionality. Our solutions cater to warehousing, manufacturing, and commercial applications.",
    homeDescription: "Industrial warehousing and custom steel structure solutions",
    features: [
      "Industrial Warehouses",
      "Conventional Sheds",
      "Commercial Complex",
      "Agricultural Structures",
      "Factory Plants",
      "Aircraft Hangers",
      "Military/Defence Structures",
      "Custom Steel Fabrication",
    ],
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
    alt: "Steel Structure Warehouse Guwahati",
    navDescription: "Warehouses, Sheds, Defense...",
    catalog: [
      { title: "Heavy Structural Works", description: "Large-scale steel frames and supports." },
      { title: "Factory Sheds", description: "Customized sheds for manufacturing units." },
      { title: "Industrial Warehouses", description: "Durable high-capacity storage facilities customized for industrial logistics." },
      { title: "Conventional Sheds", description: "Traditional steel frame sheds built for general utility and agricultural storage." },
      { title: "Commercial Complexes", description: "High-strength multi-story structural steel frames for offices and retail hubs." },
      { title: "Aircraft Hangars", description: "Extra-wide clear-span structural frames designed for hangar housing." },
      { title: "Military / Defence Structures", description: "Blast-resilient and secure heavy steel facilities for emergency operations." },
      { title: "Custom Steel Fabrication", description: "Tailored structural welding, built-up girders, and machinery frame engineering." }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "special-metal",
    title: "Special Metal Structures",
    subtitle: "Advanced Material Fabrication",
    description:
      "We provide specialized fabrication using advanced metals for critical applications requiring high durability and corrosion resistance.",
    homeDescription: "Specialized fabrication using advanced metals for critical applications",
    features: [
      "SS Structures (Stainless Steel)",
      "Inconel Structure",
      "Custom Metal Fabrication",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    alt: "Special Metal Structures Fabrication",
    navDescription: "Stainless Steel, Inconel...",
    catalog: [
      { title: "SS Fabrication", description: "High-grade stainless steel structural work." },
      { title: "Inconel Fabrication", description: "Superalloy structural works specialized for aerospace, gas turbine, and high-heat environments." },
      { title: "Custom Metal Fabrication", description: "High-precision alloy welding, plate working, and specialty steel assemblies." }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "design",
    title: "Design Services (Engineering)",
    subtitle: "Comprehensive Engineering Solutions",
    description:
      "Our expert engineering team provides end-to-end design services from concept to detailed modeling and certification.",
    homeDescription:
      "End-to-end engineering design services from concept to detailed modeling and certification",
    features: [
      "Engineering Drawings",
      "3D Concept to Modeling (Special)",
      "Testings, Survey and Reports",
      "Estimation & Certification",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
    alt: "Drafting and Engineering Design",
    navDescription: "Engineering Drawings, 3D Modeling...",
    catalog: [
      { title: "3D Modeling", description: "Advanced visualization and structural modeling." },
      { title: "Engineering Drawings", description: "Precise structural blueprinting, shop drawings, and steel detailing (IS 800 compliant)." },
      { title: "Testing & Load Analysis", description: "Component-level hydraulic testing, stress verification, and seismic vulnerability reports." },
      { title: "Survey & Site Reports", description: "Comprehensive geotechnical, structural auditing, and hydrological site assessments." },
      { title: "Estimation & BOQ Certification", description: "Detailed cost estimation and Bills of Quantities (BOQ) with government certification." }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const ongoingProjects = [
  {
    id: "1",
    title: "Railway Bridge Construction",
    location: "Guwahati, Assam",
    category: "Bridge Engineering",
    serviceId: "bridge",
    src: "/images/gallery/image.png",
    alt: "Railway Bridge Construction Guwahati",
    isVideo: false,
    type: "ongoing",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "2",
    title: "Industrial PEB Warehouse",
    location: "Assam",
    category: "PEB Buildings",
    serviceId: "peb",
    src: "/images/gallery/image copy 2.png",
    alt: "PEB Warehouse Construction Assam",
    isVideo: true,
    type: "ongoing",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "3",
    title: "Highway Overpass",
    location: "Northeast India",
    category: "Bridge Engineering",
    serviceId: "bridge",
    src: "/images/gallery/image copy 3.png",
    alt: "Highway Bridge Construction Northeast India",
    isVideo: false,
    type: "ongoing",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const completedProjects = [
  {
    id: "101",
    title: "OWG Railway Bridge Over Koshi River",
    location: "Katihar, Bihar",
    client: "East-Central Railway",
    category: "Bridge Engineering",
    serviceId: "bridge",
    scope: "Erection & Launching of Girder by Cantilever Crane",
    quantity: "~5060 MT",
    projectQuantity: "~5060 MT",
    spanQuantity: "22",
    spanLength: "61.0M",
    period: "2018–2021 +1",
    src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
    alt: "Koshi River Bridge",
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "102",
    title: "Road Over Bridge at Tuli, Nagaland",
    location: "Nagaland",
    client: "NHIDCL",
    category: "Bridge Engineering",
    serviceId: "bridge",
    scope: "Supply, Fabrication & Erection",
    quantity: "~127 MT",
    projectQuantity: "~127 MT",
    spanQuantity: "1",
    spanLength: "40.0M",
    period: "2022–2023 +1",
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    alt: "Tuli Zero Point ROB",
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "103",
    title: "ROB at Tsuranga",
    location: "Nagaland",
    client: "NHIDCL",
    category: "Bridge Engineering",
    serviceId: "bridge",
    scope: "Supply, Fabrication & Erection",
    quantity: "~240 MT",
    projectQuantity: "~240 MT",
    spanQuantity: "1",
    spanLength: "60.0M",
    period: "2023–2024 +1",
    src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
    alt: "Tsuranga ROB",
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "104",
    title: "BOW String Bridge",
    location: "Manipur-Burma Border",
    client: "NHIDCL, Manipur",
    category: "Bridge Engineering",
    serviceId: "bridge",
    scope: "Supply, Fabrication & Erection of Steel Arch Bridge",
    quantity: "~345 MT",
    projectQuantity: "~345 MT",
    spanQuantity: "1",
    spanLength: "60M",
    period: "2022–2023",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
    alt: "BOW String Bridge",
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "105",
    title: "Road Over Bridge over Krishnai",
    location: "Bokakhat, Assam",
    client: "NRL",
    category: "Bridge Engineering",
    serviceId: "bridge",
    scope: "Supply, Fabrication & Erection of Steel Road Over Bridge",
    quantity: "~316 MT",
    projectQuantity: "~316 MT",
    spanQuantity: "3",
    spanLength: "18.3M",
    period: "2024",
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    alt: "Bokakhat ROB",
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "106",
    title: "Rail Bridge over Dhansiri River",
    location: "Dimapur, Nagaland",
    client: "N.F Railway (Con)",
    category: "Bridge Engineering",
    serviceId: "bridge",
    scope: "Supply, Fabrication & Erection over Dhansiri",
    quantity: "~450 MT",
    projectQuantity: "~450 MT",
    spanQuantity: "3 + 1",
    spanLength: "18.3M & 61.0M",
    period: "2024–2025",
    src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
    alt: "Dhansiri Bridge",
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "107",
    title: "Foot Over Bridge at BPRD Station",
    location: "Barpeta, Assam",
    client: "N.F Railway (Con-II)",
    category: "Bridge Engineering",
    serviceId: "bridge",
    scope: "Supply, Fabrication & Erection",
    quantity: "~150 MT",
    projectQuantity: "~150 MT",
    spanQuantity: "1",
    spanLength: "50.0M",
    period: "2023–2024 +1",
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    alt: "BPRD Station FOB",
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "108",
    title: "Footover Bridge at BNGN Station",
    location: "Bongaigaon, Assam",
    client: "N.F. Railway (Con-II)",
    category: "Bridge Engineering",
    serviceId: "bridge",
    scope: "Supply, Fabrication & Erection",
    quantity: "~101 MT",
    projectQuantity: "~101 MT",
    spanQuantity: "1",
    spanLength: "48.0M",
    period: "2021–2022 +1",
    src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
    alt: "BNGN Station FOB",
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "109",
    title: "OWG Composite Railway Bridge",
    location: "Dimapur, Nagaland",
    client: "Nagaland PWD (R&B)",
    category: "Bridge Engineering",
    serviceId: "bridge",
    scope: "Supply, Fabrication & Erection of 50.0M OWG",
    quantity: "~125 MT",
    projectQuantity: "~125 MT",
    spanQuantity: "1 + 4",
    spanLength: "61.0M & 30.0M",
    period: "2025–2026 +1",
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    alt: "Molvom ROB",
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "110",
    title: "FOB at Damra",
    location: "Goalpara, Assam",
    client: "NHIDCL",
    category: "Bridge Engineering",
    serviceId: "bridge",
    scope: "Supply, Fabrication & Installation",
    quantity: "~120 MT",
    projectQuantity: "~120 MT",
    spanQuantity: "1",
    spanLength: "38.0M",
    period: "2026–Ongoing +1",
    src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
    alt: "Damra FOB",
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "4",
    title: "Steel Structure Warehouse",
    location: "Guwahati, Assam",
    serviceId: "steel",
    category: "Steel Structures",
    src: "/images/gallery/image copy 4.png",
    alt: "Steel Warehouse Guwahati Assam",
    isVideo: false,
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "5",
    title: "Composite Bridge",
    location: "Assam",
    serviceId: "bridge",
    category: "Bridge Engineering",
    src: "/images/gallery/image copy 5.png",
    alt: "Composite Bridge Construction Assam",
    isVideo: false,
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "6",
    title: "Foot Over Bridge",
    location: "Guwahati",
    serviceId: "bridge",
    category: "Bridge Engineering",
    src: "/images/gallery/image.png",
    alt: "Foot Over Bridge Guwahati",
    isVideo: false,
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "7",
    title: "Industrial Shed",
    location: "Assam",
    serviceId: "steel",
    category: "Steel Structures",
    src: "/images/gallery/image copy.png",
    alt: "Industrial Steel Shed Assam",
    isVideo: false,
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "9",
    title: "PEB Manufacturing Unit",
    location: "Guwahati, Assam",
    serviceId: "peb",
    category: "PEB Buildings",
    src: "/images/gallery/image copy 4.png",
    alt: "PEB Building Guwahati",
    isVideo: false,
    type: "completed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const productsData = [
  {
    id: "portable-peb",
    title: "Portable PEB Residential Houses",
    specs: "1 BHK, 2 BHK, 3 BHK",
    description:
      "Experience the future of housing with our portable PEB residential units. Combining the speed of pre-engineered construction with the comfort of modern living, these homes are designed to be durable, eco-friendly, and quickly deployable to any location. Perfect for remote site offices or emergency housing.",
    features: [
      "Quick Assembly & Disassembly",
      "Superior Thermal Insulation",
      "Customizable Floor Plans",
      "Weather-resistant Exterior",
    ],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Engineered for resilience. Built with precision-grade materials to meet 1 BHK, 2 BHK, 3 BHK structural requirements.",
    materialGrade: "Galvalume & Light Gauge Steel",
    tags: ["Eco-Friendly", "Quick Deployment", "Modular Home"],
    badge: "Premium Modular",
    imageAlt: "Modern Prefabricated Light Gauge Steel Residential PEB House Layout",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "movable-sheds",
    title: "Movable Sheds (Multipurpose)",
    specs: "100 sqm onwards",
    description:
      "Our multipurpose movable sheds offer incredible versatility for industrial, commercial, and agricultural applications. Built with robust steel frames and premium cladding, they can be easily relocated or expanded as your spatial requirements change.",
    features: [
      "Modular Expansion",
      "High Wind Resistance",
      "Minimal Foundation Required",
      "Relocatable Design",
    ],
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Engineered for resilience. Built with precision-grade materials to meet 100 sqm onwards structural requirements.",
    materialGrade: "Mild Steel (IS 2062) & Galvalume",
    tags: ["Relocatable", "Modular Expansion", "High Wind Resistance"],
    badge: "Heavy Duty",
    imageAlt: "Multipurpose Steel Frame Movable Industrial Storage Shed",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "multipurpose-containers",
    title: "Industrial Storage Tanks",
    specs: "500 Ltr to 10,000 Ltrs.",
    description:
      "Engineered to safely store and transport a wide range of materials, including liquids, chemicals, and bulk solids. These heavy-duty industrial containers are fabricated from specialized metals designed to withstand harsh industrial environments.",
    features: [
      "Corrosion-Resistant Coating",
      "Custom Valve Fittings",
      "High Impact Strength",
      "Stackable Designs",
    ],
    image:
      "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Engineered for resilience. Built with precision-grade materials to meet 500 Ltr to 10,000 Ltrs. structural requirements.",
    materialGrade: "SS304 / SS316 Food Grade",
    tags: ["Corrosion-Resistant", "High Impact Strength", "Heavy Duty"],
    badge: "Industrial Grade",
    imageAlt: "Industrial Steel Storage and Transport Tanks Collection",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "readymade-staircases",
    title: "Readymade Modern Staircases",
    specs: "1 set onwards",
    description:
      "Upgrade any commercial or industrial facility rapidly with our readymade steel staircases. Manufactured to strict safety tolerances in our facility, they arrive ready for immediate installation, saving significant time on-site.",
    features: [
      "Anti-Slip Treads",
      "Compliance with Safety Standards",
      "Powder-Coated Finish",
      "Bolt-on Assembly (No On-site Welding)",
    ],
    image:
      "https://images.unsplash.com/photo-1505069190533-da1c9af13346?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Engineered for resilience. Built with precision-grade materials to meet 1 set onwards structural requirements.",
    materialGrade: "Mild Steel (IS 2062) with Powder Coating",
    tags: ["Anti-Slip Treads", "Safety Compliant", "Bolt-on Assembly"],
    badge: "Safety Certified",
    imageAlt: "Powder Coated Modern Safety Steel Staircase Assembly",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results: Record<string, { written: string[]; errors: string[] }> = {
      services: { written: [], errors: [] },
      projects: { written: [], errors: [] },
      products: { written: [], errors: [] },
    };

    // Seed services
    for (const item of servicesData) {
      try {
        await adminDb.collection("services").doc(item.id).set(item);
        results.services.written.push(item.id);
      } catch (e) {
        results.services.errors.push(`${item.id}: ${e}`);
      }
    }

    // Seed projects (ongoing + completed)
    const allProjects = [...ongoingProjects, ...completedProjects];
    for (const item of allProjects) {
      try {
        await adminDb.collection("projects").doc(item.id).set(item);
        results.projects.written.push(item.id);
      } catch (e) {
        results.projects.errors.push(`${item.id}: ${e}`);
      }
    }

    // Seed products
    for (const item of productsData) {
      try {
        await adminDb.collection("products").doc(item.id).set(item);
        results.products.written.push(item.id);
      } catch (e) {
        results.products.errors.push(`${item.id}: ${e}`);
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        services: `${results.services.written.length} written, ${results.services.errors.length} errors`,
        projects: `${results.projects.written.length} written, ${results.projects.errors.length} errors`,
        products: `${results.products.written.length} written, ${results.products.errors.length} errors`,
      },
      details: results,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
