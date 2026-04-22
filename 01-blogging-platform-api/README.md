#Blogging Platform API

A RESTful API for managing blog posts with Node.js, Express, PostgreSQL and Prisma

## Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL installed and running

## Installation

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file and add our `DATABASE_URL`
4. Run `npx prisma migrate dev`
5. Run `npm run dev`

## Endpoints

| Method | Endpoint | Description |

|--------|----------|-------------|
| GET | /api/post | Get all posts |
| GET | /api/post/:id | Get a single post |
| POST | /api/post | Create a post |
| PUT | /api/post/:id | Update a post |
| DELETE | /api/post/:id | Delete a post |
| GET | /api/post?tag=tech | Filter posts by tag |

## Sample Request Body

### Create Post

\```json
{
"title": "My First Post",
"content": "This is the body",
"tags": ["tech", "life"]
}
\```
