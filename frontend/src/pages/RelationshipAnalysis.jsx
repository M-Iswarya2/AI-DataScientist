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

function formatCorrelation(value) {
    return typeof value === "number" && Number.isFinite(value)
        ? value.toFixed(3)
        : "-";
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

function RelationshipAnalysis() {

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

    const relation = analysis.relationship_analysis || {};

    const summary = relation.relationship_summary || {};

    const topRelationships = Array.isArray(relation.top_relationships)
        ? relation.top_relationships
        : [];

    const positiveRelationships = Array.isArray(relation.positive_relationships)
        ? relation.positive_relationships
        : [];

    const negativeRelationships = Array.isArray(relation.negative_relationships)
        ? relation.negative_relationships
        : [];

    const insights = Array.isArray(relation.ai_insights)
        ? relation.ai_insights
        : [];

    return (

        <Layout>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pb-6 border-b border-[#1F2530]">
                    <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase mb-3">
                        Relationship Analysis
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
                        Relationship Analysis
                    </h1>

                    <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                        Feature relationships based on correlation with the target and each other.
                    </p>
                </div>

                {/* Summary stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Total Relationships
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {summary.total_relationships || 0}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Positive
                        </h2>
                        <p className="text-3xl font-semibold text-[#4CAF7D] mt-3 font-mono">
                            {summary.positive_relationships || 0}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Negative
                        </h2>
                        <p className="text-3xl font-semibold text-[#E0645B] mt-3 font-mono">
                            {summary.negative_relationships || 0}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Strong
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {summary.strong_relationships || 0}
                        </p>
                    </div>

                </div>

                {/* Top Relationships */}
                <div className="mt-6">
                    <Panel title="Top Relationships" description="Strongest feature relationships detected in the dataset.">

                        {topRelationships.length === 0 ? (
                            <p className="text-[#5B6472] text-sm">
                                No relationships available.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {topRelationships.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border border-[#232933] rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-sm text-[#E6E8EB] font-medium truncate">
                                                {item?.feature ?? "-"} <span className="text-[#5B6472]">→</span> {item?.target ?? "-"}
                                            </p>
                                            {item?.relationship_strength && (
                                                <p className="text-xs text-[#8B93A1] mt-1">
                                                    {item.relationship_strength}
                                                </p>
                                            )}
                                        </div>

                                        <span className="text-sm font-mono text-[#E6E8EB] bg-[#161B24] border border-[#1F2530] rounded px-2.5 py-1 shrink-0 self-start sm:self-auto">
                                            {formatCorrelation(item?.correlation)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                    </Panel>
                </div>

                {/* Positive / Negative Relationships */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                    <Panel title="Positive Relationships">
                        {positiveRelationships.length === 0 ? (
                            <p className="text-[#5B6472] text-sm">
                                No relationships available.
                            </p>
                        ) : (
                            <div className="max-h-72 overflow-y-auto pr-1 space-y-2">
                                {positiveRelationships.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between gap-2 bg-[#161B24] border border-[#1F2530] rounded px-3 py-2"
                                    >
                                        <span className="text-sm text-[#E6E8EB] truncate">
                                            {item?.feature ?? "-"} → {item?.target ?? "-"}
                                        </span>
                                        <span className="text-sm font-mono text-[#4CAF7D] shrink-0">
                                            {formatCorrelation(item?.correlation)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Panel>

                    <Panel title="Negative Relationships">
                        {negativeRelationships.length === 0 ? (
                            <p className="text-[#5B6472] text-sm">
                                No relationships available.
                            </p>
                        ) : (
                            <div className="max-h-72 overflow-y-auto pr-1 space-y-2">
                                {negativeRelationships.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between gap-2 bg-[#161B24] border border-[#1F2530] rounded px-3 py-2"
                                    >
                                        <span className="text-sm text-[#E6E8EB] truncate">
                                            {item?.feature ?? "-"} → {item?.target ?? "-"}
                                        </span>
                                        <span className="text-sm font-mono text-[#E0645B] shrink-0">
                                            {formatCorrelation(item?.correlation)}
                                        </span>
                                    </div>
                                ))}
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

export default RelationshipAnalysis;