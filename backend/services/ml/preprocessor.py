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


    def fit(self, df, feature_analysis, target): 
        self.target = target                                   #this is for fitting missing values and also
        X = df.drop(columns=[self.target], errors="ignore").copy()                   # scaling numerical features and encoding categorical features
        self.numeric_cols = [col for col in feature_analysis['numeric'] if col in X.columns]
        self.categorical_cols = [col for col in feature_analysis['categorical'] if col in X.columns]

        self.fit_missing_values(X)
        self.transform_missing_values(X)
        self.fit_scaler_encoder(X)

    def transform(self, df):
        X = df.drop(columns=[self.target], errors="ignore").copy()
        self.transform_missing_values(X)
        self.transform_scaler_encoder(X)
        return X

    def fit_missing_values(self, X):
        for col in self.numeric_cols:
            self.numeric_fill_values[col] = X[col].mean()
        for col in self.categorical_cols:
            self.categorical_fill_values[col] = X[col].mode()[0]

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

        if self.categorical_cols:
            self.encoder = OrdinalEncoder()
            self.encoder.fit(X[self.categorical_cols])

    def transform_scaler_encoder(self, X):
        if self.numeric_cols and self.scaler is not None:
            X[self.numeric_cols] = self.scaler.transform(X[self.numeric_cols])

        if self.categorical_cols and self.encoder is not None:
            X[self.categorical_cols] = self.encoder.transform(X[self.categorical_cols])


    def fit_transform(self, df, feature_analysis, target):
        self.fit(df, feature_analysis, target)
        return self.transform(df)