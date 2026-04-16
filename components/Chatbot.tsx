"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, ChevronDown } from "lucide-react";

// ─── Knowledge Base ─────────────────────────────────────────────────────────
// All website details embedded as structured data for the chatbot.

const COMPANY_INFO = {
  name: "Structro Infratech",
  tagline: "Connecting dreams through quality construction since 2000",
  description:
    "A leading steel engineering company in Northeast India, specializing in bridge construction, PEB buildings, and industrial infrastructure.",
  founded: "Early 2000s",
  registered: "July 6, 2018",
  iso: "ISO 9001:2015 Certified",
  foundedBy: "4 experienced professionals",
  philosophy:
    "Structro Infra Tech exists to build responsibly, safely, and with integrity.",
  principles: [
    "Disciplined execution and ethical practices.",
    "Strong focus on risk management and safety.",
    "Long-term partnerships built on trust and performance.",
    "Commitment to innovation, sustainability, and continuous people development.",
    "Creating enduring value in every project undertaken.",
  ],
  stats: {
    projects: "500+",
    years: "25+",
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
};

const CONTACT_INFO = {
  phones: ["+91-9678027684"],
  email: "structro.infratech@gmail.com",
  headOffice:
    "1st Floor, Silver Square, Christian Basti, G.S Road, Guwahati, Assam - 781005",
  workshop: "Guwahati-Accoland-Rani Rd, South Rani, Guwahati-31",
  hours: "Mon - Sat: 9AM - 6PM | Sun: Closed",
  whatsapp: "+91-9678027684",
};

const SERVICES = [
  {
    id: "bridge",
    title: "Bridge Engineering",
    desc: "We specialize in designing and constructing various types of bridges with precision engineering and modern technology.",
    types: [
      "Open Web Girder (OWG)",
      "Composite Girder Bridge",
      "Arch Bridge",
      "Suspension Bridge",
      "Cable-Stayed Bridge",
      "Road Over Bridge (ROB)",
      "Foot Over Bridge (FOB)",
      "Railway Bridges",
      "Highway Bridges",
      "Truss Bridges",
    ],
  },
  {
    id: "peb",
    title: "PEB (Pre-Engineered Buildings)",
    desc: "Pre-Engineered Buildings (PEB) are steel structures built over a structural concept of primary members, secondary members, and roof/wall sheeting.",
    advantages: [
      "Reduced Construction Time",
      "Lower Cost",
      "Flexibility of Expansion",
      "Large Clear Spans (up to 80m)",
      "Quality Control (factory conditions)",
      "Low Maintenance",
    ],
    applications:
      "Factories, Warehouses, Workshops, Showrooms, Gas Stations, Aircraft Hangars, Schools, Hospitals, Auditoriums, Stadiums, Cold Storages, Shopping Malls, Multi-story Buildings",
  },
  {
    id: "steel",
    title: "Steel Structures",
    desc: "Robust steel structures and industrial sheds designed for durability and functionality.",
    types: [
      "Industrial Warehouses",
      "Conventional Sheds",
      "Commercial Complex",
      "Agricultural Structures",
      "Factory Plants",
      "Aircraft Hangars",
      "Military/Defence Structures",
      "Custom Steel Fabrication",
    ],
  },

  {
    id: "special-metal",
    title: "Special Metal Structures",
    desc: "Specialized fabrication using advanced metals for critical applications requiring high durability and corrosion resistance.",
    types: [
      "SS Structures (Stainless Steel)",
      "Inconel Structure",
      "Custom Metal Fabrication",
    ],
  },
  {
    id: "design",
    title: "Design Services (Engineering)",
    desc: "End-to-end design services from concept to detailed modeling and certification.",
    types: [
      "Engineering Drawings",
      "3D Concept to Modeling (Special)",
      "Testings, Survey and Reports",
      "Estimation & Certification",
    ],
  },
];

const PRODUCTS = [
  { title: "Portable PEB Residential Houses", specs: "1 BHK, 2 BHK, 3 BHK" },
  { title: "Movable Sheds (Multipurpose)", specs: "100 sqm onwards" },
  {
    title: "Multipurpose Industrial Containers",
    specs: "500 Ltr to 10,000 Ltrs",
  },
  { title: "Readymade Modern Staircases", specs: "1 set onwards" },
];

const KEY_PROJECTS = [
  {
    title: "22X61.0M OWG over Koshi River",
    location: "Katihar, Bihar",
    client: "East-Central Railway",
    qty: "~5060 MT",
    period: "2018–2021",
  },
  {
    title: "40.0M ROB at Tuli Zero Point",
    location: "Nagaland",
    client: "NHIDCL",
    qty: "~127 MT",
    period: "2022–2023",
  },
  {
    title: "60.0M ROB at Tsuranga",
    location: "Nagaland",
    client: "NHIDCL",
    qty: "~240 MT",
    period: "2023–2024",
  },
  {
    title: "1x60M BOW String Bridge",
    location: "Manipur-Burma Border",
    client: "NHIDCL, Manipur",
    qty: "~345 MT",
    period: "2022–2023",
  },
  {
    title: "3x18.3M ROB",
    location: "Bokakhat, Assam",
    client: "NRL",
    qty: "~316 MT",
    period: "2024",
  },
  {
    title: "6×18.3+1×61.0M Span OWG over Dhansiri",
    location: "Dimapur, Nagaland",
    client: "N.F Railway",
    qty: "~450 MT",
    period: "2024–2025",
  },
  {
    title: "1x52.0M FOB at BPRD Station",
    location: "Barpeta, Assam",
    client: "N.F Railway",
    qty: "~150 MT",
    period: "2023–2024",
  },
  {
    title: "1x48.0M FOB at BNGN Station",
    location: "Bongaigaon, Assam",
    client: "N.F. Railway",
    qty: "~101 MT",
    period: "2021–2022",
  },
  {
    title: "1x50.0M ROB at Molvom",
    location: "Dimapur, Nagaland",
    client: "Nagaland PWD",
    qty: "~125 MT",
    period: "2025–2026",
  },
  {
    title: "38.0M FOB at Damra",
    location: "Goalpara, Assam",
    client: "NHIDCL",
    qty: "~120 MT",
    period: "2026–Ongoing",
  },
];

const TIMELINE = [
  {
    year: "Early 2000s",
    event: "Founded by four experienced professionals.",
  },
  {
    year: "July 6, 2018",
    event: "Officially registered as a company.",
  },
  {
    year: "2019",
    event: "Achieved ISO 9001:2015 certification.",
  },
  {
    year: "Present",
    event:
      "Industry leader in Assam & NE India with 500+ successful projects.",
  },
];

// ─── Quick Suggestions ──────────────────────────────────────────────────────

const QUICK_SUGGESTIONS = [
  "What services do you offer?",
  "Tell me about your company",
  "How can I contact you?",
  "Show me your projects",
  "What are your products?",
  "Where is your office?",
];

// ─── Chatbot Logic ──────────────────────────────────────────────────────────

interface Message {
  role: "bot" | "user";
  text: string;
}

function getResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste|namaskar)/.test(q)) {
    return `Hello! 👋 Welcome to **Structro Infratech**. I'm here to help you learn about our services, projects, and more.\n\nHow can I assist you today?`;
  }

  // Thanks
  if (/thank|thanks|dhanyavaad/.test(q)) {
    return `You're welcome! 😊 If you have more questions, feel free to ask. You can also reach us at **${CONTACT_INFO.phones[0]}** or visit our [Contact Page](/contact).`;
  }

  // Company / About
  if (/about|company|who are you|what is structro|tell me about|history|story|founded|when was|background/.test(q)) {
    return `🏢 **${COMPANY_INFO.name}**\n\n${COMPANY_INFO.description}\n\n**Founded:** ${COMPANY_INFO.founded} by ${COMPANY_INFO.foundedBy}\n**Registered:** ${COMPANY_INFO.registered}\n**Certification:** ${COMPANY_INFO.iso}\n\n📊 **Key Numbers:**\n• ${COMPANY_INFO.stats.projects} Projects Completed\n• ${COMPANY_INFO.stats.years} Years Experience\n• ${COMPANY_INFO.stats.team} Team Members\n• ${COMPANY_INFO.stats.satisfaction} Client Satisfaction\n\n_"${COMPANY_INFO.tagline}"_\n\nLearn more on our [About Page](/about).`;
  }

  // Values / Principles
  if (/values|principles|core values|philosophy|what do you stand for|integrity|quality|sustainability|innovation/.test(q)) {
    const vals = COMPANY_INFO.values.map((v) => `• **${v.title}:** ${v.desc}`).join("\n");
    return `🌟 **Our Core Values:**\n\n${vals}\n\n**Philosophy:** ${COMPANY_INFO.philosophy}`;
  }

  // Timeline / Milestones
  if (/timeline|milestones|journey|history|when/.test(q)) {
    const tl = TIMELINE.map((t) => `• **${t.year}:** ${t.event}`).join("\n");
    return `📅 **Our Journey:**\n\n${tl}`;
  }

  // Contact
  if (/contact|phone|call|email|reach|address|office|location|where|visit|find you|map/.test(q)) {
    return `📞 **Contact Structro Infratech:**\n\n📱 **Phone:** ${CONTACT_INFO.phones.join(" | ")}\n📧 **Email:** ${CONTACT_INFO.email}\n💬 **WhatsApp:** ${CONTACT_INFO.whatsapp}\n\n🏢 **Head Office:**\n${CONTACT_INFO.headOffice}\n\n🔧 **Workshop:**\n${CONTACT_INFO.workshop}\n\n🕘 **Hours:** ${CONTACT_INFO.hours}\n\nVisit our [Contact Page](/contact) or [find us on Google Maps](https://maps.app.goo.gl/structro).`;
  }

  // Working hours
  if (/hours|timing|open|closed|when do you open|working time/.test(q)) {
    return `🕘 **Working Hours:** ${CONTACT_INFO.hours}\n\nFor urgent queries, call us at **${CONTACT_INFO.phones[0]}** or message on [WhatsApp](https://wa.me/919678027684).`;
  }

  // Services - All
  if (/services|what do you (do|offer)|what services|all services|capabilities/.test(q)) {
    const svcList = SERVICES.map((s) => `• **${s.title}** – ${s.desc.slice(0, 80)}...`).join("\n");
    return `🔧 **Our Services:**\n\n${svcList}\n\nExplore all services on our [Services Page](/services). Ask me about any specific service for more details!`;
  }

  // Bridge Engineering
  if (/bridge|owg|rob |fob |arch bridge|suspension|cable.?stayed|truss|railway bridge|highway bridge|foot over|road over/.test(q)) {
    const svc = SERVICES.find((s) => s.id === "bridge")!;
    const types = svc.types!.map((t) => `• ${t}`).join("\n");
    return `🌉 **${svc.title}**\n\n${svc.desc}\n\n**Bridge Types We Build:**\n${types}\n\nView our bridge projects on the [Projects Page](/projects).`;
  }

  // PEB
  if (/peb|pre.?engineer|pre engineer/.test(q)) {
    const svc = SERVICES.find((s) => s.id === "peb")!;
    const advantages = svc.advantages!.map((a) => `✅ ${a}`).join("\n");
    return `🏗️ **${svc.title}**\n\n${svc.desc}\n\n**Key Advantages:**\n${advantages}\n\n**Applications:** ${svc.applications}\n\nLearn more on our [Services Page](/services).`;
  }

  // Steel
  if (/steel|warehouse|industrial shed|factory shed|fabrication|defence|military|hangar/.test(q)) {
    const svc = SERVICES.find((s) => s.id === "steel")!;
    const types = svc.types!.map((t) => `• ${t}`).join("\n");
    return `🏭 **${svc.title}**\n\n${svc.desc}\n\n**What We Build:**\n${types}`;
  }



  // Special Metal
  if (/special metal|stainless|inconel|ss struct|corrosion/.test(q)) {
    const svc = SERVICES.find((s) => s.id === "special-metal")!;
    const types = svc.types!.map((t) => `• ${t}`).join("\n");
    return `🛡️ **${svc.title}**\n\n${svc.desc}\n\n**Capabilities:**\n${types}`;
  }

  // Design
  if (/design|engineering drawing|3d model|survey|estimation|certification|drafting/.test(q)) {
    const svc = SERVICES.find((s) => s.id === "design")!;
    const types = svc.types!.map((t) => `• ${t}`).join("\n");
    return `📐 **${svc.title}**\n\n${svc.desc}\n\n**Services Include:**\n${types}`;
  }

  // Products
  if (/product|portable|movable|container|staircase|residential house|featured/.test(q)) {
    const prods = PRODUCTS.map((p) => `• **${p.title}** – ${p.specs}`).join("\n");
    return `📦 **Our Featured Products:**\n\n${prods}\n\nContact us for pricing and availability at **${CONTACT_INFO.phones[0]}**.`;
  }

  // Projects
  if (/project|portfolio|completed|ongoing|koshi|tuli|tsuranga|bow string|bokakhat|dhansiri|bprd|bngn|molvom|damra|what have you built/.test(q)) {
    const projList = KEY_PROJECTS.slice(0, 6)
      .map(
        (p) =>
          `• **${p.title}** – ${p.location} (Client: ${p.client}, ${p.qty}, ${p.period})`
      )
      .join("\n");
    return `🏗️ **Key Projects:**\n\n${projList}\n\n...and many more!\n\n📊 Total: **${COMPANY_INFO.stats.projects}** projects completed.\n\nSee all projects on our [Projects Page](/projects).`;
  }

  // ISO / Certification
  if (/iso|certif|quality management|standard/.test(q)) {
    return `🏅 **${COMPANY_INFO.iso}**\n\nStructro Infratech achieved ISO 9001:2015 certification in 2019, demonstrating our commitment to international quality management standards.\n\nThis ensures the highest quality in every project we undertake.`;
  }

  // Stakeholder / Career / Jobs
  if (/career|job|hiring|recruitment|work with|join|stakeholder|contractor|vendor/.test(q)) {
    return `👥 **Stakeholder Portal:**\n\n• **Contractors** – Project tenders & site management\n• **Vendors** – Supply chain & material procurement\n• **Job Seekers** – Career opportunities & applications\n\nVisit our website to access the registration forms, or call us at **${CONTACT_INFO.phones[0]}** for more information.`;
  }

  // Pricing / Quote
  if (/price|cost|quote|estimate|budget|how much|rate/.test(q)) {
    return `💰 For project pricing and quotations, we provide **customized estimates** based on your specific requirements.\n\n📞 Call us: **${CONTACT_INFO.phones[0]}**\n📧 Email: **${CONTACT_INFO.email}**\n\nOr request a technical consultation on our [Contact Page](/contact).`;
  }

  // Location / Area of operation
  if (/area|operate|region|northeast|assam|nagaland|manipur|meghalaya|bihar|where do you work/.test(q)) {
    return `📍 **Area of Operations:**\n\nStructro Infratech operates primarily across **Northeast India**, including:\n• Assam (Guwahati is our headquarters)\n• Nagaland\n• Manipur\n• Bihar\n• And other NE states\n\nWe have successfully delivered projects across these regions.`;
  }

  // Why choose / USP
  if (/why choose|why structro|advantage|usp|benefit|what makes you different|best/.test(q)) {
    return `⭐ **Why Choose Structro Infratech?**\n\n✅ Founded by 4 experienced professionals\n✅ ${COMPANY_INFO.stats.years} years of industry experience\n✅ ${COMPANY_INFO.stats.projects} successful projects\n✅ ${COMPANY_INFO.stats.team} skilled team members\n✅ ${COMPANY_INFO.stats.satisfaction} client satisfaction\n✅ ${COMPANY_INFO.iso}\n✅ Zero compromise on safety and risk management\n✅ Strong presence across Northeast India`;
  }

  // Team / Staff
  if (/team|staff|employee|engineer|people|manpower/.test(q)) {
    return `👷 **Our Team:**\n\nStructro Infratech has a strong team of **${COMPANY_INFO.stats.team}** professionals including:\n• Experienced civil & structural engineers\n• Skilled fabrication workers\n• Project managers\n• Quality inspectors\n• Safety officers\n\nFounded by **4 experienced professionals** with decades of combined expertise.`;
  }

  // Business links
  if (/gem|indiamart|justdial|marketplace|business link/.test(q)) {
    return `🔗 **Business Links:**\n\n• **GeM** (Govt. e-Marketplace) – gem.gov.in\n• **IndiaMART** – indiamart.com\n• **JustDial** – justdial.com\n\nYou can find Structro Infratech on these platforms.`;
  }

  // Safety
  if (/safe|safety|risk|accident|protection/.test(q)) {
    return `🛡️ **Safety at Structro Infratech:**\n\nSafety is paramount in everything we do:\n• Zero compromise on safety standards\n• Strong risk management protocols\n• Rigorous quality checks at every stage\n• ISO 9001:2015 certified processes\n• Regular safety training for all team members`;
  }

  // Fallback
  return `I appreciate your question! While I may not have a specific answer for that, here's how I can help:\n\n🔧 **Services** – Ask about our bridge, PEB, steel, or other services\n🏗️ **Projects** – Learn about our completed projects\n📞 **Contact** – Get our phone, email, or address\n🏢 **Company** – Learn about Structro Infratech\n📦 **Products** – See our featured products\n\nOr call us directly at **${CONTACT_INFO.phones[0]}** for personalized assistance!`;
}

