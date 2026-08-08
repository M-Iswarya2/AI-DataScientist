import os
from fastapi import UploadFile
import pandas as pd
from services.dataset_summary import DatasetSummary 
from services.statistics_ import Statistics 
from services.data_quality import DataQuality 
from services.feature_analysis import FeatureAnalysis
from services.target_detection import TargetDetection
from services.ai_insights.ai_insights import AiInsights
from services.relationship_analysis import RelationshipAnalysis
from services.type_detection import TypeDetection
from services.outlier_analysis import OutlierAnalysis

UPLOAD_DIR = "storage/uploads"

ds=DatasetSummary()
s = Statistics()
dq = DataQuality()
fa = FeatureAnalysis()
td = TargetDetection()
ai = AiInsights()
ra = RelationshipAnalysis()
tyd = TypeDetection()
oa = OutlierAnalysis()

def save_dataset(file: UploadFile):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    return file_path

def analyze_dataset(file_path: str):
    data = pd.read_csv(file_path)
    dataset_summary = ds.get_dataset_summary(data)
    statistics = s.get_statistics(data)
    data_quality = dq.get_data_quality(data)
    feature_analysis = fa.get_feature_analysis(data)
    target_detection, best_target = td.target_detection(feature_analysis,data_quality['missing_values'],dataset_summary['num_rows'])
    relation_analysis = ra.analyze_relationship(statistics["correlation_matrix"], target=best_target)
    type_detection = tyd.type_detection(data,target = best_target)
    outlier_analysis = oa.outlier_analysis(data)
    ai_insights = ai.get_ai_insights(dataset_summary,statistics,data_quality,feature_analysis,target_detection,best_target,relation_analysis,outlier_analysis,type_detection)
    return {

            'dataset_summary': dataset_summary,

            'data_quality': {
                **data_quality,
                "ai_insights": ai_insights["data_quality"]
            },

            'statistics': {
                **statistics,
                "ai_insights": ai_insights["statistics"]
            },

            'feature_analysis': {
                **feature_analysis,
                "ai_insights": ai_insights["feature_analysis"]
            },

            'relationship_analysis': {
                **relation_analysis,
                "ai_insights": ai_insights["relationship_analysis"]
            },

            'type_detection': {
                **type_detection,
                "ai_insights": ai_insights["type_detection"]
            },

            'outlier_analysis': {
                **outlier_analysis,
                "ai_insights": ai_insights["outlier_analysis"]
            },

            'target_detection': {
                **target_detection,
                "ai_insights": ai_insights["target_detection"]
            }

}

