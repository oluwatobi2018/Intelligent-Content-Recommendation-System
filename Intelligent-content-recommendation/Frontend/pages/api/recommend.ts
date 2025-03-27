import { NextApiRequest, NextApiResponse } from "next";

// Define the recommendation structure
interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

// Sample recommendation data
const recommendationData: RecommendationItem[] = [
  {
    id: "3",
    title: "Machine Learning Basics",
    description: "Start your ML journey.",
    imageUrl: "/ml.png",
    link: "https://tensorflow.org",
  },
  {
    id: "4",
    title: "JavaScript ES6+",
    description: "Modern JavaScript features.",
    imageUrl: "/js.png",
    link: "https://developer.mozilla.org",
  },
  {
    id: "5",
    title: "React Performance Optimization",
    description: "Enhance your React app's speed and efficiency.",
    imageUrl: "/react-perf.png",
    link: "https://react.dev/docs/optimizing-performance.html",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract optional query parameters for filtering (e.g., `?title=Machine Learning`)
    const { title } = req.query;

    let filteredRecommendations = recommendationData;

    // Filter recommendations based on title if provided
    if (title && typeof title === "string") {
      filteredRecommendations = filteredRecommendations.filter((item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    // Return filtered recommendations
    return res.status(200).json(filteredRecommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
