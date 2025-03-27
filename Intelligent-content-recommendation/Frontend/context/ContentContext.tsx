import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { getAllContent } from "@/service/contentService";
import { getRecommendations } from "@/service/recommendationService";

interface Content {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

interface Recommendation {
  id: string;
  title: string;
  reason: string;
  imageUrl?: string;
  link?: string;
}

interface ContentContextProps {
  content: Content[];
  recommendations: Recommendation[];
  fetchContent: () => Promise<void>;
  fetchRecommendations: (userId: string) => Promise<void>;
  loading: boolean;
}

export const ContentContext = createContext<ContentContextProps | null>(null);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<Content[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllContent();
      setContent(response);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecommendations = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const response = await getRecommendations(userId);
      setRecommendations(response);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <ContentContext.Provider value={{ content, recommendations, fetchContent, fetchRecommendations, loading }}>
      {children}
    </ContentContext.Provider>
  );
};
