import pandas as pd
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form
from services import current_dataset
from services.data_service import save_dataset, analyze_dataset
from services.ml_service import run_ml_pipeline
from api.clean_json import clean_for_json

import io
from fastapi.responses import StreamingResponse

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

@router.post("/plot")
def plot(fea1: str = Form(None),fea2: str = Form(None),plot_type: str = Form(...)
):
    data = pd.read_csv(current_dataset.current_path)

    if plot_type == "scatter":
        from services.plots.scatter_plot import ScatterPlot
        scatter_plotter = ScatterPlot()
        fig = scatter_plotter.scatter_plot(data, fea1, fea2)
    elif plot_type == "line":
        from services.plots.line import LinePlot
        line_plotter = LinePlot()
        fig = line_plotter.line_plot(data, fea1, fea2)
    elif plot_type == "bar":
        from services.plots.bar import Bar
        bar_plotter = Bar()
        fig = bar_plotter.bar_plot(data, fea1, fea2)
    elif plot_type == "histogram":
        from services.plots.histogram import Histogram
        histogram_plotter = Histogram()
        fig = histogram_plotter.histogram_plot(data, fea1)
    elif plot_type == "box":
        from services.plots.box import BoxPlot
        box_plotter = BoxPlot()
        fig = box_plotter.box_plot(data, fea1)
    elif plot_type == "heatmap":
        from services.plots.heatmap import Heatmap
        heatmap_plotter = Heatmap()
        fig = heatmap_plotter.heat_map(data)

    else:
        raise ValueError("Invalid plot type. Please choose either 'scatter' or 'line'.")

    img = io.BytesIO()
    fig.savefig(img, format="png")
    img.seek(0)
    
    return StreamingResponse(img, media_type="image/png")