# Eventive

Modern event discovery, ticketing, and QR-based check-in platform with elegant glassmorphism design.

## 🎨 Design Philosophy

Eventive features an elegant, professional design inspired by Apple's glassmorphism aesthetic:
- **Glassmorphism UI** - Frosted glass effects with subtle transparency
- **Soft Color Palette** - iOS-inspired blues and purples (not too bright)
- **Smooth Animations** - Gentle transitions and micro-interactions
- **Clean Typography** - Geist Sans for optimal readability

## ✨ Features

### For Users
- Browse and discover events with advanced filtering
- Book digital tickets with unique QR codes
- View all your tickets in one place
- Seamless check-in experience

### For Organizers
- Create and manage events
- Monitor registrations in real-time
- QR code scanning for check-in
- View participant lists

### For Admins
- System-wide event and user management
- Administrative controls

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL/SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **QR Codes**: qrcode.react & @zxing/library

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd eventive
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
# Create .env file
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Initialize database
```bash
npx prisma migrate dev --name init
npm run db:seed
```

5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Sample Credentials

After running `npm run db:seed`, you can use these credentials:

- **User**: user@eventive.com / password123
- **Organizer**: organizer@eventive.com / password123  
- **Admin**: admin@eventive.com / password123

## 📁 Project Structure

```
eventive/
├── app/
│   ├── (public)/          # Public pages (landing, events)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── auth/              # Authentication pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles with design system
├── components/
│   ├── ui/                # Reusable UI components
│   ├── EventCard.tsx
│   └── Navbar.tsx
├── lib/
│   ├── db.ts              # Prisma client
│   └── utils.ts           # Utility functions
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Sample data
└── public/
```

## 🎯 Current Progress

### ✅ Completed
- Design system with glassmorphism UI
- Landing page with hero section
- Events listing page with filters
- Event detail page
- Auth page (UI only)
- Database schema and migrations
- Sample data seeding
- Reusable UI components (Button, Card, Input, Select)
- Responsive navbar with glassmorphism

### 🚧 Todo (see TODO.md for details)
- Authentication implementation (NextAuth)
- User dashboard (My Tickets)
- Organizer dashboard (Create/Manage Events)
- Registration/Booking flow
- QR code generation for tickets
- QR scanner for check-in
- Admin dashboard

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data

## 🤝 Contributing

This is a portfolio/learning project. Feel free to fork and modify for your own use!

## 📄 License

MIT
