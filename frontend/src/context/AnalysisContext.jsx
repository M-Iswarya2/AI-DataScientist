import { createContext, useContext, useState } from "react";

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
    const [analysis, setAnalysis] = useState(null);
    const [mlResult, setMlResult] = useState(null);

    return (
        <AnalysisContext.Provider
            value={{
                analysis,
                setAnalysis,
                mlResult,
                setMlResult,
            }}
        >
            {children}
        </AnalysisContext.Provider>
    );
};

export const useAnalysis = () => {
    return useContext(AnalysisContext);
};