# 🚀 Funngro — Gig Platform for Teens

> A full-stack MERN application connecting teenagers with real-world micro-gigs from companies. Teens earn, learn, and build portfolios — companies get affordable, creative talent.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)

---

## 🌟 Overview

**Funngro** is a two-sided marketplace:

| Teens | Companies |
|---|---|
| Browse and apply for gigs | Post micro-gigs with budget & skills |
| Earn real money (₹) | Review and manage applications |
| Build a portfolio | Access affordable creative talent |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **Lucide React** | Icon library |
| **canvas-confetti** | Celebration animations |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express 4** | REST API framework |
| **MongoDB + Mongoose** | Database & ODM |
| **dotenv** | Environment variable management |
| **morgan** | HTTP request logging |
| **cors** | Cross-origin resource sharing |
| **nodemon** | Dev auto-restart |

---

## 📁 Project Structure

```
Funngro Website/
├── 📄 .gitignore
├── 📄 package.json              # Root workspace config
├── 📄 README.md
│
├── 🖥️  backend/
│   ├── server.js                # Express app entry point
│   ├── .env                     # Environment variables (git-ignored)
│   ├── .env.example             # Template for env vars
│   ├── config/
│   │   └── db.js                # MongoDB connection setup
│   ├── models/
│   │   ├── Gig.js               # Gig schema (title, company, budget, skills…)
│   │   └── Application.js       # Application schema
│   ├── routes/
│   │   ├── gigRoutes.js         # GET /api/gigs, POST /api/gigs
│   │   └── applicationRoutes.js # POST /api/applications, GET /api/applications
│   ├── data/                    # Seed data / fixtures
│   └── utils/                   # Helper utilities
│
└── 🌐  frontend/
    ├── index.html
    ├── vite.config.js           # Vite config + API proxy to :5000
    ├── tailwind.config.js
    ├── .env                     # Frontend env vars (git-ignored)
    ├── .env.example             # Template for env vars
    └── src/
        ├── main.jsx             # React entry point
        ├── App.jsx              # Root component + routing
        ├── index.css            # Global styles & design tokens
        ├── pages/
        │   ├── TeenPage.jsx     # Teen-facing gig browsing experience
        │   └── CompanyPage.jsx  # Company-facing gig management dashboard
        └── components/
            ├── Navbar.jsx
            ├── Footer.jsx
            ├── GigCard.jsx          # Displays a single gig with Apply button
            ├── ApplyModal.jsx       # Application form modal
            ├── PostGigModal.jsx     # Company gig posting form
            ├── ApplicationCard.jsx  # Company's view of an application
            ├── GlassCard.jsx        # Reusable glassmorphism card wrapper
            ├── BrandMarquee.jsx     # Scrolling brand logo strip
            ├── EarningCalculator.jsx# Interactive earning estimator for teens
            ├── LivePayoutTicker.jsx # Animated live payout display
            └── StepCard.jsx         # How-it-works step card
```

---

## ✨ Features

### For Teens
- 🔍 **Browse Gigs** — Filter by category (Design, Writing, Tech, Video, Marketing)
- 📝 **Apply in Seconds** — Modal form with name, email, portfolio link & cover message
- 💰 **Earning Calculator** — Interactive tool to estimate monthly income
- 📊 **Live Payout Ticker** — Real-time animated payouts to build trust
- 🏷️ **Skill Tags** — Each gig shows required skills clearly

### For Companies
- ➕ **Post a Gig** — Set title, budget (₹), duration, category, and required skills
- 📋 **Manage Applications** — View all applicants for each posted gig
- 🏢 **Company Dashboard** — Track active gigs and application status

### General
- 🌙 **Dark Mode UI** — Premium glassmorphism design with purple accent brand colors
- 📱 **Fully Responsive** — Mobile-first layout
- ⚡ **Vite Proxy** — Frontend dev server proxies `/api/*` to backend automatically

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

### Gigs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/gigs` | Fetch all gigs |
| `POST` | `/gigs` | Create a new gig |
| `GET` | `/gigs/:id` | Get a single gig by ID |
| `DELETE` | `/gigs/:id` | Delete a gig |

#### Gig Schema
```json
{
  "title": "String (required)",
  "company": "String (required)",
  "description": "String (required)",
  "budget": "Number (required, in ₹)",
  "category": "Enum: Design | Writing | Tech | Video | Marketing | Other",
  "skills": ["Array of Strings"],
  "duration": "String (required, e.g. '1 Week')",
  "createdAt": "Date (auto)"
}
```

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/applications` | Fetch all applications |
| `POST` | `/applications` | Submit a new application |
| `GET` | `/applications/gig/:gigId` | Get all applications for a specific gig |

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- npm v9+

### 1. Clone the repository

```bash
git clone https://github.com/your-username/funngro-website.git
cd funngro-website
```

### 2. Set up environment variables

```bash
# Backend
cp backend/.env.example backend/.env
# → Fill in MONGO_URI and other values

# Frontend
cp frontend/.env.example frontend/.env
# → Update VITE_API_BASE_URL if needed
```

### 3. Install dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 4. Start development servers

**Option A — Run both together from root (if concurrently is set up):**
```bash
npm run dev
```

**Option B — Run separately:**

```bash
# Terminal 1: Backend (http://localhost:5000)
cd backend
npm run dev

# Terminal 2: Frontend (http://localhost:3000)
cd frontend
npm run dev
```

### 5. Open in browser

| Service | URL |
|---------|-----|
| Frontend (Teen view) | http://localhost:3000 |
| Backend API health | http://localhost:5000 |
| Gigs API | http://localhost:5000/api/gigs |

---

## 🔐 Environment Variables

### `backend/.env`

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Express server port |
| `NODE_ENV` | `development` | App environment |
| `MONGO_URI` | — | **Required.** MongoDB connection string |
| `JWT_SECRET` | — | Secret key for JWT signing (for future auth) |
| `JWT_EXPIRE` | `30d` | JWT token expiry duration |
| `CLIENT_URL` | `http://localhost:3000` | CORS-allowed frontend origin |

### `frontend/.env`

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:5000/api` | Backend API base URL |
| `VITE_APP_NAME` | `Funngro` | App display name |
| `VITE_APP_ENV` | `development` | App environment |

> ⚠️ **Never commit `.env` files.** They are gitignored. Use `.env.example` files as templates.

---

## 📜 Scripts

### Root
| Command | Description |
|---------|-------------|
| `npm run dev` | Start all services (if concurrently configured) |

### Backend (`cd backend`)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (auto-restart on save) |
| `npm start` | Start with plain node |

### Frontend (`cd frontend`)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary to **Funngro**. All rights reserved.

---

<div align="center">
  <strong>Built with ❤️ for the next generation of teen entrepreneurs</strong>
</div>
