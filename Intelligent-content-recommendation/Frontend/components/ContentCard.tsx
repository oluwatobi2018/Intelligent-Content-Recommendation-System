import React from "react";

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description, imageUrl, link }) => {
  // Fallback Image URL (Ensure this exists in /public)
  const fallbackImage = "/fallback-image.jpg";

  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
      <div className="relative w-full h-40">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title || "Content Image"}
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackImage;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 inline-flex items-center"
          >
            Read More →
          </a>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
