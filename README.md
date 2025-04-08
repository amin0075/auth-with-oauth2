# Authentication with Next.js, Redis, and PostgreSQL

This project is a robust authentication system built with the latest version of Next.js. It supports email/password authentication with session management (using Redis) and OAuth integration (e.g., GitHub and Discord). The main database is PostgreSQL, and Drizzle ORM is used for database queries.

## Features

- **Email/Password Authentication**: Secure user authentication with session management.
- **Session Management**: Sessions are stored in Redis for fast and scalable access.
- **OAuth Integration**: Pre-configured for GitHub and Discord, but easily extendable to other providers.
- **PostgreSQL Database**: Used as the primary database for storing user data.
- **Drizzle ORM**: A modern and type-safe ORM for database queries.
- **Dockerized PostgreSQL**: A docker-compose.yml file is included for easy PostgreSQL setup.

---

## Project Structure

```
.
├── .env                     # Environment variables
├── docker-compose.yml       # Docker configuration for PostgreSQL
├── src/
│   ├── auth/                # Authentication logic
│   │   ├── core/            # Core session and authentication utilities
│   │   └── oauth/           # OAuth provider-specific logic
│   ├── drizzle/             # Drizzle ORM schema and database setup
│   ├── redis/               # Redis client configuration
│   └── pages/               # Next.js pages
├── public/                  # Public assets
├── data/                    # PostgreSQL configuration files
├── .next/                   # Next.js build output
└── package.json             # Project dependencies and scripts
```

---

## Prerequisites

- Node.js (v18 or later)
- Docker (for PostgreSQL setup)
- Redis (Upstash or local Redis server)

---

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/amin0075/auth-with-oauth2.git
   cd auth-with-oauth2
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a .env file in the root directory and configure the following variables:

   ```env
   # Database
   DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
   DB_USER="<user>"
   DB_PASSWORD="<password>"
   DB_NAME="<database>"
   DB_HOST="<host>"

   # Redis
   REDIS_URL="<redis-url>"
   REDIS_TOKEN="<redis-token>"

   # OAuth
   OAUTH_REDIRECT_URL_BASE="http://localhost:3000/api/oauth/"
   GITHUB_CLIENT_ID="<github-client-id>"
   GITHUB_CLIENT_SECRET="<github-client-secret>"
   DISCORD_CLIENT_ID="<discord-client-id>"
   DISCORD_CLIENT_SECRET="<discord-client-secret>"
   ```

4. **Set Up PostgreSQL**:
   Use the provided docker-compose.yml file to spin up a PostgreSQL instance:

   ```bash
   docker compose up -d
   ```

5. **Generate Database Tables**:
   Use Drizzle ORM to generate the database tables:

   ```bash
   npm run db:generate
   ```

6. **Run Database Migrations**:
   Use Drizzle ORM to apply database migrations:

   ```bash
   npm run db:migrate
   ```

7. **Start the Development Server**:
   ```bash
   npm run dev
   ```

---

## Usage

- **Email/Password Authentication**:

  - Users can sign up and log in with their email and password.
  - Sessions are managed using Redis.

- **OAuth Authentication**:
  - Pre-configured for GitHub and Discord.
  - Extendable to other providers by adding their credentials in .env and updating the OAuth logic.

---

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.
- `npm run drizzle:migrate`: Run database migrations using Drizzle ORM.

---

## Extending OAuth Providers

To add a new OAuth provider:

1. Add the provider's credentials to the .env file.
2. Update the OAuth logic in `src/auth/oauth`.
