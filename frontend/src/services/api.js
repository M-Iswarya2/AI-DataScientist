import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const analyzeDataset = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {

    const response = await api.post("/analyze", formData, {
        headers:{
            "Content-Type":"multipart/form-data",
        },
    });

    return response.data;

}
catch(error){

    console.log("API ERROR:", error.response?.data);
    console.log("STATUS:", error.response?.status);

    throw error;
}
    return response.data;
};

export const trainModel = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/train", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export default api;