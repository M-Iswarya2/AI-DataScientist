from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error, root_mean_squared_error
from sklearn.metrics import classification_report, confusion_matrix, f1_score, precision_score, recall_score, accuracy_score

class Evaluator:
    def evaluate(self, models, X_test, y_test, problem_type):
        results = {}
        if problem_type == "classification":
            for model_name, model in models.items():
                y_pred = model.predict(X_test)
                accuracy = accuracy_score(y_test, y_pred)
                precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
                recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
                f1 = f1_score(y_test, y_pred, average='weighted',
                                    zero_division=0)
                results[model_name] = {
                    "accuracy": accuracy,
                    "precision": precision,
                    "recall": recall,
                    "f1_score": f1,
                    "confusion_matrix": confusion_matrix(y_test, y_pred).tolist(),
                    "classification_report": classification_report(y_test, y_pred, output_dict=True, zero_division=0),
                }

        else:
            for model_name, model in models.items():
                y_pred = model.predict(X_test)
                mse = mean_squared_error(y_test, y_pred)
                r2 = r2_score(y_test, y_pred)
                mae = mean_absolute_error(y_test, y_pred)
                rmse = root_mean_squared_error(y_test, y_pred)

                results[model_name] = {
                    "mse": mse,
                    "r2_score": r2,
                    "mae": mae,
                    "rmse": rmse
                }
        return results