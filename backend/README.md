# E-Commerce Backend

Spring Boot REST API using Java 17, Spring MVC, Spring Data JPA, Hibernate, Spring Security, JWT, BCrypt and MySQL.

## Run

1. Create the database:
   `CREATE DATABASE ecommerce_db;`
2. Update `src/main/resources/application.properties`.
3. Make sure the JWT secret is at least 32 bytes.
4. Run:
   `mvn spring-boot:run`

Backend: `http://localhost:8080`

## Default admin

Email: `admin@example.com`
Password: `Admin@123`

Change this password before using the project anywhere outside local development.

## Important endpoints

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/products`
- GET `/api/products/{id}`
- GET `/api/categories`
- GET/POST/PUT/DELETE `/api/cart`
- GET/POST `/api/wishlist`
- POST `/api/orders`
- GET `/api/orders/my`
- POST `/api/orders/{id}/payment`
- Admin: `/api/admin/**`

The payment endpoint included here marks an order paid after a payment reference is supplied. For a production payment gateway, replace this with a server-side Razorpay/Stripe integration and verify the gateway signature on the backend.
