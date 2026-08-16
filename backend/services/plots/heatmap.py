import matplotlib.pyplot as plt

class Heatmap:
    def __init__(self):
        pass

    def heat_map(self, data):
        corr = data.corr(numeric_only=True)
        fig, ax = plt.subplots()
        im = ax.imshow(corr, cmap="coolwarm")
        fig.colorbar(im, ax=ax)
        ax.set_xticks(range(len(corr.columns)))
        ax.set_yticks(range(len(corr.columns)))
        ax.set_xticklabels(corr.columns, rotation=45, ha="right")
        ax.set_yticklabels(corr.columns)
        fig.tight_layout()

        return fig