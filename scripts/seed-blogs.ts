import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  featuredImage: string;
  tags: string[];
  publishDate: string;
  status: "draft" | "published";
  createdAt: number;
  updatedAt: number;
}

const blogs: Omit<BlogPost, "content">[] = [
  {
    id: "the-rise-of-pre-engineered-buildings-in-northeast-india",
    title: "The Rise of Pre-Engineered Buildings (PEBs) in Northeast India: A Sustainable and Seismic-Resilient Choice",
    author: "Structro Engineering Team",
    featuredImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
    tags: ["peb", "infrastructure", "assam", "construction"],
    publishDate: "2026-05-10",
    status: "published",
    createdAt: Date.now() - 3600000 * 2, // 2 hours ago
    updatedAt: Date.now(),
  },
  {
    id: "designing-earthquake-resistant-steel-structures-assam",
    title: "Designing Earthquake-Resistant Steel Structures: Crucial Standards for Assam and Seismic Zone V",
    author: "Structro Design & Engineering",
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070",
    tags: ["engineering", "seismic", "safety", "steel"],
    publishDate: "2026-05-08",
    status: "published",
    createdAt: Date.now() - 3600000 * 24 * 2, // 2 days ago
    updatedAt: Date.now(),
  },
  {
    id: "guwahati-gateway-modern-warehouses-logistics-hubs",
    title: "Guwahati as the Gateway: How Modern Warehouses and Logistics Hubs are Driving Trade",
    author: "Structro Business Insights",
    featuredImage: "https://images.unsplash.com/photo-1531306728370-e2ebd0ea0b4f?q=80&w=2070",
    tags: ["warehousing", "logistics", "guwahati", "commerce"],
    publishDate: "2026-05-05",
    status: "published",
    createdAt: Date.now() - 3600000 * 24 * 5, // 5 days ago
    updatedAt: Date.now(),
  },
  {
    id: "engineering-steel-truss-bridges-northeast-connectivity",
    title: "The Engineering Behind Steel Truss Bridges: Connecting the Highlands and Valleys of Northeast India",
    author: "Structro Bridge Division",
    featuredImage: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2070",
    tags: ["bridge", "infrastructure", "assam", "highways"],
    publishDate: "2026-04-28",
    status: "published",
    createdAt: Date.now() - 3600000 * 24 * 12, // 12 days ago
    updatedAt: Date.now(),
  },
  {
    id: "turnkey-steel-engineering-efficiency-vs-traditional",
    title: "Unlocking Efficiency: Why Turnkey Steel Engineering Outperforms Traditional Construction Models",
    author: "Structro Executive Desk",
    featuredImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
    tags: ["construction", "management", "quality", "turnkey"],
    publishDate: "2026-04-20",
    status: "published",
    createdAt: Date.now() - 3600000 * 24 * 20, // 20 days ago
    updatedAt: Date.now(),
  },
];

