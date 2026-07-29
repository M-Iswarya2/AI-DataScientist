import pandas as pd
class Statistics:
    def get_statistics(self,data: pd.DataFrame):
        numeric_data = data.select_dtypes(include="number")
        correlation = numeric_data.corr()
        high_corr = []
        for i in range(correlation.shape[0]):
            for j in range(i+1,correlation.shape[1]):
                corre_value = correlation.iloc[i,j]
                if abs(corre_value) >= 0.8:
                    if corre_value >= 0.8:
                        relation = "Strong Positive"
                    elif corre_value <= -0.8:
                        relation = "Strong Negative"
                    high_corr.append({"feature1":correlation.index[i],
                                        "feature2":correlation.columns[j],
                                        "correlation" : corre_value,
                                        "relation" : relation})
        return {
             "correlation_matrix" : correlation.to_dict(), 
             "high_corr" : high_corr,
             "describe": data.describe().to_dict()
                }