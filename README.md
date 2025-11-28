# Eventive

Eventive is a modern event discovery, ticketing, and QR-based check-in platform designed with a focus on user experience and technical scalability.

## Project Overview

Eventive provides a comprehensive solution for event management, catering to three distinct user roles:
1.  **Users**: Discover events, purchase digital tickets, and access them via QR codes.
2.  **Organizers**: Create and manage events, track registrations, and verify attendees.
3.  **Administrators**: Oversee the entire platform, including user and event management.

The application features a sophisticated "Glassmorphism" design system, ensuring a premium and responsive user interface across all devices.

## Technical Architecture

The project is built on a modern, type-safe stack designed for performance and maintainability:

-   **Framework**: Next.js 16 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **Database**: PostgreSQL / SQLite (Development) with Prisma ORM
-   **Authentication**: NextAuth.js (Role-Based Access Control)
-   **Validation**: Zod & React Hook Form
-   **Cryptography**: Bcrypt for password hashing

## Core Features

### Authentication & Authorization
-   Secure user registration and login.
-   Role-based access control (RBAC) ensuring data security.
-   Persistent session management.

### Event Management
-   Public event discovery with search and filtering capabilities.
-   Detailed event pages with dynamic metadata.
-   Organizer dashboard for event creation and monitoring.

### Ticketing System
-   Digital ticket generation upon registration.
-   Unique QR code generation for each ticket.
-   Centralized "My Tickets" dashboard for users.

### Administration
-   Admin dashboard for system-wide statistics.
-   User and event oversight capabilities.

## Installation Guide

### Prerequisites
-   Node.js 18 or higher
-   npm, yarn, or pnpm

### Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd eventive
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory with the following variables:
    ```env
    DATABASE_URL="file:./dev.db"
    NEXTAUTH_SECRET="your-secure-secret-key"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Database Initialization**
    Initialize the database schema and seed sample data:
    ```bash
    npx prisma migrate dev --name init
    npm run db:seed
    ```

5.  **Start Development Server**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

## Default Credentials

For testing purposes, the database seed creates the following accounts:

-   **Administrator**: admin@eventive.com / password123
-   **Organizer**: organizer@eventive.com / password123
-   **Standard User**: user@eventive.com / password123

## Project Structure

-   `app/`: Application source code (Next.js App Router).
    -   `(public)`: Publicly accessible routes (Landing, Events).
    -   `(dashboard)`: Protected routes for authenticated users.
    -   `api/`: Backend API route handlers.
-   `components/`: Reusable UI components and feature-specific modules.
-   `lib/`: Utility functions, database clients, and shared logic.
-   `prisma/`: Database schema definitions and seed scripts.

## License

This project is licensed under the MIT License.
