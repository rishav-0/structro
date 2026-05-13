"use client"

import { useEffect } from "react"
import { Header } from "@/components/ui/header-3"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Chatbot from "@/components/Chatbot"
import { usePathname } from "next/navigation"
import { ChatbotProvider } from "./chatbot-provider"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
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
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && (
        <ChatbotProvider autoRefreshInterval={180000}>
          <Chatbot />
        </ChatbotProvider>
      )}
    </>
  )
}
