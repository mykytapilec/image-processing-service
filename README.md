# Image Processing Service

A backend service for uploading, processing and managing images.

## Roadmap Project

This project is based on the roadmap.sh backend project:

https://roadmap.sh/projects/image-processing-service

## Repository

https://github.com/mykytapilec/image-processing-service

## Features

- Upload images
- Store images locally
- Extract image metadata
- Generate image thumbnails
- Retrieve images by ID
- List uploaded images
- Delete images
- PostgreSQL database integration

## Tech Stack

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Sharp
- Docker
- Docker Compose

## Requirements

- Node.js 22+
- Docker
- Docker Compose

## Installation

Clone the repository:

```bash
git clone https://github.com/mykytapilec/image-processing-service.git

cd image-processing-service
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

## Environment Variables

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/image_processing"
STORAGE_PATH="./storage"
PORT=3000
```

## Database Setup

Start PostgreSQL:

```bash
docker compose up -d
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

## Development

Run the application:

```bash
npm run dev
```

The server will start at:

```
http://localhost:3000
```

## Production Build

Run checks:

```bash
npm run check
```

Build the project:

```bash
npm run build
```

## API Endpoints

## Upload Image

### POST `/images`

Upload an image file.

Example:

```bash
curl -X POST \
  -F "file=@/path/to/image.png" \
  http://localhost:3000/images
```

Response:

```json
{
  "id": "uuid",
  "filename": "image.png",
  "mimetype": "image/png",
  "size": 123456
}
```

---

## List Images

### GET `/images`

Returns all uploaded images.

Example:

```bash
curl http://localhost:3000/images
```

Response:

```json
[
  {
    "id": "uuid",
    "filename": "image.png",
    "mimetype": "image/png",
    "size": 123456,
    "width": 1200,
    "height": 800,
    "format": "png",
    "createdAt": "2026-07-21T00:00:00.000Z"
  }
]
```

---

## Get Image

### GET `/images/:id`

Returns image file by ID.

Example:

```bash
curl \
  http://localhost:3000/images/{id} \
  --output image.png
```

---

## Delete Image

### DELETE `/images/:id`

Deletes image and generated thumbnail.

Example:

```bash
curl -X DELETE \
  http://localhost:3000/images/{id}
```

Response:

```
204 No Content
```

---

## Project Structure

```text
src
├── config
│   └── env.ts
├── database
│   ├── database.ts
│   └── prisma.ts
├── image
│   ├── image.routes.ts
│   ├── image.service.ts
│   └── image.types.ts
├── processing
│   ├── image-processing.service.ts
│   └── image-processing.types.ts
├── storage
│   ├── storage.service.ts
│   └── storage.types.ts
├── app.ts
└── server.ts
```

## Storage

Uploaded images and generated thumbnails are stored locally:

```text
storage/
├── image.png
└── thumb-image.png
```

## Validation

Before committing changes, run:

```bash
npm run check
npm run build
```