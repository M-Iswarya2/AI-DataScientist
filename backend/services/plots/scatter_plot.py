import matplotlib.pyplot as plt
from pandas.api.types import is_numeric_dtype

class ScatterPlot:
    def scatter_plot(self, data, fea1, fea2):
        if fea1 == fea2:
            raise ValueError("Both features are the same. Please select two different numeric features for the scatter plot.")
        fea1 = data[fea1]
        fea2 = data[fea2]
        if is_numeric_dtype(fea1) and is_numeric_dtype(fea2):
            if fea1.isnull().any() or fea2.isnull().any():
                raise ValueError("Input features contain NaN values. Please handle missing values before plotting.")
            fig, ax = plt.subplots()
            ax.scatter(fea1, fea2)
            ax.set_xlabel(fea1.name)
            ax.set_ylabel(fea2.name)
            ax.set_title(f'Scatter Plot of {fea1.name} vs {fea2.name}')
            fig.tight_layout()
            return fig
        else:
            raise ValueError("Both features must be numeric to create a scatter plot.")