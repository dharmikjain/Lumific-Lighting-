# Lumific Backend API

Node.js, Express, PostgreSQL, Prisma backend for the Lumific Lighting B2B/B2C platform.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env`
   - Set `DATABASE_URL` to your PostgreSQL connection string
   - Set `JWT_SECRET` for production

3. **Database**
   ```bash
   npx prisma generate   # Generate Prisma client
   npx prisma db push    # Push schema to DB (dev)
   # or
   npx prisma migrate dev   # Run migrations
   ```

4. **Start server**
   ```bash
   npm run dev    # Development with watch
   npm start      # Production
   ```

## API Routes

| Route | Description |
|-------|-------------|
| `POST /api/auth/register` | Register user |
| `POST /api/auth/login` | Login |
| `GET /api/auth/me` | Current user (auth) |
| `GET /api/products` | List products |
| `GET /api/products/:id` | Product detail |
| `GET /api/portfolio` | Portfolio projects |
| `POST /api/configurator` | Save config session |
| `GET /api/configurator` | User sessions (auth) |
| `GET /api/portal/quotes` | User quotes (auth, sales/partner/architect/interior) |
| `GET /api/portal/orders` | User orders |
| `GET /api/techlib` | Technical assets (IES, DWG, etc.) |
| `GET /api/collaboration/projects` | User projects |
| `POST /api/collaboration/projects` | Create project |
| `GET /api/training/modules` | Training modules |
| `GET /api/search?q=` | Global search |
| `GET /api/content/news` | Content (stub) |

## Roles

- **client** – End customer
- **interior** – Interior designer
- **architect** – Architect
- **sales** – Sales team
- **marketing** – Marketing
- **partner** – Distributor/partner
