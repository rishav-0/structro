import React from "react";
import { Waypoints, Building2, HardHat, Shield, PenTool, Home, Factory, Package, Server } from "lucide-react";

export const companyVision = {
  name: "STRUCTRO INFRA TECH",
  philosophy: "Structro Infra Tech exists to build responsibly, safely, and with integrity.",
  principles: [
    "Disciplined execution and ethical practices.",
    "Strong focus on risk management and safety.",
    "Long-term partnerships built on trust and performance.",
    "Commitment to innovation, sustainability, and continuous people development.",
    "Creating enduring value in every project undertaken."
  ]
};

export const servicesData = [
  {
    id: "bridge",
    title: "Bridge Engineering",
    subtitle: "Excellence in Bridge Construction",
    description: "We specialize in designing and constructing various types of bridges with precision engineering and modern technology. Our expertise spans across multiple bridge categories to meet diverse infrastructure needs.",
    homeDescription: "Open Web, Railway, Highway, Foot Over, Composite, Arch, Baily, and Cable-Stayed Bridges",
    icon: <Waypoints className="w-8 h-8" />,
    navIcon: Waypoints,
    features: [
      "Open Web",
      "Composite Girder Bridge",
      "Arch Bridge",
      "Suspension Bridge",
      "Road Over Bridge",
      "Foot Over Bridge"
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
    alt: "Railway Bridge Construction Guwahati Assam",
    navDescription: "Open Web, Arch, Suspension...",
    catalog: [
      {
        title: "Railway Bridges",
        description: "Designed for goods and passenger trains, with variations based on railway type (high-speed, freight, etc.)."
      },
      {
        title: "Arch Bridges",
        description: "Features arched shapes that distribute weight to abutments/piers; suitable for medium to long spans with attractive architectural designs."
      },
      {
        title: "Suspension Bridges",
        description: "Main cables hanging from towers with vertical hangers supporting the deck; used for major river crossings with long clear spans."
      },
      {
        title: "Cable-Stayed Bridges",
        description: "Similar to suspension bridges but with shorter cables attached directly to the deck in a fan-like arrangement; efficient for medium to long spans."
      },
      {
        title: "Truss Bridges",
        description: "Utilizes a truss framework (e.g., Warren or Double Warren) for structural support; suitable for short and long spans."
      },
      {
        title: "Highway Bridges",
        description: "Designed for road traffic, including cars, trucks, and buses, with varied designs based on traffic volume."
      },
      {
        title: "Foot Over / Pedestrian Bridges",
        description: "Specifically designed for safe crossing of railway tracks (near stations) or for aesthetic/functional use in urban areas and parks."
      }
    ]
  },
  {
    id: "peb",
    title: "PEB (Pre-Engineered Buildings)",
    subtitle: "Pre-Engineered Building Solutions",
    description: "Pre-Engineered Buildings (PEB) are steel structures built over a structural concept of primary members, secondary members, and roof/wall sheeting connected to each other.",
    homeDescription: "Pre-Engineered Buildings with modern technology and efficient construction",
    icon: <Building2 className="w-8 h-8" />,
    navIcon: Building2,
    features: [
      "Reduced Construction Time",
      "Lower Cost",
      "Flexibility of Expansion",
      "Large Clear Spans",
      "Quality Control",
      "Low Maintenance"
    ],
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2070&auto=format&fit=crop",
    alt: "PEB Building Construction Assam",
    navDescription: "Standard, Customized & Hybrid PEB",
    catalog: [
      { title: "Primary Members", description: "Columns and rafters forming the main rigid frames." },
      { title: "Secondary Members", description: "Purlins (Z and C sections), girts, and eave struts." },
      { title: "SIT Tuff Roof", description: "High-strength Pre-painted Galvalume/Galvanized steel panels." },
      { title: "Accessories", description: "Skylights, turbo vents, ridge vents, louvers, and more." }
    ],
    advantages: [
      { title: "Reduced Construction Time", description: "Buildings are typically delivered in just a few weeks after approval of drawings. Foundation and anchor bolts are cast parallel with drawing, while fabrication is done in the factory." },
      { title: "Lower Cost", description: "Significant savings in design, manufacturing, and site erection costs due to the systems approach." },
      { title: "Flexibility of Expansion", description: "Buildings can be easily expanded in length by adding additional bays. Future expansion in width and height is also possible by pre-designing for it." },
      { title: "Large Clear Spans", description: "Buildings can be supplied to around 80 meters clear span." },
      { title: "Quality Control", description: "Since buildings are manufactured entirely in the factory under controlled conditions, the highest quality is assured." },
      { title: "Low Maintenance", description: "Buildings are supplied with high-quality paint systems for steel and cladding to provide long durability and low maintenance costs." }
    ],
    applications: [
      { category: "Industrial", items: ["Factories", "Warehouses", "Workshops", "Showrooms", "Gas Stations", "Aircraft Hangars"] },
      { category: "Commercial", items: ["Showrooms", "Distribution Centers", "Supermarkets", "Shopping Malls"] },
      { category: "Institutional", items: ["Schools", "Hospitals", "Auditoriums", "Theaters", "Museums", "Libraries", "Exhibition Halls"] },
      { category: "Other", items: ["Stadiums", "Indoor Swimming Pools", "Cold Storages", "Multi-story Buildings"] }
    ],
    specifications: [
      { section: "Primary System", details: "Consists of rigid frames including tapered columns and rafters fabricated using state-of-the-art technology." },
      { section: "Secondary System", details: "Cold-rolled Z and C sections (Purlins, Girts, and Eave struts) used to support roof and wall panels." },
      { section: "Roof & Wall Panels", details: "High-strength Pre-painted Galvalume/Galvanized steel with 28-30mm rib depth at 250mm c/c pitch." }
    ]
  },
  {
    id: "steel",
    title: "Steel Structures",
    subtitle: "Industrial Warehousing Solutions",
    description: "We provide robust steel structures and industrial sheds designed for durability and functionality. Our solutions cater to warehousing, manufacturing, and commercial applications.",
    homeDescription: "Industrial warehousing and custom steel structure solutions",
    icon: <HardHat className="w-8 h-8" />,
    navIcon: HardHat,
    features: [
      "Industrial Warehouses",
      "Conventional Sheds",
      "Commercial Complex",
      "Agricultural Structures",
      "Factory Plants",
      "Aircraft Hangers",
      "Military/Defence Structures",
      "Custom Steel Fabrication"
    ],
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
    alt: "Steel Structure Warehouse Guwahati",
    navDescription: "Warehouses, Sheds, Defense...",
    catalog: [
      { title: "Heavy Structural Works", description: "Large-scale steel frames and supports." },
      { title: "Factory Sheds", description: "Customized sheds for manufacturing units." }
    ]
  },

  {
    id: "special-metal",
    title: "Special Metal Structures",
    subtitle: "Advanced Material Fabrication",
    description: "We provide specialized fabrication using advanced metals for critical applications requiring high durability and corrosion resistance.",
    icon: <Shield className="w-8 h-8" />,
    navIcon: Shield,
    features: [
      "SS Structures (Stainless Steel)",
      "Inconel Structure",
      "Custom Metal Fabrication"
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    alt: "Special Metal Structures Fabrication",
    navDescription: "Stainless Steel, Inconel...",
    catalog: [
      { title: "SS Fabrication", description: "High-grade stainless steel structural work." }
    ]
  },
  {
    id: "design",
    title: "Design Services (Engineering)",
    subtitle: "Comprehensive Engineering Solutions",
    description: "Our expert engineering team provides end-to-end design services from concept to detailed modeling and certification.",
    icon: <PenTool className="w-8 h-8" />,
    navIcon: PenTool,
    features: [
      "Engineering Drawings",
      "3D Concept to Modeling (Special)",
      "Testings, Survey and Reports",
      "Estimation & Certification"
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
    alt: "Drafting and Engineering Design",
    navDescription: "Engineering Drawings, 3D Modeling...",
    catalog: [
      { title: "3D Modeling", description: "Advanced visualization and structural modeling." }
    ]
  }
];

export const projectsData = {
  ongoing: [
    {
      id: 1,
      title: "Railway Bridge Construction",
      location: "Guwahati, Assam",
      category: "Bridge Engineering",
      serviceId: "bridge",
      src: "/images/gallery/image.png",
      alt: "Railway Bridge Construction Guwahati",
      isVideo: false
    },
    {
      id: 2,
      title: "Industrial PEB Warehouse",
      location: "Assam",
      category: "PEB Buildings",
      serviceId: "peb",
      src: "/images/gallery/image copy 2.png",
      alt: "PEB Warehouse Construction Assam",
      isVideo: true
    },
    {
      id: 3,
      title: "Highway Overpass",
      location: "Northeast India",
      category: "Bridge Engineering",
      serviceId: "bridge",
      src: "/images/gallery/image copy 3.png",
      alt: "Highway Bridge Construction Northeast India",
      isVideo: false
    }
  ],
  completed: [
    {
      id: 101,
      title: "22X61.0 M OWG over Koshi River",
      location: "Katihar, Bihar",
      client: "East-Central Railway",
      category: "Bridge Engineering",
      serviceId: "bridge",
      scope: "Erection & Launching of Girder by Cantilever Crane",
      quantity: "~5060 MT",
      period: "2018–2021 +1",
      src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
      alt: "Koshi River Bridge",
    },
    {
      id: 102,
      title: "40.0M ROB at Tuli Zero Point",
      location: "Nagaland",
      client: "NHIDCL",
      category: "Bridge Engineering",
      serviceId: "bridge",
      scope: "Supply, Fabrication & Erection",
      quantity: "~127 MT",
      period: "2022–2023 +1",
      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
      alt: "Tuli Zero Point ROB",
    },
    {
      id: 103,
      title: "60.0M ROB at Tsuranga",
      location: "Nagaland",
      client: "NHIDCL",
      category: "Bridge Engineering",
      serviceId: "bridge",
      scope: "Supply, Fabrication & Erection",
      quantity: "~240 MT",
      period: "2023–2024 +1",
      src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
      alt: "Tsuranga ROB",
    },
    {
      id: 104,
      title: "1x60M BOW String Bridge",
      location: "Manipur-Burma Border",
      client: "NHIDCL, Manipur",
      category: "Bridge Engineering",
      serviceId: "bridge",
      scope: "Supply, Fabrication & Erection of Steel Arch Bridge",
      quantity: "~345 MT",
      period: "2022–2023",
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
      alt: "BOW String Bridge",
    },
    {
      id: 105,
      title: "3x18.3M ROB",
      location: "Bokakhat, Assam",
      client: "NRL",
      category: "Bridge Engineering",
      serviceId: "bridge",
      scope: "Supply, Fabrication & Erection of Steel Road Over Bridge",
      quantity: "~316 MT",
      period: "2024",
      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
      alt: "Bokakhat ROB",
    },
    {
      id: 106,
      title: "6×18.3+1×61.0M Span OWG",
      location: "Dimapur, Nagaland",
      client: "N.F Railway (Con)",
      category: "Bridge Engineering",
      serviceId: "bridge",
      scope: "Supply, Fabrication & Erection over Dhansiri",
      quantity: "~450 MT",
      period: "2024–2025",
      src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
      alt: "Dhansiri Bridge",
    },
    {
      id: 107,
      title: "1x52.0M FOB at BPRD Station",
      location: "Barpeta, Assam",
      client: "N.F Railway (Con-II)",
      category: "Bridge Engineering",
      serviceId: "bridge",
      scope: "Supply, Fabrication & Erection",
      quantity: "~150 MT",
      period: "2023–2024 +1",
      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
      alt: "BPRD Station FOB",
    },
    {
      id: 108,
      title: "1x48.0M FOB at BNGN Station",
      location: "Bongaigaon, Assam",
      client: "N.F. Railway (Con-II)",
      category: "Bridge Engineering",
      serviceId: "bridge",
      scope: "Supply, Fabrication & Erection",
      quantity: "~101 MT",
      period: "2021–2022 +1",
      src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
      alt: "BNGN Station FOB",
    },
    {
      id: 109,
      title: "1x50.0M ROB at Molvom",
      location: "Dimapur, Nagaland",
      client: "Nagaland PWD (R&B)",
      category: "Bridge Engineering",
      serviceId: "bridge",
      scope: "Supply, Fabrication & Erection of 50.0M OWG",
      quantity: "~125 MT",
      period: "2025–2026 +1",
      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
      alt: "Molvom ROB",
    },
    {
      id: 110,
      title: "38.0M FOB at Damra",
      location: "Goalpara, Assam",
      client: "NHIDCL",
      category: "Bridge Engineering",
      serviceId: "bridge",
      scope: "Supply, Fabrication & Installation",
      quantity: "~120 MT",
      period: "2026–Ongoing +1",
      src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
      alt: "Damra FOB",
    },
    {
      id: 4,
      title: "Steel Structure Warehouse",
      location: "Guwahati, Assam",
      serviceId: "steel",
      category: "Steel Structures",
      src: "/images/gallery/image copy 4.png",
      alt: "Steel Warehouse Guwahati Assam",
      isVideo: false
    },
    {
      id: 5,
      title: "Composite Bridge",
      location: "Assam",
      serviceId: "bridge",
      category: "Bridge Engineering",
      src: "/images/gallery/image copy 5.png",
      alt: "Composite Bridge Construction Assam",
      isVideo: false
    },
    {
      id: 6,
      title: "Foot Over Bridge",
      location: "Guwahati",
      serviceId: "bridge",
      category: "Bridge Engineering",
      src: "/images/gallery/image.png",
      alt: "Foot Over Bridge Guwahati",
      isVideo: false
    },
    {
      id: 7,
      title: "Industrial Shed",
      location: "Assam",
      serviceId: "steel",
      category: "Steel Structures",
      src: "/images/gallery/image copy.png",
      alt: "Industrial Steel Shed Assam",
      isVideo: false
    },

    {
      id: 9,
      title: "PEB Manufacturing Unit",
      location: "Guwahati, Assam",
      serviceId: "peb",
      category: "PEB Buildings",
      src: "/images/gallery/image copy 4.png",
      alt: "PEB Building Guwahati",
      isVideo: false
    }
  ],
  homeProjects: [
    { id: 1, src: "/images/gallery/image.png", alt: "Railway Bridge Construction Guwahati", className: "md:col-span-2" },
    { id: 2, src: "/images/gallery/image copy.png", alt: "Industrial Steel Structure Assam", className: "md:col-span-2" },
    { id: 3, src: "/images/gallery/image copy 2.png", alt: "PEB Building Project Guwahati", className: "md:col-span-2", isVideo: true },
    { id: 4, src: "/images/gallery/image copy 3.png", alt: "Highway Bridge Construction Assam", className: "md:col-span-2" },
    { id: 5, src: "/images/gallery/image copy 4.png", alt: "Steel Warehouse Construction", className: "md:col-span-2" },
    { id: 6, src: "/images/gallery/image copy 5.png", alt: "Infrastructure Project Northeast India", className: "md:col-span-2" },
  ]
};

export const newLaunchesData = [
  {
    id: "multi-span-bridge",
    title: "Multi-Span Composite Bridge",
    description: "Strategic infrastructure project connecting remote regions in Upper Assam.",
    longDescription: "Our Multi-Span Composite Bridge design integrates the strength of steel with the durability of concrete. Designed specifically for the challenging terrains of Upper Assam, it showcases advanced engineering that allows for long, unimpeded spans over difficult waterways and deep valleys. This project significantly reduces travel time and boosts local economic growth.",
    features: ["High Load Capacity", "Earthquake Resistant Design", "Rapid Construction Time", "Corrosion Resistant Coatings"],
    specifications: [
      { label: "Span Length", value: "Up to 80m per span" },
      { label: "Material", value: "High-grade structural steel and reinforced concrete" },
      { label: "Design Life", value: "100+ Years" },
      { label: "Application", value: "Highway and Railway Crossings" }
    ],
    image: "https://images.unsplash.com/photo-1517089534702-3de54906ec30?q=80&w=2070&auto=format&fit=crop",
    region: "Assam Region",
    type: "Latest Launch",
  },
  {
    id: "industrial-shed",
    title: "Large-Scale Industrial Shed",
    description: "Modern warehousing facility with 40,000 sq.ft coverage and PEB technology.",
    longDescription: "Engineered for maximum space utilization and operational efficiency, this large-scale industrial shed utilizes state-of-the-art Pre-Engineered Building (PEB) technology. The structure is tailored to withstand extreme weather conditions while providing a vast, clear-span interior suitable for modern manufacturing and warehousing logistics.",
    features: ["Clear-Span Interior", "Energy Efficient Ventilation", "Heavy-Duty Flooring Capable", "Fast-track Installation"],
    specifications: [
      { label: "Total Area", value: "40,000 sq.ft" },
      { label: "Structure Type", value: "Pre-Engineered Building (PEB)" },
      { label: "Eave Height", value: "12 meters" },
      { label: "Cladding", value: "High-strength Galvalume panels" }
    ],
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=2070&auto=format&fit=crop",
    region: "Guwahati HUB",
    type: "New Addition",
  }
];

export const featuredProductsData = [
  {
    id: "portable-peb",
    title: "Portable PEB Residential Houses",
    specs: "1 BHK, 2 BHK, 3 BHK",
    description: "Experience the future of housing with our portable PEB residential units. Combining the speed of pre-engineered construction with the comfort of modern living, these homes are designed to be durable, eco-friendly, and quickly deployable to any location. Perfect for remote site offices or emergency housing.",
    features: ["Quick Assembly & Disassembly", "Superior Thermal Insulation", "Customizable Floor Plans", "Weather-resistant Exterior"],
    icon: <Home className="w-5 h-5 text-accent" />,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "movable-sheds",
    title: "Movable Sheds (Multipurpose)",
    specs: "100 sqm onwards",
    description: "Our multipurpose movable sheds offer incredible versatility for industrial, commercial, and agricultural applications. Built with robust steel frames and premium cladding, they can be easily relocated or expanded as your spatial requirements change.",
    features: ["Modular Expansion", "High Wind Resistance", "Minimal Foundation Required", "Relocatable Design"],
    icon: <Factory className="w-5 h-5 text-accent" />,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "multipurpose-containers",
    title: "Multipurpose Industrial Containers",
    specs: "500 Ltr to 10,000 Ltrs.",
    description: "Engineered to safely store and transport a wide range of materials, including liquids, chemicals, and bulk solids. These heavy-duty industrial containers are fabricated from specialized metals designed to withstand harsh industrial environments.",
    features: ["Corrosion-Resistant Coating", "Custom Valve Fittings", "High Impact Strength", "Stackable Designs"],
    icon: <Server className="w-5 h-5 text-accent" />,
    image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "readymade-staircases",
    title: "Readymade Modern Staircases",
    specs: "1 set onwards",
    description: "Upgrade any commercial or industrial facility rapidly with our readymade steel staircases. Manufactured to strict safety tolerances in our facility, they arrive ready for immediate installation, saving significant time on-site.",
    features: ["Anti-Slip Treads", "Compliance with Safety Standards", "Powder-Coated Finish", "Bolt-on Assembly (No On-site Welding)"],
    icon: <Package className="w-5 h-5 text-accent" />,
    image: "https://images.unsplash.com/photo-1505069190533-da1c9af13346?q=80&w=2070&auto=format&fit=crop",
  }
];
