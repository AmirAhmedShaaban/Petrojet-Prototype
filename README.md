# Petrojet Prototype Project

## 📌 Overview

This project is a **professional freelance prototype** developed to simulate and replicate the design of **Petrojet** as part of a client-oriented development exercise.  
⚠️ **Disclaimer:** This project has **no official relation** to the real Petrojet company. It was created independently for demonstration and professional development purposes.

The project was built using:

- **Sass** for styling.
- **BEM methodology** for class naming.
- **7-1 architecture** for scalable Sass structure.

---

## 🛠️ Tech Stack

### **Frontend**

- **Sass** with 7-1 architecture.
- **BEM Naming Convention**.
- **PostCSS** with:
  - `autoprefixer` (browser compatibility).
  - `cssnano` (CSS optimization & minification).

### **Backend**

- **Node.js** with **Express.js**.
- **MongoDB** with **Mongoose**.
- **Security & Middleware**:
  - `helmet` for HTTP headers security.
  - `express-rate-limit` for rate limiting.
  - `jsonwebtoken` for authentication.
- `bcrypt` for password hashing.

### **Dev Tools**

- `nodemon` for backend auto-restart.
- `live-server` for frontend preview.
- `npm-run-all` to run parallel scripts.

---

## 📂 Sass 7-1 Architecture

sass/
│
├── abstracts/ # Contains variables, mixins, and functions
├── base/ # Includes reset, typography, and helper styles
├── components/ # Styles for small UI components like buttons, cards, etc.
├── layout/ # Layout-related styles: header, footer, grid, navigation
├── pages/ # Page-specific styles
├── themes/ # Theme-related files (colors, themes)
├── vendors/ # Third-party styles
└── main.scss # Main Sass entry file that imports all other files

---

## 🚀 How to Run the Project

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start development environment

This runs:
Backend server (Express.js)
Live server for frontend
Sass watcher

```bash
npm start
```

## 3️⃣ Additional Commands

Watch Sass only:

```bash
npm run watch:sass
```

Run backend only:

```bash
npm run backend
```

Build optimized CSS:

```bash
npm run build:css
```

👤 Author

Amir Shaaban
