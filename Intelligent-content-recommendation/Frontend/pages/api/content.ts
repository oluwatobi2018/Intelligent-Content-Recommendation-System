import { NextApiRequest, NextApiResponse } from "next";

// Define the content structure
interface ContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

// Sample content data
const contentData: ContentItem[] = [
  {
    id: "1",
    title: "React Tips",
    description: "Improve your React skills!",
    imageUrl: "/react.png",
    link: "https://reactjs.org",
  },
  {
    id: "2",
    title: "Next.js Guide",
    description: "Learn about Next.js features.",
    imageUrl: "/nextjs.png",
    link: "https://nextjs.org",
  },
  {
    id: "3",
    title: "TypeScript Best Practices",
    description: "Enhance your TypeScript knowledge.",
    imageUrl: "/typescript.png",
    link: "https://www.typescriptlang.org/",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract optional query parameters for filtering (e.g., `?title=React`)
    const { title } = req.query;

    let filteredContent = contentData;

    // Filter content based on title if provided
    if (title && typeof title === "string") {
      filteredContent = filteredContent.filter((item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    // Return filtered content
    return res.status(200).json(filteredContent);
  } catch (error) {
    console.error("Error fetching content:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
