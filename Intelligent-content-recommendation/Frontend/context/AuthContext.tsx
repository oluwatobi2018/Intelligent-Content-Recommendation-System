import React, { createContext, useState, ReactNode } from "react";
import { trackContentView } from "@/service/analyticsService";

interface AnalyticsContextProps {
  trackView: (userId: string, contentId: string) => Promise<void>;
}

export const AnalyticsContext = createContext<AnalyticsContextProps | null>(null);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const trackView = async (userId: string, contentId: string) => {
    try {
      await trackContentView(userId, contentId);
    } catch (error) {
      console.error("Failed to track content view");
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackView }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
