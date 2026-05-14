"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { ArrowUpRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCollectionData } from "@/lib/data-merge";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  featuredImage: string;
  tags: string | string[];
  publishDate: string;
  status: "draft" | "published";
  createdAt: number;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getCollectionData<BlogPost>("blogs");
        // Filter published and sort by date (newest first)
        const published = data
          .filter((post) => post.status === "published")
          .sort((a, b) => {
            const dateA = a.publishDate ? new Date(a.publishDate).getTime() : a.createdAt || 0;
            const dateB = b.publishDate ? new Date(b.publishDate).getTime() : b.createdAt || 0;
            return dateB - dateA;
          })
          .slice(0, 3);
        setBlogs(published);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="py-24 bg-white relative border-y border-gray-100 overflow-hidden">
      {/* Subtle Background Element */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gray-50/50 -skew-x-12 translate-x-20 -z-0" />
      
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-bold uppercase tracking-[0.25em] mb-4">
              Structural Intelligence
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Knowledge Hub &<br />Industry Insights
            </h2>
          </div>
          <Link 
            href="/blogs" 
            className="group flex items-center font-bold text-gray-900 hover:text-primary transition-all"
          >
            <span className="mr-3 border-b-2 border-transparent group-hover:border-primary transition-all duration-300">
              View All Articles
            </span>
            <div className="bg-gray-100 p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/10] bg-gray-200 rounded-lg mb-6" />
                <div className="h-4 bg-gray-100 w-1/4 mb-4 rounded" />
                <div className="h-8 bg-gray-100 w-3/4 mb-4 rounded" />
                <div className="h-4 bg-gray-100 w-full rounded" />
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {blogs.map((blog) => {
              const tags = Array.isArray(blog.tags) 
                ? blog.tags 
                : typeof blog.tags === "string" 
                  ? blog.tags.split(",").map((t) => t.trim())
                  : [];
              const category = tags[0] || "Engineering";
              
              const date = blog.publishDate 
                ? new Date(blog.publishDate).toLocaleDateString("en-IN", { 
                    day: "numeric", 
                    month: "short", 
                    year: "numeric" 
                  })
                : "Recent Update";

              return (
                <article 
                  key={blog.id} 
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full"
                >
                  <Link href={`/blogs/${blog.id}`} className="block relative aspect-[16/10] overflow-hidden">
                    {blog.featuredImage ? (
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 font-medium italic">Image coming soon</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold text-white bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-lg border border-white/10">
                        {category}
                      </span>
                    </div>
                  </Link>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-gray-500 text-[10px] font-bold mb-5 uppercase tracking-[0.15em]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" /> {date}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-primary" /> {blog.author || "Structro Team"}
                      </span>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                      <Link href={`/blogs/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                      {blog.content ? blog.content.replace(/<[^>]*>?/gm, "").substring(0, 120) : "Read our latest technical update and analysis on this project."}...
                    </p>
                    
                    <Link 
                      href={`/blogs/${blog.id}`} 
                      className="mt-auto inline-flex items-center text-sm font-extrabold text-gray-900 group-hover:text-primary transition-colors uppercase tracking-wider"
                    >
                      Read Full Analysis 
                      <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">New engineering insights are currently being drafted. Check back soon.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
