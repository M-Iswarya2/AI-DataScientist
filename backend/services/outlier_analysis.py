class OutlierAnalysis:
    def outlier_analysis(self, data):
        outlier_summary = {}
        numeric_data = data.select_dtypes(include="number")
        rows = numeric_data.shape[0]
        total=0
        for col in numeric_data.columns:
            q1 = numeric_data[col].quantile(0.25)
            q3 = numeric_data[col].quantile(0.75)
            iqr = q3-q1
            lb = q1 - (1.5 * iqr)
            ub = q3 + (1.5 * iqr)
            total_col = 0
            for val in numeric_data[col]:
                if val<lb or val>ub:
                    total_col+=1
            percentage = round((total_col/rows)*100, 2)
            outlier_summary[col] = {
                                        'outlier_count' : total_col,
                                        'outlier_percentage' : percentage
                                        }
            total+=total_col
        outlier_summary = dict(sorted(outlier_summary.items(),key=lambda x: x[1]["outlier_count"],reverse=True))
        highest_column = next(iter(outlier_summary))
        return {
               'total_outliers' : total,
               'outlier_summary' : outlier_summary,
               "highest_outlier_column": highest_column,
                "highest_outlier_details": outlier_summary[highest_column]
               }

        