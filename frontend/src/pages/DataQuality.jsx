import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";

function DataQuality() {

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

    const quality = analysis.data_quality;

    if (!quality) {

        return (

            <Layout>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl font-semibold text-[#E6E8EB]">
                        Data Quality
                    </h1>

                    <p className="text-[#8B93A1] mt-4">
                        Data quality analysis is not available for this dataset.
                    </p>
                </div>
            </Layout>

        );

    }

    const missingValues =
        quality.missing_values && typeof quality.missing_values === "object"
            ? quality.missing_values
            : {};

    const missingEntries = Object.entries(missingValues);

    const totalMissing = missingEntries.reduce(
        (sum, [, value]) => sum + (Number(value) || 0),
        0
    );

    const columnsAffected = missingEntries.filter(
        ([, value]) => (Number(value) || 0) > 0
    ).length;

    const sortedMissing = [...missingEntries].sort(
        (a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0)
    );

    const maxMissing = sortedMissing.length > 0
        ? Math.max(...sortedMissing.map(([, value]) => Number(value) || 0))
        : 0;

    const insights = Array.isArray(quality.ai_insights)
        ? quality.ai_insights
        : [];

    return (

        <Layout>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pb-6 border-b border-[#1F2530]">

                    <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase mb-3">
                        Data Quality
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
                        Data Quality
                    </h1>

                    <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                        Duplicate rows and missing values detected across the dataset.
                    </p>

                </div>

                {/* Summary stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Duplicate Rows
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {quality.duplicate_rows ?? "—"}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Total Missing Values
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {totalMissing}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Columns Affected
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {columnsAffected}
                            <span className="text-sm text-[#5B6472] font-sans ml-1">
                                / {missingEntries.length}
                            </span>
                        </p>
                    </div>

                </div>

                {/* Missing Values By Column */}
                <div className="bg-[#12161D] border border-[#232933] rounded-md p-6 mt-6">

                    <h2 className="text-lg font-semibold text-[#E6E8EB] mb-1">
                        Missing Values by Column
                    </h2>
                    <p className="text-sm text-[#5B6472] mb-6">
                        Count of missing entries per column.
                    </p>

                    {sortedMissing.length === 0 ? (

                        <p className="text-[#4CAF7D] text-sm">
                            No missing values detected.
                        </p>

                    ) : (

                        <>

                            {/* Bar chart */}
                            <div className="space-y-3">

                                {sortedMissing.map(([column, value]) => {

                                    const numericValue = Number(value) || 0;
                                    const widthPct = maxMissing > 0
                                        ? Math.max((numericValue / maxMissing) * 100, 2)
                                        : 0;

                                    return (

                                        <div key={column} className="w-full">

                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-[#E6E8EB] truncate pr-2">
                                                    {column}
                                                </span>
                                                <span className="text-sm font-mono text-[#8B93A1] shrink-0">
                                                    {numericValue}
                                                </span>
                                            </div>

                                            <div className="w-full h-2 bg-[#1A1F28] rounded-sm overflow-hidden">
                                                <div
                                                    className="h-full bg-[#D9A441] rounded-sm"
                                                    style={{ width: `${widthPct}%` }}
                                                    role="img"
                                                    aria-label={`${column}: ${numericValue} missing values`}
                                                />
                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                            {/* Detail table */}
                            <div className="mt-6 overflow-x-auto">

                                <table className="w-full text-sm min-w-[320px]">
                                    <thead>
                                        <tr className="border-b border-[#232933] text-left">
                                            <th className="py-2 pr-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase">
                                                Column
                                            </th>
                                            <th className="py-2 pl-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase text-right">
                                                Missing
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedMissing.map(([column, value]) => (
                                            <tr key={column} className="border-b border-[#1A1F28] last:border-0">
                                                <td className="py-2 pr-4 text-[#E6E8EB]">
                                                    {column}
                                                </td>
                                                <td className="py-2 pl-4 text-right font-mono text-[#8B93A1]">
                                                    {Number(value) || 0}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                        </>

                    )}

                </div>

                {/* AI Insights */}
                <div className="bg-[#12161D] border border-[#232933] rounded-md p-6 mt-6 mb-16">

                    <h2 className="text-lg font-semibold text-[#E6E8EB] mb-4">
                        AI Insights
                    </h2>

                    {insights.length > 0 ? (

                        <div className="space-y-3">

                            {insights.map((insight, index) => {

                                const entries = insight && typeof insight === "object"
                                    ? Object.entries(insight)
                                    : [];

                                if (entries.length === 0) {
                                    return null;
                                }

                                return (

                                    <div
                                        key={index}
                                        className="border border-[#232933] rounded-md p-4"
                                    >

                                        {entries.map(([key, value]) => (

                                            <p
                                                key={key}
                                                className="text-sm text-[#8B93A1] mb-1.5 last:mb-0"
                                            >
                                                <span className="font-medium text-[#E6E8EB] capitalize">
                                                    {key.replaceAll("_", " ")}:
                                                </span>
                                                {" "}
                                                {String(value)}
                                            </p>

                                        ))}

                                    </div>

                                );

                            })}

                        </div>

                    ) : (

                        <p className="text-[#5B6472] text-sm">
                            No AI insights available.
                        </p>

                    )}

                </div>

            </div>

        </Layout>

    );

}

export default DataQuality;