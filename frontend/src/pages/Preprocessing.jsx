import { useAnalysis } from "../context/AnalysisContext";
import Layout from "../components/Layout";
import MLUploadSection from "../components/MLUploadSection";

function Preprocessing() {

    const { mlResult } = useAnalysis();

    if (!mlResult) {
        return (
            <Layout>

                <div className="page-container">

                    <h1>Preprocessing</h1>

                    <MLUploadSection />

                    <div className="card">
                        <p>
                            Upload the updated dataset and train the model
                            to view preprocessing details.
                        </p>
                    </div>

                </div>

            </Layout>
        );
    }

    const preprocessing = mlResult.preprocessing;

    return (

        <Layout>

            <div className="page-container">

                <h1>Preprocessing</h1>

                <MLUploadSection />

                <div className="card">

                    <h2>Preprocessing Summary</h2>

                    <table className="data-table">

                        <tbody>

                            <tr>
                                <td>Target Column</td>
                                <td>{preprocessing.target_column}</td>
                            </tr>

                            <tr>
                                <td>Problem Type</td>
                                <td>{preprocessing.problem_type}</td>
                            </tr>

                            <tr>
                                <td>Training Shape</td>
                                <td>
                                    {preprocessing.train_shape.join(" × ")}
                                </td>
                            </tr>

                            <tr>
                                <td>Testing Shape</td>
                                <td>
                                    {preprocessing.test_shape.join(" × ")}
                                </td>
                            </tr>

                            <tr>
                                <td>Scaling</td>
                                <td>
                                    {preprocessing.scaling || "None"}
                                </td>
                            </tr>

                            <tr>
                                <td>Encoding</td>
                                <td>
                                    {preprocessing.encoding || "None"}
                                </td>
                            </tr>

                            <tr>
                                <td>Numeric Columns</td>
                                <td>
                                    {preprocessing.numeric_columns.join(", ")}
                                </td>
                            </tr>

                            <tr>
                                <td>Categorical Columns</td>
                                <td>
                                    {
                                        preprocessing.categorical_columns.length
                                            ? preprocessing.categorical_columns.join(", ")
                                            : "None"
                                    }
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

                <div className="card">

                    <h2>Missing Value Handling</h2>

                    <table className="data-table">

                        <thead>

                            <tr>
                                <th>Column</th>
                                <th>Method</th>
                                <th>Value Used</th>
                            </tr>

                        </thead>

                        <tbody>

                            {
                                Object.entries(
                                    preprocessing.missing_value_handling
                                ).map(([column, details]) => (

                                    <tr key={column}>

                                        <td>{column}</td>

                                        <td>{details.method}</td>

                                        <td>{details.value}</td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>

    );

}

export default Preprocessing;