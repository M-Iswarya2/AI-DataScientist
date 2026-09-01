import matplotlib.pyplot as plt
from pandas.api.types import is_numeric_dtype

class BoxPlot:
    def box_plot(self, data, feature):
        if not is_numeric_dtype(data[feature]):
            raise ValueError("The selected feature must be numeric to create a box plot.")
        
        fig, ax = plt.subplots()
        ax.boxplot(data[feature].dropna())
        ax.set_xlabel(feature)
        ax.set_ylabel('Values')
        ax.set_title(f'Box Plot of {feature}')
        fig.tight_layout()
        return fig