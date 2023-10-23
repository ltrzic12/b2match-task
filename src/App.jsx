import React from "react";
import { Routes, Route } from "react-router-dom";

import CalendarPage from "./pages/CalendarPage";

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<CalendarPage />} />
      </Routes>
    </div>
  );
};

export default App;
