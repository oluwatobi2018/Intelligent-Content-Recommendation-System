import { useState, useEffect } from "react";
import ContentCard from "@/components/ContentCard"; // Import component

interface Content {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

export default function ContentPage() {
  const [contentList, setContentList] = useState<Content[]>([]);

  useEffect(() => {
    // Fetch content from API
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContentList(data))
      .catch((error) => console.error("Error fetching content:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Recommended Content</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contentList.map((content) => (
          <ContentCard key={content.id} {...content} />
        ))}
      </div>
    </div>
  );
}
