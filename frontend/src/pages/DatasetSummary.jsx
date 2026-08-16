import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";

function DatasetSummary() {

    const { analysis } = useAnalysis();

    if (!analysis) {
        return (

            <Layout>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl font-semibold text-[#E6E8EB]">
                        No Dataset Uploaded
                    </h1>

                    <p className="mt-2 text-[#8B93A1]">
                        Upload a dataset from Dashboard first.
                    </p>
                </div>
            </Layout>

        );
    }

    const summary = analysis.dataset_summary;

    if (!summary) {
        return (

            <Layout>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl font-semibold text-[#E6E8EB]">
                        Dataset Summary
                    </h1>

                    <p className="text-[#8B93A1] mt-4">
                        Dataset summary is not available for this dataset.
                    </p>
                </div>
            </Layout>

        );
    }

    const hasRows = typeof summary.num_rows === "number" && Number.isFinite(summary.num_rows);
    const hasColumns = typeof summary.num_columns === "number" && Number.isFinite(summary.num_columns);

    const hasMemory =
        typeof summary.memory_usage === "number" &&
        Number.isFinite(summary.memory_usage);

    const columnNames = Array.isArray(summary.column_names)
        ? summary.column_names
        : [];

    return (

        <Layout>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pb-6 border-b border-[#1F2530]">

                    <p className="text-2xl font-mono tracking-widest text-[#3B82F6] uppercase mb-3">
                        Dataset Summary
                    </p>


                    <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                        Dimensions and column overview for the uploaded dataset.
                    </p>

                </div>

                {/* Summary stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Rows
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {hasRows ? summary.num_rows.toLocaleString() : "—"}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Columns
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {hasColumns ? summary.num_columns.toLocaleString() : "—"}
                        </p>
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-5">
                        <h2 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase">
                            Memory Usage
                        </h2>
                        <p className="text-3xl font-semibold text-[#E6E8EB] mt-3 font-mono">
                            {hasMemory ? `${summary.memory_usage.toFixed(2)} MB` : "—"}
                        </p>
                    </div>

                </div>

                {/* Column list */}
                <div className="bg-[#12161D] border border-[#232933] rounded-md p-6 mt-6 mb-16">

                    <div className="flex items-baseline justify-between mb-1">
                        <h2 className="text-lg font-semibold text-[#E6E8EB]">
                            Columns
                        </h2>
                        <span className="text-xs font-mono text-[#5B6472]">
                            {columnNames.length} total
                        </span>
                    </div>
                    <p className="text-sm text-[#5B6472] mb-5">
                        All columns detected in the dataset.
                    </p>

                    {columnNames.length === 0 ? (

                        <p className="text-[#5B6472] text-sm">
                            No column names available.
                        </p>

                    ) : (

                        <div className="max-h-96 overflow-y-auto pr-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

                                {columnNames.map((column, index) => (

                                    <div
                                        key={`${column}-${index}`}
                                        className="flex items-center gap-2 bg-[#161B24] border border-[#1F2530] rounded px-3 py-2 min-w-0"
                                    >
                                        <span className="text-[10px] font-mono text-[#5B6472] shrink-0">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-sm text-[#E6E8EB] truncate" title={String(column)}>
                                            {String(column)}
                                        </span>
                                    </div>

                                ))}

                            </div>
                        </div>

                    )}

                </div>

            </div>

        </Layout>

    );

}

export default DatasetSummary;