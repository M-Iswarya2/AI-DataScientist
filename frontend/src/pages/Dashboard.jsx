import { useState } from "react";
import { useAnalysis } from "../context/AnalysisContext";
import Layout from "../components/Layout";
import ModuleCard from "../components/ModuleCard";
import UploadSection from "../components/UploadSection";
import { analyzeDataset } from "../services/api";

function Dashboard() {
    const { setAnalysis } = useAnalysis();
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async (file) => {
        try {
            setLoading(true);

            const result = await analyzeDataset(file);

            console.log(result);

            setAnalysis(result);

        } catch (error) {

            console.error(error);
            alert("Analysis Failed");

        } finally {

            setLoading(false);

        }
    };

    const modules = [
        {
            title: "Dataset Summary",
            description: "View rows, columns and dataset overview.",
            path: "/dataset-summary",
            icon: "📊"
        },
        {
            title: "Data Quality",
            description: "Missing values and duplicate analysis.",
            path: "/data-quality",
            icon: "🧹"
        },
        {
            title: "Statistics",
            description: "Mean, Median, Standard Deviation and more.",
            path: "/statistics",
            icon: "📈"
        },
        {
            title: "Feature Analysis",
            description: "Categorical and Numerical feature analysis.",
            path: "/feature-analysis",
            icon: "🔍"
        },
        {
            title: "Relationship Analysis",
            description: "Correlation and feature relationships.",
            path: "/relationship-analysis",
            icon: "🔗"
        },
        {
            title: "Outlier Analysis",
            description: "Detect outliers using IQR.",
            path: "/outlier-analysis",
            icon: "⚠️"
        },
        {
            title: "Target Detection",
            description: "Automatically identify the target column.",
            path: "/target-detection",
            icon: "🎯"
        },
        {
            title: "Type Detection",
            description: "Classification or Regression detection.",
            path: "/type-detection",
            icon: "🤖"
        },
        {
            title: "Preprocessing",
            description: "Encoding, Scaling and Data Preparation.",
            path: "/preprocessing",
            icon: "⚙️"
        },
        {
            title: "Model Selection",
            description: "Train models and choose the best one.",
            path: "/model-selection",
            icon: "🏆"
        }
    ];

    return (
        <Layout>

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-800">
                    AI Data Scientist
                </h1>

                <p className="text-gray-500 mt-2">
                    Upload a dataset and explore AI-powered analysis.
                </p>

            </div>

            <UploadSection onAnalyze={handleAnalyze} />

            {loading && (
                <p className="mt-4 text-blue-600 font-semibold">
                    Analyzing dataset...
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                {modules.map((module) => (
                    <ModuleCard
                        key={module.title}
                        title={module.title}
                        description={module.description}
                        path={module.path}
                        icon={module.icon}
                    />
                ))}

            </div>

        </Layout>
    );
}

export default Dashboard;