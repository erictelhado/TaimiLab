from fastapi import APIRouter
from datetime import datetime
from app.schemas import HealthCheck

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/", response_model=HealthCheck)
async def health_check():
    """Health check endpoint."""
    return HealthCheck(
        status="healthy",
        message="TaimiLab API is running",
        timestamp=datetime.utcnow()
    )

@router.get("/ready")
async def readiness_check():
    """Readiness check endpoint."""
    return {
        "status": "ready",
        "message": "API is ready to accept requests",
        "timestamp": datetime.utcnow()
    }
