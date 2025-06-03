# Food Hub 🍽️

A comprehensive recipe sharing platform built with **React 19 + Vite** and **Clerk** authentication, featuring advanced role-based access control, user favorites management, recipe approval workflows, notifications, and modern UI components. This full-featured application demonstrates enterprise-level React development practices and serves as an excellent portfolio project.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Clerk integration** with secure user authentication (sign up, sign in, sign out)
- **Smart redirect logic** - already signed-in users are redirected away from login/register pages
- **Three-tier role system**:
  - **Guests**: Browse recipes only
  - **Members**: Browse recipes + manage favorites + create recipes
  - **Admin**: Full access including recipe approval, user management, and deletion rights
- **Protected routes** with dedicated components for admin and user access levels

### 🍲 Recipe Management
- **Public recipe browsing** with rich metadata (cuisine, meal type, difficulty, calories, ratings)
- **Detailed recipe view** with ingredients, instructions, prep/cook times, and servings
- **Recipe creation** by authenticated users with comprehensive form validation
- **Admin approval workflow** for new recipe submissions
- **Recipe status tracking**: Pending, Accepted, Rejected with dedicated pages
- **Admin recipe deletion** with confirmation dialogs for data safety

### ⭐ Advanced Favorites System
- **Per-user favorites** with backend persistence (not stored in authentication metadata)
- **Real-time UI updates** with heart buttons showing current favorite status
- **Dedicated favorites page** with loading states and empty state handling
- **Toast notifications** for user feedback on favorite actions
- **Optimistic UI updates** for smooth user experience

### 📊 User Dashboard & Profile Management
- **User profile pages** with nested routing for different sections:
  - Created Recipes - View all recipes you've submitted
  - Accepted Requests - Track approved recipes
  - Rejected Requests - Review declined submissions
- **User notifications system** for recipe status updates
- **Personal recipe management** for tracking submission history

### 🛡️ Modern Architecture & UI
- **Component separation**: Container/Presentational pattern with dedicated view components
- **CSS Modules** for scoped styling and maintainability
- **Context API** for global state management with RecipesContext
- **Loading states** and error handling throughout the application
- **Responsive design** with Bootstrap integration and custom CSS
- **Toast notifications** using react-toastify for user feedback

---

## 🛠️ Tech Stack

### Frontend
- **React 19** with modern hooks and concurrent features
- **Vite** for fast development and optimized builds
- **React Router v7** with advanced routing features
- **Clerk** for authentication and user management
- **CSS Modules** for component-scoped styling
- **Bootstrap 5** for responsive UI components
- **FontAwesome & Lucide React** for iconography
- **React Toastify** for user notifications
- **Framer Motion** for smooth animations
- **React Hook Form & Formik** for form handling and validation

### State Management & Data Flow
- **Context API** with RecipesContext for global state
- **Redux Toolkit** for complex state management
- **Custom hooks** for API integration and data fetching

### Backend & Database
- **json-server** providing full REST API functionality
- **Mock database** (`db.json`) with realistic recipe and user data
- **RESTful endpoints** for recipes, favorites, users, and notifications

### Development Tools
- **ESLint** for code quality and consistency
- **Tailwind CSS** for utility-first styling
- **Autoprefixer** for cross-browser compatibility

---

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Main layout wrapper
│   ├── Navbar/          # Navigation component
│   ├── Footer/          # Footer component
│   ├── Protected Routes/ # Route protection components
│   └── NotFound/        # Error pages
├── pages/               # Page components (route-based)
│   ├── RecipesList/     # Browse all recipes
│   ├── FavoriteList/    # User's favorite recipes
│   ├── AddRecipe/       # Recipe creation form
│   ├── RecipeDetailsPage/ # Individual recipe view
│   ├── AllPendingRequests/ # Admin: review pending recipes
│   ├── ProfilePage/     # User profile with nested routes
│   ├── UserNotification/ # User notifications
│   ├── AcceptedRequests/ # Approved recipe submissions
│   ├── RejectedRequests/ # Declined recipe submissions
│   ├── CreatedRecipes/  # User's created recipes
│   ├── UsersList/       # Admin: manage users
│   └── Login/Register/  # Authentication pages
├── services/            # API integration
│   └── api.js          # All API functions
├── context/            # Global state management
│   └── RecipesContextProvider.jsx
└── assets/             # Static assets

