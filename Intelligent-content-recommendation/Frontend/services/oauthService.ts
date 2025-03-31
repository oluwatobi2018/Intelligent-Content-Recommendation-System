import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export interface OAuthTokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export const getOAuthToken = async (code: string): Promise<OAuthTokenResponse> => {
    try {
        const response = await axios.post<OAuthTokenResponse>(`${BASE_URL}/oauth/token`, {
            code,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching OAuth token:', error);
        throw error;
    }
};

export const refreshOAuthToken = async (refreshToken: string): Promise<OAuthTokenResponse> => {
    try {
        const response = await axios.post<OAuthTokenResponse>(`${BASE_URL}/oauth/refresh`, {
            refreshToken,
        });
        return response.data;
    } catch (error) {
        console.error('Error refreshing OAuth token:', error);
        throw error;
    }
};
