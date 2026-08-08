from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form
from services.data_service import save_dataset, analyze_dataset
from services.ml_service import run_ml_pipeline
from api.clean_json import clean_for_json

router = APIRouter()

@router.post("/analyze")
def analyze_file(file: UploadFile = File(...)):
    path = save_dataset(file)
    analysis = analyze_dataset(path)
    return clean_for_json(analysis)


@router.post("/train")
def train_model(file: UploadFile = File(...), target: Optional[str] = Form(None)):
    path = save_dataset(file)
    result = run_ml_pipeline(path, target=target)
    return {
            "best_model_name": result["best_model_name"],
            "metrics": result["best_model_metrics"],
            "score": result["score"],
            "results": result["results"],
            "preprocessing": result["preprocessing"]
        }