import pandas as pd
class DataQuality:
    def get_data_quality(self,data: pd.DataFrame):
        return {
            "missing_values": data.isnull().sum().to_dict(),
            "data_types": data.dtypes.astype(str).to_dict(),
            "duplicate_rows": int(data.duplicated().sum())}