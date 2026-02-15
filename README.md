# Language Learn

A language-learning web app for building vocabulary with **interactive tables**, **flashcards**, **quizzes**, and **sentences**. Start with Spanish: pick a category and a learning mode, filter by progress, and track your points as you go.

## Features

- **500+ words** across various levels: basics, numbers, beginner, intermediate, advanced, etc.
- **4 learning modes**: table view, flashcards, quizzes, sentences
- **Points system**: +10 for correct answers, −10 for incorrect; progress is stored per word when signed in
- **Filters**: limit words by a points range (e.g. 0–50) to focus on what you’re learning
- **Account & persistence**: register/login, word points saved in the database
- **Dark mode**: toggle in the nav (stored in `localStorage`)
- **Responsive layout**: nav, filters, and learning modes work on mobile and desktop

## Tech stack

- **SvelteKit** (Svelte 5, TypeScript)
- **Drizzle ORM** + **PostgreSQL** for users and word points
- **Vercel** adapter for deployment
- **Claude** for gneerating the vocabulary

## Getting started

https://language-learn-nine-vercel.app