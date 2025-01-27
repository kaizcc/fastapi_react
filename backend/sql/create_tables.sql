-- Database: fastapi_vue_admin

-- Drop table if exists
DROP TABLE IF EXISTS "users";

-- Create users table with new structure
CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(255),
    email VARCHAR(255),
    avatar VARCHAR(255),
    role INT4 DEFAULT 0,
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    others JSONB DEFAULT '{}'::jsonb
);

-- Add comments to users table
COMMENT ON COLUMN "users".username IS '账号';
COMMENT ON COLUMN "users".password IS '密码';
COMMENT ON COLUMN "users".nickname IS '昵称';
COMMENT ON COLUMN "users".email IS '邮箱';
COMMENT ON COLUMN "users".avatar IS '头像url';
COMMENT ON COLUMN "users".role IS '用户角色';
COMMENT ON COLUMN "users".created_time IS '创建时间';
COMMENT ON COLUMN "users".updated_time IS '更新时间';
COMMENT ON COLUMN "users".others IS '其他信息(JSON格式)';

-- Create trigger function for updating updated_time
CREATE OR REPLACE FUNCTION update_user_updated_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_time = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_users_updated_time
    BEFORE UPDATE ON "users"
    FOR EACH ROW
    EXECUTE FUNCTION update_user_updated_time();

-- Insert sample data
INSERT INTO "users" (username, password, nickname, email, role, others) VALUES
    ('user', '$2b$12$0aV9QGEX3tpP4dlITjZ9z.teTdfJyM3jFaAqNbEfZddRpTn8/jWSK', 'Regular User', 'user@example.com', 0, '{"bio": "I am a regular user"}'::jsonb),
    ('admin', '$2b$12$3KwQrnPaL7/e3PEA6b0jHOLub7dHMWuhsSBrCxj9O6KX/rbgvMU0O', 'Administrator', 'admin@example.com', 1, '{"bio": "I am an admin"}'::jsonb);

-- Reset sequence
SELECT setval('users_id_seq', (SELECT MAX(id) FROM "users"));