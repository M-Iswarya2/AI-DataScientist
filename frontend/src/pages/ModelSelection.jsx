
import { useAnalysis } from "../context/AnalysisContext";
import Layout from "../components/Layout";

// --------------------------------------------------
// Formatting helpers
// --------------------------------------------------

function formatValue(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value.toFixed(4);
    }

    if (value === null || value === undefined) {
        return "-";
    }

    return String(value);
}

function formatPercentage(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return `${(value * 100).toFixed(2)}%`;
    }

    return "-";
}

function formatMetricName(key) {
    return key
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

// --------------------------------------------------
// Confusion Matrix
// --------------------------------------------------

function ConfusionMatrix({ matrix }) {
    if (!Array.isArray(matrix) || matrix.length === 0) {
        return null;
    }

    return (
        <div className="card">
            <h2>Confusion Matrix</h2>

            <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Predicted</th>

                            {matrix[0].map((_, index) => (
                                <th key={index}>
                                    Predicted {index}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {matrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <th>
                                    Actual {rowIndex}
                                </th>

                                {row.map((value, colIndex) => (
                                    <td key={colIndex}>
                                        <strong>{value}</strong>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --------------------------------------------------
// Classification Report
// --------------------------------------------------

function ClassificationReport({ report }) {
    if (!report || typeof report !== "object") {
        return null;
    }

    const rows = Object.entries(report);

    return (
        <div className="card">
            <h2>Classification Report</h2>

            <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Precision</th>
                            <th>Recall</th>
                            <th>F1 Score</th>
                            <th>Support</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map(([label, values]) => {
                            if (!values || typeof values !== "object") {
                                return null;
                            }

                            return (
                                <tr key={label}>
                                    <td>
                                        <strong>
                                            {formatMetricName(label)}
                                        </strong>
                                    </td>

                                    <td>
                                        {formatPercentage(
                                            values.precision
                                        )}
                                    </td>

                                    <td>
                                        {formatPercentage(
                                            values.recall
                                        )}
                                    </td>

                                    <td>
                                        {formatPercentage(
                                            values["f1-score"]
                                        )}
                                    </td>

                                    <td>
                                        {values.support ?? "-"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --------------------------------------------------
// Performance Metrics
// --------------------------------------------------

function PerformanceMetrics({ metrics }) {
    if (!metrics || typeof metrics !== "object") {
        return null;
    }

    const metricEntries = Object.entries(metrics).filter(
        ([key]) =>
            key !== "confusion_matrix" &&
            key !== "classification_report"
    );

    return (
        <div className="card">
            <h2>Performance Metrics</h2>

            <table className="data-table">
                <tbody>
                    {metricEntries.map(([key, value]) => {
                        const isPercentageMetric = [
                            "accuracy",
                            "precision",
                            "recall",
                            "f1_score",
                        ].includes(key);

                        return (
                            <tr key={key}>
                                <td>
                                    <strong>
                                        {formatMetricName(key)}
                                    </strong>
                                </td>

                                <td>
                                    {isPercentageMetric
                                        ? formatPercentage(value)
                                        : formatValue(value)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

// --------------------------------------------------
// Model Comparison
// --------------------------------------------------

function ModelComparison({
    results,
    bestModelName,
    problemType,
}) {
    if (!results || typeof results !== "object") {
        return null;
    }

    const isClassification =
        problemType === "classification";

    return (
        <div className="card">
            <h2>Model Comparison</h2>

            <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Model</th>

                            {isClassification ? (
                                <>
                                    <th>Accuracy</th>
                                    <th>Precision</th>
                                    <th>Recall</th>
                                    <th>F1 Score</th>
                                </>
                            ) : (
                                <>
                                    <th>RMSE</th>
                                    <th>MSE</th>
                                    <th>MAE</th>
                                    <th>R² Score</th>
                                </>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(results).map(
                            ([model, result]) => {
                                if (
                                    !result ||
                                    typeof result !== "object"
                                ) {
                                    return null;
                                }

                                const isBest =
                                    model === bestModelName;

                                return (
                                    <tr key={model}>
                                        <td>
                                            <strong>
                                                {isBest ? "🏆 " : ""}
                                                {model}
                                            </strong>
                                        </td>

                                        {isClassification ? (
                                            <>
                                                <td>
                                                    {formatPercentage(
                                                        result.accuracy
                                                    )}
                                                </td>

                                                <td>
                                                    {formatPercentage(
                                                        result.precision
                                                    )}
                                                </td>

                                                <td>
                                                    {formatPercentage(
                                                        result.recall
                                                    )}
                                                </td>

                                                <td>
                                                    {formatPercentage(
                                                        result.f1_score
                                                    )}
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    {formatValue(
                                                        result.rmse
                                                    )}
                                                </td>

                                                <td>
                                                    {formatValue(
                                                        result.mse
                                                    )}
                                                </td>

                                                <td>
                                                    {formatValue(
                                                        result.mae
                                                    )}
                                                </td>

                                                <td>
                                                    {formatValue(
                                                        result.r2_score
                                                    )}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --------------------------------------------------
// Main Component
// --------------------------------------------------

function ModelSelection() {
    const { mlResult } = useAnalysis();

    // No ML result yet
    if (!mlResult) {
        return (
            <Layout>
                <div className="page-container">
                    <h1>Model Selection</h1>

                    <div className="card">
                        <p>
                            Please train a model first.
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }

    const metrics = mlResult.metrics || {};
    const results = mlResult.results || {};

    // --------------------------------------------------
    // Problem Type
    // --------------------------------------------------
    // Priority:
    // 1. preprocessing.problem_type
    // 2. problem_type
    // 3. problemType
    // 4. regression
    // --------------------------------------------------

    const problemType =
        mlResult.preprocessing?.problem_type ||
        mlResult.problem_type ||
        mlResult.problemType ||
        "regression";

    const isClassification =
        problemType === "classification";

    return (
        <Layout>
            <div className="page-container">

                <h1>Model Selection</h1>

                {/* -------------------------------- */}
                {/* Best Model */}
                {/* -------------------------------- */}

                <div className="card">
                    <h2>🏆 Best Model</h2>

                    <h3>
                        {mlResult.best_model_name || "-"}
                    </h3>

                    <p>
                        <strong>Score:</strong>{" "}

                        {isClassification
                            ? formatPercentage(
                                  mlResult.score
                              )
                            : formatValue(
                                  mlResult.score
                              )}
                    </p>
                </div>

                {/* -------------------------------- */}
                {/* Performance Metrics */}
                {/* -------------------------------- */}

                <PerformanceMetrics
                    metrics={metrics}
                />

                {/* -------------------------------- */}
                {/* Classification-specific sections */}
                {/* -------------------------------- */}

                {isClassification && (
                    <>
                        {/* Confusion Matrix */}

                        {metrics.confusion_matrix && (
                            <ConfusionMatrix
                                matrix={
                                    metrics.confusion_matrix
                                }
                            />
                        )}

                        {/* Classification Report */}

                        {metrics.classification_report && (
                            <ClassificationReport
                                report={
                                    metrics.classification_report
                                }
                            />
                        )}
                    </>
                )}

                {/* -------------------------------- */}
                {/* Model Comparison */}
                {/* -------------------------------- */}

                <ModelComparison
                    results={results}
                    bestModelName={
                        mlResult.best_model_name
                    }
                    problemType={problemType}
                />

            </div>
        </Layout>
    );
}

export default ModelSelection;

