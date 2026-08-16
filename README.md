# AI Data Scientist

AI Data Scientist is a web application for working with datasets through the complete data science workflow.

A dataset can be uploaded and explored through data analysis, statistics, feature analysis, relationship analysis, outlier detection, preprocessing, machine learning, model evaluation, and visualization. AI-based insights are also included to help with understanding the dataset and the results.

The application is designed to keep the different stages of the workflow visible instead of treating the whole process as a black box.

---

## Features

### Dataset Analysis

After uploading a CSV dataset, the application provides information about:

- Dataset size
- Column names and data types
- Numerical features
- Categorical features
- Missing values
- Constant columns
- High-cardinality columns
- Basic dataset statistics

### Data Quality

Checks the dataset for common issues such as:

- Missing values
- Constant features
- High-cardinality features
- Other potential data-quality problems

### Statistics

Provides statistical information for numerical features, including:

- Mean
- Median
- Standard deviation
- Minimum and maximum values
- Quartiles
- Correlation matrix
- Highly correlated feature pairs

### Relationship Analysis

Examines relationships between features to help identify patterns and possible dependencies in the dataset.

### Outlier Detection

Numerical features are checked for outliers using the IQR method.

### Target Detection

The application can identify a possible target column from the dataset, while also allowing the user to select the target manually.

### Type Detection

The target is analyzed to determine whether the problem is more suitable for:

- Classification
- Regression

The detection uses factors such as:

- Data type
- Number of unique values
- Unique-value ratio
- Classification score
- Regression score

A confidence score is also calculated from the resulting scores.

---

## Machine Learning

The machine learning pipeline supports both classification and regression.

### Classification Models

- Logistic Regression
- Random Forest Classifier
- Support Vector Classifier
- Decision Tree Classifier
- K-Nearest Neighbors Classifier

### Regression Models

- Linear Regression
- Random Forest Regressor
- Support Vector Regression
- Decision Tree Regressor
- K-Nearest Neighbors Regressor

Multiple models are trained and evaluated, and the best-performing model is selected based on the problem type.

---

## Preprocessing

### Numerical Features

- Missing values are handled using mean imputation
- StandardScaler is used for scaling

### Categorical Features

- Missing values are handled using mode imputation
- OrdinalEncoder is used for encoding
- Unknown categories are handled during transformation

The preprocessing information is also displayed so the transformations applied to the dataset can be inspected.

---

## Model Evaluation

### Classification

The following metrics are reported:

- Accuracy
- Precision
- Recall
- F1 Score

### Regression

The following metrics are reported:

- Mean Squared Error (MSE)
- Mean Absolute Error (MAE)
- Root Mean Squared Error (RMSE)
- R² Score

The results of all trained models can be compared before selecting the best model.

---

## Visualization

The visualization section currently supports:

| Plot | Input |
|------|-------|
| Scatter Plot | Two numerical features |
| Line Plot | Two numerical features |
| Bar Plot | One categorical + one numerical feature |
| Histogram | One numerical feature |
| Box Plot | One numerical feature |
| Correlation Heatmap | Numerical features |

The application checks the feature types before generating a plot.

For example, a column containing `0` and `1` may be stored as an integer by pandas, but it can still represent a categorical feature. Feature-type detection is used to handle such cases rather than relying only on the pandas datatype.

Plots are generated on the backend using Matplotlib and displayed in the React frontend.

---

## AI Insights

AI-based insights are included as another part of the analysis workflow.

They can help highlight things such as:

- Missing-value patterns
- Potential data-quality issues
- Interesting observations
- Patterns that may need further investigation

The AI insights are provided alongside the normal analysis rather than replacing it.

---

## Application Workflow

```text
Upload Dataset
      ↓
Dataset Summary
      ↓
Data Quality
      ↓
Feature Analysis
      ↓
Statistics
      ↓
Relationship Analysis
      ↓
Outlier Analysis
      ↓
Target Detection
      ↓
Type Detection
      ↓
Preprocessing
      ↓
Model Training
      ↓
Model Evaluation
      ↓
Model Selection
      ↓
Visualization
      ↓
AI Insights
