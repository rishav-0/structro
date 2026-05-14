"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { MessageCircle, X, Send, Bot, User, ChevronDown, RefreshCw } from "lucide-react";
import { useChatbotDataSafe } from "@/app/chatbot-provider";

interface Message {
  role: "bot" | "user";
  text: string;
}

interface SearchableItem {
  id: string;
  type: "service" | "product" | "project" | "faq" | "company" | "process";
  title: string;
  description: string;
  keywords: string[];
  url?: string;
  data: Record<string, unknown>;
}

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "must", "can", "this", "that", "these", "those",
  "i", "you", "he", "she", "it", "we", "they", "of", "in", "to", "for",
  "on", "with", "at", "by", "from", "up", "about", "into", "through", "during",
  "before", "after", "above", "below", "between", "under", "again", "further",
  "then", "once", "here", "there", "all", "each", "few", "no", "nor", "not", "only", "own", "same",
  "so", "than", "too", "very", "just", "also", "now", "and", "or", "but",
  "if", "because", "as", "until", "while", "of", "let", "your", "my",
  "our", "their", "its", "me", "him", "her", "us", "them", "want", "like",
]);

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function extractKeywords(text: string): string[] {
  const normalized = normalizeText(text);
  const words = normalized.split(" ");
  return words.filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function fuzzyMatch(a: string, b: string, threshold = 0.6): boolean {
  const normalizedA = normalizeText(a);
  const normalizedB = normalizeText(b);
  
  if (normalizedA.includes(normalizedB) || normalizedB.includes(normalizedA)) {
    return true;
  }
  
  const wordsA = normalizedA.split(" ");
  const wordsB = normalizedB.split(" ");
  
  for (const wa of wordsA) {
    for (const wb of wordsB) {
      if (wa.length < 3 || wb.length < 3) continue;
      if (wa === wb) return true;
      if (wa.startsWith(wb) || wb.startsWith(wa)) return true;
    }
  }
  
  return false;
}

function buildSearchIndex(data: ReturnType<typeof useChatbotDataSafe>): SearchableItem[] {
  const items: SearchableItem[] = [];
  const { getServices, getProducts, getProjects, getFaqs, getCompany, getProcess } = data;

  const company = getCompany();
  if (company) {
    items.push({
      id: "company",
      type: "company",
      title: company.name,
      description: `${company.description} Founded: ${company.founded}. Registered: ${company.registered}. ${company.iso}.`,
      keywords: [
        company.name, company.tagline, "about", "company", "history", "founded", "registered",
        "iso", "quality", "team", "years", "experience", "projects", "clients",
        "vision", "mission", "values", "integrity", "quality", "sustainability",
        "innovation", "philosophy", "principles", "northeast", "assam", "guwahati",
      ],
      url: "/about",
      data: company as unknown as Record<string, unknown>,
    });

    if (company.contact) {
      items.push({
        id: "company-contact",
        type: "company",
        title: `${company.name} Contact`,
        description: `Phone: ${company.contact.phones.join(", ")}. Email: ${company.contact.email}. Address: ${company.contact.headOffice}. Workshop: ${company.contact.workshop}. Hours: ${company.contact.hours}.`,
        keywords: [
          "contact", "phone", "email", "address", "office", "location", "whatsapp",
          "hours", "timing", "reach", "call", "message",
        ],
        url: "/contact",
        data: company.contact as unknown as Record<string, unknown>,
      });
    }

    if (company.values) {
      company.values.forEach((val, idx) => {
        items.push({
          id: `value-${idx}`,
          type: "company",
          title: val.title,
          description: val.desc,
          keywords: [val.title.toLowerCase(), "value", "principle", "core"],
          url: "/about",
          data: { val } as unknown as Record<string, unknown>,
        });
      });
    }
  }

  const process = getProcess();
  if (process) {
    items.push({
      id: "process",
      type: "process",
      title: "Our Process",
      description: "5-phase construction process: Consultation, Engineering & Design, Approval & Procurement, Construction, Final Handoff.",
      keywords: [
        "process", "workflow", "steps", "phases", "consultation", "design",
        "engineering", "procurement", "construction", "handoff", "delivery",
        "how", "work", "procedure", "method", "approach",
      ],
      url: "/process",
      data: process as unknown as Record<string, unknown>,
    });

    process.steps?.forEach((step) => {
      items.push({
        id: `process-${step.num}`,
        type: "process",
        title: step.title,
        description: step.desc,
        keywords: [...step.tags, step.title.toLowerCase()],
        url: "/process",
        data: step as unknown as Record<string, unknown>,
      });
    });
  }

  getServices().forEach((service) => {
    items.push({
      id: service.id,
      type: "service",
      title: service.title,
      description: service.description,
      keywords: [
        ...extractKeywords(service.title),
        ...extractKeywords(service.description),
        ...(service.features || []),
        ...(service.catalog?.flatMap((c) => extractKeywords(c.title)) || []),
        "service", "offer", "provide", "build", "construction", "engineering",
      ],
      url: "/services",
      data: service as unknown as Record<string, unknown>,
    });
  });

  getProducts().forEach((product) => {
    items.push({
      id: product.id,
      type: "product",
      title: product.title,
      description: `${product.description} Specs: ${product.specs}`,
      keywords: [
        ...extractKeywords(product.title),
        ...extractKeywords(product.description),
        ...extractKeywords(product.specs),
        "product", "buy", "purchase", "portable", "movable", "container",
      ],
      url: "/products",
      data: product as unknown as Record<string, unknown>,
    });
  });

  getProjects().forEach((project) => {
    items.push({
      id: project.id,
      type: "project",
      title: project.title,
      description: `Location: ${project.location}${project.client ? `. Client: ${project.client}` : ""}${project.quantity ? `. Quantity: ${project.quantity}` : ""}${project.period ? `. Period: ${project.period}` : ""}`,
      keywords: [
        ...extractKeywords(project.title),
        ...extractKeywords(project.location),
        "project", "portfolio", "completed", "built", "construction",
        "bridge", "peb", "steel", "warehouse",
      ],
      url: "/projects",
      data: project as unknown as Record<string, unknown>,
    });
  });

  getFaqs().forEach((faq) => {
    items.push({
      id: faq.id,
      type: "faq",
      title: faq.question,
      description: faq.answer,
      keywords: [...extractKeywords(faq.question), ...extractKeywords(faq.answer)],
      url: undefined,
      data: faq as unknown as Record<string, unknown>,
    });
  });

  return items;
}

function detectIntent(query: string): { intent: string; keywords: string[] } {
  const n = normalizeText(query);
  const kw = extractKeywords(query);

  // Greetings
  if (/^(hi|hello|hey|good\s?(morning|afternoon|evening)|namaste|namaskar)/.test(n)) return { intent: "greeting", keywords: kw };
  // Thanks
  if (/thank|thanks|dhanyavaad/.test(n)) return { intent: "thanks", keywords: kw };
  // Contact / Location
  if (/(contact|phone|email|whatsapp|call|reach|office|address|location|where|situated|based|visit)/.test(n)) return { intent: "contact", keywords: kw };
  // Pricing
  if (/(price|pricing|cost|rate|charge|quote|quotation|estimate|budget|how\s*much|expensive|cheap|afford)/.test(n)) return { intent: "pricing", keywords: kw };
  // Process / How you work
  if (/(process|workflow|step|phase|how.*work|procedure|method|approach|timeline|duration|long.*take)/.test(n)) return { intent: "process", keywords: kw };
  // All services
  if (/(service|offer|provide|what.*do|capable|specializ|expertise)/.test(n)) return { intent: "services", keywords: kw };
  // All products
  if (/(product|buy|purchase|portable|movable|container|staircase|shed|house|residential)/.test(n)) return { intent: "products", keywords: kw };
  // Projects
  if (/(project|portfolio|completed|built|past.*work|experience|track\s*record|client)/.test(n)) return { intent: "projects", keywords: kw };
  // Company / About
  if (/(company|about|who|structro|history|founded|team|employee|staff|iso|certified|quality|value|mission|vision|philosophy)/.test(n)) return { intent: "company", keywords: kw };
  // Bridge specific
  if (/(bridge|owg|rob|fob|girder|arch|suspension|cable|truss|railway.*bridge|foot.*over)/.test(n)) return { intent: "bridge", keywords: kw };
  // PEB specific
  if (/(peb|pre.*engineer|warehouse|factory|shed|industrial.*build|hangar|cold.*storage)/.test(n)) return { intent: "peb", keywords: kw };
  // Steel specific
  if (/(steel.*struct|fabricat|welding|metal|stainless|inconel|special.*metal)/.test(n)) return { intent: "steel", keywords: kw };
  // Design specific
  if (/(design|drawing|3d|model|survey|estimation|certification|cad|blueprint)/.test(n)) return { intent: "design", keywords: kw };
  // FAQ
  if (/(faq|question|ask|doubt|query|help)/.test(n)) return { intent: "faq", keywords: kw };

  return { intent: "search", keywords: kw };
}

function generateResponse(query: string, _results: SearchableItem[], companyGetter: ReturnType<typeof useChatbotDataSafe>["getCompany"], allItems: SearchableItem[]): string {
  const { intent, keywords } = detectIntent(query);
  const companyInfo = companyGetter();
  const name = companyInfo?.name || "Structro Infratech";
  const contact = companyInfo?.contact;

  const allServices = allItems.filter(i => i.type === "service");
  const allProducts = allItems.filter(i => i.type === "product");
  const allProjects = allItems.filter(i => i.type === "project");
  const allFaqs = allItems.filter(i => i.type === "faq");
  const processItems = allItems.filter(i => i.type === "process");

  switch (intent) {
    case "greeting":
      return `Hello! 👋 Welcome to **${name}**.\n\nI can help you with:\n• Our **services** (bridges, PEB, steel, design)\n• Our **products** (portable homes, sheds, containers)\n• **Project portfolio** & experience\n• **Contact details** & office location\n• **Company info** & certifications\n\nWhat would you like to know?`;

    case "thanks":
      return `You're welcome! 😊 Feel free to ask anything else.\n\n📞 **Call:** ${contact?.phones?.[0] || "+91-9678027684"}\n📧 **Email:** ${contact?.email || "structro.infratech@gmail.com"}`;

    case "contact": {
      if (!contact) return "Please visit our [Contact Page](/contact) for details.";
      return `📍 **${name} – Contact & Location**\n\n🏠 **Head Office:** ${contact.headOffice}\n🏢 **Workshop:** ${contact.workshop}\n\n📞 **Phone:** ${contact.phones.join(", ")}\n📧 **Email:** ${contact.email}\n💬 **WhatsApp:** ${contact.whatsapp}\n\n⏰ **Hours:** ${contact.hours}\n\n👉 Visit our [Contact Page](/contact) for directions.`;
    }

    case "pricing":
      return `💰 **Pricing Information**\n\nOur pricing depends on the project scope, materials, and site conditions. We offer **competitive rates** with no hidden costs.\n\n**To get a free quote:**\n📞 Call: ${contact?.phones?.[0] || "+91-9678027684"}\n📧 Email: ${contact?.email || "structro.infratech@gmail.com"}\n💬 WhatsApp: ${contact?.whatsapp || "+91-9678027684"}\n\nOr visit our [Contact Page](/contact) to submit an enquiry. We typically respond within 24 hours.`;

    case "process": {
      const steps = processItems.filter(i => i.id.startsWith("process-"));
      let msg = `⚙️ **Our 5-Phase Construction Process:**\n\n`;
      if (steps.length > 0) {
        steps.forEach(s => {
          const d = s.data as { num?: string; title?: string; desc?: string; tags?: string[] };
          msg += `**${d.num || ""}. ${s.title}** – ${s.description}\n`;
        });
      } else {
        msg += "Consultation → Engineering & Design → Approval & Procurement → Construction → Final Handoff\n";
      }
      msg += `\n👉 Learn more on our [Process Page](/process).`;
      return msg;
    }

    case "services": {
      let msg = `🔧 **Our Services:**\n\nWe offer **${allServices.length} core services:**\n\n`;
      allServices.forEach(s => {
        const feats = (s.data as { features?: string[] }).features;
        const featStr = feats && feats.length > 0 ? ` _(${feats.slice(0, 3).join(", ")})_` : "";
        msg += `• **${s.title}**${featStr}\n`;
      });
      msg += `\n👉 Visit our [Services Page](/services) for details. Ask me about any specific service!`;
      return msg;
    }

    case "products": {
      let msg = `📦 **Our Products:**\n\n`;
      allProducts.forEach(p => {
        const specs = (p.data as { specs?: string }).specs || "";
        msg += `• **${p.title}** – ${specs}\n`;
      });
      msg += `\n👉 See all products on our [Products Page](/products).`;
      return msg;
    }

    case "projects": {
      const top = allProjects.slice(0, 5);
      let msg = `🏗️ **Project Portfolio** (${allProjects.length}+ completed)\n\n`;
      top.forEach(p => {
        const d = p.data as { client?: string; location?: string; quantity?: string };
        msg += `• **${p.title}** – ${d.location || ""}${d.client ? ` (${d.client})` : ""}${d.quantity ? ` | ${d.quantity}` : ""}\n`;
      });
      if (allProjects.length > 5) msg += `• _...and ${allProjects.length - 5} more_\n`;
      msg += `\n👉 View all on our [Projects Page](/projects).`;
      return msg;
    }

    case "company": {
      if (!companyInfo) return "We are Structro Infratech – a leading steel engineering company in Northeast India.";
      const stats = companyInfo.stats;
      return `🏢 **About ${name}**\n\n${companyInfo.description}\n\n📊 **Key Stats:**\n• **${stats.projects}** Projects Completed\n• **${stats.years}** Years Experience\n• **${stats.team}** Team Members\n• **${stats.satisfaction}** Client Satisfaction\n\n🏅 **${companyInfo.iso}**\n📍 Founded: ${companyInfo.founded} | Registered: ${companyInfo.registered}\n\n💡 _"${companyInfo.philosophy}"_\n\n👉 Learn more on our [About Page](/about).`;
    }

    case "bridge": {
      const svc = allServices.find(s => s.id === "bridge");
      if (!svc) return "We specialize in bridge engineering. Visit our [Services Page](/services) for details.";
      const d = svc.data as { description?: string; features?: string[]; catalog?: { title: string; description: string }[] };
      let msg = `🌉 **Bridge Engineering**\n\n${d.description || svc.description}\n\n**Bridge Types We Build:**\n`;
      if (d.catalog) d.catalog.forEach(c => { msg += `• **${c.title}** – ${c.description}\n`; });
      else if (d.features) d.features.forEach(f => { msg += `• ${f}\n`; });
      msg += `\n👉 See our [Bridge Projects](/services) or ask about specific bridge types!`;
      return msg;
    }

    case "peb": {
      const svc = allServices.find(s => s.id === "peb");
      if (!svc) return "We offer PEB solutions. Visit our [Services Page](/services).";
      const d = svc.data as { description?: string; features?: string[]; applications?: { category: string; items: string[] }[] };
      let msg = `🏭 **PEB (Pre-Engineered Buildings)**\n\n${d.description || svc.description}\n\n**Key Advantages:**\n`;
      if (d.features) d.features.forEach(f => { msg += `• ${f}\n`; });
      if (d.applications) {
        msg += `\n**Applications:** `;
        msg += d.applications.map(a => `${a.category} (${a.items.slice(0, 3).join(", ")})`).join(" | ");
        msg += "\n";
      }
      msg += `\n👉 Learn more on our [Services Page](/services).`;
      return msg;
    }

    case "steel": {
      const svc = allServices.find(s => s.id === "steel") || allServices.find(s => s.id === "special-metal");
      if (!svc) return "We offer steel & special metal structures. Visit our [Services Page](/services).";
      const d = svc.data as { description?: string; features?: string[] };
      let msg = `🔩 **Steel & Metal Structures**\n\n${d.description || svc.description}\n\n**Capabilities:**\n`;
      if (d.features) d.features.forEach(f => { msg += `• ${f}\n`; });
      const special = allServices.find(s => s.id === "special-metal");
      if (special && svc.id !== "special-metal") {
        const sd = special.data as { features?: string[] };
        msg += `\n**Special Metals:** ${sd.features?.join(", ") || "SS, Inconel fabrication"}\n`;
      }
      msg += `\n👉 Visit our [Services Page](/services) for more.`;
      return msg;
    }

    case "design": {
      const svc = allServices.find(s => s.id === "design");
      if (!svc) return "We provide engineering design services. Visit our [Services Page](/services).";
      const d = svc.data as { description?: string; features?: string[] };
      let msg = `📐 **Design & Engineering Services**\n\n${d.description || svc.description}\n\n**What We Offer:**\n`;
      if (d.features) d.features.forEach(f => { msg += `• ${f}\n`; });
      msg += `\n👉 Visit our [Services Page](/services) for details.`;
      return msg;
    }

    case "faq": {
      if (allFaqs.length === 0) return "We don't have FAQs loaded right now. Feel free to ask me any question directly!";
      let msg = `❓ **Frequently Asked Questions:**\n\n`;
      allFaqs.slice(0, 4).forEach(f => {
        msg += `**Q: ${f.title}**\n${f.description.length > 120 ? f.description.slice(0, 120) + "..." : f.description}\n\n`;
      });
      return msg;
    }

    default: {
      // Keyword-based search fallback
      const scored = allItems.map(item => {
        let score = 0;
        const tn = normalizeText(item.title);
        const dn = normalizeText(item.description);
        for (const kw of keywords) {
          if (tn.includes(kw)) score += 10;
          if (dn.includes(kw)) score += 3;
          if (item.keywords.some(k => fuzzyMatch(k, kw))) score += 5;
        }
        return { item, score };
      }).filter(r => r.score > 0).sort((a, b) => b.score - a.score);

      if (scored.length === 0) {
        return `I'm not sure about that. Here's what I can help with:\n\n• Our **services** – bridges, PEB, steel, design\n• Our **products** – portable homes, sheds, containers\n• **Project portfolio**\n• **Contact & location**\n• **Company info**\n\nTry asking about any of these!`;
      }

      const top = scored.slice(0, 3);
      let msg = "";
      top.forEach(({ item }) => {
        const icon = item.type === "service" ? "🔧" : item.type === "product" ? "📦" : item.type === "project" ? "🏗️" : item.type === "faq" ? "❓" : item.type === "company" ? "🏢" : "⚙️";
        const desc = item.description.length > 150 ? item.description.slice(0, 150) + "..." : item.description;
        msg += `${icon} **${item.title}**\n${desc}\n\n`;
      });
      if (scored.length > 3) msg += `_${scored.length - 3} more results found. Try a more specific question._`;
      return msg.trim();
    }
  }
}

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  
  return lines.map((line, i) => {
    let processed: React.ReactNode[] = [];
    
    const temp = line;
    const italicLine = temp.replace(/_(.*?)_/g, "«ITALIC»$1«/ITALIC»");
    
    const linkLine = italicLine.replace(
      /\[(.*?)\]\((.*?)\)/g,
      "«LINK»$1«HREF»$2«/LINK»"
    );
    
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

const QUICK_SUGGESTIONS = [
  "What services do you offer?",
  "Tell me about your company",
  "How can I contact you?",
  "Show me your projects",
  "What are your products?",
  "Where is your office?",
];

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
  
  const chatbotData = useChatbotDataSafe();
  const { getCompany, isLoading, error, refresh } = chatbotData;
  
  const searchIndex = useMemo(() => buildSearchIndex(chatbotData), [chatbotData]);
  
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
      
      setTimeout(() => {
        const response = generateResponse(msg, [], getCompany, searchIndex);
        setMessages((prev) => [...prev, { role: "bot", text: response }]);
        setIsTyping(false);
      }, 400 + Math.random() * 600);
    },
    [input, searchIndex, getCompany]
  );
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
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
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-[oklch(0.6_0.22_24)] animate-ping opacity-30 pointer-events-none"></div>
        )}
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform duration-300" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>

      <div
        className={`fixed bottom-24 left-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-500 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white flex flex-col h-[560px] max-h-[calc(100vh-10rem)]">
          <div
            className="px-5 py-4 flex items-center gap-3 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.17 52), oklch(0.6 0.22 24))",
            }}
          >
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
                {isLoading ? "Loading data..." : error ? "Using cached data" : "Ask me anything"}
              </p>
            </div>
            <div className="flex items-center gap-1 relative">
              <button
                onClick={refresh}
                className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                aria-label="Refresh data"
                title="Refresh data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                aria-label="Minimize chat"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50 chatbot-scroll">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                } animate-chatFadeIn`}
              >
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
                <div
                  className={`max-w-[80%] px-4 py-3 text-sm rounded-2xl break-words ${
                    msg.role === "user"
                      ? "bg-gray-800 text-white rounded-br-md"
                      : "bg-white text-gray-700 rounded-bl-md border border-gray-100 shadow-sm"
                  }`}
                >
                  {msg.role === "bot" ? renderMarkdown(msg.text) : msg.text}
                </div>
              </div>
            ))}

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
                disabled={!input.trim() || isTyping}
                className="mr-1.5 w-8 h-8 rounded-md flex items-center justify-center bg-[oklch(0.6_0.22_24)] text-white hover:bg-[oklch(0.55_0.22_24)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Send message"
                id="chatbot-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-2">
              Powered by Structro Infratech • Auto-updates with website
            </p>
          </div>
        </div>
      </div>

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