Database Structure (db.json):
├── recipes[]           # Main recipe collection
├── favorites[]         # User favorites (userId + recipeIds)
├── users[]            # User profiles and metadata
├── pendingRecipes[]   # Recipes awaiting approval
├── acceptedRecipes[]  # Approved recipes
└── notifications[]    # User notifications
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Clerk account for authentication setup

### Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/SarahHeshamAli2/Food-Hub.git
   cd Food-Hub
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   VITE_ADMIN_ID=your_clerk_user_id_for_admin_access
   ```

4. **Set up Clerk Authentication:**
   - Create a [Clerk](https://clerk.com/) account
   - Create a new application in your Clerk dashboard
   - Copy your publishable key to the `.env` file
   - Configure your admin user ID (your Clerk user ID) for admin privileges

5. **Start the mock backend server:**
   ```sh
   npm run start:server
   ```
   This starts json-server on `http://localhost:3001`

6. **Start the development server:**
   ```sh
   npm run dev
   ```
   Access the application at `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run start:server` - Start json-server backend
- `npm run lint` - Run ESLint for code quality

---

## 🎯 Usage Guide

### For Regular Users
1. **Sign up/Sign in** using Clerk authentication
2. **Browse recipes** on the main recipes page
3. **Add to favorites** by clicking the heart icon
4. **View your favorites** in the dedicated favorites page
5. **Create new recipes** via the "Add Recipe" form
6. **Track your submissions** in your profile dashboard

### For Administrators
1. **Manage recipes** with delete functionality and approval workflows
2. **Review pending recipes** in the admin dashboard
3. **Manage users** through the users list (admin-only access)
4. **Monitor system activity** and user submissions

### API Endpoints (json-server)
The application uses the following API structure:
- `GET /recipes` - Fetch all recipes
- `POST /recipes` - Create new recipe
- `DELETE /recipes/:id` - Delete recipe (admin only)
- `GET /favorites?userId=:userId` - Get user favorites
- `POST /favorites` - Add to favorites
- `PATCH /favorites/:id` - Update favorites
- `GET /pendingRecipes` - Get pending recipe submissions
- `GET /acceptedRecipes` - Get approved recipes
- `GET /rejectedRequests` - Get declined recipes

---

## 🏗️ Architecture & Implementation Details

### Component Architecture
The application follows modern React patterns with separation of concerns:

**Container/Presentational Pattern:**
- Container components handle logic, state, and API calls
- Presentational components focus purely on rendering UI
- Example: `RecipesList.jsx` (container) + `RecipesListView.jsx` (presentational)

**CSS Modules Implementation:**
```javascript
// Component styling approach
import styles from './recipesList.module.css';

// Usage in JSX
<div className={styles.recipeGrid}>
  <div className={styles.recipeCard}>
    {/* Recipe content */}
  </div>
</div>
```

### State Management Strategy
- **Local State**: Component-specific data using `useState`
- **Global State**: Application-wide data via Context API
- **Server State**: API data fetching with custom hooks
- **Form State**: Managed by React Hook Form and Formik

### API Integration
Custom API service layer in `services/api.js`:
```javascript
// Example API functions
export async function addFavorite(userId, recipeId) { /* ... */ }
export async function removeFavorite(userId, recipeId) { /* ... */ }
export async function getFavorites(userId) { /* ... */ }
```

### Authentication Flow
1. **Clerk Provider** wraps the entire application
2. **Protected Routes** check authentication status
3. **Role-based rendering** based on user permissions
4. **Automatic redirects** for unauthorized access

### Performance Optimizations
- **Code splitting** with React.lazy (ready for implementation)
- **Memoization** of expensive computations
- **Efficient re-rendering** with proper dependency arrays
- **Image optimization** for recipe photos

---

## 🎨 UI/UX Features

