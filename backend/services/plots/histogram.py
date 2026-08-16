import matplotlib.pyplot as plt
from pandas.api.types import is_numeric_dtype

class Histogram:
    def histogram_plot(self, data, feature):
        if not is_numeric_dtype(data[feature]):
            raise ValueError("The selected feature must be numeric to create a histogram.")
        if data[feature].isnull().any():
            raise ValueError("Input feature contains NaN values. Please handle missing values before plotting.")
        
        fig, ax = plt.subplots()
        ax.hist(data[feature], bins=30, edgecolor='black')
        ax.set_xlabel(feature)
        ax.set_ylabel('Frequency')
        ax.set_title(f'Histogram of {feature}')
        fig.tight_layout()
        return fig