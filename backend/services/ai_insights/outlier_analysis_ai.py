class OutlierAnalysisAI:
    def outlier_ai(self,outlier_analysis):
        insights =[]
        total_outliers = outlier_analysis['total_outliers']
        insight = f"The dataset contains {total_outliers} potential outlier values across all numerical features. Outliers may influence statistical analysis and machine learning model performance."
        if total_outliers == 0:
            severity = 'info'
            insight = "No significant outliers were detected using the IQR method."
        elif total_outliers<50:
            severity = 'medium'
        else:
            severity = 'high'
        insights.append({
                        "category" : "Overall outlier summary",
                        "insight" : insight,
                        "severity" : severity
                        })
        if total_outliers > 0:
            highest_outlier_details = outlier_analysis['highest_outlier_details']
            insight = f"The {outlier_analysis['highest_outlier_column']} feature contains the highest number of outliers ({highest_outlier_details['outlier_count']}, {highest_outlier_details['outlier_percentage']:.2f}% of observations). Consider investigating whether these values represent genuine extreme cases or data quality issues."
            if highest_outlier_details['outlier_percentage'] <= 5:
                severity = 'info'
            elif highest_outlier_details['outlier_percentage'] <= 15:
                severity = 'medium'
            else:
                severity = 'high'
                insight =  (f"The '{outlier_analysis['highest_outlier_column']}' feature has the highest "
                            f"number of outliers ({highest_outlier_details['outlier_count']} observations, "
                            f"{highest_outlier_details['outlier_percentage']}%). "
                            "Consider validating these values or applying appropriate outlier treatment.")
            insights.append({
                            "category" : "Column with the most outliers",
                            "insight" : insight,
                            "severity" : severity
                            })
        return insights
            