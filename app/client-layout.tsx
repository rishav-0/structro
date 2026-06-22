"use client"

import { useEffect } from "react"
import WhatsAppButton from "@/components/WhatsAppButton"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const Chatbot = dynamic(() => import("@/components/Chatbot"), {
  ssr: false,
  loading: () => null,
})


export default function ClientLayout({
  children,
  header,
  footer,
}: {
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isAdminRoute)

    return () => {
      document.documentElement.classList.remove("dark")
    }
  }, [isAdminRoute])

  return (
    <>
      {!isAdminRoute && header}
      {children}
      {!isAdminRoute && footer}
      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && <Chatbot />}
    </>
  )
}
