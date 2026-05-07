import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { SidebarNav } from "./sidebar"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || session.user?.role !== "admin") {
    redirect("/")
  }

  const user = session.user

  const handleSignOut = async () => {
    "use server"
    await signOut({ redirectTo: "/" })
  }

  return (
    <div className="dark min-h-screen bg-neutral-950 text-white">
      <SidebarNav user={user} signOut={handleSignOut} />
      <main className="pl-56 transition-all duration-300">
        <div className="mx-auto max-w-7xl p-6">{children}</div>
      </main>
    </div>
  )
}
