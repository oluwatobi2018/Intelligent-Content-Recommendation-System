import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    // Mock user data for demonstration purposes
    const mockUser = {
        email: 'test@example.com',
        passwordHash: '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4z8EJz5hE9yW9d3y1uG', // hashed password for "password123"
    };

    if (email !== mockUser.email) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await compare(password, mockUser.passwordHash);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = sign({ email: mockUser.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
}
