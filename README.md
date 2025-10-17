# 🌤️ What To Wear (WTWR) — Frontend

A responsive React app that helps users decide what to wear based on current weather conditions.  
Built as part of the **TripleTen Software Engineering Program**, this project integrates with the WTWR backend API to deliver a full-stack experience.

---

## 🚀 Overview

WTWR allows users to:

- View clothing suggestions based on weather from a third-party API
- Register and log in to save personal wardrobe items
- Like or unlike clothing items
- Add or remove items from their virtual closet
- Update their profile and avatar

---

## 🧰 Tech Stack

- **React 18+ (Vite)**
- **React Router** for navigation
- **Context API** for state management
- **Fetch API** for backend communication
- **Modular CSS (BEM)** for styling
- **ESLint + Prettier** for code quality

---

## ⚙️ Installation & Setup

### 1️⃣ Clone and Install Dependencies

```bash
git clone https://github.com/bbeare22/se_project_react
cd se_project_react-main
npm install
```

### 2️⃣ Environment Variables

Create a `.env` file in the project root and configure your API base URL for local dev:

```bash
VITE_API_URL=http://localhost:3001
```

Production (your deployment):

```bash
VITE_API_URL=https://api.weatherapp.jumpingcrab.com
```

### 3️⃣ Start the Development Server

```bash
npm run dev
```

App runs at: http://localhost:5173

### 4️⃣ Build for Production

```bash
npm run build
```

Preview locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
se_project_react-main/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/              # Images, icons, and weather illustrations
│   ├── components/          # Reusable UI components
│   │   ├── App/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── WeatherCard/
│   │   ├── ItemCard/
│   │   ├── Modals/          # Register/Login/Add/Delete
│   ├── index.css
│   ├── main.jsx
│   └── utils/               # API helpers, validation, constants
├── .env.example
├── package.json
└── vite.config.js
```

---

## 🧩 Key Components

| Component                             | Purpose                                       |
| ------------------------------------- | --------------------------------------------- |
| `WeatherCard`                         | Displays weather info & suggestions           |
| `ItemCard`                            | Shows a clothing item with like functionality |
| `ClothesSection`                      | Lists items by category and ownership         |
| `RegisterModal` / `LoginModal`        | User authentication modals                    |
| `Profile`                             | Displays user info and items                  |
| `ProtectedRoute`                      | Restricts access to authenticated users       |
| `AddItemModal` / `ConfirmDeleteModal` | CRUD interactions for wardrobe items          |

---

## 🌦️ Weather Integration

WTWR uses a third-party weather API (via backend) to:

- Fetch real-time weather data
- Adjust clothing recommendations dynamically
- Display contextual icons for day/night and weather type

---

## 🔐 Authentication Flow

- Users sign up or log in via JWT authentication handled by backend
- Auth token stored in `localStorage`
- Protected routes (e.g., Profile, Add Item) require login
- Token validated automatically on app load

---

## 🧾 Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start Vite dev server            |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint checks                |

---

## 💻 Deployment

- **Frontend (prod):** https://www.weatherapp.jumpingcrab.com
- **Backend (prod):** https://api.weatherapp.jumpingcrab.com

Make sure your production build points to the production API by setting `VITE_API_URL` to `https://api.weatherapp.jumpingcrab.com` at build time (e.g., via your hosting provider's env settings).

---

## 🧠 Developer Notes

- Use `vite.config.js` for environment configuration
- Keep all modals in `src/components` modularized
- Ensure `VITE_API_URL` matches the running backend during local development
- Recommended Node.js version: **v18+**

---

✨ _WTWR — helping you dress smart, whatever the weather!_
