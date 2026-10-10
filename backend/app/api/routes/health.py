from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/health")
def health_check(request: Request):
    return {
        "status": "healthy",
        "model_loaded": hasattr(request.app.state, "laya")
    }