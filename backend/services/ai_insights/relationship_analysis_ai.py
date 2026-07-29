class RelationshipAnalysisAI:
    def relationship_analysis_ai(self,relationship_analysis):
        if relationship_analysis["status"]:
            return []
        insights = []
        summary = relationship_analysis["relationship_summary"]
        insight = f"The target variable has {summary['total_relationships']} relationships with other features, including {summary['positive_relationships']} positive and {summary['negative_relationships']} negative correlations."
        severity = 'info'
        insights.append({
                        "category": "Target Relations",
                        "insight": insight,
                        "severity": severity
                        })
        highest_strong_relationship = relationship_analysis["strongest_relationship"]
        insight = f"The strongest predictor of the target is {highest_strong_relationship['feature']} with a {highest_strong_relationship['relationship_strength']} ({highest_strong_relationship['correlation']})."
        insights.append({
                        "category": "Target Relations",
                        "insight": insight,
                        "severity": 'high'
                        })
        if summary['weak_relationships'] > summary['strong_relationships']:
            insight = "Most features have weak relationships with the target, indicating that nonlinear models or feature engineering may improve predictive performance."
        else:
            insight = "Several features exhibit strong relationships with the target, indicating that the dataset contains informative predictors for machine learning models."
        insights.append({
                        "category": "Target Relations",
                        "insight": insight,
                        "severity": 'info'
                        })
        return insights