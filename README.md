# Eventive - Professional Event Management Platform

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC)](https://www.typescriptlang.org/)

*A comprehensive event management platform designed to streamline event creation, ticketing, and attendee management for professional organizers.*

[Documentation](#api-documentation) • [Report Bug](https://github.com/RayendraNagata/Eventive/issues) • [Request Feature](https://github.com/RayendraNagata/Eventive/issues)

</div>

---

## Overview

Eventive is a modern SaaS platform that empowers event organizers to create, manage, and scale their events with comprehensive tools for ticketing, attendee management, and real-time analytics. Built with enterprise-grade security and scalability in mind, Eventive serves everything from small workshops to large-scale conferences.

### Problem Statement
Event organizers face challenges with fragmented tools for event management, complex ticketing processes, limited attendee engagement features, poor analytics and reporting capabilities, and inefficient check-in procedures that impact attendee experience.

### Solution
Eventive addresses these challenges by providing unified event management dashboard, streamlined ticketing system with multiple payment options, real-time analytics and reporting, digital ticket generation with QR code validation, and professional check-in interface for seamless attendee experience.

## Key Features

- **Event Creation & Management**: Comprehensive event setup with scheduling, pricing, and capacity management
- **Advanced Ticketing System**: Multiple ticket types, pricing tiers, and payment processing integration
- **Digital Ticket Generation**: QR code-based tickets with real-time validation
- **Professional Check-in Interface**: Streamlined attendee validation and real-time updates
- **Analytics Dashboard**: Comprehensive insights on sales, attendance, and engagement metrics
- **Public Event Discovery**: Searchable event directory with advanced filtering capabilities

## Technology Stack

<div align="center">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

### Backend
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

### Payment & Services
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Midtrans](https://img.shields.io/badge/Midtrans-FF6B35?style=for-the-badge)

</div>

## Quick Start

### Prerequisites
- Node.js (v18.0 or later)
- PostgreSQL (v13 or later)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RayendraNagata/Eventive.git
   cd Eventive
   ```

2. **Setup Frontend**
   ```bash
   cd eventive-frontend
   npm install
   cp .env.example .env.local
   npm run dev
   ```

3. **Setup Backend**
   ```bash
   cd ../eventive-backend
   npm install
   cp .env.example .env
   npx prisma generate
   npx prisma db push
   npm run start:dev
   ```

### Environment Configuration

**Frontend (.env.local)**
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend (.env)**
```env
DATABASE_URL=postgresql://username:password@localhost:5432/eventive
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
```

### Demo Accounts
For testing purposes, use these demo accounts:
- **Admin**: admin@eventive.com / demo123
- **Organizer**: organizer@eventive.com / demo123
- **User**: user@eventive.com / demo123

## Project Structure

```
Eventive/
├── eventive-frontend/             # Next.js frontend application
│   ├── src/
│   │   ├── app/                   # App Router pages
│   │   │   ├── (auth)/           # Authentication routes
│   │   │   ├── dashboard/        # Dashboard pages
│   │   │   ├── events/           # Public event pages
│   │   │   └── api/              # API routes
│   │   ├── components/           # Reusable React components
│   │   │   ├── ui/               # Base UI components
│   │   │   └── common/           # Shared components
│   │   ├── lib/                  # Utility libraries
│   │   └── types/                # TypeScript definitions
│   ├── public/                   # Static assets
│   ├── package.json             # Dependencies
│   └── next.config.js           # Next.js configuration
├── eventive-backend/             # NestJS backend application
│   ├── src/
│   │   ├── modules/             # Feature modules
│   │   │   ├── auth/            # Authentication module
│   │   │   ├── events/          # Event management
│   │   │   ├── tickets/         # Ticketing system
│   │   │   └── users/           # User management
│   │   ├── common/              # Shared utilities
│   │   ├── guards/              # Route guards
│   │   └── main.ts              # Application entry point
│   ├── prisma/                  # Database schema and migrations
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts              # Database seeding
│   ├── package.json             # Dependencies
│   └── nest-cli.json            # NestJS configuration
├── README.md                     # Project documentation
└── LICENSE                      # MIT license file
```

## API Documentation

### Authentication
- `POST /auth/register` - User registration with email verification
- `POST /auth/login` - User authentication with JWT tokens
- `POST /auth/refresh` - Token refresh functionality

### Events Management
- `GET /events` - List public events with filtering and pagination
- `POST /events` - Create new event (authenticated organizers)
- `GET /events/:id` - Get detailed event information
- `PUT /events/:id` - Update event details (event owner only)
- `DELETE /events/:id` - Delete event (event owner only)

### Ticketing System
- `POST /tickets/purchase` - Purchase event tickets
- `GET /tickets/:id` - Get digital ticket with QR code
- `POST /tickets/validate` - Validate ticket during check-in
- `GET /events/:id/attendees` - List event attendees (organizer only)

### Analytics
- `GET /analytics/events/:id` - Event performance metrics
- `GET /analytics/sales/:id` - Sales and revenue data
- `GET /analytics/attendees/:id` - Attendee insights and demographics

## Development Roadmap

### Current Features
- Professional landing page with event discovery
- User authentication and authorization system
- Event creation and management dashboard
- Public event browsing and registration
- Digital ticketing with QR code generation
- Basic analytics and reporting

### Planned Features
- Advanced payment processing (Stripe, Midtrans)
- Real-time check-in system with mobile app
- Email notification system for events
- Social media integration and sharing
- Advanced analytics and reporting dashboard
- Multi-language support (internationalization)
- Mobile-responsive progressive web app
- Integration with calendar systems (Google, Outlook)

## Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a new branch for your feature
4. **Make** your changes with proper testing
5. **Submit** a pull request with detailed description

### Development Guidelines
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
- Ensure all tests pass before submitting
- Add comprehensive tests for new features
- Update documentation as needed
- Follow TypeScript best practices
- Maintain consistent code formatting with Prettier

### Areas We Need Help With
- Mobile application development (React Native)
- Payment gateway integrations
- Advanced analytics and data visualization
- Performance optimization
- Security enhancements and auditing
- UI/UX design improvements

### Code Standards
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write comprehensive unit and integration tests
- Document all public APIs and complex functions
- Follow SOLID principles and clean architecture

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors & Contributors

<table>
<tr>
<td align="center">
<a href="https://github.com/RayendraNagata">
<img src="https://github.com/RayendraNagata.png" width="100" style="border-radius: 50%"/>
<br />
<strong>Rayendra Nagata</strong>
</a>
<br />
<sub>Project Creator & Lead Developer</sub>
</td>
</tr>
</table>

## Acknowledgments

- [Next.js](https://nextjs.org/) team for the powerful React framework
- [NestJS](https://nestjs.com/) for the scalable Node.js framework
- [Prisma](https://prisma.io/) for the excellent database toolkit
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [NextAuth.js](https://next-auth.js.org/) for authentication solutions

## Support & Contact

<div align="center">

### Get Help
[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/RayendraNagata/Eventive/issues)
[![GitHub Discussions](https://img.shields.io/badge/GitHub-Discussions-blue?style=for-the-badge&logo=github)](https://github.com/RayendraNagata/Eventive/discussions)

### Project Links
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/RayendraNagata/Eventive)

**Repository**: [github.com/RayendraNagata/Eventive](https://github.com/RayendraNagata/Eventive)

</div>

---

<div align="center">

**Built with modern web technologies**

*Empowering event organizers with professional-grade tools*

</div>
