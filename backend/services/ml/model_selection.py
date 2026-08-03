class ModelSelection:
    def select_best_model(self, results, problem_type):
        if problem_type == "classification":
            best_model = max(results.items(), key=lambda x: x[1]["accuracy"])
        else:
            best_model = min(results.items(), key=lambda x: x[1]["rmse"])


        return {
            'best_model_name': best_model[0],
            'best_model_metrics': best_model[1],
            'score' : best_model[1]["accuracy"] if problem_type == "classification" else best_model[1]["rmse"]
        }

        