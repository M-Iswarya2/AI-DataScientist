class TypeDetection:
    def type_detection(self, data, target):
        target_type = {
                "problem_type":None,
                "confidence":0,
                "classification_score":0,
                "regression_score":0,
                "reasons":[]
                }
        self.data_type(data, target_type, target)
        self.uni_values(data, target_type, target)
        self.predict_type(target_type)
        self.confidence(target_type)
        return target_type

    def data_type(self, data, target_type, target):
        typ = str(data[target].dtype) 
        if typ in {'object', 'bool'}:
            target_type['classification_score']+=100
        elif typ in {'float64', 'float32'}:
            target_type['regression_score']+=100

    def uni_values(self, data, target_type, target):
        uni = data[target].nunique()
        if uni==2 or uni==3:
            target_type['classification_score']+=30
        uni_ratio = (uni/data.shape[0])*100
        if uni_ratio > 50:
            target_type["regression_score"]+=30

    def predict_type(self, target_type):
        if target_type['classification_score'] > target_type["regression_score"]:
            target_type['problem_type'] = 'Classification'
        else:
            target_type['problem_type'] = 'Regression'

    def confidence(self, target_type):
        if target_type['problem_type'] == 'Classification':
            target_type['confidence'] = target_type['classification_score']/(target_type['classification_score']+target_type["regression_score"])
        else:
            target_type['confidence'] = target_type['regression_score']/(target_type['classification_score']+target_type["regression_score"])
        target_type['confidence']=round(target_type['confidence']*100, 2)