# 🚄 Railway Ticket Reservation System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech Stack](https://img.shields.io/badge/React-FastAPI-PostgreSQL-green)

A modern, scalable, and user-friendly web application for booking railway tickets in Nepal. Built with **ReactJS**, **FastAPI**, and **PostgreSQL** to streamline ticket reservations, eliminate manual inefficiencies, and enhance passenger experience.

---

## ✨ Features

- **User Authentication**: Secure JWT-based login/signup.
- **Real-Time Booking**: Search trains, check seat availability, and book instantly.
- **Digital Payments**: Integrated with eSewa/Khalti/Stripe.
- **Admin Dashboard**: Manage trains, schedules, and bookings.
- **QR Tickets**: Paperless travel with digital tickets.
- **Responsive UI**: Works on desktop, tablet, and mobile.

---

## 🛠️ Technologies Used

| Frontend     | Backend   | Database   | DevOps         |
| ------------ | --------- | ---------- | -------------- |
| ReactJS      | FastAPI   | PostgreSQL | Docker         |
| Tailwind CSS | JWT Auth  | SQLAlchemy | GitHub Actions |
| Vite         | REST APIs | Indexing   | AWS (EC2/RDS)  |

---

## 🚀 Quick Start

### Prerequisites

- Python 3.9+, Node.js 16+, PostgreSQL
- Payment gateway API keys (eSewa/Stripe)

### Installation

1. **Clone the repo**:

   ```bash
   git clone https://github.com/nabinpurbey03/railway_ticket_reservation_system.git
   cd railway_ticket_reservation_system
   ```

2. **Backend Setup**
   ```bash
       cd backend
       pip install -r requirements.txt
       uvicorn main:app --reload
   ```