### Design System
- **Consistent color palette** with CSS custom properties
- **Typography hierarchy** for improved readability
- **Spacing system** using CSS Grid and Flexbox
- **Interactive states** for all clickable elements

### Responsive Design
- **Mobile-first approach** with progressive enhancement
- **Flexible grid layouts** that adapt to screen sizes
- **Touch-friendly interfaces** for mobile users
- **Optimized images** for different device densities

### Accessibility
- **Semantic HTML** structure for screen readers
- **Proper ARIA labels** and roles
- **Keyboard navigation** support
- **Color contrast compliance** for readability

---

## 🔧 Customization & Extension

### Adding New Features
1. **New Recipe Fields**: Extend the recipe schema in `db.json`
2. **Additional User Roles**: Modify the role checking logic
3. **Enhanced Notifications**: Expand the notification system
4. **Recipe Ratings**: Implement user rating functionality
5. **Advanced Filtering**: Implement global search across the website

### Styling Customization
- **Theme Configuration**: Modify CSS custom properties in root styles
- **Component Themes**: Update individual CSS modules
- **Bootstrap Customization**: Override Bootstrap variables

### Backend Integration
The current json-server setup can be easily replaced with:
- **Node.js/Express** with real database (MongoDB, PostgreSQL)
- **Supabase** for serverless backend
- **Firebase** for real-time features
- **Strapi** for headless CMS functionality

### Deployment Options
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Railway, Render, Heroku
- **Database**: MongoDB Atlas, Supabase, PlanetScale

---

## Customization & Extending
- Add more fields to recipes in `db.json`.
- Extend admin features (approve recipes, manage users, etc.).
- Add notifications, comments, or ratings.
- Deploy to Vercel, Netlify, or your favorite platform.

---

## 🤝 Contributing

We welcome contributions to Food Hub! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to your branch: `git push origin feature/amazing-feature`
7. Create a Pull Request

### Coding Standards
- Follow React best practices and hooks guidelines
- Use CSS Modules for component styling
- Write descriptive commit messages
- Add PropTypes for component props
- Include error handling for async operations

### Areas for Contribution
- 🐛 Bug fixes and improvements
- ✨ New features
- 🎨 UI/UX enhancements
- 📚 Documentation improvements
- 🧪 Test coverage expansion
- ♿ Accessibility improvements

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Free to use, modify, and distribute
- ✅ Commercial use allowed
- ✅ Private use allowed  
- ✅ Modification allowed
- ✅ Distribution allowed
- ❌ No warranty provided
- ❌ No liability accepted
```

---

## 🙏 Acknowledgments & Credits

### Technologies & Libraries
- **[Clerk](https://clerk.com/)** - Modern authentication and user management
- **[json-server](https://github.com/typicode/json-server)** - Full fake REST API for rapid prototyping
- **[FontAwesome](https://fontawesome.com/)** - Comprehensive icon library
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable SVG icons
- **[React Router](https://reactrouter.com/)** - Declarative routing for React
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - React notification system
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Bootstrap](https://getbootstrap.com/)** - The world's most popular CSS framework

### Development & Inspiration
- React team for the amazing framework and documentation
- Vite team for blazing fast development experience
- Open source community for countless helpful resources

### Special Thanks
- **ITI Frontend and Cross-platform Program** - Educational foundation
- **Code reviewers and contributors** - Quality assurance and improvements
- **Early testers** - Bug reports and feature suggestions

---

## 📞 Support & Contact

### Getting Help
- 📖 **Documentation**: Check this README and inline code comments
- 🐛 **Bug Reports**: Open an issue on GitHub with detailed reproduction steps
- 💡 **Feature Requests**: Create an issue with the "enhancement" label
- 💬 **Questions**: Use GitHub Discussions for general questions

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

### Project Stats
- ⭐ **Stars**: Help us grow by starring the repository
- 🍴 **Forks**: Feel free to fork and customize
- 📈 **Version**: v1.0.0 (Stable Release)
- 📅 **Last Updated**: June 3, 2025

---

**🎉 Made with ❤️ for learning, sharing, and delicious recipes!**

*This project demonstrates modern React development practices and serves as an excellent foundation for recipe sharing platforms or similar content management applications.*
