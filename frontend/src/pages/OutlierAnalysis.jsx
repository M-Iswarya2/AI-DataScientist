import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";


function OutlierAnalysis() {

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


    const outlier = analysis.outlier_analysis || {};


    return (

        <Layout>


            <h1 className="text-3xl font-bold text-gray-800">
                Outlier Analysis ⚠️
            </h1>



            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">


                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Total Outliers
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {outlier.total_outliers || 0}
                    </p>

                </div>



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Highest Outlier Column
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {outlier.highest_outlier_column || "N/A"}
                    </p>

                </div>



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Outlier Percentage
                    </h2>

                    <p className="text-3xl font-bold mt-2">

                        {
                            outlier.highest_outlier_details
                            ?.outlier_percentage || 0
                        }%

                    </p>

                </div>


            </div>




            {/* Outlier Summary Table */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">


                <h2 className="text-2xl font-bold mb-4">
                    Feature-wise Outliers
                </h2>



                <div className="overflow-auto">


                    <table className="min-w-full border">


                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-3 border">
                                    Feature
                                </th>

                                <th className="p-3 border">
                                    Count
                                </th>

                                <th className="p-3 border">
                                    Percentage
                                </th>

                            </tr>

                        </thead>



                        <tbody>


                            {
                                Object.entries(
                                    outlier.outlier_summary || {}
                                )
                                .map(([column,value])=>(

                                    <tr key={column}>


                                        <td className="p-3 border font-bold">
                                            {column}
                                        </td>


                                        <td className="p-3 border text-center">
                                            {value.outlier_count}
                                        </td>


                                        <td className="p-3 border text-center">
                                            {value.outlier_percentage}%
                                        </td>


                                    </tr>

                                ))
                            }


                        </tbody>


                    </table>


                </div>


            </div>




            {/* AI Insights */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">


                <h2 className="text-2xl font-bold mb-4">
                    AI Insights 🤖
                </h2>



                {
                    outlier.ai_insights?.length > 0 ?

                    outlier.ai_insights.map((insight,index)=>(

                        <div
                            key={index}
                            className="bg-gray-100 p-4 rounded-lg mb-3"
                        >

                            <p>
                                <b>
                                    Category:
                                </b>{" "}
                                {insight.category}
                            </p>


                            <p>
                                <b>
                                    Insight:
                                </b>{" "}
                                {insight.insight}
                            </p>


                            <p>
                                <b>
                                    Severity:
                                </b>{" "}
                                {insight.severity}
                            </p>


                        </div>

                    ))

                    :

                    <p className="text-gray-500">
                        No AI insights available.
                    </p>

                }


            </div>


        </Layout>

    );

}


export default OutlierAnalysis;