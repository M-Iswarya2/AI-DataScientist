import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import DatasetSummary from "./pages/DatasetSummary";
import DataQuality from "./pages/DataQuality";
import Statistics from "./pages/Statistics";
import FeatureAnalysis from "./pages/FeatureAnalysis";
import RelationshipAnalysis from "./pages/RelationshipAnalysis";
import OutlierAnalysis from "./pages/OutlierAnalysis";
import TargetDetection from "./pages/TargetDetection";
import TypeDetection from "./pages/TypeDetection";
import Preprocessing from "./pages/Preprocessing";
import ModelSelection from "./pages/ModelSelection";
import Visualization from "./pages/Visualization";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dataset-summary" element={<DatasetSummary />} />
      <Route path="/data-quality" element={<DataQuality />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/feature-analysis" element={<FeatureAnalysis />} />
      <Route path="/visualization" element={<Visualization />} />
      <Route path="/relationship-analysis" element={<RelationshipAnalysis />} />
      <Route path="/outlier-analysis" element={<OutlierAnalysis />} />
      <Route path="/target-detection" element={<TargetDetection />} />
      <Route path="/type-detection" element={<TypeDetection />} />
      <Route path="/preprocessing" element={<Preprocessing />} />
      <Route path="/model-selection" element={<ModelSelection />} />
    </Routes>
  );
}

export default App;