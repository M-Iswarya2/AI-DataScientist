class Trainer:
    def train(self,models, X_train, y_train):
        trained_models = {}
        for model_name, model in models.items():
            try:
                model.fit(X_train, y_train)
                trained_models[model_name] = model
            except Exception as e:
                print(f"Error occurred while training {model_name}: {e}")
        return trained_models