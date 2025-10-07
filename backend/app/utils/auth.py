from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from fastapi import HTTPException, status
from app.config import settings

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    try:
        # Truncate password to 72 bytes to avoid bcrypt limitation
        truncated_password = plain_password[:72].encode('utf-8')
        return bcrypt.checkpw(truncated_password, hashed_password.encode('utf-8'))
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    """Hash a password."""
    # Truncate password to 72 bytes to avoid bcrypt limitation
    truncated_password = password[:72].encode('utf-8')
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(truncated_password, salt).decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

def verify_token(token: str) -> Optional[str]:
    """Verify and decode a JWT token."""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        if email is None:
            return None
        return email
    except JWTError:
        return None

def authenticate_user(db, email: str, password: str):
    """Authenticate a user with email and password."""
    from models.user import User
    
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return False
        if not verify_password(password, user.hashed_password):
            return False
        return user
    except Exception:
        return False
