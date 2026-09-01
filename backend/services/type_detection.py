class TypeDetection:
    def type_detection(self, data, feature):
        column_type = {
                "problem_type":None,
                "confidence":0,
                "categorical_score":0,
                "numerical_score":0,
                "reasons":[]
                }
        self.data_type(data, column_type, feature)
        self.uni_values(data, column_type, feature)
        self.fixed_names(column_type, feature)
        self.predict_type(column_type)
        self.confidence(column_type)
        return column_type

    def data_type(self, data, column_type, feature):
        typ = str(data[feature].dtype) 
        if typ in {'object', 'bool'}:
            column_type['categorical_score']+=100
        elif typ in {'float64', 'float32'}:
            column_type['numerical_score']+=100

    def uni_values(self, data, column_type, feature):
        uni = data[feature].nunique()
        if uni==2 or uni==3:
            column_type['categorical_score']+=30
        uni_ratio = (uni/data.shape[0])*100
        if uni_ratio >= 30:
            column_type["numerical_score"]+=30
        elif uni_ratio < 30:
            column_type["categorical_score"]+=30

    def fixed_names(self, column_type, feature):
        fixed = ["age", "time", "year", "duration", "height", "weight", "distance", "salary", "price"]
        if feature in fixed:
            column_type['numerical_score']+=30

    def predict_type(self, column_type):
        if column_type['categorical_score'] > column_type["numerical_score"]:
            column_type['problem_type'] = 'Classification'
        else:
            column_type['problem_type'] = 'Regression'

    def confidence(self, column_type): 
        if column_type['problem_type'] == 'Classification':
            column_type['confidence'] = column_type['categorical_score']/(column_type['categorical_score']+column_type["numerical_score"])
        else:
            column_type['confidence'] = column_type['numerical_score']/(column_type['categorical_score']+column_type["numerical_score"])
        column_type['confidence']=round(column_type['confidence']*100, 2)