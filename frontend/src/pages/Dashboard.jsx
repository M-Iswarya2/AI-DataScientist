import { useState } from "react";
import { useAnalysis } from "../context/AnalysisContext";
import Layout from "../components/Layout";
import ModuleCard from "../components/ModuleCard";
import UploadSection from "../components/UploadSection";
import { analyzeDataset } from "../services/api";

function Dashboard() {
    const { setAnalysis } = useAnalysis();
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async (file, target) => {
        try {
            setLoading(true);

            const result = await analyzeDataset(file, target);

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

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="pt-2 pb-8 border-b border-[#1F2530]">

                    <p className="text-xs font-mono tracking-widest text-[#5B8DEF] uppercase mb-3">
                        Analysis Workstation
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
                        AI Data Scientist
                    </h1>

                    <p className="text-[#8B93A1] mt-2 max-w-2xl text-sm sm:text-base">
                        Upload a CSV or Excel dataset to run automated data quality, statistical,
                        and modeling analysis across a ten-stage pipeline.
                    </p>

                </div>

                {/* Upload */}
                <div className="mt-8">

                    <div className={loading ? "opacity-60 pointer-events-none transition-opacity" : "transition-opacity"}>
                        <UploadSection onAnalyze={handleAnalyze} />
                    </div>

                    {loading && (
                        <div className="mt-4 flex items-center gap-2.5 text-sm font-mono text-[#8B93A1]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B8DEF] opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B8DEF]"></span>
                            </span>
                            <span>Analyzing dataset&hellip;</span>
                        </div>
                    )}

                </div>

                {/* Modules */}
                <div className="mt-12 mb-16">

                    <div className="flex items-baseline justify-between mb-1">
                        <h2 className="text-sm font-mono tracking-widest text-[#5B6472] uppercase">
                            Analysis Modules
                        </h2>
                        <span className="text-xs font-mono text-[#5B6472]">
                            {modules.length} stages
                        </span>
                    </div>

                    <p className="text-sm text-[#5B6472] mb-6">
                        Available once a dataset has been analyzed.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {modules.map((module, index) => (
                            <div key={module.title} className="relative">
                                <span className="absolute -top-2 -left-2 z-10 flex items-center justify-center h-6 w-6 rounded-full bg-[#12161D] border border-[#232933] text-[10px] font-mono text-[#5B6472]">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <ModuleCard
                                    title={module.title}
                                    description={module.description}
                                    path={module.path}
                                    icon={module.icon}
                                />
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </Layout>
    );
}

export default Dashboard;

