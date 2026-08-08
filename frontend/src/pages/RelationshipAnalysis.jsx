import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";


function RelationshipAnalysis() {

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


    const relation = analysis.relationship_analysis || {};


    return (

        <Layout>


            <h1 className="text-3xl font-bold text-gray-800">
                Relationship Analysis 🔗
            </h1>



            {/* Summary */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">


                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Total Relationships
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {
                            relation.relationship_summary
                            ?.total_relationships || 0
                        }
                    </p>

                </div>



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Positive
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {
                            relation.relationship_summary
                            ?.positive_relationships || 0
                        }
                    </p>

                </div>



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Negative
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {
                            relation.relationship_summary
                            ?.negative_relationships || 0
                        }
                    </p>

                </div>



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Strong
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {
                            relation.relationship_summary
                            ?.strong_relationships || 0
                        }
                    </p>

                </div>


            </div>




            {/* Top Relationships */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">

                <h2 className="text-2xl font-bold mb-4">
                    Top Relationships 🔥
                </h2>


                {
                    relation.top_relationships?.map(
                        (item,index)=>(

                        <div
                            key={index}
                            className="bg-gray-100 p-4 rounded-lg mb-3"
                        >

                            <p>
                                <b>
                                    Feature:
                                </b>{" "}
                                {item.feature}
                            </p>


                            <p>
                                <b>
                                    Target:
                                </b>{" "}
                                {item.target}
                            </p>


                            <p>
                                <b>
                                    Correlation:
                                </b>{" "}
                                {item.correlation.toFixed(3)}
                            </p>


                            <p>
                                <b>
                                    Strength:
                                </b>{" "}
                                {item.relationship_strength}
                            </p>


                        </div>

                    ))
                }


            </div>




            {/* Positive Relationships */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">


                <h2 className="text-2xl font-bold mb-4">
                    Positive Relationships 📈
                </h2>


                {
                    relation.positive_relationships?.map(
                        (item,index)=>(

                        <p
                            key={index}
                            className="bg-gray-100 p-3 rounded mb-2"
                        >

                            {item.feature} → {item.target}
                            {" "}
                            ({item.correlation.toFixed(2)})

                        </p>

                    ))
                }


            </div>




            {/* Negative Relationships */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">


                <h2 className="text-2xl font-bold mb-4">
                    Negative Relationships 📉
                </h2>


                {
                    relation.negative_relationships?.map(
                        (item,index)=>(

                        <p
                            key={index}
                            className="bg-gray-100 p-3 rounded mb-2"
                        >

                            {item.feature} → {item.target}
                            {" "}
                            ({item.correlation.toFixed(2)})

                        </p>

                    ))
                }


            </div>




            {/* AI Insights */}

            <div className="bg-white p-6 rounded-xl shadow mt-8">


                <h2 className="text-2xl font-bold mb-4">
                    AI Insights 🤖
                </h2>



                {
                    relation.ai_insights?.length > 0 ?

                    relation.ai_insights.map((insight,index)=>(

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


export default RelationshipAnalysis;