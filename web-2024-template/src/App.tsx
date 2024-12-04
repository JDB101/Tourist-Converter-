import React, { useState } from "react";
import Home from "./pages/Home"; // Import Home component
import Conversion from "./pages/Conversion";
import TranslatePage from "./pages/TranslatePage";
import ExpenseTracker from "./pages/ExpenseTrackerPage";
import Extracurriculars from "./pages/Extracurriculars";
import CulturalRecs from "./pages/CulturalRecs";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home"); // Automatically load Home page

  return (
    <div>
      {currentPage === "home" && <Home onNavigate={setCurrentPage} />}
      {currentPage === "conversion" && <Conversion onNavigate={setCurrentPage} />}
      {currentPage === "translate" && <TranslatePage onNavigate={setCurrentPage} />}
      {currentPage === "expense-tracker" && <ExpenseTracker onNavigate={setCurrentPage} />}
      {currentPage === "extracurriculars" && <Extracurriculars onNavigate={setCurrentPage} />}
      {currentPage === "cultural-recs" && <CulturalRecs onNavigate={setCurrentPage} />}
    </div>
  );
};

export default App;
