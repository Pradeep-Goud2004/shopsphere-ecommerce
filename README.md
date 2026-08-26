# 🛒 ShopSphere - Full Stack E-Commerce Application

ShopSphere is a full-stack e-commerce web application built using React, Spring Boot, Spring Security, JWT authentication, JPA/Hibernate, and MySQL.

The application provides separate customer and administrator functionality, including product browsing, authentication, cart management, wishlist management, order processing, and product administration.

## 🌐 Live Application

### Frontend
https://delightful-enchantment-production-518e.up.railway.app

### Backend API
https://shopsphere-ecommerce-production.up.railway.app


# ✨ Features

## 👤 Customer Features

- User registration
- User login
- JWT-based authentication
- Browse products
- Search products
- Filter products by category
- View product details
- Add products to cart
- Update cart quantity
- Remove products from cart
- Wishlist management
- Place orders
- View order history
- Secure password storage using BCrypt

## 👨‍💼 Admin Features

- Admin authentication
- Role-based authorization
- Add products
- Update products
- Delete products
- Manage product quantity
- Manage product availability
- Manage product categories

# 🛠️ Technology Stack

## Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios

- ## Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- Hibernate
- Maven

## Database

- MySQL

## Deployment

- Railway
- GitHub

- # 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Spring Boot API    │
                    │                     │
                    │  Spring Security    │
                    │  JWT Authentication │
                    │  REST Controllers   │
                    │  Services           │
                    │  JPA / Hibernate    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │      Database       │
                    └─────────────────────┘

📁 Project Structure

shopsphere-ecommerce/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com.example.ecommerce/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── dto/
│   │       │       ├── entity/
│   │       │       ├── repository/
│   │       │       ├── security/
│   │       │       └── service/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
🔐 Authentication & Authorization

ShopSphere uses Spring Security and JWT for authentication.

Authentication Flow
User Login
    ↓
Spring Boot Authentication API
    ↓
User Credentials Verification
    ↓
BCrypt Password Verification
    ↓
JWT Token Generated
    ↓
Frontend Stores Token
    ↓
Token Sent With Protected Requests
    ↓
JwtAuthenticationFilter
    ↓
User Authentication

Authorization

The application supports role-based authorization.
CUSTOMER
    ↓
Customer APIs

ADMIN
    ↓
Admin APIs

🗄️ Database

The application uses MySQL with Spring Data JPA and Hibernate.

Main entities include:

User,
Category,
Product,
Cart,
Wishlist,
Order,
OrderItem.

🔒 Security

The application implements:

Spring Security,
JWT authentication,
BCrypt password hashing,
Role-based authorization,
CORS configuration,
Stateless session management,
Protected admin APIs,
Environment-based production secrets,
Global exception handling,

🚀 Local Development Prerequisites

Make sure you have installed:

Java 21
Maven
Node.js
npm
MySQL
Git

## Start backend

```bash
cd backend
mvn spring-boot:run

```
The backend will run on:
http://localhost:8080

## Start frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

🌍 Production Deployment

The application is deployed using Railway.

                        GitHub
                           │
                           ▼
                  ┌─────────────────┐
                  │  React + Vite   │
                  │    FRONTEND 
                  │   (Railway)
                  └────────┬────────┘
                           │
                           │
                           ▼
                  ┌─────────────────┐
                  │   Spring Boot   │
                  │     BACKEND  
                  │    (Railway)
                  └────────┬────────┘
                           │
                           │
                           ▼
                  ┌─────────────────┐
                  │  Railway MySQL  │
                  │    DATABASE     │
                  └─────────────────┘



## Default local admin

Email: `admin@example.com`

Password: `Admin@123`

Change it before production use.

## Payment

The included checkout uses a DEMO payment reference so the complete order workflow can be tested without real money.

For production:
1. Create a Razorpay/Stripe account.
2. Keep secret keys only on the backend.
3. Create payment orders from the backend.
4. Open the provider checkout from React.
5. Send the provider's payment identifiers/signature to the backend.
6. Verify the signature on the backend.
7. Mark the order PAID only after server-side verification.

Do not trust a frontend-only "payment successful" flag.

## Security notes

This project is designed as a strong learning/project foundation, not as a production security audit. Before production deployment:
- Move secrets to environment variables/secret management.
- Use HTTPS.
- Use a strong random JWT secret.
- Add refresh-token/session strategy if required.
- Add rate limiting and account lockout.
- Validate payment signatures server-side.
- Add pagination and DTOs to avoid exposing entity graphs.
- Add audit logs.
- Add proper database migrations with Flyway/Liquibase.
- Add automated tests.
=======
🎯 Project Highlights
Full-stack e-commerce architecture
RESTful API development
JWT-based authentication
Role-based authorization
Secure password hashing
Database-driven product management
Cart and wishlist functionality
Order management
React frontend integration using Axios
MySQL database integration
Production deployment using Railway
Environment-based configuration
Global exception handling

🔮 Future Enhancements

Possible future improvements:

Online payment integration
Product reviews and ratings
Advanced product filtering
Email notifications
Order tracking
Pagination
Product image upload
Admin analytics dashboard
Redis caching
Microservices architecture

👨‍💻 Author

Pradeep Kumar

Full Stack Java Developer

⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

```text
https://delightful-enchantment-production-518e.up.railway.app
https://shopsphere-ecommerce-production.up.railway.app


# shopsphere-ecommerce
>>>>>>> 0b1885cc0e7a4e965d6f8e19e68ad1422549489a
