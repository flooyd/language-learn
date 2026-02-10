import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user', 
    { 
        id: serial('id').primaryKey(), age: integer('age'),
        email: text('email').notNull().unique(),
        password: text('password').notNull()
    });
