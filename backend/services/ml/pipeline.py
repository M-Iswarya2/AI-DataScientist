from services.ml.preprocessor import Preprocessor
from services.ml.model_factory import ModelFactory
from services.ml.trainer import Trainer
from services.ml.evaluator import Evaluator
from services.ml.model_selection import ModelSelection


from sklearn.model_selection import train_test_split


class Pipeline:
    def __init__(self):
        self.preprocessor = Preprocessor()
        self.model_factory = ModelFactory()
        self.trainer = Trainer()
        self.evaluator = Evaluator()
        self.model_selection = ModelSelection()

    def run(self, df, feature_analysis, target, problem_type):
        df = df.dropna(subset=[target]) #drop rows where target is null or na.. 

        X_train, X_test, y_train, y_test = train_test_split(df.drop(columns=[target], errors="ignore"), df[target], test_size=0.2, random_state=42)
        X_train = self.preprocessor.fit_transform(X_train, feature_analysis, target)
        X_test = self.preprocessor.transform(X_test)

        models = self.model_factory.get_models(problem_type)
        print("PROBLEM TYPE:", problem_type)
        print("MODELS:", models)
        trained_models = self.trainer.train(models, X_train, y_train)
        results = self.evaluator.evaluate(trained_models, X_test, y_test, problem_type)
        print("TRAINED MODELS:", trained_models)
        print("RESULTS:", results)
        best_model = self.model_selection.select_best_model(results, problem_type)
        return {
                "best_model_name": best_model["best_model_name"],
                "best_model_metrics": best_model["best_model_metrics"],
                "score": best_model["score"],
                "results": results,
                "preprocessing": {
                    **self.preprocessor.preprocessing_info,
                    "train_shape": list(X_train.shape),
                    "test_shape": list(X_test.shape),
                    "target_column": target,
                    "problem_type": problem_type
                }
            }