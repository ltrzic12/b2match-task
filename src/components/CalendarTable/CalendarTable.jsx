import { observer } from "mobx-react";
import commitStore from "../../stores/commitStore";
import dateStore from "../../stores/dateStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const CalendarTable = ({ rows, dayClick }) => {
  return (
    <table className='calendar-table'>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((day, index) => {
              const dayCommits =
                commitStore.commits[day.toFormat("yyyy-LL-dd")];
              return (
                <td
                  key={index}
                  className={`calendar-day${
                    day.hasSame(dateStore.today, "day")
                      ? " calendar-day-highlight"
                      : ""
                  }`}
                  onClick={() => dayClick(day)}>
                  <div className='day-wrapper'>
                    <div className='day-num'>
                      <span>{day.toFormat("d")}</span>
                    </div>
                    {dayCommits && dayCommits.length > 0 && (
                      <div className='commit-message'>
                        {dayCommits[0].commit.message}
                      </div>
                    )}
                    {dayCommits && dayCommits.length > 1 && (
                      <div className='commit-dot'></div>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default observer(CalendarTable);
