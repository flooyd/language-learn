import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const generateSessionToken = (user: any): string => {
    const secret = env.JWT_SECRET;
    return jwt.sign({ id: user.id, username: user.username, displayName: user.displayName }, secret, { expiresIn: '30d' });
}

export const verifySessionToken = (token: string): any => {
    try {
        const secret = env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        console.error('Error verifying session token:', error);
        return null;
    }
}