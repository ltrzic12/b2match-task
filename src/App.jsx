import { Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path={"/"} element={<Calendar></Calendar>}></Route>
      </Routes>
    </div>
  );
};

export default App;
