// api/users.js

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Handle GET request
        res.status(200).json({ message: 'List of users' });
    } else if (req.method === 'POST') {
        // Handle POST request
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({ error: 'Name and email are required' });
        } else {
            res.status(201).json({ message: 'User created', user: { name, email } });
        }
    } else {
        // Handle unsupported methods
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}