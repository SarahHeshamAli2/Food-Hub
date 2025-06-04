# 🍽️ Food Hub

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/) [![Vite](https://img.shields.io/badge/Vite-5.2-purple?logo=vite)](https://vitejs.dev/) [![Clerk Auth](https://img.shields.io/badge/Auth-Clerk-orange?logo=clerk)](https://clerk.com/) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **A modern, full-featured recipe sharing platform with ingredient-based search, role-based access, favorites, notifications, and a beautiful UI.**

---

## ✨ Features at a Glance

### 🔐 Authentication & Roles
- **Clerk integration** for secure sign up/in/out
- **Role-based access**: Guest, Member, Admin
- **Protected routes** and smart redirects

### 🍲 Recipe Management
- **Browse, search, and view** rich recipe details
- **Create recipes** with validation and admin approval
- **Status tracking**: Pending, Accepted, Rejected
- **Admin tools**: Approve, reject, or delete recipes

### 🔍 Ingredient Search & Discovery
- **Search by ingredient or recipe name** (e.g., `egg`, `stir-fry`)
- **Smart suggestions** with autocomplete and recipe counts
- **Popular ingredients** shown when search is empty
- **Debounced input** for smooth, lag-free experience
- **Contextual results**: See if match is by name or ingredient
- **Advanced ingredient cleaning** (removes units, prep, etc.)

### ⭐ Favorites System
- **Per-user favorites** with backend persistence
- **Instant UI updates** and toast notifications
- **Dedicated favorites page**

### 📊 User Dashboard
- **Profile with nested routes**
- **Track created, accepted, and rejected recipes**
- **Personal notifications** for recipe status

### 🛡️ Modern UI & Architecture
- **Component-based** with CSS Modules
- **Responsive, mobile-friendly design**
- **Context API & Redux Toolkit** for state management
- **Loading, error, and empty states**
- **Toast notifications** for feedback

---

## 🚀 Tech Stack

- **Frontend:** React 19, Vite, React Router v7, Clerk, Bootstrap 5, CSS Modules, FontAwesome, Lucide React, Framer Motion
- **State:** Context API, Redux Toolkit, custom hooks (`useIngredientSearch`, `useDebounce`)
- **Backend:** json-server (REST API), mock `db.json`
- **Tooling:** ESLint, Tailwind CSS, Autoprefixer

---

## 🗂️ Project Structure

```text
src/
├── components/           # Reusable UI components
├── pages/                # Route-based pages (RecipesList, FavoriteList, etc.)
├── services/             # API integration
├── context/              # Global state (RecipesContext)
├── hooks/                # Custom hooks (ingredient search, debounce, etc.)
└── assets/               # Images and static files
```

---

## 🔍 Ingredient Search: How It Works

- **Dual search:** Find recipes by name or any ingredient
- **Autocomplete:** Get suggestions as you type ("tom" → "tomato")
- **Popular ingredients:** Instantly discover trending ingredients
- **Performance:** Debounced input, memoized ingredient lists
- **Smart cleaning:** Strips units, numbers, and prep from ingredient text
- **UI:** Results counter, context highlighting, clear button, and more

**Example:**
- Search `egg` → Finds all recipes with eggs
- Search `stir` → Finds "Vegetarian Stir-Fry" by name
- Click search bar (empty) → Shows most-used ingredients

---

## 🎨 UI/UX Highlights

- **Modern, responsive design** (Bootstrap + custom CSS)
- **Interactive states** for all buttons and cards
- **Accessible:** Semantic HTML, ARIA labels, keyboard navigation
- **Consistent color palette & iconography**

---

## ➕ More Features

### 🔔 Notifications System
- **User notifications** for recipe status changes (pending, accepted, rejected)
- **Notification bell** in the UI for real-time updates

### 💬 Reviews & Comments
- **Recipe reviews/comments** for user feedback and engagement

### 🛠️ Admin User Management
- **Admin dashboard** for managing users
- **User list** with admin-only access and controls

### 🏷️ Tagging & Categories
- **Recipe tags/categories** for better organization and filtering

### ⏳ Loading & Error Handling
- **Loading screens/spinners** for async operations
- **Custom error, unauthorized, and not found pages**

### 🖼️ Image Upload
- **Image upload** for recipes with preview and validation

### 🎉 Post Signup Flow
- **Post-signup welcome page** for new users

---

## 🏁 Getting Started

```bash
# 1. Clone & install
npm install

# 2. Configure .env (see README for Clerk keys)

# 3. Start backend (json-server)
npm run start:server

# 4. Start frontend	npm run dev
```

---

## 📝 Contributing

- Fork & branch from `main`
- Follow React best practices and code style
- Add PropTypes, error handling, and tests

---

### Project Maintainers
**Hazem Abdulrahman**
- 🔗 **GitHub**: [@hazemabdo15](https://github.com/hazemabdo15)
- 📧 **Email**: [hazemabdulrahman99@gmail.com](mailto:hazemabdulrahman99@gmail.com)
- 💼 **LinkedIn**: [in/hazem-abdulrahman/](https://www.linkedin.com/in/hazem-abdulrahman/)

**Sarah Hesham Ali**
- 🔗 **GitHub**: [@SarahHeshamAli2](https://github.com/SarahHeshamAli2)
- 📧 **Email**: [N/A]
- 💼 **LinkedIn**: [in/sarah-hesham-8594bb190](https://www.linkedin.com/in/sarah-hesham-8594bb190)

**Esraa Ahmed Ali**
- 🔗 **GitHub**: [@EsraaAhmedAli](https://github.com/EsraaAhmedAli)
- 📧 **Email**: [N/A]
- 💼 **LinkedIn**: [in/esraa-ahmed-246a66281](https://www.linkedin.com/in/esraa-ahmed-246a66281)

**Jihan Ahmed Mahmoud**
- 🔗 **GitHub**: [@Jihan95](https://github.com/Jihan95)
- 📧 **Email**: [N/A]
- 💼 **LinkedIn**: [N/A]

---

## 📄 License

[MIT](LICENSE) — Free for personal and commercial use.

---

**Made with ❤️ by the Food Hub Team — Happy Cooking!**
