from fastapi import APIRouter, Request
from pydantic import BaseModel
from app.questions.laya import QUESTIONS

router = APIRouter()

class NewsIn(BaseModel):
    new: str
    body: str

@router.post("/analysis")
def analyze(news: NewsIn, request: Request):
    model = request.app.state.laya
    result = model.predict(news.model_dump(), QUESTIONS)
    return result["answers"]