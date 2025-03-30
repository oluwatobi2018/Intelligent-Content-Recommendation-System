import * as dotenv from 'dotenv';


dotenv.config();

export function validateEnv(requiredKeys: string[]): void {
    const missingKeys = requiredKeys.filter((key) => !process.env[key]);

    if (missingKeys.length > 0) {
        throw new Error(`Missing required environment variables: ${missingKeys.join(', ')}`);
    }
}