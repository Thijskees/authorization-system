# authorization-system

A TypeScript API for authentication, users, roles, and permissions. The project is built with Express, uses Zod for request validation, and can run against either an in-memory store or MongoDB.

## Features

- User registration and login
- Bearer token authentication
- User lookup endpoints
- Role creation and permission management
- Dedicated permission endpoints
- Request validation with Zod
- MongoDB persistence with a local Docker setup
- Optional in-memory storage for quick development

## Tech Stack

- TypeScript
- Express
- MongoDB
- Zod
- Docker Compose

## Project Structure

```text
src/
  app.ts
  index.ts
  auth/
  controllers/
  db/
  middlewares/
  models/
  routes/
  services/
  validation/
```

## Requirements

- Node.js 18 or newer
- npm
- Docker and Docker Compose if you want to run MongoDB locally

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and adjust values if needed.

```bash
DB_DRIVER=mongo
MONGO_URI=mongodb://localhost:27017/authorization
PORT=3000
```

### 3. Start MongoDB locally

```bash
npm run mongo:up
```

### 4. Run the API

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
npm start
```

## Runtime Modes

### MongoDB mode

Set `DB_DRIVER=mongo` and provide `MONGO_URI`. This is the default mode.

### In-memory mode

Set `DB_DRIVER=memory` to use the in-memory repository instead of MongoDB.

## Available Scripts

- `npm run dev` - start the API in development mode
- `npm run build` - compile TypeScript to `dist/`
- `npm start` - run the compiled server
- `npm run mongo:up` - start MongoDB with Docker Compose
- `npm run mongo:down` - stop the local MongoDB container

## API Overview

Base URL: `http://localhost:3000/api`

### Health

- `GET /api/health`

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users

- `GET /api/users`
- `GET /api/users/:id`

### Roles

- `POST /api/roles`
- `GET /api/roles`
- `GET /api/roles/:id`
- `POST /api/roles/:id/permissions`
- `DELETE /api/roles/:id/permissions`

### Permissions

- `POST /api/permissions`
- `GET /api/permissions`
- `GET /api/permissions/:id`

## Authentication

Protected routes expect a bearer token:

```http
Authorization: Bearer <token>
```

You get a token from `POST /api/auth/register` or `POST /api/auth/login`.

## Request Examples

### Register a user

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret123","name":"Alice"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret123"}'
```

### Get current user

```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

### Create a permission

```bash
curl -X POST http://localhost:3000/api/permissions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"code":"users.read","description":"Read users"}'
```

### Create a role

```bash
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"admin","permissions":["users.read","users.write"]}'
```

### Add a permission to a role

```bash
curl -X POST http://localhost:3000/api/roles/<roleId>/permissions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"permission":"users.read"}'
```

## Validation

The API validates request bodies with Zod and returns a `400` response when validation fails.

Example error shape:

```json
{
  "error": "Validation failed",
  "details": []
}
```

## Error Responses

Common error shapes:

```json
{
  "error": "Route not found"
}
```

```json
{
  "error": "Invalid email or password"
}
```

```json
{
  "error": "Internal Server Error"
}
```

## Docker

MongoDB is provided through `docker-compose.yml`.

```bash
npm run mongo:up
npm run mongo:down
```

The container exposes MongoDB on `localhost:27017` and persists data in a named volume.

## Notes

- The default persistence driver is MongoDB.
- The in-memory driver is available for fast local testing and demos.
- Role permissions are stored as permission codes.
- Permissions have dedicated endpoints so you can manage them independently before assigning them to roles.

## License

ISC
