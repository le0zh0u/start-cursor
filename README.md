![Start Cursor](./public/logo.jpg)

# Start Cursor

Cursor AI is a big step for all developers.

Start Cursor let you as quick as possible be familiar with Cursor AI, helping you build different types of projects with ease.

My Thoughts: `In the future, the developers will be divided into two parts: coding with Cursor and the others.`

## Features

- [x] Rule Template
- [ ] Rule Ignore [DOING]
- [ ] Rule Guide [DOING]
- [x] Rule Project
- [x] Rule Category
- [ ] Rule Admin [DOING]

## Tech Stack

- [T3 App](https://create.t3.gg/)
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Shadcn UI](https://ui.shadcn.com)

## How to use

1. Online: [Start Cursor](https://startcursor.com)
2. Offline: [Local Deployment](#local-deployment)

# Local Deployment

- Clone this repo
- Copy `.env.example` to `.env` and set the environment variables
- Install dependencies: `pnpm install`
- Migrate database: `pnpm run db:generate`
- Start the app: `pnpm run dev`
- Visit `http://localhost:3000`

## Scripts

### Database

#### Reset database

remove the `migrations` file in `prisma` folder, then run:

```base
npx prisma migrate reset

npx prisma migrate dev --name init

```

# Who am I

I'm a full stack developer who loves to build things for myself and others.

When I first started using Cursor AI, I was amazed by its capabilities. However, I found it difficult to find and share useful rules for my different projects. So I decided to build this project to help others like me.

If you have any questions or suggestions, please feel free to contact me.
