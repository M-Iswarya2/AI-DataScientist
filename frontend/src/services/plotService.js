import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const generatePlot = async (fea1, fea2, plotType) => {
    const formData = new FormData();

    if (fea1) {
        formData.append("fea1", fea1);
    }

    if (fea2) {
        formData.append("fea2", fea2);
    }

    formData.append("plot_type", plotType);

    const response = await axios.post(
        `${API_BASE_URL}/plot`,
        formData,
        {
            responseType: "blob",
        }
    );

    return response.data;
};