// ─── Simple Markdown Renderer ───────────────────────────────────────────────

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold
    let processed: React.ReactNode[] = [];

    const temp = line;
    // Handle italic
    const italicLine = temp.replace(/_(.*?)_/g, "«ITALIC»$1«/ITALIC»");

    // Handle links
    const linkLine = italicLine.replace(
      /\[(.*?)\]\((.*?)\)/g,
      "«LINK»$1«HREF»$2«/LINK»"
    );

    // Split by bold
    const parts = linkLine.split(/(\*\*.*?\*\*)/g);
    processed = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const content = part.slice(2, -2);
        return (
          <strong key={j} className="font-bold text-gray-900">
            {content}
          </strong>
        );
      }

      // Handle italic markers
      const italicParts = part.split(/(«ITALIC».*?«\/ITALIC»)/g);
      return italicParts.map((ip, k) => {
        if (ip.startsWith("«ITALIC»") && ip.endsWith("«/ITALIC»")) {
          const content = ip.replace("«ITALIC»", "").replace("«/ITALIC»", "");
          return (
            <em key={`${j}-${k}`} className="italic text-gray-500">
              {content}
            </em>
          );
        }

        // Handle link markers
        const linkParts = ip.split(/(«LINK».*?«\/LINK»)/g);
        return linkParts.map((lp, l) => {
          if (lp.startsWith("«LINK»") && lp.endsWith("«/LINK»")) {
            const linkContent = lp.replace("«LINK»", "").replace("«/LINK»", "");
            const [text, href] = linkContent.split("«HREF»");
            return (
              <a
                key={`${j}-${k}-${l}`}
                href={href}
                className="text-[oklch(0.6_0.22_24)] underline hover:opacity-80 font-medium"
              >
                {text}
              </a>
            );
          }
          return <span key={`${j}-${k}-${l}`}>{lp}</span>;
        });
      });
    });

    if (line.trim() === "") {
      return <br key={i} />;
    }

    return (
      <p key={i} className="leading-relaxed">
        {processed}
      </p>
    );
  });
}

