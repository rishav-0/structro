import type { Metadata } from 'next';
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getPublicCollectionData } from "@/lib/public-db-server";
import { ArrowUpRight, Calendar, User, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Blog | Structro Infratech - Engineering Insights & Updates',
  description: 'Read the latest articles on bridge engineering, steel structures, PEB buildings, and infrastructure projects from Structro Infratech.',
  keywords: ['Blog', 'Engineering', 'Bridge Construction', 'Steel Structures', 'Infrastructure', 'News'],
}

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

function getNormalizedTags(tags: BlogPost["tags"]) {
  return (Array.isArray(tags) ? tags : String(tags).split(","))
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

async function getPosts() {
  try {
    const posts = await getPublicCollectionData<BlogPost>("blogs");
    return posts.filter(p => p.status === "published");
  } catch {
    return samplePosts;
  }
}

const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "Structro Completes New Railway Bridge in Assam",
    content: "Structro Infratech is proud to announce the successful completion of a major railway bridge project in Assam. The bridge spans 150 meters and connects crucial transportation networks in the region.\n\nOur team of engineers worked tirelessly to complete this project on schedule while maintaining the highest safety standards. The project involved complex steel arch construction techniques that we have perfected over years of experience.\n\nThis bridge will significantly improve transportation connectivity for thousands of people in the region.",
    author: "Structro Team",
    featuredImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
    tags: ["bridge", "infrastructure", "railway", "assam"],
    publishDate: "2024-01-15",
    status: "published",
    createdAt: Date.now()
  },
  {
    id: "2",
    title: "The Future of Steel Structures in Northeast India",
    content: "Northeast India is witnessing a Infrastructure revolution. With government focus on connectivity and industrial development, steel structures are playing a crucial role.\n\nFrom railway bridges to PEB buildings, the demand for quality steel structures is at an all-time high. Structro Infratech is at the forefront of this transformation.\n\nWe continue to invest in latest technology and skilled workforce to deliver world-class infrastructure projects.",
    author: "Structro Team",
    featuredImage: "https://images.unsplash.com/photo-1531306728370-e2ebd0ea0b4f?q=80&w=2070",
    tags: ["steel", "engineering", "infrastructure"],
    publishDate: "2024-02-01",
    status: "published",
    createdAt: Date.now()
  },
  {
    id: "3",
    title: "PEB Buildings: The Smart Choice for Industrial Construction",
    content: "Pre-Engineered Buildings (PEB) have revolutionized industrial construction. Here's why more companies are choosing PEB solutions.\n\n1. Faster construction time\n2. Cost-effective\n3. Flexible design options\n4. Easy expansion\n\nStructro has delivered numerous PEB projects across Northeast India, from warehouses to manufacturing facilities.",
    author: "Structro Team",
    featuredImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
    tags: ["peb", "industrial", "construction"],
    publishDate: "2024-02-15",
    status: "published",
    createdAt: Date.now()
  }
];

export default async function BlogsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }> | { category?: string };
}) {
  const posts = await getPosts();
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const selectedCategory = resolvedSearchParams?.category?.trim().toLowerCase() || "";

  const categories = posts.reduce((acc, post) => {
    const tags = getNormalizedTags(post.tags);
    tags.forEach(tag => {
      const t = tag.trim().toLowerCase();
      if (t) acc[t] = (acc[t] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categories).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }

    return a[0].localeCompare(b[0]);
  });

  const visiblePosts = selectedCategory
    ? posts.filter((post) => getNormalizedTags(post.tags).includes(selectedCategory))
    : posts;

  return (
    <div className="">
      <PageHero
        eyebrow="Our Blog"
        title={<>Engineering<br />Insights &amp; Updates</>}
        description="Stay informed with the latest developments in bridge engineering, steel structures, and infrastructure projects."
      />

      {/* Categories */}
    
        <Container>
          <div className="py-6">
            <div className="flex flex-col gap-4 rounded-2xl  px-5 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Browse by category
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  Select a topic to narrow the articles.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blogs"
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    !selectedCategory
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:text-gray-900"
                  }`}
                >
                  All Articles
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    !selectedCategory
                      ? "bg-primary-foreground/15 text-primary-foreground"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {posts.length}
                  </span>
                </Link>

                {sortedCategories.length > 0 ? sortedCategories.map(([category, count]) => {
                  const isActive = selectedCategory === category;

                  return (
                    <Link
                      key={category}
                      href={`/blogs?category=${encodeURIComponent(category)}`}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:text-gray-900"
                      }`}
                    >
                      {category}
                      <span className={`rounded-full px-2 py-0.5 text-xs ${
                        isActive
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {count}
                      </span>
                    </Link>
                  );
                }) : (
                  <span className="self-center text-sm text-gray-500">No categories yet</span>
                )}
              </div>
            </div>
          </div>
        </Container>
      

      {/* Blog Posts */}
      <div className="py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Latest Articles
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {selectedCategory ? `${selectedCategory} Articles` : "Recent Updates"}
            </h2>
            {selectedCategory && (
              <p className="mt-3 text-sm text-gray-600">
                Showing {visiblePosts.length} article{visiblePosts.length === 1 ? "" : "s"} in this category.
              </p>
            )}
          </div>

          {visiblePosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedCategory ? "No Articles Found" : "No Posts Yet"}
              </h3>
              <p className="text-gray-600 mb-8">
                {selectedCategory
                  ? "Try another category or view all articles."
                  : "Check back soon for new articles and insights."}
              </p>
              {selectedCategory ? (
                <Link href="/blogs">
                  <Button variant="outline">View All Articles</Button>
                </Link>
              ) : (
                <Link href="/contact">
                  <Button variant="saffron">
                    Contact Us
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          ) : visiblePosts.length === 1 ? (
            <div className="max-w-4xl mx-auto">
              <PostCard post={visiblePosts[0]} featured />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visiblePosts.slice(0, 1).map((post) => (
                <div key={post.id} className="md:col-span-2">
                  <PostCard post={post} featured />
                </div>
              ))}
              {visiblePosts.slice(1).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </Container>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-primary py-24">
        <Container>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center md:p-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Subscribe to Our Newsletter
            </h2>
              <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              Get the latest engineering insights and project updates delivered 
              directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                  className="flex-1 rounded-sm border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button variant="saffron" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

function PostCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  const tags = getNormalizedTags(post.tags);
  
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

  const excerpt = post.content.length > 150 
    ? post.content.substring(0, 150) + "..." 
    : post.content;

  return (
    <article className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
      featured ? "md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]" : ""
    }`}>
      <div className={`relative ${featured ? "h-64 md:min-h-[360px]" : "h-48"}`}>
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className={`p-6 ${featured ? "flex flex-col justify-center md:p-8" : ""}`}>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs font-medium text-accent uppercase tracking-wider">
              #{tag.trim()}
            </span>
          ))}
        </div>
        
        <h3 className={`font-bold text-gray-900 mb-2 ${featured ? "text-2xl" : "text-lg"}`}>
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
          {post.author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </div>
          )}
          {date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date}
            </div>
          )}
        </div>
        
        <Link href={`/blogs/${post.id}`}>
          <Button variant="outline" size="sm">
            Read More
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </article>
  );
}