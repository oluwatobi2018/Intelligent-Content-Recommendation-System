import React from "react";

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description, imageUrl, link }) => {
  // Fallback Image URL (Replace with an actual file in your public folder)
  const fallbackImage = "/fallback-image.jpg"; // Ensure this exists in `/public`

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title || "Content Image"}
          className="w-full h-40 object-cover rounded-md"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImage;
          }}
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 mt-2 inline-block hover:underline"
        >
          Read More →
        </a>
      )}
    </div>
  );
};

export default ContentCard;

