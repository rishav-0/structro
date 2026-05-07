import { auth } from "@/auth";
import { getAdminDocs } from "@/app/actions/admin-db";
import Link from "next/link";
import { FolderKanban, Wrench, Package, FileText, Briefcase, Mail, Users, Rocket } from "lucide-react";

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-500">Access Denied.</p>
      </div>
    );
  }

  const user = session.user;

  const [projects, services, products, blogs, careers, enquiries, vendors, newLaunches] =
    await Promise.all([
      getAdminDocs("projects"),
      getAdminDocs("services"),
      getAdminDocs("products"),
      getAdminDocs("blogs"),
      getAdminDocs("careers"),
      getAdminDocs("enquiries", "createdAt", "desc"),
      getAdminDocs("vendors"),
      getAdminDocs("new-launches"),
    ]);

  const stats = [
    { label: "Projects", value: projects.length, icon: FolderKanban, href: "/admin/projects" },
    { label: "Services", value: services.length, icon: Wrench, href: "/admin/services" },
    { label: "Products", value: products.length, icon: Package, href: "/admin/products" },
    { label: "Blog Posts", value: blogs.length, icon: FileText, href: "/admin/blogs" },
    { label: "Careers", value: careers.length, icon: Briefcase, href: "/admin/careers" },
    { label: "Enquiries", value: enquiries.length, icon: Mail, href: "/admin/enquiries" },
    { label: "Vendors", value: vendors.length, icon: Users, href: "/admin/vendors" },
    { label: "New Launches", value: newLaunches.length, icon: Rocket, href: "/admin/new-launches" },
  ];

  const recentEnquiries = enquiries.slice(0, 5) as Array<{
    id: string;
    name?: string;
    email?: string;
    message?: string;
    createdAt?: string;
  }>;

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome back, {user.name?.split(" ")[0] ?? "Admin"}</h2>
        <p className="mt-1 text-neutral-400">Here&apos;s an overview of your platform.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-amber-500/30 hover:bg-white/10"
          >
            <stat.icon className="size-5 text-amber-400" />
            <p className="mt-3 text-2xl font-bold">{stat.value}</p>
            <p className="mt-1 text-sm text-neutral-400 group-hover:text-neutral-200">{stat.label}</p>
          </Link>
        ))}
      </div>

      {recentEnquiries.length > 0 && (
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
              Recent Enquiries
            </h3>
            <Link href="/admin/enquiries" className="text-xs text-amber-400 hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentEnquiries.map((enq) => (
              <div key={enq.id} className="flex items-start justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-neutral-200">{enq.name ?? "—"}</p>
                  <p className="text-xs text-neutral-500">{enq.email ?? "—"}</p>
                  {enq.message && (
                    <p className="mt-1 line-clamp-1 text-xs text-neutral-400">{enq.message}</p>
                  )}
                </div>
                {enq.createdAt && (
                  <span className="ml-4 shrink-0 text-xs text-neutral-600">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}