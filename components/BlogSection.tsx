"use client";
import { Container } from "@/components/ui/container";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function BlogSection() {
  const blogs = [
    { title: "The Future of PEB in Northeast India", category: "Industry Insights", date: "May 10, 2026" },
    { title: "Seismic Design Principles for Industrial Sheds", category: "Engineering", date: "April 28, 2026" },
    { title: "Sustainable Materials in Turnkey Projects", category: "Sustainability", date: "April 15, 2026" }
  ];

  return (
    <div className="py-20 bg-gray-50 border-y border-gray-200 relative">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative z-10">
          <div>
            <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Structural Intelligence
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Knowledge Hub</h2>
          </div>
          <Link href="/blogs" className="hidden md:flex items-center font-bold text-gray-900 hover:text-primary transition-colors group">
            View All Articles 
            <span className="ml-2 bg-gray-100 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {blogs.map((blog, idx) => (
            <div key={idx} className="group bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-[16/9] relative bg-gradient-to-tr from-gray-200 to-gray-100 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent group-hover:opacity-40 transition-opacity" />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded-sm uppercase tracking-widest">{blog.category}</span>
                  <span className="text-gray-400 text-xs font-medium">{blog.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-primary transition-colors leading-snug">{blog.title}</h3>
                <Link href="#" className="inline-flex items-center text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Read Article <ArrowUpRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
