"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, FileText, Briefcase, Users, Mail, Package, FolderKanban, Wrench, Rocket, LogOut, ChevronLeft, Menu, HelpCircle } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blog Posts", icon: FileText },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/vendors", label: "Vendors", icon: Users },
  { href: "/admin/enquiries", label: "Enquiries", icon: Mail },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/new-launches", label: "New Launches", icon: Rocket },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
];

interface SidebarNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  signOut: () => Promise<void>;
}

export function SidebarNav({ user, signOut }: SidebarNavProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-neutral-900 transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className={`flex h-16 items-center border-b border-white/10 px-4 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <h1 className="text-lg font-semibold tracking-tight">
              Structro <span className="text-amber-400">Admin</span>
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-white/5 hover:text-white"
          >
            {collapsed ? <Menu className="size-5" /> : <ChevronLeft className="size-5" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="size-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-2">
          <div className={`mb-2 ${collapsed ? "hidden" : ""}`}>
            <div className="rounded-lg bg-white/5 p-3">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-neutral-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className={`flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white ${
              collapsed ? "w-full justify-center" : "w-full"
            }`}
            title={collapsed ? "Sign out" : undefined}
          >
            <LogOut className="size-4" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}