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
// Shared panel wrapper
// --------------------------------------------------

function Panel({ title, description, children, className = "" }) {
    return (
        <div className={`bg-[#12161D] border border-[#232933] rounded-md p-6 ${className}`}>
            <h2 className="text-lg font-semibold text-[#E6E8EB]">
                {title}
            </h2>
            {description && (
                <p className="text-sm text-[#5B6472] mt-1 mb-5">
                    {description}
                </p>
            )}
            <div className={description ? "" : "mt-4"}>
                {children}
            </div>
        </div>
    );
}

// --------------------------------------------------
// Confusion Matrix
// --------------------------------------------------

function ConfusionMatrix({ matrix }) {
    if (!Array.isArray(matrix) || matrix.length === 0) {
        return null;
    }

    const rowMaxes = matrix.map((row) =>
        Array.isArray(row) ? Math.max(...row.map((v) => Number(v) || 0), 0) : 0
    );

    return (
        <Panel
            title="Confusion Matrix"
            description="Rows are actual classes, columns are predicted classes."
        >
            <div className="overflow-x-auto">
                <table className="text-sm border-collapse min-w-[420px]">
                    <thead>
                        <tr>
                            <th className="text-left text-xs font-mono tracking-widest text-[#5B6472] uppercase p-2 border-b border-[#232933]">
                                Actual \ Predicted
                            </th>

                            {matrix[0].map((_, index) => (
                                <th
                                    key={index}
                                    className="text-xs font-mono tracking-widest text-[#5B6472] uppercase p-2 border-b border-[#232933] text-center"
                                >
                                    {index}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {matrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <th className="text-left text-xs font-mono text-[#5B6472] p-2 border-b border-[#1A1F28] whitespace-nowrap">
                                    Actual {rowIndex}
                                </th>

                                {Array.isArray(row) && row.map((value, colIndex) => {
                                    const numericValue = Number(value) || 0;
                                    const rowMax = rowMaxes[rowIndex] || 0;
                                    const intensity = rowMax > 0 ? numericValue / rowMax : 0;
                                    const isCorrect = rowIndex === colIndex;

                                    const bg = isCorrect
                                        ? `rgba(76, 175, 125, ${0.08 + intensity * 0.35})`
                                        : intensity > 0
                                            ? `rgba(224, 100, 91, ${0.06 + intensity * 0.3})`
                                            : "transparent";

                                    return (
                                        <td
                                            key={colIndex}
                                            className="text-center p-2 border-b border-[#1A1F28] font-mono text-[#E6E8EB]"
                                            style={{ backgroundColor: bg }}
                                        >
                                            {numericValue}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Panel>
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
        <Panel title="Classification Report">
            <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[480px]">
                    <thead>
                        <tr className="border-b border-[#232933] text-left">
                            <th className="py-2 pr-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase">Class</th>
                            <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">Precision</th>
                            <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">Recall</th>
                            <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">F1 Score</th>
                            <th className="py-2 pl-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">Support</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map(([label, values]) => {
                            if (!values || typeof values !== "object") {
                                return null;
                            }

                            return (
                                <tr key={label} className="border-b border-[#1A1F28] last:border-0">
                                    <td className="py-2 pr-4 text-[#E6E8EB] font-medium">
                                        {formatMetricName(label)}
                                    </td>
                                    <td className="py-2 px-4 text-right font-mono text-[#8B93A1]">
                                        {formatPercentage(values.precision)}
                                    </td>
                                    <td className="py-2 px-4 text-right font-mono text-[#8B93A1]">
                                        {formatPercentage(values.recall)}
                                    </td>
                                    <td className="py-2 px-4 text-right font-mono text-[#8B93A1]">
                                        {formatPercentage(values["f1-score"])}
                                    </td>
                                    <td className="py-2 pl-4 text-right font-mono text-[#8B93A1]">
                                        {values.support ?? "-"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Panel>
    );
}

// --------------------------------------------------
// Performance Metrics
// --------------------------------------------------

function PerformanceMetrics({ metrics }) {
    const metricEntries = metrics && typeof metrics === "object"
        ? Object.entries(metrics).filter(
            ([key]) => key !== "confusion_matrix" && key !== "classification_report"
        )
        : [];

    return (
        <Panel title="Performance Metrics" description="Evaluation metrics reported for the selected model.">
            {metricEntries.length === 0 ? (
                <p className="text-[#5B6472] text-sm">
                    No performance metrics available.
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {metricEntries.map(([key, value]) => {
                        const isPercentageMetric = [
                            "accuracy",
                            "precision",
                            "recall",
                            "f1_score",
                        ].includes(key);

                        return (
                            <div
                                key={key}
                                className="bg-[#161B24] border border-[#1F2530] rounded p-3"
                            >
                                <p className="text-xs font-mono tracking-widest text-[#5B6472] uppercase truncate">
                                    {formatMetricName(key)}
                                </p>
                                <p className="text-lg font-semibold text-[#E6E8EB] font-mono mt-1">
                                    {isPercentageMetric ? formatPercentage(value) : formatValue(value)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </Panel>
    );
}

// --------------------------------------------------
// Model Comparison Chart
// --------------------------------------------------

function ModelComparisonChart({ results, bestModelName, isClassification }) {
    const entries = Object.entries(results).filter(
        ([, result]) => result && typeof result === "object"
    );

    if (entries.length === 0) {
        return null;
    }

    const metricKey = isClassification ? "accuracy" : "rmse";

    const bars = entries
        .map(([model, result]) => ({
            model,
            value: Number(result[metricKey]),
        }))
        .filter((bar) => Number.isFinite(bar.value));

    if (bars.length === 0) {
        return null;
    }

    // For classification: higher accuracy = wider bar (scaled against the max value).
    // For regression: lower RMSE = wider bar (scaled against the min value), since
    // a lower RMSE indicates a better model and should be visually emphasized.
    const maxValue = Math.max(...bars.map((bar) => bar.value));
    const minValue = Math.min(...bars.map((bar) => bar.value));

    const getWidthPct = (value) => {
        if (isClassification) {
            return maxValue > 0 ? Math.max((value / maxValue) * 100, 2) : 0;
        }

        // Regression: normalize so the lowest RMSE (best) gets 100% width.
        if (value <= 0) {
            return minValue === 0 ? 100 : 2;
        }

        return Math.max((minValue / value) * 100, 2);
    };

    return (
        <Panel
            title={isClassification ? "Model Comparison — Accuracy" : "Model Comparison — RMSE"}
            description={isClassification ? "Higher accuracy is better." : "Lower RMSE is better — shorter bars indicate a better score."}
        >
            <div className="space-y-3">
                {bars.map(({ model, value }) => {
                    const isBest = model === bestModelName;
                    const widthPct = getWidthPct(value);

                    return (
                        <div key={model} className="w-full">
                            <div className="flex items-center justify-between mb-1">
                                <span className={`text-sm truncate pr-2 ${isBest ? "text-[#E6E8EB] font-medium" : "text-[#8B93A1]"}`}>
                                    {model}
                                </span>
                                <span className="text-sm font-mono text-[#8B93A1] shrink-0">
                                    {isClassification ? formatPercentage(value) : formatValue(value)}
                                </span>
                            </div>
                            <div className="w-full h-2 bg-[#1A1F28] rounded-sm overflow-hidden">
                                <div
                                    className={`h-full rounded-sm ${isBest ? "bg-[#5B8DEF]" : "bg-[#3A4250]"}`}
                                    style={{ width: `${widthPct}%` }}
                                    role="img"
                                    aria-label={`${model}: ${value}`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Panel>
    );
}

// --------------------------------------------------
// Model Comparison Table
// --------------------------------------------------

function ModelComparisonTable({ results, bestModelName, problemType }) {
    if (!results || typeof results !== "object") {
        return null;
    }

    const entries = Object.entries(results).filter(
        ([, result]) => result && typeof result === "object"
    );

    const isClassification = problemType === "classification";

    return (
        <Panel title="Model Comparison">
            {entries.length === 0 ? (
                <p className="text-[#5B6472] text-sm">
                    No model comparison data available.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[520px]">
                        <thead>
                            <tr className="border-b border-[#232933] text-left">
                                <th className="py-2 pr-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase">Model</th>

                                {isClassification ? (
                                    <>
                                        <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">Accuracy</th>
                                        <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">Precision</th>
                                        <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">Recall</th>
                                        <th className="py-2 pl-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">F1 Score</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">RMSE</th>
                                        <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">MSE</th>
                                        <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">MAE</th>
                                        <th className="py-2 pl-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">R² Score</th>
                                    </>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {entries.map(([model, result]) => {
                                const isBest = model === bestModelName;

                                return (
                                    <tr
                                        key={model}
                                        className={`border-b border-[#1A1F28] last:border-0 ${isBest ? "bg-[#5B8DEF]/[0.06]" : ""}`}
                                    >
                                        <td className={`py-2 pr-4 border-l-2 ${isBest ? "border-l-[#5B8DEF]" : "border-l-transparent"} pl-3`}>
                                            <div className="flex items-center gap-2">
                                                <span className={isBest ? "text-[#E6E8EB] font-medium" : "text-[#8B93A1]"}>
                                                    {model}
                                                </span>
                                                {isBest && (
                                                    <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#5B8DEF]/10 text-[#5B8DEF] border border-[#5B8DEF]/30">
                                                        Best
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {isClassification ? (
                                            <>
                                                <td className="py-2 px-4 text-right font-mono text-[#8B93A1]">{formatPercentage(result.accuracy)}</td>
                                                <td className="py-2 px-4 text-right font-mono text-[#8B93A1]">{formatPercentage(result.precision)}</td>
                                                <td className="py-2 px-4 text-right font-mono text-[#8B93A1]">{formatPercentage(result.recall)}</td>
                                                <td className="py-2 pl-4 text-right font-mono text-[#8B93A1]">{formatPercentage(result.f1_score)}</td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="py-2 px-4 text-right font-mono text-[#8B93A1]">{formatValue(result.rmse)}</td>
                                                <td className="py-2 px-4 text-right font-mono text-[#8B93A1]">{formatValue(result.mse)}</td>
                                                <td className="py-2 px-4 text-right font-mono text-[#8B93A1]">{formatValue(result.mae)}</td>
                                                <td className="py-2 pl-4 text-right font-mono text-[#8B93A1]">{formatValue(result.r2_score)}</td>
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </Panel>
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
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl font-semibold text-black">
                        Model Selection
                    </h1>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-6 mt-6">
                        <p className="text-[#8B93A1] text-sm">
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

    const isClassification = problemType === "classification";

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pb-6 border-b border-[#1F2530]">
                    <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase mb-3">
                        Model Selection
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-semibold text-[#E6E8EB] tracking-tight">
                        Model Selection
                    </h1>

                    <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                        Evaluation results and comparison across trained models.
                    </p>
                </div>

                {/* Best Model */}
                <div className="bg-[#12161D] border border-[#5B8DEF]/40 rounded-md p-6 mt-8">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                        <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase">
                            Best Model
                        </p>
                        <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded bg-[#161B24] border border-[#232933] text-[#8B93A1]">
                            {isClassification ? "Classification" : "Regression"}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[#E6E8EB]">
                            {mlResult.best_model_name || "—"}
                        </h2>

                        <div className="sm:text-right">
                            <p className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                                Score
                            </p>
                            <p className="text-2xl font-semibold text-[#5B8DEF] font-mono mt-1">
                                {isClassification
                                    ? formatPercentage(mlResult.score)
                                    : formatValue(mlResult.score)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="mt-6">
                    <PerformanceMetrics metrics={metrics} />
                </div>

                {/* Classification-specific sections */}
                {isClassification && (
                    <>
                        {metrics.confusion_matrix && (
                            <div className="mt-6">
                                <ConfusionMatrix matrix={metrics.confusion_matrix} />
                            </div>
                        )}

                        {metrics.classification_report && (
                            <div className="mt-6">
                                <ClassificationReport report={metrics.classification_report} />
                            </div>
                        )}
                    </>
                )}

                {/* Model Comparison Chart */}
                <div className="mt-6">
                    <ModelComparisonChart
                        results={results}
                        bestModelName={mlResult.best_model_name}
                        isClassification={isClassification}
                    />
                </div>

                {/* Model Comparison Table */}
                <div className="mt-6 mb-16">
                    <ModelComparisonTable
                        results={results}
                        bestModelName={mlResult.best_model_name}
                        problemType={problemType}
                    />
                </div>

            </div>
        </Layout>
    );
}

export default ModelSelection;