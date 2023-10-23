import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import CalendarPage from "./pages/CalendarPage";

const App = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Navigate to={`/${year}-${month}`} />} />
        <Route path='/:date' element={<CalendarPage />} />
      </Routes>
    </div>
  );
};

export default App;
