from sqlalchemy.orm import Session
from models.user import User
from app.schemas import UserCreate, UserUpdate
from app.utils.auth import get_password_hash, verify_password
from typing import Optional

class UserService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email."""
        return self.db.query(User).filter(User.email == email).first()
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID."""
        return self.db.query(User).filter(User.id == user_id).first()
    
    def get_user_by_username(self, username: str) -> Optional[User]:
        """Get user by username."""
        return self.db.query(User).filter(User.username == username).first()
    
    def create_user(self, user_data: UserCreate) -> User:
        """Create a new user."""
        # Check if user already exists
        if self.get_user_by_email(user_data.email):
            raise ValueError("Email already registered")
        
        if user_data.username and self.get_user_by_username(user_data.username):
            raise ValueError("Username already taken")
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        db_user = User(
            email=user_data.email,
            username=user_data.username,
            full_name=user_data.full_name,
            hashed_password=hashed_password
        )
        
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user
    
    def update_user(self, user_id: int, user_data: UserUpdate) -> Optional[User]:
        """Update user information."""
        user = self.get_user_by_id(user_id)
        if not user:
            return None
        
        # Update fields if provided
        if user_data.username is not None:
            if user_data.username != user.username and self.get_user_by_username(user_data.username):
                raise ValueError("Username already taken")
            user.username = user_data.username
        
        if user_data.full_name is not None:
            user.full_name = user_data.full_name
        
        if user_data.password is not None:
            user.hashed_password = get_password_hash(user_data.password)
        
        self.db.commit()
        self.db.refresh(user)
        return user
    
    def update_last_login(self, user_id: int):
        """Update user's last login timestamp."""
        user = self.get_user_by_id(user_id)
        if user:
            from datetime import datetime
            user.last_login = datetime.utcnow()
            self.db.commit()
    
    def deactivate_user(self, user_id: int) -> bool:
        """Deactivate a user."""
        user = self.get_user_by_id(user_id)
        if user:
            user.is_active = False
            self.db.commit()
            return True
        return False
    
    def activate_user(self, user_id: int) -> bool:
        """Activate a user."""
        user = self.get_user_by_id(user_id)
        if user:
            user.is_active = True
            self.db.commit()
            return True
        return False
