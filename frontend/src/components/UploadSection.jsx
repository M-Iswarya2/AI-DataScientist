import { useState } from "react";

function UploadSection({ onAnalyze }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0] || null);
    };

    const handleAnalyze = () => {
        if (!selectedFile) {
            alert("Please select a CSV or Excel file.");
            return;
        }

        onAnalyze(selectedFile);
    };

    return (
        <div className="bg-[#12161D] border border-[#232933] rounded-md p-6 mb-8">

            <h2 className="text-xl font-semibold text-white mb-4">
                Upload Dataset
            </h2>

            <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-[#8B93A1]
                           file:mr-4 file:py-2 file:px-4
                           file:rounded file:border-0
                           file:bg-[#1C2638] file:text-white
                           file:cursor-pointer
                           border border-[#232933] rounded-md
                           p-2 mb-4 bg-[#161B24]"
            />

            <button
                onClick={handleAnalyze}
                className="bg-[#5B8DEF] hover:bg-[#4A7FE0]
                           text-white px-5 py-2.5 rounded-md
                           text-sm font-medium transition"
            >
                Analyze Dataset
            </button>

        </div>
    );
}

export default UploadSection;