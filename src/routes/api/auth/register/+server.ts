import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return json({ error: 'Email and password are required.' }, { status: 400 });
        }

        const existingUser = await db.select().from(user).where(eq(user.email, email)).limit(1);

        if (existingUser.length > 0) {
            return json({ error: 'Email is already taken.' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const result = await db.insert(user).values({
            email,
            password: hashedPassword
        }).returning({ id: user.id, email: user.email });

        return json({ message: 'Registration successful', user: result[0] });
    } catch (error) {
        return json({ error: 'Invalid request body' }, { status: 400 });
    }
};