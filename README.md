# Food Hub 🍽️

A modern recipe sharing platform built with **React + Vite** and **Clerk** authentication, featuring role-based access, per-user favorites, and a clean, modular UI. This project is designed for learning, portfolio, and as a solid foundation for real-world recipe or content-sharing apps.

---

## Features

### 🔐 Authentication & Authorization
- **Clerk integration** for secure user authentication (sign up, sign in, sign out).
- **Role-based access**:
  - Only one admin (by Clerk user ID, set in `.env`).
  - All other users are "members".
- **Protected routes** for admin and user pages, with proper loading and redirect UX.

### 🍲 Recipes
- **Browse all recipes** with images, cuisine, and meal type.
- **Add new recipes** (pending admin approval).
- **Admin-only user management** (placeholder for future features).

### ⭐ Favorites System
- **Per-user favorites**: Each user can add or remove recipes from their favorites.
- **Favorites stored in backend** (`db.json`/`json-server`), not in Clerk metadata.
- **Favorites page**: View your own favorite recipes, dynamically loaded.
- **Heart icon** on recipe list for quick add/remove.

### 🛡️ Robust Routing & UI
- **ProtectedRoute** components for both admin and user roles.
- **Loading spinners** and clean redirects for a smooth experience.
- **Modular, maintainable code**: All UI logic separated into presentational and container components, with CSS modules for styling.

---

## Tech Stack
- **Frontend**: React 19, Vite, Clerk, React Router, CSS Modules, Bootstrap, FontAwesome
- **Backend**: json-server (mock REST API, `db.json`)

---

## Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/your-username/food-hub.git
   cd food-hub
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up Clerk:**
   - Get your Clerk publishable key and set it in `.env` as `VITE_CLERK_PUBLISHABLE_KEY`.
   - Set your admin Clerk user ID as `VITE_ADMIN_ID` in `.env`.
4. **Start the backend (json-server):**
   ```sh
   npm run start:server
   ```
5. **Start the frontend:**
   ```sh
   npm run dev
   ```
6. **Visit** [http://localhost:5173](http://localhost:5173) in your browser.

---

## Folder Structure

- `src/pages/` — All main pages (RecipesList, FavoriteList, AddRecipe, etc.)
- `src/components/` — Layout, Navbar, Footer, Protected Routes, etc.
- `src/services/api.js` — API functions for recipes and favorites
- `db.json` — Mock database for recipes and favorites

---

## Customization & Extending
- Add more fields to recipes in `db.json`.
- Extend admin features (approve recipes, manage users, etc.).
- Add notifications, comments, or ratings.
- Deploy to Vercel, Netlify, or your favorite platform.

---

## License

MIT — free to use, modify, and share.

---

## Credits
- [Clerk](https://clerk.com/) for authentication
- [json-server](https://github.com/typicode/json-server) for the mock backend
- [FontAwesome](https://fontawesome.com/) for icons

---

**Made with ❤️ for learning and sharing!**
