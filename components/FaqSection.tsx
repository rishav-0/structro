"use client";

import { useState, useEffect } from "react";
import { Container } from "./ui/container";
import { Plus, Minus } from "lucide-react";

interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  status: string;
}

export default function FaqSection() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch("/api/public-data/faqs");
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const defaultFaqs: Faq[] = [
    {
      id: "default-1",
      question: "What types of engineering projects do you specialize in?",
      answer: "We specialize in heavy steel engineering, including Pre-Engineered Buildings (PEBs), Industrial Sheds, Bridge Construction, and large-scale infrastructure projects across Northeast India.",
      order: 1,
      status: "active",
    },
    {
      id: "default-2",
      question: "Do you provide customized structural solutions?",
      answer: "Yes, our in-house engineering and design team provides fully customized structural solutions tailored to your specific architectural requirements, load-bearing needs, and site conditions.",
      order: 2,
      status: "active",
    },
    {
      id: "default-3",
      question: "Are you ISO certified?",
      answer: "Absolutely. We are an ISO 9001:2015 certified company, ensuring our quality management, safety protocols, and operational workflows meet international standards.",
      order: 3,
      status: "active",
    },
    {
      id: "default-4",
      question: "How do I request a quote or technical consultation?",
      answer: "You can easily request a consultation by clicking the 'Request Technical Consultation' button on our site or visiting the Contact Us page to submit your project details and drawings.",
      order: 4,
      status: "active",
    },
    {
      id: "default-5",
      question: "What regions do you operate in?",
      answer: "While our head office is located in Guwahati, Assam, we execute and deliver projects across the entire Northeast India region.",
      order: 5,
      status: "active",
    },
  ];

  const displayFaqs = loading || faqs.length === 0 ? defaultFaqs : faqs;

  return (
    <div className="bg-white py-20 border-y border-gray-100">
      <Container>
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-bold uppercase tracking-[0.2em] block mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {displayFaqs.map((faq, index) => (
            <div 
              key={faq.id || index} 
              className="border border-gray-200 rounded-md overflow-hidden transition-all duration-300 hover:border-primary/30"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-lg font-bold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-primary">
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 bg-white border-t border-gray-100">
                  <p className="leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}