// Content structures for each blog, with paragraph breaks
const blogContents: Record<string, string> = {
  "the-rise-of-pre-engineered-buildings-in-northeast-india": 
    "The industrial landscape of Northeast India is undergoing a massive transformation, driven by rapid urbanization, enhanced connectivity, and the expansion of trade routes. In states like Assam, Meghalaya, and Manipur, traditional concrete construction is increasingly taking a backseat to a modern engineering marvel: Pre-Engineered Buildings (PEBs). Designed, fabricated, and pre-assembled in state-of-the-art factories before being transported to the site, PEBs offer unprecedented efficiency, versatility, and speed. For a region that requires robust industrial facilities, cold storages, and warehouses to support its growing economy, PEBs are proving to be the ideal architectural choice.\n\n" +
    "One of the most critical factors driving the adoption of PEBs in Northeast India is their remarkable seismic resilience. The entire region is classified under Seismic Zone V, the highest earthquake-risk category in the country. Conventional concrete structures can be brittle and susceptible to cracking under severe seismic forces. In contrast, structural steel is inherently ductile and flexible. Our engineering designs conform strictly to IS 1893:2016 standards. By utilizing high-strength steel frames, proper base plate anchoring, and cross-bracing systems, PEB structures can absorb and dissipate seismic energy, ensuring maximum safety for personnel and assets.\n\n" +
    "In addition to safety, the construction timeline for a PEB is significantly faster than traditional concrete methods. A standard 10,000 square foot industrial warehouse can be designed, fabricated, and erected in less than 12 weeks. This rapid turnaround is crucial for businesses aiming to capitalize on Northeast India's emerging market opportunities. Furthermore, the single-window turnkey execution model offered by companies like Structro Infratech ensures that site surveying, foundation work, steel fabrication, and cladding are fully integrated. This eliminates the coordination issues and delays typically associated with multi-contractor projects.\n\n" +
    "Sustainability is another major advantage of Pre-Engineered Buildings. Steel is one of the most recycled materials on earth, and the precise manufacturing of PEB components in a controlled factory environment ensures near-zero material waste. Additionally, our PEB designs incorporate eco-friendly elements such as natural ventilation systems, skylights for daylight harvesting, and high-performance insulated wall and roof panels (PUF panels). These features significantly reduce the long-term energy consumption of warehouses and manufacturing plants, helping businesses achieve their sustainability goals while reducing operational costs.",

  "designing-earthquake-resistant-steel-structures-assam":
    "Building safe, long-lasting structures in Assam and the wider Northeast region requires a deep understanding of structural dynamics and geological conditions. Since the region falls under Seismic Zone V, every structure—whether an industrial shed, a commercial complex, or a heavy-duty bridge—must be engineered to withstand severe seismic tremors. At Structro Infratech, we implement cutting-edge structural engineering methodologies to ensure that our steel designs provide superior durability and seismic protection, adhering to India's strict building codes.\n\n" +
    "The cornerstone of seismic design in India is the IS 1893:2016 code, which details criteria for earthquake-resistant design of structures. For steel buildings, this code is utilized in tandem with IS 800:2007, the code of practice for general construction in steel. Our structural designers use advanced 3D finite element analysis (FEA) software to simulate earthquake loads and analyze structural behavior. By optimizing the distribution of mass and stiffness, we minimize torsional effects and structural drift, creating a balanced skeleton capable of weathering tectonic movements without suffering catastrophic failure.\n\n" +
    "Ductility is the primary mechanical property that makes structural steel the ultimate material for earthquake-resistant design. While concrete tends to crack and collapse under sudden tension, steel possesses high tensile strength and can deform plastically without breaking. In our fabrication facilities, we utilize high-quality steel grades conforming to IS 2062, sourced from premier Indian manufacturers like SAIL, JSPL, and Tata Steel. This premium material, combined with precise weld details and high-strength friction grip (HSFG) bolts, allows our structural joints to absorb stress and maintain structural integrity during an earthquake.\n\n" +
    "In addition to material properties, the implementation of specific structural configurations plays a vital role in seismic safety. We employ sophisticated bracing systems—such as Concentrically Braced Frames (CBFs) and Eccentrically Braced Frames (EBFs)—to provide lateral stiffness. These braces act as structural fuses, absorbing seismic energy and protecting the primary columns and beams from damage. Proper foundation engineering, including robust pile foundations and anchored base plates, further anchors the steel structures to the unique soil conditions of the Brahmaputra valley, ensuring a stable and reliable foundation.\n\n" +
    "By prioritizing stringent quality checks, certified welding processes, and non-destructive testing (NDT), we bridge the gap between design theory and on-site reality. For developers, industrialists, and public agencies in Assam, investing in professional, code-compliant steel engineering is not just a regulatory requirement; it is a critical measure to protect human lives and secure high-value industrial investments for decades to come.",

  "guwahati-gateway-modern-warehouses-logistics-hubs":
    "Guwahati, strategically nestled on the banks of the mighty Brahmaputra, has earned its reputation as the 'Gateway to Northeast India.' As the primary commercial hub of the region, the city acts as the distribution nerve center for seven states and is a crucial link in India's Act East policy. In recent years, the demand for modern, organized warehousing and logistics infrastructure in Guwahati has surged exponentially. Driven by the e-commerce boom, retail expansion, and industrial policies, businesses are actively upgrading from traditional masonry godowns to state-of-the-art industrial hubs.\n\n" +
    "Traditional warehouses often suffer from low clear heights, poor ventilation, and vulnerability to the humid, high-rainfall climate of Assam. Modern logistics operators require high-ceiling structures (typically 9 to 12 meters clear height) to accommodate vertical racking systems and maximize storage density. Pre-Engineered Steel Buildings (PEBs) provide the perfect answer to these requirements. By utilizing high-tensile steel rafters and purlins, PEBs can achieve massive column-free spans (often exceeding 50 meters), allowing for uninterrupted material flow, efficient forklift movement, and flexible layout planning.\n\n" +
    "Weatherproofing and temperature control are also crucial for preserving high-value goods and agricultural produce in Northeast India's warm, wet environment. Our warehouse designs incorporate specialized standing-seam roofing systems that offer 100% leak-proof performance, eliminating the risk of water damage during the heavy monsoon season. For temperature-sensitive items, we construct cold storage units and climate-controlled chambers using insulated polyurethane foam (PUF) panels. These energy-efficient panels maintain stable internal temperatures, preventing spoilage and ensuring that food products, pharmaceuticals, and perishable goods remain fresh.\n\n" +
    "Furthermore, the location of logistics hubs near Guwahati's major transport corridors—such as the National Highway 37 bypass, Changsari, and Palashbari—demands durable construction that can withstand heavy traffic and intense cargo loading. Our turnkey logistics projects include high-load industrial flooring (such as laser-screed concrete floors with steel fiber reinforcement) alongside our heavy steel structural framing. This comprehensive engineering approach ensures that the entire facility, from the ground up, is optimized for high-intensity commercial operations, minimizing maintenance shutdowns and maximizing long-term profitability.\n\n" +
    "As the government continues to invest in infrastructure projects like multi-modal logistics parks and dedicated freight corridors, Guwahati's role as a regional trade gateway will only strengthen. For businesses looking to establish a footprint in this lucrative market, partner with an ISO 9001:2015 certified steel engineering specialist like Structro Infratech. We deliver modern, secure, and highly functional warehousing solutions that align with international standards, helping you streamline your supply chain and drive regional growth.",

  "engineering-steel-truss-bridges-northeast-connectivity":
    "Northeast India is a region defined by its breathtaking but incredibly challenging geography. Majestic mountains, deep river valleys, and heavy seasonal rainfall make connectivity a persistent challenge. Bridging these natural barriers is essential for economic integration, defense logistics, and improving the quality of life for local communities. Among the various bridging technologies available, Steel Truss Bridges have emerged as the backbone of the region's transport networks, serving as reliable links across the Brahmaputra and its numerous tributaries.\n\n" +
    "A steel truss bridge relies on a framework of interconnected triangular members, which efficiently distributes loads through tension and compression forces. This geometric efficiency allows truss bridges to span long distances while using significantly less material than solid bridge structures, making them highly cost-effective and structurally superior. In the rugged terrains of Meghalaya, Nagaland, and Arunachal Pradesh, where transporting heavy concrete components is logistically difficult, modular steel truss members can be fabricated in our Guwahati workshop, transported in manageable sections, and assembled on-site with high precision.\n\n" +
    "Fabricating bridge structures requires the highest level of engineering expertise and quality control. At Structro Infratech, we utilize high-strength structural steel conforming to Indian standards such as IS 2062 Grade E250 or E350. The steel plates and profiles undergo rigorous surface preparation, including automatic shot blasting to achieve an SA 2.5 profile, followed by the application of multi-coat epoxy primer and polyurethane finish paints to combat corrosion in high-humidity zones. Every single weld is subjected to non-destructive testing (NDT), including ultrasonic and radiographic inspections, ensuring zero defects in critical load-bearing joints.\n\n" +
    "On-site erection of steel bridges in Northeast India presents unique challenges, particularly during the monsoon when river currents are swift and unpredictable. Our bridge division utilizes advanced erection techniques, such as the cantilever launching method, which allows the bridge to be pushed across the piers from one bank without the need for extensive scaffolding in the riverbed. This minimizes environmental disruption, protects workers from hazardous water conditions, and ensures that projects can proceed even during high-water seasons. Our compliance with Indian Road Congress (IRC) and PWD specifications guarantees that every bridge is built to last.\n\n" +
    "From modular footover bridges in bustling Guwahati to heavy-duty railway and road bridges in remote districts, steel engineering is the unsung hero of Northeast connectivity. Every bridge completed is a testament to the perseverance of our engineering teams and our commitment to building a safer, more connected nation. As we continue to collaborate with government agencies like NHAI, NHIDCL, and State PWDs, we look forward to engineering new pathways of progress across this beautiful region.",

  "turnkey-steel-engineering-efficiency-vs-traditional":
    "When undertaking a large-scale industrial or infrastructure project, developers are faced with a crucial decision: how to structure their design and construction contracts. Under the traditional Design-Bid-Build model, a client must separately hire an architect, a structural designer, a fabrication vendor, and a civil contractor. While this fragmented approach was once the norm, it often leads to miscommunications, design discrepancies, budget overruns, and finger-pointing when delays occur. To address these inefficiencies, forward-thinking enterprises are choosing the Turnkey Steel Engineering model.\n\n" +
    "Turnkey execution—also known as Design-Build—unifies all phases of a project under a single point of responsibility. From initial site survey and architectural drafting to 3D structural modeling, factory fabrication, civil foundation work, and final on-site erection, every detail is managed by one integrated team. For projects involving sophisticated steel structures like Pre-Engineered Buildings (PEBs) or heavy industrial process plants, this model is highly effective. It ensures that the structural designs are optimized specifically for the fabricator's machinery, eliminating the 're-work' that commonly occurs when a third-party design is modified for production.\n\n" +
    "One of the greatest benefits of turnkey steel engineering is the massive reduction in project timelines. In traditional models, fabrication cannot begin until the bidding process is complete and civil foundations are partially poured. In a turnkey model, design and fabrication can occur concurrently with site excavation and foundation work. While the civil team is preparing the site in Guwahati, the fabrication plant is already manufacturing the columns, rafters, and purlins. By the time the foundations are cured, the structural steel arrives on-site, ready for immediate assembly, reducing total construction time by up to 30% to 40%.\n\n" +
    "Quality Assurance and Quality Control (QA/QC) are also significantly enhanced in a turnkey model. Since the same engineering firm is responsible for both manufacturing and erection, there is a continuous chain of custody and accountability. Our QA/QC protocols are ISO 9001:2015 certified, requiring rigorous inspection at every milestone. This includes raw steel ultrasonic testing, automated welding quality checks, shot blasting verification, paint thickness measurements using DFT gauges, and pre-dispatch dimensional checks. When the steel reaches the site, our erection teams utilize calibrated torque wrenches to verify all structural bolt connections, delivering a flawless, high-performance structure.\n\n" +
    "Ultimately, the turnkey steel engineering model offers peace of mind, financial predictability, and superior structural quality. By partnering with an experienced, single-source engineering expert like Structro Infratech, clients eliminate the administrative burden of managing multiple vendors and receive a high-strength, durable facility tailored to their exact operational requirements. Whether you are building a manufacturing facility, a multi-story commercial complex, or an infrastructure bridge, turnkey execution is the smartest way to bring your vision to life.",
};

async function seedBlogs() {
  console.log("🚀 Starting blogs database seeding...");

  // Clear existing blogs first
  const existingSnapshot = await db.collection("blogs").get();
  if (!existingSnapshot.empty) {
    console.log(`🗑️  Deleting ${existingSnapshot.size} existing blog(s)...`);
    const batch = db.batch();
    existingSnapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    console.log("✅ Existing blogs cleared.");
  }

  // Insert new high-value, SEO-optimized blogs
  for (const blog of blogs) {
    const fullBlog = {
      ...blog,
      content: blogContents[blog.id],
    };
    
    // Use the keyword-rich slug as the document ID for maximum SEO value
    await db.collection("blogs").doc(blog.id).set(fullBlog);
    console.log(`  ✔ Seeded: "${blog.title.slice(0, 60)}..."`);
    console.log(`     URL Path: /blogs/${blog.id}`);
  }

  console.log(`\n✅ Seeding complete! ${blogs.length} highly authoritative blogs successfully pushed to the database.`);
}

seedBlogs().catch(console.error);
