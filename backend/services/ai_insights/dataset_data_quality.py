class DatasetDataQuality:
    def dataset_data_quality(self,dataset_summary,data_quality):
        insights = []
        insights.extend(self.dataset_summary_insights(dataset_summary))
        insights.extend(self.data_quality_insights(data_quality, dataset_summary))
        return insights

    def dataset_summary_insights(self,dataset_summary):
        insights = []
        if dataset_summary['num_rows'] < 100:
            insight = (
                "The dataset contains very few samples. While suitable for experimentation "
                "or proof-of-concept models, it may not provide enough data for reliable "
                "machine learning models."
            )
            severity = "High"

        elif dataset_summary['num_rows'] < 10000:
            insight = (
                "The dataset size is adequate for many machine learning tasks. "
                "With proper preprocessing and validation, most traditional models "
                "can be trained effectively."
            )
            severity = "Info"

        elif dataset_summary['num_rows'] < 100000:
            insight = (
                "The dataset contains a large number of samples, providing sufficient "
                "data for building robust machine learning models and performing "
                "comprehensive analysis."
            )
            severity = "Info"

        else:
            insight = (
                "The dataset is very large, making it well-suited for complex machine "
                "learning and deep learning applications. However, training and "
                "processing may require significant computational resources."
            )
            severity = "Medium"
        insights.append({
                    'category' : 'Dataset Size',
                    'insight': insight,
                    "severity": severity
                })
        
        ratio = dataset_summary['num_rows'] / dataset_summary['num_columns']
        if ratio < 10:
            insight = "The dataset has relatively few observations compared to the number of features, increasing the risk of overfitting."
            severity = "high"

        elif ratio < 20:
            insight = "The dataset has a moderate number of observations per feature. Careful feature selection and validation are recommended."
            severity = "medium"

        else:
            insight = "The dataset has a healthy number of observations relative to its features, making it suitable for most machine learning algorithms."
            severity = "info"
        insights.append({
            'category' : 'Sample Sufficiency',
            'insight': insight,
            "severity": severity
        })
        memory_usage = dataset_summary["memory_usage"]
        if memory_usage < 10:
            insight = (
                f"The dataset occupies only {memory_usage:.2f} MB of memory, "
                "allowing efficient processing on most systems."
            )
            severity = "info"

        elif memory_usage < 100:
            insight = (
                f"The dataset occupies {memory_usage:.2f} MB of memory, "
                "which is a moderate size and can be processed comfortably on most modern computers."
            )
            severity = "info"

        elif memory_usage < 500:
            insight = (
                f"The dataset occupies {memory_usage:.2f} MB of memory. "
                "While manageable, memory-intensive operations may become slower on systems with limited RAM."
            )
            severity = "medium"

        else:
            insight = (
                f"The dataset occupies {memory_usage:.2f} MB of memory, "
                "which is relatively large. Consider memory optimization techniques such as data type conversion, chunk processing, or distributed computing."
            )
            severity = "high"

        insights.append({
            "category": "Memory Usage",
            "insight": insight,
            "severity": severity
        })
        return insights


    def data_quality_insights(self, data_quality, dataset_summary):
        insights = []
        for column, missing_count in data_quality["missing_values"].items():
            missing_percentage = (missing_count / dataset_summary['num_rows'])*100
            if missing_percentage == 0:
                insight = f"There are no missing value in {column}"
                severity = 'info'

            elif missing_percentage <= 5:
                insight = (
                    f"The {column} has only {missing_percentage:.2f}% missing values. "
                    "This is minimal and can usually be handled with simple imputation or by removing a few records."
                )
                severity = "low"

            elif missing_percentage <= 20:
                insight = (
                    f"The {column} has {missing_percentage:.2f}% missing values. "
                    "This may affect model performance, so appropriate imputation techniques should be applied."
                )
                severity = "medium"

            elif missing_percentage <= 50:
                insight = (
                    f"The {column} has {missing_percentage:.2f}% missing values. "
                    "A significant portion of the data is missing, which may introduce bias or reduce model accuracy if not handled carefully."
                )
                severity = "high"

            else:  # missing_percentage > 50
                insight = (
                    f"The {column} has {missing_percentage:.2f}% missing values. "
                    "More than half of the values are missing, making the feature potentially unreliable. Consider removing the column unless it is highly important."
                )
                severity = "high"

            insights.append({
                            "category": "Missing Values",
                            "insight": insight,
                            "severity": severity
                            })

        duplicate_percentage = (data_quality['duplicate_rows'] / dataset_summary['num_rows'])*100
        if duplicate_percentage == 0:
            insight = "There are no dupilicates"
            severity = 'info'
        elif duplicate_percentage <= 5:
            insight = (
                f"The dataset contains {duplicate_percentage:.2f}% duplicate rows. "
                "Only a few duplicate records are present and can be safely removed during preprocessing."
            )
            severity = "low"

        elif duplicate_percentage <= 20:
            insight = (
                f"The dataset contains {duplicate_percentage:.2f}% duplicate rows. "
                "A noticeable number of duplicate records may bias the analysis and should be removed before model training."
            )
            severity = "medium"

        else:
            insight = (
                f"The dataset contains {duplicate_percentage:.2f}% duplicate rows. "
                "Many duplicate records are present, which can significantly affect data quality and model performance. Removing duplicates is strongly recommended."
            )
            severity = "high"
        insights.append({
                                "category": "Duplicate Rows",
                                "insight": insight,
                                "severity": severity
                                })
        return insights