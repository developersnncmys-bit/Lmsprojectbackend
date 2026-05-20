# LabSync Backend

Node.js + Express + MongoDB API for the LabSync dashboard. All resources are persisted in MongoDB via Mongoose. Auth uses JWT bearer tokens with bcrypt-hashed passwords.

## Quick start

```bash
cd backend
cp .env.example .env       # adjust MONGO_URI / JWT_SECRET
npm install
npm run create-admin       # bootstrap first Super Admin (admin@labsync.in / admin123)
npm run dev                # http://localhost:5000
```

Health check: `GET /api/health`.

## Auth

- `POST /api/auth/login` body `{ identifier, password }` — `identifier` is email or username. Returns `{ token, user }`.
- `GET  /api/auth/me` — requires `Authorization: Bearer <token>`.

All other routes require a token.

## Resources

| Path                                | Methods                | Notes                                     |
|-------------------------------------|------------------------|-------------------------------------------|
| `/api/users`                        | GET, POST, PUT, DELETE | Admin can set username + password         |
| `/api/tests`                        | GET, POST, PUT, DELETE | Plus `POST /bulk-edit`, `POST /bulk-upload` |
| `/api/packages`                     | GET, POST, PUT, DELETE |                                           |
| `/api/report-templates`             | GET, POST, PUT, DELETE |                                           |
| `/api/patients`                     | GET, POST, PUT, DELETE |                                           |
| `/api/orders`                       | GET, POST, PUT, DELETE |                                           |
| `/api/ref-doctors`                  | GET, POST, PUT, DELETE | Source required on create                 |
| `/api/ref-centres`                  | GET, POST, PUT, DELETE |                                           |
| `/api/mkt-sources`                  | GET, POST, PUT, DELETE |                                           |
| `/api/signatories`                  | GET, POST, PUT, DELETE |                                           |
| `/api/expenses`                     | GET, POST, PUT, DELETE | Plus `GET /today-summary`                 |
| `/api/registrations`                | GET, POST, PUT, DELETE | Computes subtotal / discount / total      |
