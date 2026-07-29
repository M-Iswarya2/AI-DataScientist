class TypeDetectionAI:
    def type_detection_ai(self,type_detection):
        insights = []
        insight = f"The dataset is identified as a {type_detection['problem_type']} problem with {type_detection['confidence']:.2f}% confidence."
        severity = 'info'
        insights.append({
                        "category" : "Problem Type",
                        "insight" : insight,
                        "severity" : severity
                        })

        
        if type_detection["confidence"] >= 80:
            insight = (
                "The detected problem type is highly reliable based on the target's "
                "data type and value distribution."
            )
            severity = "info"

        elif type_detection["confidence"] >= 60:
            insight = (
                "The detected problem type is moderately reliable. Review the selected "
                "target column before training a model."
            )
            severity = "medium"

        else:
            insight = (
                "The detected problem type has low reliability. Verify that the selected "
                "target column and problem type are correct before training a model."
            )
            severity = "high"
        insights.append({
                        "category" : "Problem Type Confidence",
                        "insight" : insight,
                        "severity" : severity
                        })
        return insights
        