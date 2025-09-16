# Analytics Dashboard

A modern analytics dashboard with global and local filter capabilities, built with Next.js, tRPC, and PostgreSQL.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, tRPC, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Chart.js with React Chart.js 2
- **UI Components**: Shadcn

## 📋 Prerequisites

- Node.js
- Docker and Docker Compose
- npm or pnpm

## 🛠️ Getting Started

### 1. Database Setup

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

This will start a PostgreSQL database on port `5432` with the following default credentials:
- **Database**: `mydatabase`
- **Username**: `myuser`
- **Password**: `mypassword`

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Start the development server:

```bash
npm run dev
```

The backend will be available at `http://localhost:8000` (or the port specified in your environment).

### 3. Frontend Setup

In a new terminal, navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## 🎯 Usage

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
2. The dashboard will load with sample data and interactive charts
3. Use the global filter bar to filter data across all charts
4. Individual charts also support local filtering

## 📁 Project Structure

```
dashboard/
├── client/                # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Backend application
│   ├── src/
│   │   ├── routes/        # API routes and tRPC routers
│   │   ├── services/      # Business logic services
│   │   └── config/        # Configuration files
│   └── prisma/            # Database schema and migrations
└── docker-compose.yml     # Database configuration
```

## 👨‍💻 Author

**Frederik Haas**
- GitHub: [@FreddyHaas](https://github.com/FreddyHaas)
- Repository: [dashboard](https://github.com/FreddyHaas/dashboard-frontend)

