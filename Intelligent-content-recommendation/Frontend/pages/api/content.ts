import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const content = [
    { id: "1", title: "React Tips", description: "Improve your React skills!", imageUrl: "/react.png", link: "https://reactjs.org" },
    { id: "2", title: "Next.js Guide", description: "Learn about Next.js features.", imageUrl: "/nextjs.png", link: "https://nextjs.org" },
  ];

  res.status(200).json(content);
}
