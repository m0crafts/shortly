# Shortly — URL Shortener

A full-stack URL shortener built with a Go backend, Redis caching, PostgreSQL persistence, and a React frontend.

---

## Tech Stack

### Backend

- Go — `net/http` (no framework)
- PostgreSQL — `pgx/v5` (no ORM)
- Redis — `go-redis/v9`

### Frontend

- React + TypeScript + Vite
- Tailwind CSS v4

### Infrastructure

- Docker + Docker Compose

---

## Architecture

```txt
Frontend (React)
      │
      ▼
REST API (Go / net/http)
      │
      ├──► Redis (cache layer)
      │
      └──► PostgreSQL (source of truth)
```

---

## API Endpoints

### `POST /generate`

**Request**

```json
{ "original_url": "https://example.com/very/long/url" }
```

**Response `201`**

```json
{ "short_code": "a1b2c3d4" }
```

### `GET /:code`

Redirects to the original URL with `302`. Redirects to `/404` if not found.

---

## Docker Setup

**Start everything:**

```bash
docker compose up --build
```

**Environment variables** — create a `.env` in the root:

```env
DATABASE_URL=postgres://postgres:password@localhost:5432/urlshortener?sslmode=disable
REDIS_URL=localhost:6379
PORT=8080
```

---

## License

MIT
