import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getPublicCollectionData } from "@/lib/public-db-server";
import { ArrowUpRight, ArrowLeft, User, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(id);
  const tags = Array.isArray(post.tags) ? post.tags : String(post.tags).split(",");
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
    <div className="bg-white">
      <div className="pt-20 md:pt-24 pb-10 md:pb-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
            <div className="min-w-0">
              <div className="w-full max-w-full overflow-hidden">
                {post.featuredImage ? (
                  <div className="relative w-full max-w-full overflow-hidden h-56 sm:h-72 md:h-96 lg:h-auto lg:min-h-140 lg:aspect-auto">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover lg:object-contain"
                      priority
                    />
                  </div>
                ) : (
                  <div className="flex min-h-80 items-center justify-center bg-primary/10 text-primary">
                    <Clock className="h-10 w-10" />
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0 py-1 md:py-2">
              <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-6">
                {tags.map((tag) => (
                  <Link key={tag} href="/blogs" className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-700 transition-colors hover:text-accent">
                    #{tag.trim()}
                  </Link>
                ))}
              </div>

              <div className="pt-6">
                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-stone-950 md:text-5xl">
                  {post.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-stone-600">
                  {post.author && (
                    <div className="inline-flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  )}
                  {date && (
                    <div className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{date}</span>
                    </div>
                  )}
                </div>
              </div>

              <article className="mt-8 space-y-5 text-base leading-8 text-stone-700 md:text-lg md:leading-9">
                {cleanContent.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </article>

              <div className="mt-10 border-t border-stone-200 pt-6">
                <p className="mb-4 font-medium text-stone-900">Share this article:</p>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <span className="sr-only">Copy link</span>
                    Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="py-16">
          <Container>
            <h2 className="mb-8 text-2xl font-bold text-stone-950">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blogs/${related.id}`} className="group">
                  <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div className="relative h-48">
                      {related.featuredImage ? (
                        <Image
                          src={related.featuredImage}
                          alt={related.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 line-clamp-2 font-bold text-stone-950 transition-colors group-hover:text-accent">
                        {related.title}
                      </h3>
                      <p className="text-sm text-stone-600 line-clamp-2">
                        {related.content.substring(0, 100)}...
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Back to Blog CTA */}
      <div className="bg-primary py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Want to read more?</h2>
            <Link href="/blogs">
              <Button variant="saffron" size="lg">
                View All Articles
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}