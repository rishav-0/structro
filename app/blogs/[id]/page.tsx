import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getPublicCollectionData } from "@/lib/public-db-server";
import { ArrowUpRight, ArrowLeft, User, Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ShareButtons } from "@/components/ShareButtons";
import { BackButton } from "@/components/ui/back-button";

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

async function getPost(id: string) {
  try {
    const posts = await getPublicCollectionData<BlogPost>("blogs");
    return posts.find(p => p.id === id && p.status === "published");
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentId: string) {
  try {
    const posts = await getPublicCollectionData<BlogPost>("blogs");
    return posts.filter(p => p.id !== currentId && p.status === "published").slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  
  if (!post) {
    return { title: 'Post Not Found | Structro Infratech' };
  }
  
  const excerpt = post.content.substring(0, 160);
  return {
    title: `${post.title} | Structro Blog`,
    description: excerpt,
    openGraph: {
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

function parseContentWithLinks(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <Link key={match.index} href={linkUrl} className="text-primary hover:underline font-semibold">
        {linkText}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(id);
  const tags = Array.isArray(post.tags) 
    ? post.tags 
    : typeof post.tags === "string" 
      ? post.tags.split(",").map(t => t.trim()) 
      : [];
      
  const cleanContent = post.content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const date = post.publishDate 
    ? new Date(post.publishDate).toLocaleDateString("en-IN", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })
    : post.createdAt 
      ? new Date(post.createdAt).toLocaleDateString("en-IN", { 
          year: "numeric", 
          month: "long", 
          day: "numeric" 
        })
      : "";

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="pt-24 md:pt-32 pb-12 bg-gray-50/50 border-b border-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <BackButton fallbackUrl="/blogs" text="Back to Knowledge Hub" />
            
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span key={tag} className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-sm uppercase tracking-widest">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm font-semibold uppercase tracking-wider">
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-4 w-4" />
                  </div>
                  <span>{post.author}</span>
                </div>
              )}
              {date && (
                <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{date}</span>
                </div>
              )}
              <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
                <Clock className="h-4 w-4 text-primary" />
                <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-16 group bg-transparent">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-contain transition-transform duration-1000 group-hover:scale-105"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Tag className="h-12 w-12 text-gray-300" />
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
              <article className="min-w-0">
                <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-700">
                  {cleanContent.map((paragraph, idx) => (
                    <p key={idx} className="mb-6 leading-relaxed">
                      {parseContentWithLinks(paragraph)}
                    </p>
                  ))}
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-widest text-xs">Share this Analysis</h4>
                      <ShareButtons title={post.title} />
                    </div>
                    <Link href="/blogs">
                      <Button variant="outline" className="font-bold uppercase tracking-widest text-[10px] h-10 px-6 rounded-full border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-all">
                        More Insights <ArrowUpRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>

              {/* Sidebar / Reading Progress or similar could go here */}
            </div>
          </div>
        </Container>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="py-24 bg-gray-50 border-y border-gray-100">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2">Continue Reading</p>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Related Articles</h2>
                </div>
                <Link href="/blogs" className="hidden sm:flex items-center text-sm font-bold text-gray-900 hover:text-primary transition-colors">
                  View All <ArrowUpRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.slice(0, 2).map((related) => (
                  <Link key={related.id} href={`/blogs/${related.id}`} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {related.featuredImage ? (
                        <Image
                          src={related.featuredImage}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {related.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                        {related.content.replace(/<[^>]*>?/gm, "").substring(0, 100)}...
                      </p>
                      <span className="mt-auto inline-flex items-center text-xs font-bold text-gray-900 uppercase tracking-widest group-hover:text-primary transition-colors">
                        Read Article <ArrowUpRight className="ml-1 w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Ready to start your next<br className="hidden md:block" /> structural project?
            </h2>
            <p className="text-gray-600 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
              Our engineering team is ready to help you navigate the complexities of modern steel construction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="saffron" size="lg" className="w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transition-all h-14 px-10 rounded-md">
                  Consult an Engineer
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold h-14 px-10 rounded-md border-gray-200 hover:bg-gray-50">
                  View Our Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}