import os
from fastapi import UploadFile
import pandas as pd


from services.dataset_summary import DatasetSummary 
from services.data_quality import DataQuality 
from services.feature_analysis import FeatureAnalysis
from services.target_detection import TargetDetection
from services.type_detection import TypeDetection

from services.ml.pipeline import Pipeline

ds=DatasetSummary()
dq = DataQuality()
fa = FeatureAnalysis()
td = TargetDetection()
tyd = TypeDetection()
pipeline = Pipeline()


UPLOAD_DIR = "storage/uploads"

def save_dataset(file: UploadFile):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    return file_path

def run_ml_pipeline(file_path):
    data = pd.read_csv(file_path)
    dataset_summary = ds.get_dataset_summary(data)
    data_quality = dq.get_data_quality(data)
    feature_analysis = fa.get_feature_analysis(data)
    target_detection, target = td.target_detection(feature_analysis,data_quality['missing_values'],dataset_summary['num_rows'])
    problem_type = tyd.type_detection(data, target)
    result = pipeline.run(
                        data,
                        feature_analysis,
                        target,
                        problem_type["problem_type"].lower()
                    )
    return result