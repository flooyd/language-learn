// place files you want to import through the `$lib` alias in this folder.
import { wordPoints } from "$lib/stores";
import { get, type Readable } from "svelte/store";

type WordPoint = {
    word: string;
    language: string;
    points: number;
};

export const getWordPoints = async () => {
    try {
        const response = await fetch('/api/word-points', {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch word points');
        }

        const data = await response.json();
    } catch (error) {
        console.error('Error fetching word points:', error);
    }
};


export const updateWordPoints = async (word: any, language: any, correct: any) => {
    const currentPoints: WordPoint[] = get(wordPoints as Readable<WordPoint[]>);
    const updatedPoints: WordPoint[] = currentPoints.map((point: WordPoint) => {
        if (point.word === word && point.language === language) {
            const newPoints = correct ? point.points + 10 : point.points - 10;
            const clampedPoints = Math.max(0, Math.min(100, newPoints));
            return {
                ...point,
                points: clampedPoints
            };
        }
        return point;
    });

    wordPoints.set(updatedPoints);
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