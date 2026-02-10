import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { verifySessionToken } from './routes/api/auth/index.js';

export const handle: Handle = async ({ event, resolve }) => {
    const sessionToken = event.cookies.get('session');

    if (sessionToken) {
        try {
            const userData = await verifySessionToken(sessionToken);

            if (userData) {
                const existingUsers = await db.select().from(user).where(eq(user.id, userData.id)).limit(1);

                if (existingUsers.length > 0) {
                    event.locals.user = {
                        id: existingUsers[0].id,
                        email: existingUsers[0].email
                    };
                }

                console.log('User data from session token:', event.locals.user);
            }
        } catch (error) {
            console.error('Error verifying session token:', error);
        }
    }

    return resolve(event);
}