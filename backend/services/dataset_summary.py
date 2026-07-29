import pandas as pd
class DatasetSummary:
    def get_dataset_summary(self,data: pd.DataFrame):
        return {
            "num_rows": data.shape[0],
            "num_columns": data.shape[1],
            "column_names": list(data.columns),
            "memory_usage": data.memory_usage(deep=True).sum()/ (1024 ** 2)}