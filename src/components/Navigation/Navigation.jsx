import dateStore from "../../stores/dateStore";

const Navigation = ({ prev, next }) => {
  return (
    <div className='calendar-header'>
      <button onClick={prev}>Previous Month</button>
      <span className='calendar-month'>
        {dateStore.currentDate.toFormat("MMMM yyyy")}
      </span>
      <button onClick={next}>Next Month</button>
    </div>
  );
};

export default Navigation;
