class FeatureAnalysis:
    def feature(self,feature_analysis):
        insights=[]
        numeric = len(feature_analysis['numeric'])
        categorical = len(feature_analysis['categorical'])
        total = numeric + categorical
        if total > 0:
            numeric_percentage = (numeric / total) * 100
            categorical_percentage = (categorical / total) * 100

            if numeric_percentage >= 70:
                insight = (
                    f"The dataset contains mostly numerical features i.e {numeric} numerical and {categorical} categorical, making it well-suited "
                    "for statistical analysis and a wide range of machine learning algorithms."
                )
                severity = "info"

            elif categorical_percentage >= 70:
                insight = (
                    f"The dataset is dominated by categorical features i.e {numeric} numerical and {categorical} categorical. Most machine learning algorithms require categorical features to be encoded before training."
                )
                severity = "info"

            else:
                insight = (
                    f"The dataset contains a balanced mix of numerical and categorical i.e {numeric} numerical and {categorical} categorical"
                    "features, providing flexibility for both statistical analysis and "
                    "machine learning."
                )
                severity = "info"
        insights.append({
                        "category": "Data Type Distribution",
                        "insight": insight,
                        "severity": severity
                        })
        columns = ", ".join(feature_analysis["constant_columns"])
        if columns!="":
            insight = f"Columns {columns} contains only one unique value and provides no predictive information. Consider removing it before training."
            insights.append({
                                "category" : "Constant Columns",
                                "insight" : insight,
                                "severity" : "high"
                                })
        card_columns = ",".join(feature_analysis['high_cardinality_columns'])
        if card_columns!="":
            insight = f"Column {card_columns} has extremely high cardinality and may not contribute meaningful predictive information. Consider removing it or using target/frequency encoding."
            insights.append({
                            "category" : "High Cardinality",
                            "insight" : insight,
                            "severity" : "high"
                            })
        return insights