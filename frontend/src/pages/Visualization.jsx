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
    const [showGuide, setShowGuide] = useState(false);

    const numericFeatures =
        analysis?.feature_analysis?.numeric || [];

    const categoricalFeatures =
        analysis?.feature_analysis?.categorical || [];

    useEffect(() => {
        if (numericFeatures.length >= 2) {
            setFea1(numericFeatures[0]);
            setFea2(numericFeatures[1]);
        } else if (numericFeatures.length === 1) {
            setFea1(numericFeatures[0]);
            setFea2("");
        }
    }, [analysis]);

    const handlePlotTypeChange = (type) => {
        setPlotType(type);
        setError("");
        setPlotUrl(null);

        if (type === "heatmap") {
            setFea1("");
            setFea2("");
        } else if (type === "histogram" || type === "box") {
            setFea1(numericFeatures[0] || "");
            setFea2("");
        } else if (type === "bar") {
            setFea1(categoricalFeatures[0] || "");
            setFea2(numericFeatures[0] || "");
        } else {
            setFea1(numericFeatures[0] || "");
            setFea2(numericFeatures[1] || "");
        }
    };

    const handleGeneratePlot = async () => {
        setError("");

        if (plotType === "heatmap") {
            // No feature selection required
        } else if (plotType === "histogram" || plotType === "box") {
            if (!fea1) {
                setError("Please select a feature.");
                return;
            }
        } else {
            if (!fea1 || !fea2) {
                setError("Please select both features.");
                return;
            }

            if (fea1 === fea2) {
                setError("Please select two different features.");
                return;
            }
        }

        try {
            setLoading(true);

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

                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold">
                        Visualization
                    </h1>

                    <button
                        type="button"
                        onClick={() => setShowGuide((prev) => !prev)}
                        aria-label="Show plot type guide"
                        aria-expanded={showGuide}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-100"
                    >
                        ?
                    </button>
                </div>

                <p className="text-gray-500 mt-2">
                    Explore patterns, relationships, distributions, and correlations in your dataset.
                </p>

                {showGuide && (
                    <div className="mt-4 bg-white rounded-xl shadow-sm border p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Plot Type Guide
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    Scatter Plot
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Input: Numerical + Numerical
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Shows the relationship between two numerical features.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900">
                                    Line Plot
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Input: Numerical + Numerical
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Shows how one numerical feature changes with another.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900">
                                    Bar Plot
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Input: Categorical + Numerical
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Shows the average numerical value for each category.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900">
                                    Histogram
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Input: Numerical
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Shows the distribution of values in a numerical feature.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900">
                                    Box Plot
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Input: Numerical
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Shows the spread of values and helps identify potential outliers.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900">
                                    Heatmap
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Input: Numerical Features
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Shows correlations between numerical features.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">

                    {/* Plot Type */}

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Plot Type
                        </label>

                        <select
                            value={plotType}
                            onChange={(e) =>
                                handlePlotTypeChange(e.target.value)
                            }
                            className="w-full md:w-1/3 border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
                        >
                            <option value="scatter">
                                Scatter Plot
                            </option>

                            <option value="line">
                                Line Plot
                            </option>

                            <option value="bar">
                                Bar Plot
                            </option>

                            <option value="histogram">
                                Histogram
                            </option>

                            <option value="box">
                                Box Plot
                            </option>

                            <option value="heatmap">
                                Heatmap
                            </option>
                        </select>
                    </div>


                    {/* Feature Selection */}

                    {plotType !== "heatmap" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                            {/* Feature 1 */}

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    {plotType === "histogram" ||
                                    plotType === "box"
                                        ? "Feature"
                                        : "Feature 1"}
                                </label>

                                <select
                                    value={fea1}
                                    onChange={(e) =>
                                        setFea1(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
                                >
                                    <option value="">
                                        Select Feature
                                    </option>

                                    {(plotType === "bar"
                                        ? [
                                              ...categoricalFeatures,
                                              ...numericFeatures,
                                          ]
                                        : numericFeatures
                                    ).map((feature) => (
                                        <option
                                            key={feature}
                                            value={feature}
                                        >
                                            {feature}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            {/* Feature 2 */}

                            {plotType !== "histogram" &&
                                plotType !== "box" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Feature 2
                                        </label>

                                        <select
                                            value={fea2}
                                            onChange={(e) =>
                                                setFea2(e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
                                        >
                                            <option value="">
                                                Select Feature
                                            </option>

                                            {(plotType === "bar"
                                                ? [
                                                      ...categoricalFeatures,
                                                      ...numericFeatures,
                                                  ]
                                                : numericFeatures
                                            ).map((feature) => (
                                                <option
                                                    key={feature}
                                                    value={feature}
                                                >
                                                    {feature}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                        </div>
                    )}


                    {/* Heatmap Information */}

                    {plotType === "heatmap" && (
                        <div className="mt-5 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                                The heatmap uses all numerical features
                                to visualize their correlation.
                            </p>
                        </div>
                    )}


                    {/* Error */}

                    {error && (
                        <p className="text-red-500 mt-4">
                            {error}
                        </p>
                    )}


                    {/* Generate Button */}

                    <button
                        onClick={handleGeneratePlot}
                        disabled={loading}
                        className="mt-5 px-5 py-2 rounded-lg bg-black text-white hover:opacity-90 disabled:opacity-50"
                    >
                        {loading
                            ? "Generating..."
                            : "Generate Graph"}
                    </button>

                </div>


                {/* Plot Result */}

                {plotUrl && !loading && (
                    <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">

                        <h2 className="text-xl font-semibold mb-4">
                            {plotType === "scatter" && "Scatter Plot"}

                            {plotType === "line" && "Line Plot"}

                            {plotType === "bar" && "Bar Plot"}

                            {plotType === "histogram" && "Histogram"}

                            {plotType === "box" && "Box Plot"}

                            {plotType === "heatmap" && "Correlation Heatmap"}
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