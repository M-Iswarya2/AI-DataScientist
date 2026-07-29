from fastapi import FastAPI, UploadFile, File
from api import upload

app=FastAPI()

@app.get("/")
def home():
    return {"message": "Welcome to AIDataScience!"}

@app.get("/health")
def health():
    return {
        "status": "running",
        "project": "AI DataScience"
    }

app.include_router(upload.router)