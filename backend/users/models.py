from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    nickname = Column(String)
    avatar = Column(String, nullable=True)
    role = Column(Integer, default=0)  # 0 for user, 1 for admin
    created_time = Column(DateTime(timezone=True), server_default=func.now())
    updated_time = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    others = Column(JSON, default={}) 