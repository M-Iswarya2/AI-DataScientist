import matplotlib.pyplot as plt
from pandas.api.types import is_numeric_dtype

class LinePlot:
    def line_plot(self, data, fea1, fea2):
        if fea1 == fea2:
            raise ValueError("Both features are the same. Please select two different numeric features for the line plot.")
        if is_numeric_dtype(data[fea1]) and is_numeric_dtype(data[fea2]):
            if data[fea1].isnull().any() or data[fea2].isnull().any():
                raise ValueError("Input features contain NaN values. Please handle missing values before plotting.")
            temp = data[[fea1, fea2]].sort_values(by=fea1, ascending=True)
            fea1 = temp[fea1]
            fea2 = temp[fea2]
            fig, ax = plt.subplots()
            ax.plot(fea1, fea2)
            ax.set_xlabel(fea1.name)
            ax.set_ylabel(fea2.name)
            ax.set_title(f'Line Plot of {fea1.name} vs {fea2.name}')
            fig.tight_layout()
            return fig
        else:
            raise ValueError("Both features must be numeric to create a Line plot.") 