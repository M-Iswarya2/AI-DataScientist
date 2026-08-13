import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";

const SEVERITY_STYLES = {
    high: { bg: "bg-[#E0645B]/10", text: "text-[#E0645B]", border: "border-[#E0645B]/30" },
    critical: { bg: "bg-[#E0645B]/10", text: "text-[#E0645B]", border: "border-[#E0645B]/30" },
    medium: { bg: "bg-[#D9A441]/10", text: "text-[#D9A441]", border: "border-[#D9A441]/30" },
    warning: { bg: "bg-[#D9A441]/10", text: "text-[#D9A441]", border: "border-[#D9A441]/30" },
    low: { bg: "bg-[#4CAF7D]/10", text: "text-[#4CAF7D]", border: "border-[#4CAF7D]/30" },
    info: { bg: "bg-[#4CAF7D]/10", text: "text-[#4CAF7D]", border: "border-[#4CAF7D]/30" }
};

function severityStyle(severity) {
    if (typeof severity !== "string") return null;
    return SEVERITY_STYLES[severity.toLowerCase()] || null;
}

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

function OutlierBar({ column, percentage, maxPercentage }) {
    const numericValue = Number(percentage) || 0;
    const widthPct = maxPercentage > 0
        ? Math.max((numericValue / maxPercentage) * 100, 2)
        : 0;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[#E6E8EB] truncate pr-2">
                    {column}
                </span>
                <span className="text-sm font-mono text-[#8B93A1] shrink-0">
                    {numericValue}%
                </span>
            </div>

            <div className="w-full h-2 bg-[#1A1F28] rounded-sm overflow-hidden">
                <div
                    className="h-full bg-[#D9A441] rounded-sm"
                    style={{ width: `${widthPct}%` }}
                    role="img"
                    aria-label={`${column}: ${numericValue}% outliers`}
                />
            </div>
        </div>
    );
}

function OutlierAnalysis() {

    const { analysis } = useAnalysis();

    if (!analysis) {

        return (
            <Layout>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl font-semibold text-[#E6E8EB]">
                        No Dataset Uploaded
                    </h1>

                    <p className="text-[#8B93A1] mt-2">
                        Upload a dataset from Dashboard first.
                    </p>
                </div>
            </Layout>
        );

    }

    const outlier = analysis.outlier_analysis || {};

    const outlierSummary =
        outlier.outlier_summary &&
        typeof outlier.outlier_summary === "object"
            ? outlier.outlier_summary
            : {};

    const summaryEntries = Object.entries(outlierSummary);

    const sortedSummary = [...summaryEntries].sort(
        (a, b) => (Number(b[1]?.outlier_percentage) || 0) - (Number(a[1]?.outlier_percentage) || 0)
    );

    const maxPercentage = sortedSummary.length > 0
        ? Math.max(...sortedSummary.map(([, value]) => Number(value?.outlier_percentage) || 0))
        : 0;

    const insights = Array.isArray(outlier.ai_insights) ? outlier.ai_insights : [];

    const hasOutliers = summaryEntries.length > 0;

    return (

        <Layout>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pb-6 border-b border-[#1F2530]">
                    <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase mb-3">
                        Outlier Analysis
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
                        Outlier Analysis
                    </h1>

                    <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                        Detected outliers across numerical features, calculated using the IQR method.
                    </p>
                </div>

                {/* Summary stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Total Outliers
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {outlier.total_outliers || 0}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Highest Outlier Column
                        </h2>
                        <p className="text-2xl font-semibold text-[#E6E8EB] mt-3 truncate">
                            {outlier.highest_outlier_column || "N/A"}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Highest Outlier Percentage
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {outlier.highest_outlier_details?.outlier_percentage ?? 0}%
                        </p>
                    </div>

                </div>

                {/* Outlier Visualization */}
                <div className="mt-6">
                    <Panel
                        title="Outlier Percentage by Feature"
                        description="Share of records flagged as outliers per column."
                    >
                        {!hasOutliers ? (

                            <p className="text-[#4CAF7D] text-sm">
                                No outliers detected.
                            </p>

                        ) : (

                            <div className="space-y-3">
                                {sortedSummary.map(([column, value]) => (
                                    <OutlierBar
                                        key={column}
                                        column={column}
                                        percentage={value?.outlier_percentage}
                                        maxPercentage={maxPercentage}
                                    />
                                ))}
                            </div>

                        )}
                    </Panel>
                </div>

                {/* Feature-wise Outliers Table */}
                <div className="mt-6">
                    <Panel title="Feature-wise Outliers">

                        {!hasOutliers ? (

                            <p className="text-[#5B6472] text-sm">
                                No outliers detected.
                            </p>

                        ) : (

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm min-w-[420px]">
                                    <thead>
                                        <tr className="border-b border-[#232933] text-left">
                                            <th className="py-2 pr-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase">
                                                Feature
                                            </th>
                                            <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">
                                                Outlier Count
                                            </th>
                                            <th className="py-2 pl-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">
                                                Percentage
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedSummary.map(([column, value]) => (
                                            <tr key={column} className="border-b border-[#1A1F28] last:border-0">
                                                <td className="py-2 pr-4 text-[#E6E8EB] font-medium">
                                                    {column}
                                                </td>
                                                <td className="py-2 px-4 text-right font-mono text-[#8B93A1]">
                                                    {value?.outlier_count ?? "-"}
                                                </td>
                                                <td className="py-2 pl-4 text-right font-mono text-[#8B93A1]">
                                                    {value?.outlier_percentage ?? "-"}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        )}

                    </Panel>
                </div>

                {/* AI Insights */}
                <div className="mt-6 mb-16">
                    <Panel title="AI Insights">

                        {insights.length === 0 ? (

                            <p className="text-[#5B6472] text-sm">
                                No AI insights available.
                            </p>

                        ) : (

                            <div className="space-y-3">
                                {insights.map((insight, index) => {

                                    const style = severityStyle(insight?.severity);

                                    return (
                                        <div
                                            key={index}
                                            className="border border-[#232933] rounded-md p-4"
                                        >
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <span className="text-sm font-medium text-[#E6E8EB]">
                                                    {insight?.category ?? "Uncategorized"}
                                                </span>

                                                {insight?.severity !== undefined && insight?.severity !== null && (
                                                    <span
                                                        className={
                                                            style
                                                                ? `text-xs font-mono px-2 py-0.5 rounded border ${style.bg} ${style.text} ${style.border} shrink-0`
                                                                : "text-xs font-mono px-2 py-0.5 rounded border bg-[#161B24] text-[#8B93A1] border-[#232933] shrink-0"
                                                        }
                                                    >
                                                        {String(insight.severity)}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-sm text-[#8B93A1]">
                                                {insight?.insight ?? "No description provided."}
                                            </p>
                                        </div>
                                    );

                                })}
                            </div>

                        )}

                    </Panel>
                </div>

            </div>

        </Layout>

    );

}

export default OutlierAnalysis;