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

function FeatureAnalysis() {
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

    const feature = analysis.feature_analysis || {};

    const numericFeatures = Array.isArray(feature.numeric) ? feature.numeric : [];
    const categoricalFeatures = Array.isArray(feature.categorical) ? feature.categorical : [];
    const highCardinality = Array.isArray(feature.high_cardinality_columns)
        ? feature.high_cardinality_columns
        : [];
    const insights = Array.isArray(feature.ai_insights) ? feature.ai_insights : [];

    const numericCount = numericFeatures.length;
    const categoricalCount = categoricalFeatures.length;
    const totalTyped = numericCount + categoricalCount;

    // Donut chart geometry (derived only from numericCount / categoricalCount)
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const numericFraction = totalTyped > 0 ? numericCount / totalTyped : 0;
    const numericDash = numericFraction * circumference;

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pb-6 border-b border-black">
                    <p className="text-2xl font-mono tracking-widest text-[#3B82F6] uppercase mb-3">
                        Feature Analysis
                    </p>


                    <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                        Breakdown of numerical and categorical features detected in the dataset.
                    </p>
                </div>

                {/* Summary stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Numerical Features
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {numericCount}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Categorical Features
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {categoricalCount}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            High Cardinality
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {highCardinality.length}
                        </p>
                    </div>

                </div>

                {/* Feature Type Distribution */}
                <div className="bg-[#12161D] border border-[#232933] rounded-md p-6 mt-6">

                    <h2 className="text-lg font-semibold text-[#E6E8EB] mb-1">
                        Feature Type Distribution
                    </h2>
                    <p className="text-sm text-[#5B6472] mb-6">
                        Share of numerical vs. categorical features.
                    </p>

                    {totalTyped === 0 ? (

                        <p className="text-[#5B6472] text-sm">
                            No feature type data available.
                        </p>

                    ) : (

                        <div className="flex flex-col sm:flex-row items-center gap-8">

                            <svg
                                viewBox="0 0 160 160"
                                className="w-36 h-36 shrink-0"
                                role="img"
                                aria-label={`${numericCount} numerical features, ${categoricalCount} categorical features`}
                            >
                                <g transform="rotate(-90 80 80)">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r={radius}
                                        fill="none"
                                        stroke="#1A1F28"
                                        strokeWidth="18"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r={radius}
                                        fill="none"
                                        stroke="#5B8DEF"
                                        strokeWidth="18"
                                        strokeDasharray={`${numericDash} ${circumference - numericDash}`}
                                        strokeLinecap="butt"
                                    />
                                </g>
                                <text
                                    x="80"
                                    y="75"
                                    textAnchor="middle"
                                    className="fill-[#E6E8EB]"
                                    style={{ fontSize: "22px", fontWeight: 600 }}
                                >
                                    {totalTyped}
                                </text>
                                <text
                                    x="80"
                                    y="94"
                                    textAnchor="middle"
                                    className="fill-[#5B6472]"
                                    style={{ fontSize: "10px", letterSpacing: "0.05em" }}
                                >
                                    FEATURES
                                </text>
                            </svg>

                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#5B8DEF] shrink-0" />
                                    <span className="text-[#E6E8EB]">Numerical</span>
                                    <span className="font-mono text-[#8B93A1]">
                                        {numericCount} ({totalTyped > 0 ? Math.round(numericFraction * 100) : 0}%)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A1F28] border border-[#2E3542] shrink-0" />
                                    <span className="text-[#E6E8EB]">Categorical</span>
                                    <span className="font-mono text-[#8B93A1]">
                                        {categoricalCount} ({totalTyped > 0 ? Math.round((1 - numericFraction) * 100) : 0}%)
                                    </span>
                                </div>
                            </div>

                        </div>

                    )}

                </div>

                {/* Feature Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-6">
                        <h2 className="text-lg font-semibold text-[#E6E8EB] mb-4">
                            Numerical Features
                        </h2>

                        {numericFeatures.length === 0 ? (
                            <p className="text-[#5B6472] text-sm">
                                No numerical features detected.
                            </p>
                        ) : (
                            <div className="max-h-72 overflow-y-auto pr-1">
                                <div className="flex flex-wrap gap-2">
                                    {numericFeatures.map((item, index) => (
                                        <span
                                            key={`${item}-${index}`}
                                            className="text-sm text-[#E6E8EB] bg-[#161B24] border border-[#1F2530] rounded px-3 py-1.5"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-6">
                        <h2 className="text-lg font-semibold text-[#E6E8EB] mb-4">
                            Categorical Features
                        </h2>

                        {categoricalFeatures.length === 0 ? (
                            <p className="text-[#5B6472] text-sm">
                                No categorical features detected.
                            </p>
                        ) : (
                            <div className="max-h-72 overflow-y-auto pr-1">
                                <div className="flex flex-wrap gap-2">
                                    {categoricalFeatures.map((item, index) => (
                                        <span
                                            key={`${item}-${index}`}
                                            className="text-sm text-[#E6E8EB] bg-[#161B24] border border-[#1F2530] rounded px-3 py-1.5"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* High Cardinality */}
                <div className="bg-[#12161D] border border-[#232933] rounded-md p-6 mt-6">
                    <h2 className="text-lg font-semibold text-[#E6E8EB] mb-4">
                        High Cardinality Columns
                    </h2>

                    {highCardinality.length === 0 ? (
                        <p className="text-[#5B6472] text-sm">
                            No high-cardinality features detected.
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {highCardinality.map((item, index) => (
                                <span
                                    key={index}
                                    className="text-sm text-[#E6E8EB] bg-[#161B24] border border-[#1F2530] rounded px-3 py-1.5"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* AI Insights */}
                <div className="bg-[#12161D] border border-[#232933] rounded-md p-6 mt-6 mb-16">
                    <h2 className="text-lg font-semibold text-[#E6E8EB] mb-4">
                        AI Insights
                    </h2>

                    {insights.length === 0 ? (
                        <p className="text-[#5B6472] text-sm">
                            No AI insights available.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {insights.map((insight, index) => {

                                const style = severityStyle(insight.severity);

                                return (
                                    <div
                                        key={index}
                                        className="border border-[#232933] rounded-md p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <span className="text-sm font-medium text-[#E6E8EB]">
                                                {insight.category ?? "Uncategorized"}
                                            </span>

                                            {insight.severity !== undefined && insight.severity !== null && (
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
                                            {insight.insight ?? "No description provided."}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </Layout>
    );
}

export default FeatureAnalysis;