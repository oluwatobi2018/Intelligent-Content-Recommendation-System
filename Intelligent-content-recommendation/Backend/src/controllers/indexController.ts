import { Request, Response } from 'express';

class IndexController {
    public async getIndex(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({ message: 'Welcome to the Intelligent Content Recommendation System API!' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    }
}

export default new IndexController();