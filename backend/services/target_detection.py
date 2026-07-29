class TargetDetection:
    def target_detection(self, fa, missing_values, rows): #from data_quality , dataset_summary
        target_scores = {}
        self.keyword_score(target_scores, fa)
        self.position_score( target_scores, fa)
        self.identifier_penalty(target_scores, fa)
        self.missing_values(target_scores, missing_values, rows)
        self.high_card_and_const(target_scores, fa)
        best_target = self.best_target(target_scores)
        return target_scores,best_target

    def keyword_score(self, target_scores, fa):
        for col in fa['column_info'].keys():
            target_scores[col]={}
            target_scores[col]['points'] = 0
            target_scores[col]['reasons'] = []
            keywords = {"target", "label", "class", "species", "outcome", "diagnosis", "price", "salary", "income", "medv", "survived", "churn", "default", "fraud", "quality", "score"}
            #using keywords
            if any(keyword in col.lower() for keyword in keywords):
                target_scores[col]['points'] = 10
                target_scores[col]['reasons'].append('Column name matches common target keywords.')
            else:
                target_scores[col]['points'] = 0

    def position_score(self, target_scores, fa):
        last_column = list(fa["column_info"].keys())[-1]
        target_scores[last_column]['points']+=5
        target_scores[last_column]['reasons'].append('Column is the last column in the dataset.')

    def identifier_penalty(self, target_scores, fa):
        identifiers = {"id", "index", "uuid", "customer_id", "invoice_no", "serial_no", "roll_number", "email", "phone", "mobile", "name", "address"}
        for col in fa['column_info'].keys():
            if any(identifier in col.lower() for identifier in identifiers):
                target_scores[col]['points'] -= 10
                target_scores[col]['reasons'].append('Column name matches common identifier patterns.')

    def missing_values(self, target_scores, missing_values, rows):
        for index, value in  missing_values.items():
            if (value/rows)*100 > 30:
                target_scores[index]['points']-=10
                target_scores[index]['reasons'].append(f'There are {(value/rows)*100:.2f} percent missing values so not likely target')

    def high_card_and_const(self, target_scores, fa):
        for const_col in fa["constant_columns"]:
            target_scores[const_col]['points'] -= 100
            target_scores[const_col]['reasons'].append('The column has only 1 unique value so not likely target')
        for high_card in fa['high_cardinality_columns']:
            target_scores[high_card]['points'] -= 5 
            target_scores[high_card]['reasons'].append('High cardinality makes this column less likely to be the target.')
        return target_scores

    def best_target(self,target_scores):
        maxi, maxi_col = None, None
        for index, value in target_scores.items():
            if maxi is None:
                maxi = value['points']
                maxi_col = index
            else:
                if value['points'] > maxi:
                    maxi = value['points']
                    maxi_col = index
        return maxi_col