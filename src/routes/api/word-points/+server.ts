import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { wordPoint } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export const POST = async ({ request, locals }) => {
    const { word, language, correct } = await request.json();

    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const existingEntry = await db.select().from(wordPoint).where(
            and(
                eq(wordPoint.userId, locals.user.id),
                eq(wordPoint.word, word),
                eq(wordPoint.language, language)
            )
        ).limit(1);

        if (existingEntry.length > 0) {
            const currentPoints = existingEntry[0].points;
            const newPoints = correct ? currentPoints + 10 : Math.max(currentPoints - 10, 0);
            const clampedPoints = Math.max(0, Math.min(100, newPoints));

            await db.update(wordPoint).set({ points: clampedPoints }).where(
                and(
                    eq(wordPoint.userId, locals.user.id),
                    eq(wordPoint.word, word),
                    eq(wordPoint.language, language)
                )
            );
        } else {
            await db.insert(wordPoint).values({
                userId: locals.user.id,
                word: word,
                language: language,
                points: correct ? 10 : 0
            });
        }
    } catch (error) {
        return json({ error: 'Failed to update word points' }, { status: 500 });
    }

    return json({ success: true });
}

export const GET = async ({ request, locals }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const wordPoints = await db.select().from(wordPoint).where(eq(wordPoint.userId, locals.user.id));
        return json({ wordPoints });
    } catch (error) {
        return json({ error: 'Failed to fetch word points' }, { status: 500 });
    }
}