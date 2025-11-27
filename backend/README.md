# Backend README

## Overview

This project is a **FastAPI-based backend server** that provides a complete set of APIs for user authentication, profile management, ticket booking, payment handling, and administrative operations. It also supports file uploads for documents such as profile images and identification files.

---

## Features

### **User Authentication**

* User login with email verification
* OTP-based verification for registration and forgot-password workflows
* Password reset and update

### **User Profile Management**

* Add personal details with support for image uploads
* Add and fetch user address
* Retrieve profile data by user ID

### **Ticketing System**

* Search available train tickets
* Book a ticket
* Cancel a booked ticket
* Fetch booked ticket details and seats

### **Payment Processing**

* Stripe payment initialization
* Confirm payment and associate with user

### **File Upload Support**

Uploads are stored under the `/uploads` directory:

* Profile images
* Citizenship front/back images
* Card images

---

## Project Structure

```
project/
├── models.py
├── src/
│   ├── address.py
│   ├── card.py
│   ├── emailer.py
│   ├── payment.py
│   ├── personal_detail.py
│   ├── ticket.py
│   └── users.py
├── uploads/
│   └── images/
│       ├── profile_image/
│       ├── citizenship_front/
│       ├── citizenship_back/
│       └── card_image/
└── main.py
```

---

## API Endpoints

### **Base Endpoint**

| Method | Endpoint | Description  |
| ------ | -------- | ------------ |
| GET    | `/api`   | Health check |

---

## Authentication APIs

| Method | Endpoint               | Description                                  |
| ------ | ---------------------- | -------------------------------------------- |
| POST   | `/api/login`           | Login with email                             |
| POST   | `/api/send-otp`        | Request OTP for registration/forgot-password |
| POST   | `/api/verify-otp`      | Verify OTP                                   |
| POST   | `/api/add-user`        | Register user or update password             |
| POST   | `/api/change-password` | Change existing password                     |

---

## User Information APIs

| Method | Endpoint                     | Description                                |
| ------ | ---------------------------- | ------------------------------------------ |
| GET    | `/api/user/{email}`          | Get user details by email                  |
| GET    | `/api/get-profile/{user_id}` | Get profile details                        |
| POST   | `/api/add-pd`                | Add personal details with document uploads |
| POST   | `/api/add-address`           | Add address for user                       |
| GET    | `/api/get-address/{user_id}` | Retrieve address info                      |

---

## Ticketing APIs

| Method | Endpoint                             | Description                      |
| ------ | ------------------------------------ | -------------------------------- |
| POST   | `/api/ticket-search`                 | Search tickets based on criteria |
| POST   | `/api/book-ticket`                   | Book a ticket                    |
| GET    | `/api/get-booked-ticket/{user_id}`   | Retrieve booked tickets          |
| GET    | `/api/cancel-ticket/{pnr_number}`    | Cancel booked ticket             |
| GET    | `/api/get-booked-seats/{pnr_number}` | Get seat details for PNR         |

---

## Payment APIs

| Method | Endpoint                        | Description                        |
| ------ | ------------------------------- | ---------------------------------- |
| POST   | `/api/make-payment-with-stripe` | Create Stripe payment intent       |
| POST   | `/api/confirm-payment`          | Confirm payment and assign to user |

---

## File Upload Handling

Uploads are processed using the helper function `save_uploaded_file`.

* Files are saved with a timestamp and categorized by type
* Endpoint `/api/add-pd` handles all file uploads

Example saved file name format:

```
{name}_{YYYYMMDD_HHMMSS}.ext
```

---

## Administrator Section

This project includes a reserved section for administrative operations. Although admin-specific endpoints are not included in the above code, the admin module is expected to manage:

### **Administrator Capabilities**

* View all registered users
* Activate/deactivate user accounts
* View ticket reports (daily, monthly, yearly)
* Cancel tickets forcefully (if required)
* Manage system logs and suspicious activities
* Monitor payment transactions

### **Potential Admin Endpoints (for future expansion)**

| Method | Suggested Endpoint         | Purpose                  |
| ------ | -------------------------- | ------------------------ |
| GET    | `/api/admin/users`         | Fetch list of all users  |
| POST   | `/api/admin/activate-user` | Activate user account    |
| GET    | `/api/admin/tickets`       | View all ticket bookings |
| GET    | `/api/admin/payments`      | View payment records     |
| POST   | `/api/admin/cancel-ticket` | Force cancel a ticket    |

> **Note:** These endpoints are placeholders and can be implemented within the `src/admin` module.

---

## Technologies Used

* **FastAPI** for backend framework
* **Pydantic** for request validation
* **Stripe API** for payments
* **CORS Middleware** for frontend communication

---

## Running the Project

### **Step 1: Install Dependencies**

```
pip install -r requirements.txt
```

### **Step 2: Run Server**

```
uvicorn main:app --reload
```

### **Step 3: Access API Docs**

FastAPI provides auto-generated swagger UI:

```
http://localhost:8000/docs
```

---

## License

This project is provided for learning and development purposes.

---

If you want additional sections such as environment setup, database schema, or contributor guidelines, feel free to ask!
