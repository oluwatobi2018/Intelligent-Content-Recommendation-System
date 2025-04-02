// api/index.js

// Example API handler
export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Welcome to the API!' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}