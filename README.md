# Cafeteria Management System - Backend

## Overview

This repository contains the backend API for a Cafeteria Management System built with NestJS and TypeScript. It provides role-based management of cafeterias, stalls, menu items, orders, users, OTP verification, and analytics dashboards for administrators, stall managers, and cashiers.

## Key Features

- User authentication with JWT
- Role-based access control (Admin, Manager, Cashier)
- CRUD operations for users, cafeterias, stalls, menu items, orders, and order items
- OTP email verification
- Password reset support
- Admin analytics endpoints for sales, income, stall performance, and top items
- Manager dashboards scoped to individual stalls
- Cashier dashboards for daily sales, recent orders, and popular items
- PostgreSQL persistence via TypeORM
- Swagger API documentation available at `/docs`

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT authentication
- Swagger
- Jest
- ESLint + Prettier

## Prerequisites

- Node.js 20+
- npm
- PostgreSQL database

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the project root with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=cafeteria_db
PORT=3000
```

> Note: The JWT secret is currently hardcoded in `src/auth/auth.module.ts` as `your_jwt_secret`. Replace this string with a secure value before deploying to production.

## Running the Application

```bash
npm run start:dev
```

The API will start on `http://localhost:3000` by default.

## Swagger API Documentation

Open the browser at:

```text
http://localhost:3000/docs
```

## Available Scripts

- `npm run start` - start the application
- `npm run start:dev` - start in watch mode
- `npm run start:prod` - run the compiled production build
- `npm run build` - compile TypeScript
- `npm run lint` - run ESLint and auto-fix issues
- `npm run format` - format source files with Prettier
- `npm run test` - run unit tests
- `npm run test:e2e` - run end-to-end tests
- `npm run test:cov` - generate test coverage report

## Environment Variables

- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USERNAME` - database username
- `DB_PASSWORD` - database password
- `DB_NAME` - database name
- `PORT` - HTTP server port

## API Endpoints

### Authentication

- `POST /auth/login` - sign in and receive a JWT access token
- `POST /auth/signup` - create a new user account
- `PATCH /auth/reset-password/:email` - reset a user password by email

### OTP

- `POST /otp/send` - request OTP code for email verification
- `POST /otp/verify` - verify OTP code

### Users

- `POST /users` - create a new user (Admin only)
- `GET /users` - list users
- `GET /users/:id` - get user details
- `PATCH /users/:id` - update user (Admin only)
- `DELETE /users/:id` - delete user (Admin only)
- `PATCH /users/change-password` - change user password

### Cafeterias

- `POST /cafeteria` - create a cafeteria
- `GET /cafeteria` - list cafeterias
- `GET /cafeteria/:id` - get cafeteria details
- `DELETE /cafeteria/:id` - delete cafeteria

### Stalls

- `POST /stalls` - create a stall
- `GET /stalls` - list stalls
- `GET /stalls/:id` - get stall details
- `DELETE /stalls/:id` - delete stall

### Menu Items

- `POST /menu-items` - create a menu item
- `GET /menu-items` - list all menu items
- `GET /menu-items/available` - list available menu items
- `GET /menu-items/:id` - get item details
- `PATCH /menu-items/:id` - update item
- `DELETE /menu-items/:id/softRemove` - soft delete an item
- `DELETE /menu-items/:id` - hard delete an item

### Orders

- `POST /orders` - create a new order
- `GET /orders` - list all orders
- `GET /orders/:id` - get order details
- `PATCH /orders/:id` - update an order
- `DELETE /orders/:id` - delete an order

### Order Items

- `POST /order-items` - create order item entries
- `GET /order-items` - list order items
- `GET /order-items/:id` - get order item details
- `DELETE /order-items/:id` - delete order item

### Dashboards

#### Admin Dashboard (Admin only)

- `GET /admin-dashboard/today-sales`
- `GET /admin-dashboard/sales-by-period?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- `GET /admin-dashboard/income-by-period?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- `GET /admin-dashboard/university-share?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- `GET /admin-dashboard/stall-sales?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- `GET /admin-dashboard/top-items?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&limit=10`
- `GET /admin-dashboard/overview`

#### Stall Manager Dashboard (Manager only)

- `GET /stall-manager-dashboard/:stallId/today-sales`
- `GET /stall-manager-dashboard/:stallId/sales-by-period?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- `GET /stall-manager-dashboard/:stallId/income-by-period?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- `GET /stall-manager-dashboard/:stallId/top-items?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&limit=10`
- `GET /stall-manager-dashboard/:stallId/overview`

#### Cashier Dashboard (Cashier only)

- `GET /cashier-dashboard/:stallId/today-sales`
- `GET /cashier-dashboard/:stallId/recent-orders?limit=10`
- `GET /cashier-dashboard/:stallId/quick-stats`
- `GET /cashier-dashboard/:stallId/popular-items?limit=5`

## Security Notes

- JWT is used for protected routes.
- The app currently reads database connection values from environment variables.
- Update the hardcoded JWT secret in `src/auth/auth.module.ts` before production deployment.
- TypeORM is configured with `synchronize: false`, so database schema changes must be managed manually or with migrations.

## Contributing

Contributions are welcome. Please fork the repository, create a feature branch, and submit a pull request with a clear description of changes.

