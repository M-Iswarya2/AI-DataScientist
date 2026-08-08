import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";

function FeatureAnalysis() {
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

    const feature = analysis.feature_analysis || {};

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-gray-800">
                Feature Analysis 🔍
            </h1>

            {/* Feature Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">
                        Numerical Features
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {feature.numeric?.length || 0}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">
                        Categorical Features
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {feature.categorical?.length || 0}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">
                        High Cardinality
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {feature.high_cardinality_columns?.length || 0}
                    </p>
                </div>
            </div>

            {/* Feature Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-4">
                        Numerical Features
                    </h2>

                    {feature.numeric?.map((item) => (
                        <div
                            key={item}
                            className="bg-gray-100 p-3 rounded mb-2"
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-4">
                        Categorical Features
                    </h2>

                    {feature.categorical?.length > 0 ? (
                        feature.categorical.map((item) => (
                            <div
                                key={item}
                                className="bg-gray-100 p-3 rounded mb-2"
                            >
                                {item}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">
                            No categorical features.
                        </p>
                    )}
                </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white p-6 rounded-xl shadow mt-8">
                <h2 className="text-2xl font-bold mb-4">
                    AI Insights 🤖
                </h2>

                {feature.ai_insights?.length > 0 ? (
                    <div className="space-y-4">
                        {feature.ai_insights.map((insight, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-4 rounded-lg"
                            >
                                <p>
                                    <b>Category:</b>{" "}
                                    {insight.category}
                                </p>

                                <p>
                                    <b>Insight:</b>{" "}
                                    {insight.insight}
                                </p>

                                <p>
                                    <b>Severity:</b>{" "}
                                    {insight.severity}
                                </p>
                            </div>
                        ))}
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

export default FeatureAnalysis;