from fastapi import APIRouter, UploadFile, File
from services.data_service import save_dataset, analyze_dataset

router = APIRouter()

@router.post("/upload")
def upload_file(file: UploadFile = File(...)):
    path = save_dataset(file)
    analysis = analyze_dataset(path)
    return analysis