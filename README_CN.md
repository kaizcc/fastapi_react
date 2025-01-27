# FastAPI React Admin

基于 FastAPI 和 React 构建的现代化管理后台。

[English](README.md) | 简体中文

## 系统截图

### 登录页面
![登录页面](screenshots/login.png)
*简洁现代的登录界面，支持邮箱密码认证*

### 注册页面
![注册页面](screenshots/register.png)
*用户注册表单，包含所有必要字段*

### 管理员仪表板
![管理员仪表板](screenshots/admin.png)
*管理员仪表板，包含用户管理和统计信息*

### 管理员仪表板（深色模式）
![管理员仪表板深色模式](screenshots/admin_dark.png)
*管理员仪表板的深色模式版本，适合低光环境使用*

### 用户仪表板
![用户仪表板](screenshots/user.png)
*普通用户仪表板，具有有限的权限*

## 默认登录凭据

### 管理员账号
- 用户名：admin
- 密码：123456

### 普通用户账号
- 用户名：user
- 密码：123456

## 功能特点

- 基于角色的身份认证（管理员/用户）
- 用户管理（CRUD 操作）
- 深色/浅色主题支持
- 响应式设计
- 安全的密码哈希
- JWT 令牌认证
- PostgreSQL 数据库

## 环境要求

### 后端
- Python 3.11+
- PostgreSQL
- FastAPI
- SQLAlchemy

### 前端
- Node.js 18+
- React 18
- TypeScript
- Vite

## 本地开发环境搭建

1. 克隆仓库
2. 设置数据库：
   ```sql
   CREATE DATABASE fastapi_db;
   ```

3. 后端设置：
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows系统使用: .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 5000
   ```

4. 前端设置：
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. 访问应用：
   - 前端：http://localhost:5173
   - 后端 API：http://localhost:5000

## Docker 环境搭建

1. 使用 Docker Compose 构建并运行：
   ```bash
   docker-compose up --build
   ```

2. 访问应用：
   - 前端：http://localhost:3000
   - 后端 API：http://localhost:5000

## 数据库配置

### 本地开发环境
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fastapi_db
```

### Docker 环境
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/fastapi_db
``` 