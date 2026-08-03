from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier

from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
from sklearn.tree import DecisionTreeRegressor
from sklearn.neighbors import KNeighborsRegressor


class ModelFactory:
    def get_models(self, target_type):
        if target_type == "classification":
            return {
                "Logistic Regression": LogisticRegression(max_iter=1000),
                "Random Forest Classifier": RandomForestClassifier(random_state=42),
                "SVC": SVC(probability=True),
                "Decision Tree Classifier": DecisionTreeClassifier(random_state=42),
                "KNeighbors Classifier": KNeighborsClassifier()
            }
        elif target_type == "regression":
            return {
                "Linear Regression": LinearRegression(),
                "Random Forest Regressor": RandomForestRegressor(random_state=42),
                "SVR": SVR(),
                "Decision Tree Regressor": DecisionTreeRegressor(),
                "KNeighbors Regressor": KNeighborsRegressor()
            }
        else:
            raise ValueError("Invalid target type. Must be 'classification' or 'regression'.")