from services.type_detection import TypeDetection

td = TypeDetection()

class FeatureAnalysis:
    def get_feature_analysis(self,data):
        rows=data.shape[0]
        numeric_features = []
        categorical_features = []
        constant_columns=[]
        high_cardinality_columns=[]
        column_info = {}
        for index,value in data.dtypes.items():
            result = td.type_detection(data, index)
            nunique = data[index].nunique()
            if result['problem_type'] == 'Regression':
                numeric_features.append(index)
            else:
                categorical_features.append(index)
                if nunique/rows>0.55:
                    high_cardinality_columns.append(index)
            column_info[index]={
                                'dtype' : str(value),
                                'unique_values' : nunique
                                }
            if nunique==1:
                constant_columns.append(index)
        
        return {"numeric": numeric_features, 
            "categorical": categorical_features,
            "constant_columns": constant_columns,
            "high_cardinality_columns": high_cardinality_columns,
            "column_info" : column_info}
