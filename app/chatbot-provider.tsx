"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { fetchChatbotData, refreshChatbotData, type ChatbotData } from "@/app/actions/chatbot-data";

interface ChatbotContextValue {
  data: ChatbotData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

const ChatbotContext = createContext<ChatbotContextValue | undefined>(undefined);

interface ChatbotProviderProps {
  children: ReactNode;
  autoRefreshInterval?: number;
}

export function ChatbotProvider({
  children,
  autoRefreshInterval = 180000,
}: ChatbotProviderProps) {
  const [data, setData] = useState<ChatbotData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const chatbotData = await fetchChatbotData();
      setData(chatbotData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch chatbot data:", err);
      setError(err instanceof Error ? err.message : "Failed to load chatbot data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const chatbotData = await refreshChatbotData();
      setData(chatbotData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to refresh chatbot data:", err);
      setError(err instanceof Error ? err.message : "Failed to refresh chatbot data");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (autoRefreshInterval <= 0) return;

    const interval = setInterval(() => {
      refresh();
    }, autoRefreshInterval);

    return () => clearInterval(interval);
  }, [autoRefreshInterval, refresh]);

  return (
    <ChatbotContext.Provider
      value={{ data, isLoading, error, lastUpdated, refresh }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbotData() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbotData must be used within a ChatbotProvider");
  }
  return context;
}

export function useChatbotDataSafe() {
  const { data, isLoading, error, lastUpdated, refresh } = useChatbotData();

  const getServices = useCallback(() => data?.services || [], [data?.services]);

  const getProducts = useCallback(() => data?.products || [], [data?.products]);

  const getProjects = useCallback(
    () => data?.projects || [],
    [data?.projects]
  );

  const getFaqs = useCallback(() => data?.faqs || [], [data?.faqs]);

  const getCompany = useCallback(() => data?.company || null, [data?.company]);

  const getProcess = useCallback(() => data?.process || null, [data?.process]);

  return {
    data,
    isLoading,
    error,
    lastUpdated,
    refresh,
    getServices,
    getProducts,
    getProjects,
    getFaqs,
    getCompany,
    getProcess,
  };
}