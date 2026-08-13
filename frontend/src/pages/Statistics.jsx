import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";

function formatCorrelation(value) {
    return typeof value === "number" && Number.isFinite(value)
        ? value.toFixed(2)
        : "-";
}

function correlationBackground(value) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        return "transparent";
    }

    const intensity = Math.min(Math.abs(value), 1);

    if (intensity < 0.05) {
        return "transparent";
    }

    return value > 0
        ? `rgba(91, 141, 239, ${0.10 + intensity * 0.35})`
        : `rgba(224, 100, 91, ${0.10 + intensity * 0.35})`;
}

function formatInsightKey(key) {
    return key
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatInsightValue(value) {
    if (value === null || value === undefined) {
        return "-";
    }

    if (Array.isArray(value)) {
        return value.join(", ");
    }

    if (typeof value === "object") {
        return Object.entries(value)
            .map(
                ([k, v]) =>
                    `${formatInsightKey(k)}: ${formatInsightValue(v)}`
            )
            .join(", ");
    }

    return String(value);
}

function Panel({ title, description, children, className = "" }) {
    return (
        <div
            className={`bg-[#12161D] border border-[#232933] rounded-md p-6 ${className}`}
        >
            <h2 className="text-lg font-semibold text-white">
                {title}
            </h2>

            {description && (
                <p className="text-sm text-[#AEB6C2] mt-1 mb-5">
                    {description}
                </p>
            )}

            <div className={description ? "" : "mt-4"}>
                {children}
            </div>
        </div>
    );
}

function Statistics() {
    const { analysis } = useAnalysis();

    if (!analysis) {
        return (
            <Layout>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl font-semibold text-black">
                        No Dataset Uploaded
                    </h1>

                    <p className="text-[#AEB6C2] mt-2">
                        Upload a dataset from Dashboard first.
                    </p>
                </div>
            </Layout>
        );
    }

    const correlation =
        analysis.statistics?.correlation_matrix &&
        typeof analysis.statistics.correlation_matrix === "object"
            ? analysis.statistics.correlation_matrix
            : {};

    const columns = Object.keys(correlation);

    const insights = Array.isArray(analysis.statistics?.ai_insights)
        ? analysis.statistics.ai_insights
        : [];

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pb-6 border-b border-[#1F2530]">
                    <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase mb-3">
                        Statistics
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
                        Statistics
                    </h1>

                    <p className="text-[#AEB6C2] mt-2 max-w-2xl text-sm sm:text-base">
                        Statistical relationships and correlation patterns
                        across numerical features.
                    </p>
                </div>

                {/* Correlation Matrix */}
                <div className="mt-8">
                    <Panel
                        title="Correlation Matrix"
                        description="Pairwise correlation between numerical features."
                    >
                        {columns.length === 0 ? (
                            <p className="text-[#AEB6C2] text-sm">
                                No correlation matrix available.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="text-sm border-collapse min-w-[480px]">
                                    <thead>
                                        <tr>
                                            <th className="text-left text-xs font-mono tracking-widest text-[#AEB6C2] uppercase p-3 border-b border-[#303744]">
                                                Feature
                                            </th>

                                            {columns.map((column) => (
                                                <th
                                                    key={column}
                                                    className="text-xs font-mono tracking-widest text-[#AEB6C2] uppercase p-3 border-b border-[#303744] text-center whitespace-nowrap"
                                                >
                                                    {column}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {columns.map((row) => (
                                            <tr key={row}>
                                                <th className="text-left text-sm text-white font-medium p-3 border-b border-[#252B35] whitespace-nowrap">
                                                    {row}
                                                </th>

                                                {columns.map((column) => {
                                                    const value =
                                                        correlation?.[row]?.[
                                                            column
                                                        ];

                                                    return (
                                                        <td
                                                            key={column}
                                                            className="text-center p-3 border-b border-[#252B35] font-mono font-semibold text-white"
                                                            style={{
                                                                backgroundColor:
                                                                    correlationBackground(
                                                                        value
                                                                    ),
                                                            }}
                                                        >
                                                            {formatCorrelation(
                                                                value
                                                            )}
                                                        </td>
                                                    );
                                                })}
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
                            <p className="text-[#AEB6C2] text-sm">
                                No AI insights available.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {insights.map((insight, index) => {
                                    const entries =
                                        insight &&
                                        typeof insight === "object"
                                            ? Object.entries(insight)
                                            : [];

                                    if (entries.length === 0) {
                                        return null;
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className="border border-[#303744] bg-[#161B24] rounded-md p-4"
                                        >
                                            {entries.map(([key, value]) => (
                                                <p
                                                    key={key}
                                                    className="text-sm text-[#D1D7E0] mb-2 last:mb-0"
                                                >
                                                    <span className="font-medium text-white">
                                                        {formatInsightKey(key)}:
                                                    </span>{" "}
                                                    {formatInsightValue(value)}
                                                </p>
                                            ))}
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

export default Statistics;