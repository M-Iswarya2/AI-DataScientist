class TargetDetectionAI:
    def target_detection_ai(self,target_detection,best_target):
        target_scores = target_detection
        insights = []
        insight = f"The column '{best_target}' is the most likely target variable based on its name, position in the dataset, missing-value analysis, and other heuristic checks."
        insights.append({
                        "category" : "Best Target Prediction",
                        "insight" : insight,
                        "severity" : 'info'
                        })

        reason =  ", ".join(target_scores[best_target]["reasons"])
        insight = f"Reason for selecting '{best_target}': {reason}"
        insights.append({
                        "category" : "Reason for Best Target Prediction",
                        "insight" : insight,
                        "severity" : 'info'
                        })
        points = target_scores[best_target]["points"]

        if points >= 15:
            insight = "Target detection confidence is high because the column satisfied several heuristic checks."
        elif points >= 8:
            insight = "Target detection confidence is moderate because the column matched several heuristic checks, but some indicators were inconclusive. Review the selected target if needed."
        else:
            insight = "Target detection confidence is low because only a few indicators matched. Verify the target manually."
        insights.append({
                        'category' : 'Target Confidence',
                        "insight" : insight,
                        "severity" : 'info'
                        })
        return insights
                            
        