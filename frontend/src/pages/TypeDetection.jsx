import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";


function TypeDetection() {

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


    const type = analysis.type_detection || {};


    return (

        <Layout>


            <h1 className="text-3xl font-bold text-gray-800">
                Type Detection 🤖
            </h1>



            {/* Problem Type Cards */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">


                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Problem Type
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {type.problem_type || "N/A"}
                    </p>

                </div>



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Confidence
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {type.confidence}%
                    </p>

                </div>



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Classification Score
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {type.classification_score}
                    </p>

                </div>



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Regression Score
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {type.regression_score}
                    </p>

                </div>


            </div>




            {/* Reasons */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">


                <h2 className="text-2xl font-bold mb-4">
                    Detection Reasons
                </h2>


                {
                    type.reasons?.length > 0 ?

                    type.reasons.map((reason,index)=>(

                        <p
                            key={index}
                            className="bg-gray-100 p-3 rounded mb-2"
                        >
                            • {reason}
                        </p>

                    ))

                    :

                    <p className="text-gray-500">
                        No additional reasons provided.
                    </p>

                }


            </div>




            {/* AI Insights */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">


                <h2 className="text-2xl font-bold mb-4">
                    AI Insights 🤖
                </h2>



                {
                    type.ai_insights?.length > 0 ?

                    type.ai_insights.map((insight,index)=>(

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


export default TypeDetection;