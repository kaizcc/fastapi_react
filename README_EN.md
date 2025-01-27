# FastAPI React Admin

A modern admin dashboard built with FastAPI and React.

## Features

- 🔐 JWT Authentication
- 👥 User Management
- 🎨 Modern UI with React
- 🚀 FastAPI Backend
- 🐳 Docker Support
- 🔄 Role-based Access Control

## Setup Instructions

### Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL 15+
- Docker (optional)

### Local Development Setup

1. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend

   # Install dependencies
   pip install -r requirements.txt

   # Create PostgreSQL database
   psql -U postgres
   CREATE DATABASE fastapi_react;
   \q

   # Run database migrations
   psql -U postgres -d fastapi_react -f sql/create_tables.sql

   # Configure environment
   # Edit .env file with your database credentials
   # Example:
   DATABASE_URL=postgresql://fastapi:123456@localhost:5432/fastapi_react

   # Start backend server
   uvicorn main:app --reload --port 5000
   ```

2. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd frontend

   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

### Docker Setup

1. **Configuration**
   ```bash
   # The docker-compose.yml is already configured with:
   # - Frontend on port 3000
   # - Backend on port 5000
   # - PostgreSQL on port 5433
   ```

2. **Build and Run**
   ```bash
   # Build and start all services
   docker-compose up --build

   # To stop all services
   docker-compose down
   ```

## Accessing the Application

### Local Development
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Database: localhost:5432

### Docker Environment
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:5433

## Default Users

```
Regular User:
- Username: user
- Password: password

Admin User:
- Username: admin
- Password: password
```

## Database Connection

### Local PostgreSQL
```
Host: localhost
Port: 5432
Database: fastapi_react
Username: fastapi
Password: 123456
```

### Docker PostgreSQL
```
Host: localhost
Port: 5433
Database: fastapi_db
Username: postgres
Password: postgres
```

## Project Structure
```
fastapi_react_admin/
├── backend/
│   ├── users/           # User management
│   ├── sql/            # Database scripts
│   └── main.py         # FastAPI application
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   └── store/      # Redux store
│   └── package.json
└── docker-compose.yml
```

## Development Notes

- The backend uses FastAPI with PostgreSQL
- Frontend is built with React, Redux Toolkit, and Vite
- Authentication uses JWT tokens
- Role-based access control (0 for users, 1 for admins)

## Troubleshooting

1. **Port Conflicts**
   - For local PostgreSQL conflicts, change Docker's PostgreSQL port in docker-compose.yml
   - Default ports: 5432 (local) and 5433 (Docker)

2. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check credentials in .env file
   - Ensure database exists

3. **CORS Issues**
   - Backend allows all origins in development
   - Configure specific origins in production 