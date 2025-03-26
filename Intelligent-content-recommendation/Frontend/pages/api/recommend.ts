import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const recommendations = [
    { id: "3", title: "Machine Learning Basics", description: "Start your ML journey.", imageUrl: "/ml.png", link: "https://tensorflow.org" },
    { id: "4", title: "JavaScript ES6+", description: "Modern JavaScript features.", imageUrl: "/js.png", link: "https://developer.mozilla.org" },
  ];

  res.status(200).json(recommendations);
}