// ─── Component ──────────────────────────────────────────────────────────────

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: `Hello! 👋 Welcome to **Structro Infratech**.\n\nI can help you with information about our **services**, **projects**, **contact details**, and more.\n\nWhat would you like to know?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text || input).trim();
      if (!msg) return;

      setMessages((prev) => [...prev, { role: "user", text: msg }]);
      setInput("");
      setIsTyping(true);

      // Simulate typing delay for realism
      setTimeout(() => {
        const response = getResponse(msg);
        setMessages((prev) => [...prev, { role: "bot", text: response }]);
        setIsTyping(false);
      }, 600 + Math.random() * 800);
    },
    [input]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group ${
          isOpen
            ? "bg-gray-800 hover:bg-gray-700 rotate-0"
            : "bg-[oklch(0.6_0.22_24)] hover:bg-[oklch(0.55_0.22_24)]"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        id="chatbot-toggle"
      >
        {/* Pulse ring — only when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-[oklch(0.6_0.22_24)] animate-ping opacity-30 pointer-events-none"></div>
        )}
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform duration-300" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 left-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-500 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white flex flex-col h-[560px] max-h-[calc(100vh-10rem)]">
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center gap-3 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.17 52), oklch(0.6 0.22 24))",
            }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5"></div>

            <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="relative flex-1 min-w-0">
              <h3 className="text-white font-bold text-sm tracking-wide uppercase">
                Structro Assistant
              </h3>
              <p className="text-white/70 text-xs mt-0.5">
                Ask me anything about our services
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="relative text-white/60 hover:text-white transition-colors"
              aria-label="Minimize chat"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50 chatbot-scroll">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                } animate-chatFadeIn`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.role === "bot"
                      ? "bg-gradient-to-br from-[oklch(0.72_0.17_52)] to-[oklch(0.6_0.22_24)]"
                      : "bg-gray-700"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <Bot className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                {/* Bubble */}
                <div
                  className={`max-w-[80%] px-4 py-3 text-sm rounded-2xl ${
                    msg.role === "user"
                      ? "bg-gray-800 text-white rounded-br-md"
                      : "bg-white text-gray-700 rounded-bl-md border border-gray-100 shadow-sm"
                  }`}
                >
                  {msg.role === "bot" ? renderMarkdown(msg.text) : msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 animate-chatFadeIn">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[oklch(0.72_0.17_52)] to-[oklch(0.6_0.22_24)] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-gray-100 shadow-sm">
                  <div className="flex gap-1.5 items-center h-5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions — shown only at start */}
          {messages.length <= 1 && (
            <div className="px-4 py-3 bg-white border-t border-gray-100 flex flex-wrap gap-2">
              {QUICK_SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-[oklch(0.6_0.22_24)] hover:text-white hover:border-[oklch(0.6_0.22_24)] transition-all duration-200 whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[oklch(0.6_0.22_24)] focus-within:ring-2 focus-within:ring-[oklch(0.6_0.22_24)]/20 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about services, projects..."
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
                id="chatbot-input"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="mr-1.5 w-8 h-8 rounded-md flex items-center justify-center bg-[oklch(0.6_0.22_24)] text-white hover:bg-[oklch(0.55_0.22_24)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Send message"
                id="chatbot-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-2">
              Powered by Structro Infratech
            </p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        @keyframes chatFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-chatFadeIn {
          animation: chatFadeIn 0.3s ease-out;
        }
        .chatbot-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .chatbot-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chatbot-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 999px;
        }
        .chatbot-scroll::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
