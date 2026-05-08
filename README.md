# Notes CRUD

A fullstack notes CRUD application built with React, TypeScript, Tailwind CSS, shadcn/ui, Express, Prisma, PostgreSQL and Docker.

The project was created as a learning fullstack app to understand how frontend, backend, API routes, database, Docker and Git workflow work together.

## Preview

Main screen:

![Notes CRUD main screen](./screenshots/preview.png)

Edit mode:

![Notes CRUD edit mode](./screenshots/preview-edit.png)

Pinned note state:

![Notes CRUD pinned note](./screenshots/preview-pinned.png)

## Features

- Create notes
- Display all notes
- Edit note title and content
- Delete notes
- Pin and unpin notes
- Sort pinned notes above regular notes
- Basic form validation for empty fields
- Loading and error states
- Dark UI styled with Tailwind CSS and shadcn/ui
- Profile links section with GitHub, LinkedIn and avatar
- PostgreSQL database running in Docker
- Prisma ORM with migrations
- REST API on Express

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Icons

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker

### Tools

- pnpm
- Git
- Insomnia

## Project Structure

```txt
notes-crud/
  backend/
    prisma/
      migrations/
      schema.prisma
    src/
      index.ts
      prisma.ts
    package.json
    pnpm-lock.yaml
    prisma.config.ts
    tsconfig.json

  frontend/
    public/
    src/
      api/
        notesApi.ts
      components/
        ui/
          avatar.tsx
          button.tsx
          field.tsx
          input.tsx
          label.tsx
          separator.tsx
          textarea.tsx
        NoteCard.tsx
        NoteForm.tsx
        NoteList.tsx
        ProfileLinks.tsx
      lib/
        utils.ts
      types/
        notes.ts
      App.tsx
      index.css
      main.tsx
    .gitignore
    components.json
    eslint.config.js
    index.html
    package.json
    pnpm-lock.yaml
    tsconfig.app.json
    tsconfig.json
    tsconfig.node.json
    vite.config.ts

  screenshots/
    preview.png
    preview-edit.png
    preview-pinned.png

  .editorconfig
  .gitignore
  docker-compose.yaml
  README.md
```

## API Routes

### Health check

```txt
GET /api/health
```

Checks if the backend server is running.

### Get all notes

```txt
GET /api/notes
```

Returns all notes from the database.

### Get one note

```txt
GET /api/notes/:id
```

Returns one note by ID.

### Create note

```txt
POST /api/notes
```

Request body:

```json
{
  "title": "Note title",
  "content": "Note content"
}
```

### Update note

```txt
PATCH /api/notes/:id
```

Request body:

```json
{
  "title": "Updated title",
  "content": "Updated content"
}
```

### Delete note

```txt
DELETE /api/notes/:id
```

Deletes a note by ID.

### Pin or unpin note

```txt
PATCH /api/notes/:id/pin
```

Toggles the `isPinned` value.

## Database Model

```prisma
model Note {
  id        String   @id @default(uuid())
  title     String
  content   String
  isPinned  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd notes-crud
```

### 2. Start PostgreSQL with Docker

```bash
docker compose up -d
```

The project uses PostgreSQL inside Docker.

Example `docker-compose.yaml` port mapping:

```yaml
ports:
  - "5434:5432"
```

This means:

```txt
localhost:5434 on your machine
connects to
5432 inside the PostgreSQL container
```

### 3. Install backend dependencies

```bash
cd backend
pnpm install
```

### 4. Create backend `.env`

Create a `.env` file inside the `backend` folder:

```env
DATABASE_URL="postgresql://notes_user:notes_password@localhost:5434/notes_db?schema=public"
PORT=4000
```

### 5. Run Prisma migrations

```bash
pnpm prisma migrate dev
```

If you create a new migration manually, use:

```bash
pnpm prisma migrate dev --name migration-name
```

### 6. Generate Prisma Client

```bash
pnpm prisma generate
```

### 7. Start backend

```bash
pnpm dev
```

Backend will run on:

```txt
http://localhost:4000
```

### 8. Install frontend dependencies

Open another terminal:

```bash
cd frontend
pnpm install
```

### 9. Start frontend

```bash
pnpm dev
```

Frontend will run on:

```txt
http://localhost:5173
```

## Environment Variables

Backend `.env`:

```env
DATABASE_URL="postgresql://notes_user:notes_password@localhost:5434/notes_db?schema=public"
PORT=4000
```

Do not commit `.env` files.

## Useful Commands

### Start database

```bash
docker compose up -d
```

### Stop database

```bash
docker compose down
```

### Stop database and remove volume

```bash
docker compose down -v
```

### Run backend

```bash
cd backend
pnpm dev
```

### Run frontend

```bash
cd frontend
pnpm dev
```

### Create Prisma migration

```bash
cd backend
pnpm prisma migrate dev --name migration-name
```

### Generate Prisma Client

```bash
cd backend
pnpm prisma generate
```

## What I Practiced

During this project, I practiced:

- Creating a fullstack project structure
- Working with separate frontend and backend apps
- Building REST API routes with Express
- Using Prisma with PostgreSQL
- Running PostgreSQL in Docker
- Working with migrations
- Connecting React frontend to Express backend
- Managing React state
- Passing callbacks between components
- Creating reusable components
- Testing API routes with Insomnia
- Using Git commits by feature stages

## Possible Improvements

- Add authentication
- Add search
- Add filtering by pinned notes
- Add better form validation
- Add toast notifications
- Add confirmation before deleting a note
- Add deployment
- Add tests
- Add pagination
- Add markdown support

## Status

The project is finished as a learning CRUD application.
