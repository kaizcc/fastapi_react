# FastAPI React Admin

A modern admin dashboard built with FastAPI and React, featuring role-based authentication, user management, and a clean UI.

## Screenshots

### Login Page
![Login Page](screenshots/login.png)
*Clean and modern login interface with email and password authentication*

### Registration Page
![Registration Page](screenshots/register.png)
*User registration form with all necessary fields*

### Admin Dashboard
![Admin Dashboard](screenshots/admin.png)
*Admin dashboard with user management and statistics*

### Admin Dashboard (Dark Mode)
![Admin Dashboard Dark](screenshots/admin_dark.png)
*Dark mode version of the admin dashboard for better visibility in low-light conditions*

### User Dashboard
![User Dashboard](screenshots/user.png)
*Regular user dashboard with limited permissions*

## Default Login Credentials

### Admin Account
- Username: admin
- Password: 123456

### Regular User Account
- Username: user
- Password: 123456

## Features

- Role-based authentication (Admin/User)
- User management (CRUD operations)
- Dark/Light mode support
- Responsive design
- Secure password hashing
- JWT token authentication
- PostgreSQL database

## Prerequisites

### Backend
- Python 3.11+
- PostgreSQL
- FastAPI
- SQLAlchemy

### Frontend
- Node.js 18+
- React 18
- TypeScript
- Vite

## Local Development Setup

1. Clone the repository
2. Set up the database:
   ```sql
   CREATE DATABASE fastapi_db;
   ```

3. Backend setup:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 5000
   ```

4. Frontend setup:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Docker Setup

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Database Configuration

### Local Development
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fastapi_db
```

### Docker Environment
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/fastapi_db
```

## 功能特点

- 🔐 JWT 身份认证
- 👥 用户管理
- 🎨 现代化 React UI
- 🚀 FastAPI 后端
- 🐳 Docker 支持
- 🔄 基于角色的访问控制

## 安装说明

### 环境要求

- Python 3.11+
- Node.js 20+
- PostgreSQL 15+
- Docker (可选)

### 本地开发环境搭建

1. **后端设置**
   ```bash
   # 进入后端目录
   cd backend

   # 安装依赖
   pip install -r requirements.txt

   # 创建 PostgreSQL 数据库
   psql -U postgres
   CREATE DATABASE fastapi_react;
   \q

   # 运行数据库迁移
   psql -U postgres -d fastapi_react -f sql/create_tables.sql

   # 配置环境变量
   # 编辑 .env 文件，设置数据库连接信息
   # 示例:
   DATABASE_URL=postgresql://fastapi:123456@localhost:5432/fastapi_react

   # 启动后端服务器
   uvicorn main:app --reload --port 5000
   ```

2. **前端设置**
   ```bash
   # 进入前端目录
   cd frontend

   # 安装依赖
   npm install

   # 启动开发服务器
   npm run dev
   ```

### Docker 环境搭建

1. **配置说明**
   ```bash
   # docker-compose.yml 已配置以下端口:
   # - 前端: 3000
   # - 后端: 5000
   # - PostgreSQL: 5433
   ```

2. **构建和运行**
   ```bash
   # 构建并启动所有服务
   docker-compose up --build

   # 停止所有服务
   docker-compose down
   ```

## 访问应用

### 本地开发环境
- 前端: http://localhost:5173
- 后端 API: http://localhost:5000
- 数据库: localhost:5432

### Docker 环境
- 前端: http://localhost:3000
- 后端 API: http://localhost:5000
- 数据库: localhost:5433

## 项目结构
```
fastapi_react_admin/
├── backend/
│   ├── users/           # 用户管理
│   ├── sql/            # 数据库脚本
│   └── main.py         # FastAPI 应用
├── frontend/
│   ├── src/
│   │   ├── components/ # React 组件
│   │   ├── pages/      # 页面组件
│   │   └── store/      # Redux 存储
│   └── package.json
└── docker-compose.yml
```

## 开发说明

- 后端使用 FastAPI 和 PostgreSQL
- 前端使用 React、Redux Toolkit 和 Vite
- 身份认证使用 JWT 令牌
- 基于角色的访问控制 (0 表示普通用户, 1 表示管理员)

## 常见问题解决

1. **端口冲突**
   - 本地 PostgreSQL 冲突时，可在 docker-compose.yml 中修改 Docker 的 PostgreSQL 端口
   - 默认端口：本地 5432，Docker 5433

2. **数据库连接问题**
   - 确认 PostgreSQL 服务正在运行
   - 检查 .env 文件中的连接信息
   - 确保数据库已创建

3. **CORS 问题**
   - 开发环境允许所有来源
   - 生产环境需配置具体的来源
