import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";

const SEVERITY_STYLES = {
    high: {
        bg: "bg-[#E0645B]/10",
        text: "text-[#E0645B]",
        border: "border-[#E0645B]/30"
    },
    critical: {
        bg: "bg-[#E0645B]/10",
        text: "text-[#E0645B]",
        border: "border-[#E0645B]/30"
    },
    medium: {
        bg: "bg-[#D9A441]/10",
        text: "text-[#D9A441]",
        border: "border-[#D9A441]/30"
    },
    warning: {
        bg: "bg-[#D9A441]/10",
        text: "text-[#D9A441]",
        border: "border-[#D9A441]/30"
    },
    low: {
        bg: "bg-[#4CAF7D]/10",
        text: "text-[#4CAF7D]",
        border: "border-[#4CAF7D]/30"
    },
    info: {
        bg: "bg-[#4CAF7D]/10",
        text: "text-[#4CAF7D]",
        border: "border-[#4CAF7D]/30"
    }
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

function TargetDetection() {

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

    const target = analysis.target_detection || {};

    const aiInsights = target.ai_insights || [];

    const targetColumns = Object.entries(target)
        .filter(([key]) => key !== "ai_insights");

    return (

        <Layout>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pb-6 border-b border-[#1F2530]">
                    <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase mb-3">
                        Target Detection
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
                        Target Detection
                    </h1>

                    <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                        Candidate target columns and the reasoning behind each detection.
                    </p>
                </div>

                {/* Target Candidates */}
                <div className="mt-8">
                    <Panel title="Target Candidates">

                        {targetColumns.length === 0 ? (

                            <p className="text-[#5B6472] text-sm">
                                No target candidates available.
                            </p>

                        ) : (

                            <div className="space-y-3">
                                {targetColumns.map(([column, details]) => (

                                    <div
                                        key={column}
                                        className="bg-[#161B24] border border-[#1F2530] rounded-md p-4"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm font-medium text-[#E6E8EB]">
                                                {column}
                                            </span>

                                            {details?.points !== undefined && (
                                                <span className="text-sm font-mono text-[#5B8DEF] shrink-0">
                                                    {details.points} pts
                                                </span>
                                            )}
                                        </div>

                                        {Array.isArray(details?.reasons) && details.reasons.length > 0 && (
                                            <div className="mt-3 space-y-1">
                                                {details.reasons.map((reason, index) => (
                                                    <p key={index} className="text-sm text-[#8B93A1]">
                                                        • {reason}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                ))}
                            </div>

                        )}

                    </Panel>
                </div>

                {/* AI Insights */}
                <div className="mt-6 mb-16">
                    <Panel title="AI Insights">

                        {aiInsights.length === 0 ? (

                            <p className="text-[#5B6472] text-sm">
                                No AI insights available.
                            </p>

                        ) : (

                            <div className="space-y-3">
                                {aiInsights.map((insight, index) => {

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

export default TargetDetection;