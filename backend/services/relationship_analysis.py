class RelationshipAnalysis:
    def analyze_relationship(self, correlation_matrix, target):
        if target not in correlation_matrix:
            return {
                    "status": "not_applicable",
                    "reason": "The detected target is categorical, so Pearson correlation with the target is not applicable."
                    }
        target_correlations = correlation_matrix[target]
        relationships = []
        positive_relationships = []
        negative_relationships =[]
        strong_relationships = 0
        weak_relationships = 0
        for index, value in target_correlations.items():
            if index == target:
                continue
            relations = {
                        "target" : target,
                        "feature" : index, 
                        'correlation' : value,
                        'relationship_strength' : self.get_relationship_strength(value)
                        }
            relationships.append(relations)
            if value>0:
                positive_relationships.append(relations)
            elif value<0:
                negative_relationships.append(relations)
            if abs(value)>=0.8:
                strong_relationships+=1
            elif abs(value)<0.2:
                weak_relationships+=1
        relationships = sorted(relationships, key=lambda x: abs(x["correlation"]), reverse=True)
        relationship_summary = {
                                "total_relationships": len(relationships),
                                "positive_relationships": len(positive_relationships),
                                "negative_relationships": len(negative_relationships),
                                "strong_relationships": strong_relationships,
                                "weak_relationships": weak_relationships
                                    }
        return {
                "relationships": relationships,
                "strongest_relationship" : relationships[0],
                "weakest_relationship" : relationships[-1],
                'positive_relationships' : positive_relationships,
                'negative_relationships' : negative_relationships,
                'top_relationships' : relationships[:5],
                'relationship_summary' : relationship_summary
                }

    def get_relationship_strength(self,corr_value):
        if 0.8 <= corr_value <= 1.0:
            relationship = "Very Strong Positive"
        elif 0.5 <= corr_value < 0.8:
            relationship = "Moderate Positive"
        elif 0.2 <= corr_value < 0.5:
            relationship = "Weak Positive"
        elif -0.2 <= corr_value < 0.2:
            relationship = "Very Weak/No Relationship"
        elif -0.5 <= corr_value < -0.2:
            relationship = "Weak Negative"
        elif -0.8 <= corr_value < -0.5:
            relationship = "Moderate Negative"
        elif -1.0 <= corr_value < -0.8:
            relationship = "Very Strong Negative"
        else:
            relationship = "Invalid Correlation Value"
        return relationship
