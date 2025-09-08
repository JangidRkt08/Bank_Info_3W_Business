Bank Information Management System

Stack: Node.js, Express, MongoDB (Atlas), React (Vite), JWT, bcrypt

Features
- User auth: register/login with hashed passwords
- User bank accounts: add, list, edit, delete (multiple supported)
- Admin: view all accounts with filters

Project Structure
- backend: Express API
- frontend: React app

Local Setup
1) Prereqs: Node 18+, npm, MongoDB Atlas URI

2) Backend
   - Create `backend/.env`:
     PORT=4000
     MONGODB_URI=your_mongodb_atlas_uri
     JWT_SECRET=some_long_secret
     ADMIN_EMAIL=admin@example.com
   - Install and run:
     cd backend
     npm install
     npm run dev

3) Frontend
   - Create `frontend/.env`:
     VITE_API_URL=http://localhost:4000/api
   - Install and run:
     cd frontend
     npm install
     npm run dev

Open http://localhost:5173

Admin User
- The first user who registers with email matching ADMIN_EMAIL becomes admin.

API Overview
- POST /api/auth/register { username, email, password }
- POST /api/auth/login { email, password }
- GET /api/accounts (auth)
- POST /api/accounts (auth)
- PUT /api/accounts/:id (auth)
- DELETE /api/accounts/:id (auth)
- GET /api/admin/accounts?q=&bankName=&ifsc=&username=&email= (admin)

Deploy
Vercel (Backend)
- Project root: backend
- Build command: (none)
- Output dir: (none)
- Env: PORT=4000, MONGODB_URI, JWT_SECRET, ADMIN_EMAIL
- Set CORS in code to allow your Netlify domain.

Netlify (Frontend)
- Base dir: frontend
- Build command: npm run build
- Publish directory: dist
- Environment: VITE_API_URL=https://<your-vercel-app>.vercel.app/api

Beginner-Friendly Talking Points
- Passwords never stored in plain text (bcrypt hashing).
- Stateless auth using JWT sent in Authorization header.
- Ownership enforced on account routes; admin checks via role.
- Validation with Joi on all inputs.


