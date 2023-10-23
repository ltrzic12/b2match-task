import React from "react";
import dateStore from "../../stores/dateStore";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className='calendar-header'>
      <button
        onClick={() => {
          const newDate = dateStore.currentDate.minus({ months: 1 });
          navigate(`/${newDate.toFormat("yyyy-MM")}`);
        }}>
        Previous Month
      </button>
      <span className='calendar-month'>
        {dateStore.currentDate.toFormat("MMMM yyyy")}
      </span>

      <button
        onClick={() => {
          const newDate = dateStore.currentDate.plus({ months: 1 });
          navigate(`/${newDate.toFormat("yyyy-MM")}`);
        }}>
        Next Month
      </button>
    </div>
  );
};

export default Navigation;
