import { useAnalysis } from "../context/AnalysisContext";
import Layout from "../components/Layout";
import MLUploadSection from "../components/MLUploadSection";

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

function SummaryItem({ label, value }) {
    return (
        <div className="bg-[#161B24] border border-[#1F2530] rounded p-3 min-w-0">
            <p className="text-xs font-mono tracking-widest text-[#5B6472] uppercase truncate">
                {label}
            </p>
            <p className="text-lg font-semibold text-[#E6E8EB] mt-1 truncate">
                {value}
            </p>
        </div>
    );
}

function Preprocessing() {

    const { mlResult } = useAnalysis();

    if (!mlResult) {
        return (
            <Layout>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    {/* Header */}
                    <div className="pb-6 border-b border-[#1F2530]">
                        <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase mb-3">
                            Preprocessing
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
                            Preprocessing
                        </h1>

                        <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                            Overview of target detection, feature preparation, scaling, encoding, and missing-value handling.
                        </p>
                    </div>

                    <div className="mt-8">
                        <MLUploadSection />
                    </div>

                    <div className="bg-[#12161D] border border-[#232933] rounded-md p-6 mt-6 mb-16">
                        <p className="text-[#8B93A1] text-sm">
                            Upload the updated dataset and train the model to view preprocessing details.
                        </p>
                    </div>

                </div>
            </Layout>
        );
    }

    const preprocessing = mlResult.preprocessing || {};

    const numericColumns = Array.isArray(preprocessing.numeric_columns)
        ? preprocessing.numeric_columns
        : [];

    const categoricalColumns = Array.isArray(preprocessing.categorical_columns)
        ? preprocessing.categorical_columns
        : [];

    const missingValueHandling =
        preprocessing.missing_value_handling &&
        typeof preprocessing.missing_value_handling === "object"
            ? preprocessing.missing_value_handling
            : {};

    const missingValueEntries = Object.entries(missingValueHandling);

    const trainShape = Array.isArray(preprocessing.train_shape)
        ? preprocessing.train_shape.join(" × ")
        : "-";

    const testShape = Array.isArray(preprocessing.test_shape)
        ? preprocessing.test_shape.join(" × ")
        : "-";

    return (

        <Layout>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pb-6 border-b border-[#1F2530]">
                    <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase mb-3">
                        Preprocessing
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-semibold text-[#E6E8EB] tracking-tight">
                        Preprocessing
                    </h1>

                    <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                        Overview of target detection, feature preparation, scaling, encoding, and missing-value handling.
                    </p>
                </div>

                <div className="mt-8">
                    <MLUploadSection />
                </div>

                {/* Preprocessing Summary */}
                <div className="mt-6">
                    <Panel title="Preprocessing Summary">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <SummaryItem
                                label="Target Column"
                                value={preprocessing.target_column ?? "-"}
                            />
                            <SummaryItem
                                label="Problem Type"
                                value={preprocessing.problem_type ?? "-"}
                            />
                            <SummaryItem
                                label="Training Shape"
                                value={trainShape}
                            />
                            <SummaryItem
                                label="Testing Shape"
                                value={testShape}
                            />
                            <SummaryItem
                                label="Scaling"
                                value={preprocessing.scaling || "None"}
                            />
                            <SummaryItem
                                label="Encoding"
                                value={preprocessing.encoding || "None"}
                            />
                        </div>
                    </Panel>
                </div>

                {/* Feature Columns */}
                <div className="mt-6">
                    <Panel title="Feature Columns">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <h3 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase mb-3">
                                    Numeric Columns
                                </h3>

                                {numericColumns.length === 0 ? (
                                    <p className="text-[#5B6472] text-sm">
                                        None
                                    </p>
                                ) : (
                                    <div className="max-h-60 overflow-y-auto pr-1">
                                        <div className="flex flex-wrap gap-2">
                                            {numericColumns.map((column, index) => (
                                                <span
                                                    key={`${column}-${index}`}
                                                    className="text-sm text-[#E6E8EB] bg-[#161B24] border border-[#1F2530] rounded px-3 py-1.5"
                                                >
                                                    {String(column)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className="text-xs font-mono tracking-widest text-[#5B6472] uppercase mb-3">
                                    Categorical Columns
                                </h3>

                                {categoricalColumns.length === 0 ? (
                                    <p className="text-[#5B6472] text-sm">
                                        None
                                    </p>
                                ) : (
                                    <div className="max-h-60 overflow-y-auto pr-1">
                                        <div className="flex flex-wrap gap-2">
                                            {categoricalColumns.map((column, index) => (
                                                <span
                                                    key={`${column}-${index}`}
                                                    className="text-sm text-[#E6E8EB] bg-[#161B24] border border-[#1F2530] rounded px-3 py-1.5"
                                                >
                                                    {String(column)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                    </Panel>
                </div>

                {/* Missing Value Handling */}
                <div className="mt-6 mb-16">
                    <Panel
                        title="Missing Value Handling"
                        description="How missing values were handled during preprocessing."
                    >
                        {missingValueEntries.length === 0 ? (
                            <p className="text-[#5B6472] text-sm">
                                No missing-value handling was required.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm min-w-[420px]">
                                    <thead>
                                        <tr className="border-b border-[#232933] text-left">
                                            <th className="py-2 pr-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase">
                                                Column
                                            </th>
                                            <th className="py-2 px-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase">
                                                Method
                                            </th>
                                            <th className="py-2 pl-4 font-mono text-xs tracking-widest text-[#5B6472] uppercase">
                                                Value Used
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {missingValueEntries.map(([column, details]) => (
                                            <tr key={column} className="border-b border-[#1A1F28] last:border-0">
                                                <td className="py-2 pr-4 text-[#E6E8EB] font-medium">
                                                    {column}
                                                </td>
                                                <td className="py-2 px-4 text-[#8B93A1]">
                                                    {details?.method ?? "-"}
                                                </td>
                                                <td className="py-2 pl-4 text-[#8B93A1]">
                                                    {details?.value ?? "-"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Panel>
                </div>

            </div>

        </Layout>

    );

}

export default Preprocessing;