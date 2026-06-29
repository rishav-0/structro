import type { Metadata } from 'next';
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getPublicCollectionData } from "@/lib/public-db-server";
import { ArrowUpRight, Calendar, User, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // ISR: revalidate every 60s as safety net (admin changes trigger immediate revalidation via tags)

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
    content: "Structro Infratech is proud to announce the successful completion of a major railway bridge project in Assam. The bridge spans 150 meters and connects crucial transportation networks in the region.\n\nOur team of engineers worked tirelessly to complete this project on schedule while maintaining the highest safety standards. The project involved complex [bridge engineering](/services/bridge) techniques that we have perfected over years of experience under [heavy infrastructure](/services) standards.\n\nThis bridge will significantly improve transportation connectivity for thousands of people in the region.",
    author: "Nipu Baishya & Engineering Team",
    featuredImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
    tags: ["Bridge Engineering", "Heavy Infrastructure"],
    publishDate: "2024-01-15",
    status: "published",
    createdAt: Date.now()
  },
  {
    id: "2",
    title: "The Future of Steel Structures in Northeast India",
    content: "Northeast India is witnessing an infrastructure revolution. With government focus on connectivity and industrial development, steel structures are playing a crucial role.\n\nFrom railway bridges to [PEB buildings](/services/peb), the demand for quality [steel structures](/services/steel) is at an all-time high. Structro Infratech is at the forefront of this transformation.\n\nWe continue to invest in the latest technology and a skilled workforce to deliver world-class infrastructure projects.",
    author: "Nipu Baishya & Engineering Team",
    featuredImage: "https://images.unsplash.com/photo-1531306728370-e2ebd0ea0b4f?q=80&w=2070",
    tags: ["Steel Structures", "Engineering Design"],
    publishDate: "2024-02-01",
    status: "published",
    createdAt: Date.now()
  },
  {
    id: "3",
    title: "PEB Buildings: The Smart Choice for Industrial Construction",
    content: "Pre-Engineered Buildings (PEB) have revolutionized industrial construction. Here's why more companies are choosing PEB solutions.\n\n1. Faster construction time\n2. Cost-effective\n3. Flexible design options\n4. Easy expansion\n\nStructro has delivered numerous [PEB projects](/projects) across Northeast India, from warehouses to manufacturing facilities. Learn more about our [PEB buildings](/services/peb) catalog.",
    author: "Nipu Baishya & Engineering Team",
    featuredImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
    tags: ["PEB Buildings", "Turnkey Construction"],
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
      />      {/* Categories */}
      <Container>
        <div className="py-8 border-b border-gray-100">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Discover Content
                </p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900 tracking-tight">
                  Browse by Category
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Filter engineering insights, case studies, and local updates.
                </p>
              </div>
              
              <div className="flex items-center gap-2 self-start md:self-end text-xs font-semibold text-gray-500 bg-gray-100/80 border border-gray-200/50 rounded-lg px-3.5 py-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>{posts.length} Professional Articles Published</span>
              </div>
            </div>
            {/* Categories Grid (Wrap Style) */}
            <div className="flex flex-wrap gap-2 md:gap-2.5">
              <Link
                href="/blogs"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  !selectedCategory
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
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
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors duration-200 ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
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
                <span className="self-center text-sm text-gray-500 py-2">No categories yet</span>
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

      {/* Blog CTA */}
      <div className="bg-primary py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Have a project in mind?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Talk to our engineers directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919678027684?text=Hi%2C%20I%20have%20a%20project%20enquiry%20for%20Structro%20Infratech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-4 rounded-sm transition-colors duration-200 text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.548 4.1 1.512 5.829L.057 23.786a.5.5 0 00.65.65l5.956-1.455A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.645-.5-5.175-1.372l-.371-.217-3.84.939.957-3.726-.233-.382A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                WhatsApp Us
              </a>
              <Link href="/contact">
                <Button variant="saffron" size="lg" className="text-lg px-8 py-4 h-auto">
                  Request Technical Quote
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
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