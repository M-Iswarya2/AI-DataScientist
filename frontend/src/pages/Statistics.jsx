import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";

function Statistics() {
    const { analysis } = useAnalysis();

    if (!analysis) {
        return (
            <Layout>
                <h1 className="text-3xl font-bold">
                    No Dataset Uploaded
                </h1>

                <p className="text-gray-500 mt-2">
                    Upload a dataset from Dashboard first.
                </p>
            </Layout>
        );
    }

    const correlation =
        analysis.statistics?.correlation_matrix || {};

    const columns = Object.keys(correlation);

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-gray-800">
                Statistics 📈
            </h1>

            {/* Correlation Matrix */}
            <div className="bg-white p-6 rounded-xl shadow mt-8">
                <h2 className="text-2xl font-bold mb-4">
                    Correlation Matrix
                </h2>

                {columns.length > 0 ? (
                    <div className="overflow-auto">
                        <table className="min-w-full border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 border">
                                        Feature
                                    </th>

                                    {columns.map((column) => (
                                        <th
                                            key={column}
                                            className="p-3 border"
                                        >
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {columns.map((row) => (
                                    <tr key={row}>
                                        <td className="p-3 border font-bold">
                                            {row}
                                        </td>

                                        {columns.map((column) => (
                                            <td
                                                key={column}
                                                className="p-3 border text-center"
                                            >
                                                {correlation[row][column]?.toFixed(
                                                    2
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">
                        No correlation matrix available.
                    </p>
                )}
            </div>

            {/* AI Insights */}
            <div className="bg-white p-6 rounded-xl shadow mt-8">
                <h2 className="text-2xl font-bold mb-4">
                    AI Insights 🤖
                </h2>

                {analysis.statistics?.ai_insights &&
                analysis.statistics.ai_insights.length > 0 ? (
                    <div className="space-y-4">
                        {analysis.statistics.ai_insights.map(
                            (insight, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 p-4 rounded-lg"
                                >
                                    {Object.entries(insight).map(
                                        ([key, value]) => (
                                            <p
                                                key={key}
                                                className="mb-2"
                                            >
                                                <span className="font-bold capitalize">
                                                    {key.replaceAll(
                                                        "_",
                                                        " "
                                                    )}
                                                    :
                                                </span>{" "}
                                                {Array.isArray(value)
                                                    ? value.join(", ")
                                                    : String(
                                                          value
                                                      )}
                                            </p>
                                        )
                                    )}
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        No AI insights available.
                    </p>
                )}
            </div>
        </Layout>
    );
}

export default Statistics;