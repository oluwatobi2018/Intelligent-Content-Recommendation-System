import React from "react";
import ContentCard from "./ContentCard";

interface RecommendationListProps {
  recommendations: { title: string; description: string; imageUrl?: string; link?: string }[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommendations.map((item, index) => (
          <ContentCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
