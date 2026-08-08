import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";


function TargetDetection() {

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


    const target = analysis.target_detection || {};


    const aiInsights = target.ai_insights || [];


    const targetColumns = Object.entries(target)
        .filter(([key]) => key !== "ai_insights");



    return (

        <Layout>


            <h1 className="text-3xl font-bold text-gray-800">
                Target Detection 🎯
            </h1>



            {/* Target Candidates */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">


                <h2 className="text-2xl font-bold mb-4">
                    Target Candidates
                </h2>



                {
                    targetColumns.map(([column,details])=>(


                        <div
                            key={column}
                            className="bg-gray-100 p-4 rounded-lg mb-3"
                        >

                            <p>
                                <b>
                                    Column:
                                </b>{" "}
                                {column}
                            </p>


                            <p>
                                <b>
                                    Points:
                                </b>{" "}
                                {details.points}
                            </p>



                            <p className="mt-2">
                                <b>
                                    Reasons:
                                </b>
                            </p>


                            {

                                details.reasons?.map(
                                    (reason,index)=>(

                                    <p
                                        key={index}
                                        className="ml-4 text-gray-600"
                                    >
                                        • {reason}
                                    </p>

                                ))

                            }


                        </div>


                    ))
                }


            </div>




            {/* AI Insights */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">


                <h2 className="text-2xl font-bold mb-4">
                    AI Insights 🤖
                </h2>



                {
                    aiInsights.length > 0 ?

                    aiInsights.map((insight,index)=>(


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


export default TargetDetection;