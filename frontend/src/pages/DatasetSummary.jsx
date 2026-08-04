import Layout from "../components/Layout";
import { useAnalysis } from "../context/AnalysisContext";


function DatasetSummary() {

    const { analysis } = useAnalysis();


    if (!analysis) {
        return (

            <Layout>

                <h1 className="text-3xl font-bold">
                    No Dataset Uploaded
                </h1>

                <p className="mt-2 text-gray-500">
                    Upload a dataset from Dashboard first.
                </p>

            </Layout>

        );
    }


    const summary = analysis.dataset_summary;


    return (

        <Layout>

            <h1 className="text-3xl font-bold text-gray-800">
                Dataset Summary 📊
            </h1>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">


                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Rows
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {summary.num_rows}
                    </p>

                </div>



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Columns
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {summary.num_columns}
                    </p>

                </div>



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Memory Usage
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {summary.memory_usage.toFixed(2)} MB
                    </p>

                </div>


            </div>



            <div className="bg-white p-6 rounded-xl shadow mt-8">

                <h2 className="text-2xl font-bold mb-4">
                    Columns
                </h2>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    {
                        summary.column_names.map((column)=>(

                            <div
                                key={column}
                                className="bg-gray-100 p-3 rounded"
                            >
                                {column}
                            </div>

                        ))
                    }

                </div>

            </div>


        </Layout>

    );

}


export default DatasetSummary;