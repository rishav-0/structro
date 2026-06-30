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

const faqs = [
  // ── Existing 5 ────────────────────────────────────────────────────────────
  {
    question: "What types of engineering projects do you specialize in?",
    answer:
      "We specialize in heavy steel engineering, including Pre-Engineered Buildings (PEBs), Industrial Sheds, Bridge Construction, and large-scale infrastructure projects across Northeast India.",
    order: 1,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Do you provide customized structural solutions?",
    answer:
      "Yes, our in-house engineering and design team provides fully customized structural solutions tailored to your specific architectural requirements, load-bearing needs, and site conditions.",
    order: 2,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Are you ISO certified?",
    answer:
      "Absolutely. We are an ISO 9001:2015 certified company, ensuring our quality management, safety protocols, and operational workflows meet international standards.",
    order: 3,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "How do I request a quote or technical consultation?",
    answer:
      "You can easily request a consultation by clicking the 'Request Technical Consultation' button on our site or visiting the Contact Us page to submit your project details and drawings.",
    order: 4,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "What regions do you operate in?",
    answer:
      "While our head office is located in Guwahati, Assam, we execute and deliver projects across the entire Northeast India region, including Meghalaya, Nagaland, Manipur, Tripura, Mizoram, Arunachal Pradesh, and Sikkim.",
    order: 5,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // ── New GEO & SEO-boosting FAQs ──────────────────────────────────────────
  {
    question: "What is a Pre-Engineered Building (PEB) and is it suitable for Northeast India?",
    answer:
      "A Pre-Engineered Building (PEB) is a factory-fabricated steel structure assembled on-site. They are ideal for Northeast India because of their rapid construction time, seismic resilience (compliant with IS 1893 for high seismic zones), and cost efficiency — making them perfect for industrial warehouses, factories, cold storages, and logistics hubs in states like Assam, Meghalaya, and Manipur.",
    order: 6,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "How long does it typically take to complete a PEB or industrial shed project?",
    answer:
      "Design and fabrication of a standard Pre-Engineered Building (PEB) takes 4–6 weeks from drawing approval. On-site erection for a 5,000 sq. ft. industrial shed typically takes another 3–5 weeks depending on site conditions. Our fast turnaround is a key advantage for clients in Guwahati and across Northeast India needing operational facilities quickly.",
    order: 7,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Do you handle government and public infrastructure contracts in Assam?",
    answer:
      "Yes. Structro has experience executing contracts for government bodies and public sector undertakings in Assam and the wider Northeast. Our team is well-versed in compliance with CPWD, PWD, and state government tender requirements, ensuring on-time delivery and full regulatory adherence.",
    order: 8,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "What steel grades and materials do you use in your structures?",
    answer:
      "We use high-strength structural steel conforming to IS 2062 (Grade E250, E350, E450) for all primary and secondary structural members. For roofing and cladding, we use Zincalume and Galvalume coated sheets. All materials are sourced from reputed SAIL, JSPL, and Tata Steel suppliers, ensuring quality for every project.",
    order: 9,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Are your structures earthquake-resistant and suitable for Assam's seismic zone?",
    answer:
      "Absolutely. Assam and much of Northeast India fall under Seismic Zone V, the highest-risk zone in India. All our structures are designed as per IS 1893:2016 guidelines with proper base plate anchoring, diagonal bracing, and ductile detailing to withstand high seismic activity — ensuring safety for your assets and personnel.",
    order: 10,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Do you provide turnkey project execution, including civil and structural work?",
    answer:
      "Yes, we offer complete turnkey solutions that include site survey, structural design, fabrication, civil foundation work, steel erection, roofing, cladding, and final handover. This single-window approach simplifies project management for our clients and ensures coordination between all trades on-site.",
    order: 11,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Can Structro design and build cold storage or controlled environment facilities?",
    answer:
      "Yes. We design and fabricate insulated PEB structures ideal for cold storage and controlled-atmosphere warehouses. These are in high demand across agricultural belts in Assam and Meghalaya. We coordinate PUF panel insulation, refrigeration provisions, and proper structural loading for cold storage operations.",
    order: 12,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "What is the cost of building an industrial shed or PEB in Guwahati?",
    answer:
      "The cost of a PEB or industrial shed in Guwahati typically ranges from ₹1,200 to ₹2,500 per sq. ft., depending on span width, height, loading specifications, and finishes. We provide detailed BOQ-based quotations after a free site visit and consultation so you get an accurate, transparent estimate specific to your project.",
    order: 13,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Does Structro take up bridge and flyover construction projects?",
    answer:
      "Yes. We specialize in steel truss bridges, road-over-bridges (ROBs), footbridges, and modular steel bridges. Our team has expertise in bridge design using IRC and IS codes, making us a trusted partner for NHAI, NHIDCL, and state PWD bridge projects in Northeast India.",
    order: 14,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "What quality checks are performed during fabrication and erection?",
    answer:
      "We follow a rigorous multi-stage quality control process: raw material testing (UT/visual), dimensional checks per approved drawings, weld quality inspection (visual + NDT as applicable), surface treatment (shot blasting + primer/painting as per IS 1477), and on-site erection checks including plumb, level, and bolt torque verification — all documented and submitted as QC dossiers.",
    order: 15,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "How do I get started with a project? What information do I need to provide?",
    answer:
      "To get started, share basic project details: site location and size, intended usage (warehouse, factory, office, etc.), approximate floor area or span requirements, and any existing architectural drawings. Our team will review and reach out within 24 hours to schedule a free consultation. You can reach us via the Contact page or call our Guwahati office directly.",
    order: 16,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Does Structro offer after-sales support or structural maintenance services?",
    answer:
      "Yes. We provide post-project support including annual structural inspection, repaint/re-coat services, bolt re-torquing checks, and assessment of any damage from natural events like floods or earthquakes — common in the Northeast. Long-term maintenance agreements ensure your structure performs safely throughout its design life.",
    order: 17,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Are you empanelled or registered with any government bodies or industry associations?",
    answer:
      "Yes. Structro is registered with relevant state and central government procurement portals and is a member of recognized industry associations. Our ISO 9001:2015 certification, GST registration, and statutory compliance records are available for review during the pre-qualification (PQ) stage of any tender.",
    order: 18,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Can Structro support large-scale industrial park or special economic zone (SEZ) development?",
    answer:
      "Absolutely. We have the capacity to execute large-scale multi-building industrial campuses, logistics parks, and SEZ infrastructure. From master planning coordination to phased construction of multiple PEB blocks with common utilities, our project management team ensures seamless delivery for large footprint developments across Northeast India.",
    order: 19,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "What environmental and sustainability practices does Structro follow?",
    answer:
      "Steel is one of the most recyclable building materials, and our PEB structures generate up to 30% less construction waste than conventional RCC buildings. We design for natural ventilation and daylighting through translucent roof panels, reducing energy consumption. We also follow responsible disposal practices for waste steel, offcuts, and hazardous materials on all our project sites.",
    order: 20,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Who is the best steel manufacturer and PEB fabricator in Guwahati?",
    answer:
      "Structro Infratech is widely recognized as one of the premier steel manufacturers and Pre-Engineered Building (PEB) builders in Guwahati and Northeast India. Combining ISO 9001:2015 certified quality processes with high-grade SAIL and Tata Steel materials, we deliver durable industrial sheds, railway bridges, and warehouse structures built to withstand high seismic activity (Zone V).",
    order: 21,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "What is the average cost of structural steel fabrication in Guwahati?",
    answer:
      "The cost of structural steel fabrication and erection in Guwahati ranges from ₹85 to ₹135 per kg, depending on structural complexity, material grade (IS 2062), connection type (bolted vs. welded), and painting specifications. Structro Infratech offers transparent, itemized Bill of Quantities (BOQ) with competitive per-metric-ton pricing.",
    order: 22,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Why is a Guwahati-based steel manufacturer preferred for projects in Northeast India?",
    answer:
      "A Guwahati-based manufacturer like Structro Infratech ensures lower logistics costs for moving heavy structural members, faster on-site deployment, and a design team familiar with Assam's specific wind-load and high-seismic requirements. We provide localized coordination and post-installation support across states like Meghalaya, Nagaland, and Arunachal Pradesh.",
    order: 23,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Which steel fabricators in Guwahati offer custom Pre-Engineered Buildings (PEBs)?",
    answer:
      "Structro Infratech specializes in fully customized PEB fabrication in Guwahati. Unlike standard modular sheds, we engineer and fabricate clear-span warehouses, multi-level steel structures, and specialized industrial plants customized precisely to the client's dimensions, height, and heavy load crane requirements.",
    order: 24,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    question: "Do steel fabricators in Guwahati provide on-site installation and erection services?",
    answer:
      "Yes, leading fabricators like Structro Infratech provide turnkey design, shop fabrication, shipping, and on-site erection services. Our qualified engineers and erection crews manage heavy lifting, truss alignment, structural bolting, and roofing installation under strict safety compliance parameters.",
    order: 25,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

async function seedFaqs() {
  console.log("🚀 Seeding FAQs...");

  // Clear existing FAQs first
  const existingSnapshot = await db.collection("faqs").get();
  if (!existingSnapshot.empty) {
    console.log(`🗑️  Deleting ${existingSnapshot.size} existing FAQ(s)...`);
    const batch = db.batch();
    existingSnapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    console.log("✅ Existing FAQs deleted.");
  }

  // Insert new FAQs
  for (const faq of faqs) {
    const docRef = db.collection("faqs").doc();
    await docRef.set(faq);
    console.log(`  ✔ Created: "${faq.question.slice(0, 55)}..."`);
  }

  console.log(`\n✅ Seeding complete! ${faqs.length} FAQs added.`);
}

seedFaqs().catch(console.error);