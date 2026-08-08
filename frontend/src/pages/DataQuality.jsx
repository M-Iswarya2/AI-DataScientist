import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";

function DataQuality() {

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

    const quality = analysis.data_quality;

    return (

        <Layout>

            <h1 className="text-3xl font-bold text-gray-800">
                Data Quality 🧹
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                {/* Duplicate Rows */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Duplicate Rows
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {quality.duplicate_rows}
                    </p>

                </div>

                {/* Missing Values */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Total Missing Values
                    </h2>

                    <p className="text-3xl font-bold mt-2">

                        {
                            Object.values(
                                quality.missing_values
                            ).reduce(
                                (sum, value) => sum + value,
                                0
                            )
                        }

                    </p>

                </div>

            </div>

            {/* Missing Values By Column */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">

                <h2 className="text-2xl font-bold mb-4">
                    Missing Values By Column
                </h2>

                {

                    Object.keys(quality.missing_values).length === 0

                        ?

                        (

                            <p className="text-green-600">
                                No missing values detected 🎉
                            </p>

                        )

                        :

                        (

                            <div className="space-y-3">

                                {

                                    Object.entries(
                                        quality.missing_values
                                    ).map(([column, value]) => (

                                        <div
                                            key={column}
                                            className="flex justify-between bg-gray-100 p-3 rounded"
                                        >

                                            <span>
                                                {column}
                                            </span>

                                            <span className="font-bold">
                                                {value}
                                            </span>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                }

            </div>

            {/* AI Insights */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">

                <h2 className="text-2xl font-bold mb-4">
                    AI Insights 🤖
                </h2>

                {

                    quality.ai_insights &&
                    quality.ai_insights.length > 0

                        ?

                        (

                            <div className="space-y-4">

                                {

                                    quality.ai_insights.map((insight, index) => (

                                        <div
                                            key={index}
                                            className="bg-gray-100 p-4 rounded-lg"
                                        >

                                            {

                                                Object.entries(insight).map(([key, value]) => (

                                                    <p
                                                        key={key}
                                                        className="mb-2"
                                                    >

                                                        <span className="font-bold capitalize">
                                                            {key.replaceAll("_", " ")}:
                                                        </span>

                                                        {" "}

                                                        {String(value)}

                                                    </p>

                                                ))

                                            }

                                        </div>

                                    ))

                                }

                            </div>

                        )

                        :

                        (

                            <p className="text-gray-500">
                                No AI insights available.
                            </p>

                        )

                }

            </div>

        </Layout>

    );

}

export default DataQuality;