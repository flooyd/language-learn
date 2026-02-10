import { json } from '@sveltejs/kit';
import {db} from '$lib/server/db';
import {user} from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { generateSessionToken } from '../index.js';

export const POST = async ({request, cookies}) => {
    const {email, password} = await request.json();

    if(!email || !password) {
        return json({error: 'Email and password are required.'}, {status: 400});
    }

    const existingUsers = await db.select().from(user).where(eq(user.email, email)).limit(1);

    if(existingUsers.length === 0) {
        return json({error: 'Invalid email or password.'}, {status: 401});
    }

    const passwordMatch = await bcrypt.compare(password, existingUsers[0].password);

    if(!passwordMatch) {
        return json({error: 'Invalid email or password.'}, {status: 401});
    }

    const sessionToken = generateSessionToken(existingUsers[0]);

    cookies.set('session', sessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
    });

    return json({message: 'Login successful.', user: {email: existingUsers[0].email}});
}