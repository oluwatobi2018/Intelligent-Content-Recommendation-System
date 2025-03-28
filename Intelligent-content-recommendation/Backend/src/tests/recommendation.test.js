const { recommendContent } = require('../services/recommendationService');

describe('Content Recommendation Service', () => {
    test('should return recommended content based on user preferences', () => {
        const userPreferences = { genre: 'sci-fi', language: 'en' };
        const contentList = [
            { id: 1, title: 'Interstellar', genre: 'sci-fi', language: 'en' },
            { id: 2, title: 'Inception', genre: 'sci-fi', language: 'en' },
            { id: 3, title: 'Parasite', genre: 'thriller', language: 'ko' },
        ];

        const recommendations = recommendContent(userPreferences, contentList);

        expect(recommendations).toEqual([
            { id: 1, title: 'Interstellar', genre: 'sci-fi', language: 'en' },
            { id: 2, title: 'Inception', genre: 'sci-fi', language: 'en' },
        ]);
    });

    test('should return an empty array if no content matches user preferences', () => {
        const userPreferences = { genre: 'comedy', language: 'fr' };
        const contentList = [
            { id: 1, title: 'Interstellar', genre: 'sci-fi', language: 'en' },
            { id: 2, title: 'Inception', genre: 'sci-fi', language: 'en' },
        ];

        const recommendations = recommendContent(userPreferences, contentList);

        expect(recommendations).toEqual([]);
    });
});
