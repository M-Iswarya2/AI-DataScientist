from services.ai_insights.statistics_ai import Statistics
from services.ai_insights.dataset_data_quality import DatasetDataQuality
from services.ai_insights.feature_analysis_ai import FeatureAnalysis
from services.ai_insights.relationship_analysis_ai import RelationshipAnalysisAI
from services.ai_insights.outlier_analysis_ai import OutlierAnalysisAI
from services.ai_insights.type_detection_ai import TypeDetectionAI
from services.ai_insights.target_detection_ai import TargetDetectionAI

class AiInsights:
    def get_ai_insights(self,dataset_summary,statistics,data_quality,feature_analysis,target_detection,best_target,relation_analysis,outlier_analysis,type_detection):
        insights = []
        dataset_data_quality_obj = DatasetDataQuality()
        feature_analysis_obj = FeatureAnalysis()
        outlier_ai_obj = OutlierAnalysisAI()
        relationship_analysis_ai_obj = RelationshipAnalysisAI()
        statistics_ai_obj = Statistics()
        target_detection_ai_obj = TargetDetectionAI()
        type_detection_ai_obj = TypeDetectionAI()

        insights.extend(dataset_data_quality_obj.dataset_data_quality(dataset_summary, data_quality))
        insights.extend(feature_analysis_obj.feature(feature_analysis))
        insights.extend(outlier_ai_obj.outlier_ai(outlier_analysis))
        insights.extend(relationship_analysis_ai_obj.relationship_analysis_ai(relation_analysis))
        insights.extend(statistics_ai_obj.statistics_ai(statistics))
        insights.extend(target_detection_ai_obj.target_detection_ai(target_detection,best_target))
        insights.extend(type_detection_ai_obj.type_detection_ai(type_detection))
        return insights