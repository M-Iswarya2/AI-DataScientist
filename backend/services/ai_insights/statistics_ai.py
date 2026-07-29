class Statistics:
    def statistics_ai(self,statistics):
        insights = []
        high_corr = statistics['high_corr']
        if len(high_corr)==0:
            insight = "No strong correlations were detected among numerical features, indicating low multicollinearity and better feature independence." 
            severity = "info"
        else:
            insight = f"({highest_corr['correlation']:.2f}) pairs of features exhibit strong correlation. These relationships may indicate redundant information, increasing the risk of multicollinearity in certain machine learning models. Consider removing one feature from each correlated pair or applying dimensionality reduction techniques."
            if len(high_corr)<4:
                severity='medium'
            else:
                severity='high'
        insights.append({
            "category" : "Correlation Analysis",
            "insight" : insight,
            "severity" : severity
        })

        if len(high_corr)>0:
            highest_corr = max(high_corr, key=lambda x: abs(x["correlation"]))
            insight = f"The {highest_corr['relation']} relationship exists between {highest_corr['feature1']} and {highest_corr['feature2']} ({highest_corr['correlation']}). One of these features may be redundant for certain machine learning models."
            severity = 'high'
            insights.append({
                        "category" : "Highest correlated features",
                        "insight" : insight,
                        "severity" : severity
                    })
        return insights