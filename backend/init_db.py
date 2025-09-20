#!/usr/bin/env python3
"""
Script para inicializar o banco de dados com dados de exemplo.
Execute este script após o banco estar rodando.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from database.connection import SessionLocal, engine
from models.user import User
from app.utils.auth import get_password_hash
from app.config import settings

def init_db():
    """Initialize database with sample data."""
    # Create tables
    from database.connection import Base
    Base.metadata.create_all(bind=engine)
    
    # Create database session
    db = SessionLocal()
    
    try:
        # Check if demo user already exists
        demo_user = db.query(User).filter(User.email == "demo@endereco.de").first()
        
        if not demo_user:
            # Create demo user
            demo_user = User(
                email="demo@endereco.de",
                username="demo",
                full_name="Demo User",
                hashed_password=get_password_hash("Endereco123"),
                is_active=True,
                is_verified=True
            )
            db.add(demo_user)
            print("✅ Demo user created: demo@endereco.de / Endereco123")
        else:
            print("ℹ️  Demo user already exists")
        
        # Create admin user
        admin_user = db.query(User).filter(User.email == "admin@taimilab.com").first()
        
        if not admin_user:
            admin_user = User(
                email="admin@taimilab.com",
                username="admin",
                full_name="Admin User",
                hashed_password=get_password_hash("Admin123"),
                is_active=True,
                is_verified=True
            )
            db.add(admin_user)
            print("✅ Admin user created: admin@taimilab.com / Admin123")
        else:
            print("ℹ️  Admin user already exists")
        
        # Commit changes
        db.commit()
        print("🎉 Database initialized successfully!")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Initializing TaimiLab database...")
    init_db()
