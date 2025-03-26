import { useEffect, useState } from "react";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch((error) => console.error("Error fetching analytics:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Content Performance Analytics</h1>
      {analytics ? (
        <pre className="bg-gray-800 text-white p-4 rounded">{JSON.stringify(analytics, null, 2)}</pre>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
}
