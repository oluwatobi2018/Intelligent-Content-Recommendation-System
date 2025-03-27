import React, { memo } from "react";
import ContentCard from "./ContentCard";

interface Recommendation {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

interface RecommendationListProps {
  recommendations: Recommendation[];
  loading?: boolean;
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations, loading }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommended for You</h2>

      {loading ? (
        // Display Skeleton Loaders if loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-48 w-full"></div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommendations.length > 0 ? (
            recommendations.map((item, index) => <ContentCard key={index} {...item} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center">No recommendations available.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Memoized for performance optimization
export default memo(RecommendationList);

