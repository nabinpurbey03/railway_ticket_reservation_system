# Frontend README

## 🚀 Overview

This repository contains the **fully functional, interactive, and animated frontend UI** built to integrate seamlessly with the FastAPI backend system. The UI offers a smooth and intuitive user experience for tasks such as authentication, profile management, ticket booking, payments, and administrative workflows.

The frontend is built with modern web technologies, highly optimized animations, and a clean, user-centric design philosophy.

---

## ✨ Key Features

### 🎨 **Modern & Animated UI**

* Smooth page transitions
* Button hover effects & micro-interactions
* Attractive modal animations
* Lottie or CSS-based animated UI components

### 🧑‍💼 **User Authentication**

* Login & Registration UI with input validation
* OTP request & verification screens
* Password reset & change features

### 👤 **Profile Management**

* Profile details form with real-time previews
* Image upload with drag-and-drop support
* Address form with dropdown-powered province/district selectors

### 🚆 **Ticketing System UI**

* Search tickets with date picker & class selection
* Interactive seat booking visuals
* View booked tickets in beautifully styled cards
* Cancel bookings directly from the UI

### 💳 **Payment Integration (Stripe UI)**

* Elegant payment summary page
* Redirect & confirmation screens
* UI feedback for success/failure

### 🛠️ **Admin Dashboard (If Implemented)**

* User overview table with sorting/filtering
* Ticket reports with charts & analytics
* Logs & system activity monitoring

---

## 🏗️ Tech Stack

### **Frontend Technologies**

* **React / Next.js** (or your chosen framework)
* **TailwindCSS** / SCSS for styling
* **Framer Motion** for animations
* **Axios or Fetch API** for backend communication
* **React Query** (optional) for async state management
* **Stripe.js** for payment handling

If you want, this section can be expanded based on your actual stack.

---

## 📁 Project Structure (Example)

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── animations/
│   ├── hooks/
│   ├── services/
│   ├── styles/
│   └── utils/
├── package.json
└── README.md
```

---

## 🔗 API Integration

The frontend communicates with the backend through the following core modules:

### **Authentication Module**

* `/api/login`
* `/api/send-otp`
* `/api/verify-otp`
* `/api/add-user`
* `/api/change-password`

### **Profile & Address Module**

* `/api/add-pd`
* `/api/get-profile/{id}`
* `/api/add-address`
* `/api/get-address/{id}`

### **Ticket Module**

* `/api/ticket-search`
* `/api/book-ticket`
* `/api/get-booked-ticket/{user_id}`
* `/api/cancel-ticket/{pnr_number}`

### **Payment Module**

* `/api/make-payment-with-stripe`
* `/api/confirm-payment`

Each API call is wrapped in a reusable service layer for better code management.

---

## 📸 UI Highlights (Add Screenshots)

> Replace these placeholders with actual screenshots.

* Login Page
* Dashboard
* Profile Page
* Ticket Booking Flow
* Payment Success Page

---

## 🧩 Reusable Components

Your frontend includes multiple reusable components, such as:

* Custom input fields with validation
* Reusable animated buttons
* Modal dialogues
* Notification toasts
* Reusable card layouts

These help maintain code consistency and performance.

---

## 🧪 Testing

If tests exist:

* Unit tests using Jest
* Component tests with React Testing Library
* End-to-end tests with Cypress

---

## 🏃‍♂️ How to Run

### **1. Install Dependencies**

```
npm install
```

### **2. Start Development Server**

```
npm run dev
```

### **3. Build for Production**

```
npm run build
```

### **4. Run Production Build**

```
npm start
```

---

## 🔒 Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:8000
STRIPE_PUBLIC_KEY=pk_live_...
```

---

## 👨‍💼 Administrator UI Section

If the admin dashboard exists, it may include:

* User list with filtering/sorting
* Ticket report charts (powered by Chart.js / Recharts)
* Payment logs and analytics
* System activity & logs
* Admin-level actions such as force cancel and user activation

---

## 🎯 Future Enhancements

* Dark mode support
* Localization (multi-language UI)
* Progressive Web App (PWA)
* Offline caching support
* Enhanced admin metrics & reporting

---

## 📄 License

This project is licensed for learning and development purposes.

---

If you'd like, I can:

* Add badges
* Add a more professional intro
* Write feature descriptions based on your actual UI pages
* Add visuals or diagrams
  Just let me know!
