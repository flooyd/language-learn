import { wordPoints } from "$lib/stores";

export const updateWordPoints = async (word: any, language: any, correct: any) => {
    try {
        const response = await fetch('/api/word-points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word, language, correct })
        });

        if (!response.ok) {
            throw new Error('Failed to update word points');
        }

        const data = await response.json();
        if (data.success) {
            const pointsResponse = await fetch('/api/word-points');
            if (!pointsResponse.ok) {
                throw new Error('Failed to fetch updated word points');
            }
            const pointsData = await pointsResponse.json();
            wordPoints.set(pointsData.wordPoints);
            return true;
        }
    } catch (error) {
        console.error('Error updating word points:', error);
        return false;
    }
};