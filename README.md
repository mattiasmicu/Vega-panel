# Vega Panel

A modern, full-stack game server control panel built with React, TypeScript, Express, and Prisma.

---

## Features

- User authentication with JWT
- Real-time notifications
- Game server management (create, start, stop, etc.)
- User and role management
- Responsive, modern UI
- PostgreSQL database (via Prisma)
- Modular API and React component structure

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **PostgreSQL** (for backend/database)
- **Git** (to clone the repository)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mattiasmicu/Vega-panel.git
cd Vega-panel
```

### 2. Install Dependencies

#### Frontend

```bash
npm install
npm install axios date-fns date-fns-tz react-router-dom lucide-react
npm install -D @types/react @types/react-dom @types/react-router-dom
```

#### Backend (if using API/server features)

```bash
cd api
npm install express @prisma/client prisma bcrypt jsonwebtoken cookie-parser
npm install --save-dev @types/express @types/bcrypt @types/jsonwebtoken @types/cookie-parser
```

### 3. Environment Configuration

#### Frontend

Create a `.env` file in the root if you need to override API base URLs, for example:
```
VITE_API_URL=http://localhost:3000/api
```

#### Backend

Create a `.env` file in the `/api` folder:

```
DATABASE_URL="postgresql://user:password@localhost:5432/vega_panel"
JWT_SECRET="your-very-secure-jwt-secret"
```

### 4. Database Setup

Make sure PostgreSQL is running and your database is created.

Run Prisma migrations (from `/api`):

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Running the App

#### Backend

From the `/api` directory:

```bash
npm run dev
```
(Default port: 3000)

#### Frontend

From the root directory:

```bash
npm run dev
```
(Default port: 5173 or set by your framework)

---

## Project Structure

```
resources/
└── scripts/
    ├── components/
    │   └── layout/
    │       ├── AppLayout.tsx
    │       └── Header.tsx
    └── pages/
        └── server/
            └── ServerListPage.tsx
api/
└── routes/
    ├── auth.ts
    └── notifications.ts
    ...
```

---

## Usage Example

```typescript
import { AppLayout } from '@/components/layout/AppLayout';

function YourPage() {
  return (
    <AppLayout currentUser="mattiasmicu">
      {/* Your page content */}
    </AppLayout>
  );
}
```

---

## Additional Setup

- Place a `default-avatar.png` in your `public/` folder for the default user avatar.
- Make sure your `tsconfig.json` includes alias config for `@/*` imports.

---

## Security

- Never commit your real secrets!
- Use secure cookies and HTTPS in production.
- Change your JWT secret and database credentials before deploying.

---

## Contributing

Pull requests and issues are welcome! Please open an issue if you find a bug or want to request a feature.

---

## License

MIT
