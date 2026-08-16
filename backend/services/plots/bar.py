import matplotlib.pyplot as plt
from pandas.api.types import is_numeric_dtype

from services.type_detection import TypeDetection

type_detector = TypeDetection()

class Bar:
    def type_of_col(self,data,fea1):
        a = type_detector.type_detection(data,fea1)
        if a["classification_score"] > a["regression_score"]:
            return "categorical"
        else:
            return "numerical"

    def bar_plot(self, data, fea1, fea2):
        if fea1 == fea2:
            raise ValueError("Both features are the same. Please select two different features for the bar plot.")
        if self.type_of_col(data, fea1) == "numerical" and self.type_of_col(data, fea2) == "categorical":
            fea1, fea2 = fea2, fea1  # Swap to ensure fea1 is categorical and fea2 is numeric
        if self.type_of_col(data, fea1) == "categorical" and self.type_of_col(data, fea2) == "numerical":
            if data[fea1].isnull().any() or data[fea2].isnull().any():
                raise ValueError("Input features contain NaN values. Please handle missing values before plotting.")

            grouped = data.groupby(fea1)[fea2].mean().reset_index()

            fig, ax = plt.subplots()
            ax.bar(grouped[fea1], grouped[fea2])
            ax.set_xlabel(fea1)
            ax.set_ylabel(fea2)
            ax.set_title(f'Bar Plot of {fea1} vs {fea2}')
            fig.tight_layout()
            return fig
        else:
            raise ValueError("One feature must be categorical and the other must be numeric to create a bar plot.")