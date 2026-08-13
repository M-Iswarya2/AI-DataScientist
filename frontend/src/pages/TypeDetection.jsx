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

function TypeDetection() {

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

    const type = analysis.type_detection || {};

    return (

        <Layout>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pb-6 border-b border-[#1F2530]">
                    <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase mb-3">
                        Type Detection
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
                        Type Detection
                    </h1>

                    <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                        Detected machine learning problem type based on dataset characteristics and supporting scores.
                    </p>
                </div>

                {/* Problem Type Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Problem Type
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3">
                            {type.problem_type || "N/A"}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Confidence
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {type.confidence ?? 0}%
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Classification Score
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {type.classification_score}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Regression Score
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {type.regression_score}
                        </p>
                    </div>

                </div>

                {/* Detection Reasons */}
                <div className="mt-6">
                    <Panel title="Detection Reasons">

                        {type.reasons?.length > 0 ? (

                            <div className="space-y-2">
                                {type.reasons.map((reason, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#161B24] border border-[#1F2530] rounded p-3"
                                    >
                                        <p className="text-sm text-[#8B93A1]">
                                            • {reason}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        ) : (

                            <p className="text-[#5B6472] text-sm">
                                No additional reasons provided.
                            </p>

                        )}

                    </Panel>
                </div>

                {/* AI Insights */}
                <div className="mt-6 mb-16">
                    <Panel title="AI Insights">

                        {type.ai_insights?.length > 0 ? (

                            <div className="space-y-3">
                                {type.ai_insights.map((insight, index) => {

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

                        ) : (

                            <p className="text-[#5B6472] text-sm">
                                No AI insights available.
                            </p>

                        )}

                    </Panel>
                </div>

            </div>

        </Layout>

    );

}

export default TypeDetection;