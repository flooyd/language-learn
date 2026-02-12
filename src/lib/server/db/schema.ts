import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user',
    {
        id: serial('id').primaryKey(), age: integer('age'),
        email: text('email').notNull().unique(),
        password: text('password').notNull()
    });

export const wordPoint = pgTable('wordPoint',
    {
        id: serial('id').primaryKey(),
        userId: integer('userId').notNull().references(() => user.id),
        word: text('word').notNull(),
        language: text('language').notNull(),
        points: integer('points').notNull()
    });
