from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
import laya

@asynccontextmanager
async def lifespan(app):
    app.state.laya = laya.load("multilingual")
    yield

app = FastAPI(lifespan=lifespan)


origins = [
    "http://localhost:5173",
    "https://aiprisma.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
  return {"mensaje": "CORS configurado correctamente"}