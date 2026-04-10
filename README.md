# Project Management Tool

A full-stack project management app — built with **Django REST Framework** on the backend and **React + TypeScript** on the frontend. Here you can log in, create projects, and track tasks inside them.

 The assignment asked for Node.js, but Python was explicitly permitted for this submission. Every functional requirement is met.

---

## What This Project Actually Does

- You register/login → you get a **JWT token**
- Every request after that carries that token — so the backend knows who you are
- You create **projects** (like folders) and **tasks** inside them (like to-do items inside folders)
- The frontend is a React app in TypeScript — connects to the backend via Axios
- The database is **PostgreSQL** — running locally

---

## Project Structure

```
root/
├── backend/
│   ├── core/             # Settings, URLs, config
│   ├── users/            # Register, login, JWT
│   ├── projects/         # Projects + Tasks CRUD
│   ├── tests/            # Pytest test suite
│   ├── seed.py           # Database seeder script
│   └── pytest.ini        # Pytest config
│
└── frontend/             # React + TypeScript
    └── src/
        ├── pages/        # Login, Register, Dashboard, ProjectDetail
        ├── context/      # AuthContext (global login state)
        ├── api/          # Axios instance with JWT header
        └── types/        # TypeScript interfaces
```

---

## ⚙️ Backend Setup (Django)

### Prerequisites
- Python 3.11+
- PostgreSQL running locally
- Seeders done
- Used pytest for unit testing, similar to jest

### Step 1 — Create & activate virtual environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### Step 2 — Install dependencies

```bash
pip install -r requirements.txt
```

> Don't have a requirements.txt yet? Run this to generate one:
> `pip freeze > requirements.txt`

### Step 3 — Set up your `.env` file

Create a file called `.env` inside the `backend/` folder:

```env
SECRET_KEY=your-secret-key-here
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

> The app will not start without this file. No `.env` = no DB connection.

### Step 4 — Create the PostgreSQL database

Open your PostgreSQL shell (pgAdmin or terminal) and run:

```sql
CREATE DATABASE your_db_name;
```

### Step 5 — Run migrations

```bash
python manage.py migrate
```

> Migrations = telling the database to create all the tables.

### Step 6 — Start the server

```bash
python manage.py runserver
```

Backend is now live at: `http://127.0.0.1:8000`

---

## Seed the Database (Dummy Data)

The seed script creates:
- 1 user → `test@example.com` / `Test@123`
- 2 projects linked to that user
- 3 tasks per project (6 tasks total)

### Run it:

```bash
cd backend
python seed.py
```

You'll see:
```
Seeding done!
```

> Run migrations **before** running the seed. And run this from inside the `backend/` folder, not root.

---

## Running Tests

Tests are written with **pytest** + **pytest-django**.

```bash
cd backend
pytest
```

### What's tested:
- `test_register` — can a new user register?
- `test_login` — does login return a JWT token?
- `test_create_project` — can an authenticated user create a project?
- `test_list_projects` — does the project list return correctly?

> Tests use an isolated test database — your real data is safe.

---

## Frontend Setup (React + TypeScript + Tailwind)

### Prerequisites
- Node.js 18+
- npm or yarn

### Step 1 — Install dependencies

```bash
cd frontend
npm install
```

### Step 2 — Start the dev server

```bash
npm run dev
```

Frontend is live at: `http://localhost:5173`

---

## API Endpoints

### Auth

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/users/register/` | Create new account |
| POST | `/api/users/login/` | Login, get JWT token |
| POST | `/api/users/token/refresh/` | Refresh expired token |

### Projects

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/projects/` | List your projects (paginated) |
| POST | `/api/projects/` | Create a project |
| PATCH | `/api/projects/:id/` | Update project (title, status, etc.) |
| DELETE | `/api/projects/:id/` | Delete a project |

> All project endpoints are **user-scoped** — you only see your own projects. No one can touch another user's data.

### Tasks (nested under projects)

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/projects/:id/tasks/` | List tasks for a project |
| POST | `/api/projects/:id/tasks/` | Create a task |
| PATCH | `/api/projects/:id/tasks/:taskId/` | Update task status |
| DELETE | `/api/projects/:id/tasks/:taskId/` | Delete a task |

> Filter tasks by status: `/api/projects/1/tasks/?status=todo`

---

## Features Implemented

### Backend
- JWT Authentication (register + login)
- Custom User model — login with **email** (not username)
- Projects CRUD — user-scoped (you see only your own)
- Tasks CRUD — nested inside projects
- Task filtering by status (`todo`, `in-progress`, `done`)
- Search projects by title (`?search=ecommerce`)
- Pagination — 5 results per page
- Seed script with real dummy data
- Pytest unit tests for auth and projects

### Frontend
- Login page with form
- Register page with form
- Dashboard — lists all your projects
- Create / delete projects inline
- Update project status via dropdown
- Project detail page — view and manage tasks
- Create / delete tasks
- Update task status via dropdown
- JWT stored in `localStorage`, auto-attached via Axios interceptor
- React Hook Form for form handling
- TypeScript throughout

---

## Bonus Features

- **Pagination** — projects come back in pages of 5
- **Search** — `?search=title` works on projects
- **Context API** — global auth state via `AuthContext`
- **React Hook Form** — used in Login and Register
- **Unit Tests** — 4 tests with pytest

---

## Known Limitations

- No Docker setup
- No hosted demo yet, will be done on render
- Could not use Nest Js, because already using Django.

---

- **Python, not Node** — was allowed. Same REST API concepts, different language.
- **PostgreSQL, not MongoDB** — relational DB used. Same data relationships, just with SQL.
- **JWT is stateless** — the token IS the session. No need for sessions table or cookies.
- **Nested routing** — tasks live under `/projects/:id/tasks/` because a task without a project makes no sense.
- **Passwords** — Django hashes passwords by default. Equivalent to bcrypt. Secure.
- **User scoping** — `get_queryset` filters by `request.user` so users can never see each other's data.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Backend | Python 3.11, Django 5.2, Django REST Framework |
| Auth | djangorestframework-simplejwt |
| Database | PostgreSQL |
| Frontend | React 18, TypeScript, Vite |
| HTTP Client | Axios |
| Forms | React Hook Form |
| Routing | React Router v6 |
| Styling | Inline styles (dark theme), Tailwind|
| Tests | Pytest, pytest-django |

---

## Test Credentials (after seeding)

```
Email:    admin@gmail.com
Password: 123456
```
