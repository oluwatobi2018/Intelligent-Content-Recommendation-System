import { useEffect, useState } from "react";

interface AnalyticsData {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  [key: string]: number; // Allow additional dynamic analytics properties
}

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        if (!response.ok) throw new Error("Failed to fetch analytics data");
        const data = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Content Performance Analytics</h1>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">{error}</p>
      ) : analytics ? (
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-4 rounded-lg shadow-md">
          <pre className="overflow-auto whitespace-pre-wrap">{JSON.stringify(analytics, null, 2)}</pre>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No analytics data available.</p>
      )}
    </div>
  );
}
