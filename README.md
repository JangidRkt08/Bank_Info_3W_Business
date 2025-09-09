## Bank Information Management System

A full-stack app for managing bank accounts with role-based access (user/admin).

### Tech Stack
- **Backend**: Node.js, Express, MongoDB (Atlas)
- **Frontend**: React (Vite)
- **Auth/Security**: JWT, bcrypt

### Features
- **User auth**: Register and login with securely hashed passwords
- **Bank accounts**: Add, list, edit, and delete multiple accounts
- **Admin**: View all accounts with query filters

### Project Structure
- `backend`: Express API
- `frontend`: React app (Vite)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- MongoDB Atlas connection URI

### Backend Setup
1. Create `backend/.env`:

```
PORT=4000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=some_long_secret
ADMIN_EMAIL=admin@example.com
```

2. Install and run the backend:

```
cd backend
npm install
npm run dev
```

### Frontend Setup
1. Create `frontend/.env`:

```
VITE_API_URL=http://localhost:4000/api
```

2. Install and run the frontend:

```
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Admin User

- The first user who registers with an email matching `ADMIN_EMAIL` becomes an admin.

---

## Testing

Use the following test user credentials to log in (or register first, then log in):

```json
{ "username": "testuser", "email": "testuser@example.com", "password": "test123" }
```

Note: 1.This test user is a regular user (not an admin).
      2. You can use this information directly into dashboaurd login(Frontend)

---

## API Overview

Auth
- `POST /api/auth/register` — body: `{ username, email, password }`
- `POST /api/auth/login` — body: `{ email, password }`

Accounts (requires auth)
- `GET /api/accounts`
- `POST /api/accounts`
- `PUT /api/accounts/:id`
- `DELETE /api/accounts/:id`

Admin (requires admin role)
- `GET /api/admin/accounts?q=&bankName=&ifsc=&username=&email=`

---

## Deployment

### Vercel (Backend)
- Project root: `backend`
- Build command: (none)
- Output directory: (none)
- Environment variables: `PORT=4000`, `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`
- Ensure CORS allows your Netlify domain

### Netlify (Frontend)
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables:

```
VITE_API_URL=https://<your-vercel-app>.vercel.app/api
```

---

## Notes
- Passwords are never stored in plain text (bcrypt hashing)
- Stateless auth using JWT via the `Authorization` header
- Ownership enforced on account routes; admin checks via role
- Request validation using Joi on all inputs

