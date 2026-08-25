<<<<<<< HEAD
# Full-Stack E-Commerce Application

A learning/project-ready e-commerce application with:

## Backend
- Java 17
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate
- REST APIs
- Spring Security
- JWT authentication
- BCrypt password hashing
- MySQL

## Frontend
- React
- HTML
- CSS
- JavaScript
- Axios
- React Router

## Features
- Registration/login
- JWT authentication
- Product listing/search/categories/details
- Shopping cart
- Wishlist
- Orders
- Payment workflow placeholder
- Admin dashboard
- Product/category management foundation
- User management view
- Order status management

## Folder structure

```text
ecommerce-fullstack/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/ecommerce/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   ├── repository/
│       │   ├── security/
│       │   └── service/
│       └── resources/application.properties
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       └── pages/
└── README.md
```

## Database setup

Create the database in MySQL:

```sql
CREATE DATABASE ecommerce_db;
```

Then edit:

`backend/src/main/resources/application.properties`

Set:

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Hibernate will create/update tables using `ddl-auto=update`.

## Start backend

```bash
cd backend
mvn spring-boot:run
```

Backend API:

`http://localhost:8080`

## Start frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

`http://localhost:5176`

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
# shopsphere-ecommerce
>>>>>>> 0b1885cc0e7a4e965d6f8e19e68ad1422549489a
