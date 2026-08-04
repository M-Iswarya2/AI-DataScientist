import { useState } from "react";

function UploadSection({ onAnalyze }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAnalyze = () => {
        if (!selectedFile) {
            alert("Please select a CSV file.");
            return;
        }

        onAnalyze(selectedFile);
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
                Upload Dataset
            </h2>

            <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="block w-full border rounded-lg p-3 mb-4"
            />

            <button
                onClick={handleAnalyze}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
                Analyze Dataset
            </button>

        </div>
    );
}

export default UploadSection;