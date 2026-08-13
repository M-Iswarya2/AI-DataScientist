import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";
import { generatePlot } from "../services/plotService";

function Visualization() {
    const { analysis } = useAnalysis();

    const [fea1, setFea1] = useState("");
    const [fea2, setFea2] = useState("");
    const [plotType, setPlotType] = useState("scatter");

    const [plotUrl, setPlotUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const numericFeatures =
        analysis?.feature_analysis?.numeric || [];

    useEffect(() => {
        if (numericFeatures.length >= 2) {
            setFea1(numericFeatures[0]);
            setFea2(numericFeatures[1]);
        }
    }, [analysis]);

    const handleGeneratePlot = async () => {
        if (!fea1 || !fea2) {
            setError("Please select two features.");
            return;
        }

        if (fea1 === fea2) {
            setError("Please select two different features.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const blob = await generatePlot(
                fea1,
                fea2,
                plotType
            );

            const url = URL.createObjectURL(blob);

            if (plotUrl) {
                URL.revokeObjectURL(plotUrl);
            }

            setPlotUrl(url);
        } catch (err) {
            console.error(err);
            setError("Unable to generate the graph.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (plotUrl) {
                URL.revokeObjectURL(plotUrl);
            }
        };
    }, [plotUrl]);

    if (!analysis) {
        return (
            <Layout>
                <div className="p-6">
                    <h1 className="text-3xl font-bold">
                        Visualization
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Upload a dataset first to create visualizations.
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-3xl font-bold">
                    Visualization
                </h1>

                <p className="text-gray-500 mt-2">
                    Explore relationships between numerical features.
                </p>

                <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Feature 1
                            </label>

                            <select
                                value={fea1}
                                onChange={(e) => setFea1(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
                            >
                                <option value="">
                                    Select Feature
                                </option>

                                {numericFeatures.map((feature) => (
                                    <option
                                        key={feature}
                                        value={feature}
                                    >
                                        {feature}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Feature 2
                            </label>

                            <select
                                value={fea2}
                                onChange={(e) => setFea2(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
                            >
                                <option value="">
                                    Select Feature
                                </option>

                                {numericFeatures.map((feature) => (
                                    <option
                                        key={feature}
                                        value={feature}
                                    >
                                        {feature}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Plot Type
                            </label>

                            <select
                                value={plotType}
                                onChange={(e) => setPlotType(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
                            >
                                <option value="scatter">
                                    Scatter Plot
                                </option>

                                <option value="line">
                                    Line Plot
                                </option>
                            </select>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 mt-4">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleGeneratePlot}
                        disabled={loading}
                        className="mt-5 px-5 py-2 rounded-lg bg-black text-white hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Generating..." : "Generate Graph"}
                    </button>
                </div>


                {plotUrl && !loading && (
                    <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            {plotType === "scatter"
                                ? "Scatter Plot"
                                : "Line Plot"}
                        </h2>

                        <div className="flex justify-center">
                            <img
                                src={plotUrl}
                                alt={`${plotType} plot`}
                                className="max-w-full rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Visualization;