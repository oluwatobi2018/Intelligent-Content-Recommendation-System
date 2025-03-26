import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getAllContent } from "@/service/contentService";
import { getRecommendations } from "@/service/recommendationService";

interface ContentContextProps {
  content: any[];
  recommendations: any[];
  fetchContent: () => Promise<void>;
}

export const ContentContext = createContext<ContentContextProps | null>(null);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const fetchContent = async () => {
    try {
      const response = await getAllContent();
      setContent(response);
    } catch (error) {
      console.error("Failed to fetch content");
    }
  };

  const fetchRecommendations = async (userId: string) => {
    try {
      const response = await getRecommendations(userId);
      setRecommendations(response);
    } catch (error) {
      console.error("Failed to fetch recommendations");
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, recommendations, fetchContent }}>
      {children}
    </ContentContext.Provider>
  );
};
