import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { fetchAnalyticsData } from "@/service/analyticsService";

interface AnalyticsData {
  totalViews: number;
  engagementRate: number;
  activeUsers: number;
}

interface AnalyticsContextProps {
  analytics: AnalyticsData | null;
  refreshAnalytics: () => Promise<void>;
  loading: boolean;
}

export const AnalyticsContext = createContext<AnalyticsContextProps | null>(null);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const storedData = localStorage.getItem("analytics");
        if (storedData) {
          setAnalytics(JSON.parse(storedData));
        } else {
          const data = await fetchAnalyticsData();
          setAnalytics(data);
          localStorage.setItem("analytics", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh analytics data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const refreshAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAnalyticsData();
      setAnalytics(data);
      localStorage.setItem("analytics", JSON.stringify(data));
    } catch (error) {
      console.error("Error refreshing analytics data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AnalyticsContext.Provider value={{ analytics, refreshAnalytics, loading }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
