# Book Tracker Monorepo

This is a monorepo for **Book Tracker**, containing the backend (Express + Knex + SQLite + Typescript) and the frontend (React + Vite + Typescript).
It uses [Turborepo](https://turbo.build/) for task running and workspaces for package management.

## Getting Started

### 1. Install dependencies

Make sure you have **Node.js >= 20** and **npm >= 11** installed.

```bash
npm install
```

### 2. Environment files

Before running the apps, copy .env.example to .env in both apps/web and apps/backend and adjust the values as needed.

### 3. Database migrations

Before running the backend, you must run the proper migrations:

- **Development:**

  ```bash
  cd apps/backend
  npm run dev:knex-migrate
  ```

- **Production:**

  ```bash
  cd apps/backend
  npm run prod:knex-migrate
  ```

## 🖥️ Running the apps

Run all apps in **dev mode** in parallel:

```bash
npm run dev
```

Run the backend only:

```bash
cd apps/backend
npm run dev
```

Run the frontend only:

```bash
cd apps/web
npm run dev
```
⚠️ Note: On the very first run after npm install, you may encounter a compilation error due to the package build queue. If this happens, simply stop the process and run npm run dev again.

## Build

Build all packages and apps:

```bash
npm run build
```

Build a single app:

```bash
cd apps/backend
npm run build
```

```bash
cd apps/web
npm run build
```

## ✅ Testing

Run all unit tests:

```bash
npm run test:unit
```

Or per app:

```bash
cd apps/backend
npm run test:unit
```

```bash
cd apps/web
npm run test:unit
```
⚠️ The application is not covered 100% by tests. Only the most important parts are covered using unit tests.

## Lint & Format

Lint all workspaces:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

Check formatting without writing:

```bash
npm run format:check
```

---

## 📂 Project Structure

```
book_tracker/
├── apps/
│   ├── backend/   # Express + Knex API
│   └── web/       # React + Vite frontend
├── packages/      # Shared code (eslint config, validations)
├── package.json   # Root scripts + workspaces
└── turbo.json     # Turborepo config
```

---

## Notes

- Always run migrations before starting the backend.
- Use `npm run dev` at the root for local development.
- Use `npm run build && npm start` for production.
