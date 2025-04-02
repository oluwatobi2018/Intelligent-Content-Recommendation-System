import type { NextApiRequest, NextApiResponse } from 'next'

// Next.js API route example

type Data = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ message: 'Hello, world!' })
}
