import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AnalysisProvider } from "./context/AnalysisContext";


ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>

        <AnalysisProvider>

            <App />

        </AnalysisProvider>

    </BrowserRouter>

);