from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import upload


app=FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to AIDataScience!"
    }


@app.get("/health")
def health():
    return {
        "status": "running",
        "project": "AI DataScience"
    }


app.include_router(upload.router)