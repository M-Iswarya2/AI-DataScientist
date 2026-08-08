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
        <div className="card">

            <h2>Upload Updated Dataset</h2>

            <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Target Column (Optional)"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />

            <br /><br />

            <button
                onClick={handleTrain}
                disabled={loading}
            >
                {loading ? "Training..." : "Train Model"}
            </button>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

        </div>
    );
}

export default MLUploadSection;