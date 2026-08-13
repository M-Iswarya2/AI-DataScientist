import { useState } from "react";
import { trainModel } from "../services/api";
import { useAnalysis } from "../context/AnalysisContext";

function MLUploadSection() {
    const { setMlResult } = useAnalysis();

    const [file, setFile] = useState(null);
    const [target, setTarget] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrain = async () => {
        if (!file) {
            setError("Please upload the updated dataset.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await trainModel(file, target);
            setMlResult(result);
        } catch (err) {
            setError("Failed to train model.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#12161D] border border-[#232933] rounded-md p-6">

            <h2 className="text-xl font-semibold text-white mb-5">
                Upload Updated Dataset
            </h2>

            <div className="space-y-4">

                {/* Dataset Upload */}
                <div>
                    <label className="block text-xs font-mono tracking-widest text-[#5B6472] uppercase mb-2">
                        Updated Dataset
                    </label>

                    <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={(e) =>
                            setFile(e.target.files[0] || null)
                        }
                        className="block w-full text-sm text-[#8B93A1]
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded file:border-0
                                   file:bg-[#1C2638]
                                   file:text-white
                                   file:cursor-pointer
                                   border border-[#232933]
                                   rounded-md p-2
                                   bg-[#161B24]"
                    />
                </div>

                {/* Target Column */}
                <div>
                    <label className="block text-xs font-mono tracking-widest text-[#5B6472] uppercase mb-2">
                        Target Column
                    </label>

                    <input
                        type="text"
                        placeholder="Optional"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full sm:w-80
                                   bg-[#161B24]
                                   border border-[#232933]
                                   rounded-md
                                   px-3 py-2.5
                                   text-sm text-white
                                   placeholder-[#5B6472]
                                   focus:outline-none
                                   focus:border-[#5B8DEF]"
                    />
                </div>

                {/* Train Button */}
                <button
                    onClick={handleTrain}
                    disabled={loading}
                    className="bg-[#5B8DEF]
                               hover:bg-[#4A7FE0]
                               disabled:bg-[#303743]
                               disabled:text-[#6B7280]
                               text-white
                               px-5 py-2.5
                               rounded-md
                               text-sm font-medium
                               transition
                               disabled:cursor-not-allowed"
                >
                    {loading ? "Training..." : "Train Model"}
                </button>

                {/* Error */}
                {error && (
                    <p className="text-sm text-[#E0645B]">
                        {error}
                    </p>
                )}

            </div>

        </div>
    );
}

export default MLUploadSection;