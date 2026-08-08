import pandas as pd
import numpy as np
from sklearn.preprocessing import OrdinalEncoder
from sklearn.preprocessing import StandardScaler

class Preprocessor:
    def __init__(self):
        self.numeric_fill_values = {}
        self.categorical_fill_values = {}
        self.scaler = None
        self.encoder = None

        self.preprocessing_info = {
                                    "missing_value_handling": {},
                                    "scaling": None,
                                    "encoding": None,
                                    "numeric_columns": [],
                                    "categorical_columns": []
                                    }
    def reset(self):
        self.numeric_fill_values = {}
        self.categorical_fill_values = {}
        self.scaler = None
        self.encoder = None

        self.preprocessing_info = {
            "missing_value_handling": {},
            "scaling": None,
            "encoding": None,
            "numeric_columns": [],
            "categorical_columns": []
        }

    def fit(self, df, feature_analysis, target): 
        self.reset()  # Reset the preprocessor state before fitting
        self.target = target                                   #this is for fitting missing values and also
        X = df.drop(columns=[self.target], errors="ignore").copy() 
        allowed_columns = (
            feature_analysis["numeric"] +
            feature_analysis["categorical"]
        )

        X = X[[col for col in allowed_columns if col in X.columns]]       
                   # scaling numerical features and encoding categorical features
        self.numeric_cols = [col for col in feature_analysis['numeric'] if col in X.columns]
        self.categorical_cols = [col for col in feature_analysis['categorical'] if col in X.columns]

        self.preprocessing_info["numeric_columns"] = self.numeric_cols
        self.preprocessing_info["categorical_columns"] = self.categorical_cols

        self.fit_missing_values(X)
        self.transform_missing_values(X)
        self.fit_scaler_encoder(X)

    def transform(self, df):
        X = df.drop(columns=[self.target], errors="ignore").copy()
        allowed_columns = (
                    self.numeric_cols +
                    self.categorical_cols
                )

        X = X[[col for col in allowed_columns if col in X.columns]]
        self.transform_missing_values(X)
        self.transform_scaler_encoder(X)
        return X

    def fit_missing_values(self, X):
        for col in self.numeric_cols:
            self.numeric_fill_values[col] = X[col].mean()

            self.preprocessing_info["missing_value_handling"][col] = {
                                                    "method": "Mean Imputation",
                                                    "value": float(self.numeric_fill_values[col])
                                                        }
        
        for col in self.categorical_cols:
            self.categorical_fill_values[col] = X[col].mode()[0]
            self.preprocessing_info["missing_value_handling"][col] = {
                                                    "method": "Mode Imputation",
                                                    "value": self.categorical_fill_values[col] }

    def transform_missing_values(self, X):
        for col in self.numeric_cols:
            if col in self.numeric_fill_values:
                X[col] = X[col].fillna(self.numeric_fill_values[col])
        for col in self.categorical_cols:
            if col in self.categorical_fill_values:
                X[col] = X[col].fillna(self.categorical_fill_values[col])
    

    def fit_scaler_encoder(self, X):
        if self.numeric_cols:
            self.scaler = StandardScaler()
            self.scaler.fit(X[self.numeric_cols])
            self.preprocessing_info["scaling"] = "StandardScaler"

        if self.categorical_cols:
            self.encoder = OrdinalEncoder(
                        handle_unknown="use_encoded_value",
                        unknown_value=-1
                    )
            self.encoder.fit(X[self.categorical_cols])
            self.preprocessing_info["encoding"] = "OrdinalEncoder"

    def transform_scaler_encoder(self, X):
        if self.numeric_cols and self.scaler is not None:
            X[self.numeric_cols] = self.scaler.transform(X[self.numeric_cols])

        if self.categorical_cols and self.encoder is not None:
            X[self.categorical_cols] = self.encoder.transform(X[self.categorical_cols])


    def fit_transform(self, df, feature_analysis, target):
        self.fit(df, feature_analysis, target)
        return self.transform(df)