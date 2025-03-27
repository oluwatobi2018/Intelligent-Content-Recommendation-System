import { useState, useEffect } from "react";
import ContentCard from "@/components/ContentCard"; // Import content card component

interface Content {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

export default function ContentPage() {
  const [contentList, setContentList] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content");
        if (!response.ok) throw new Error("Failed to load content");
        const data = await response.json();
        setContentList(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Recommended Content</h1>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading content...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contentList.length > 0 ? (
            contentList.map((content) => <ContentCard key={content.id} {...content} />)
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No content available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
}
