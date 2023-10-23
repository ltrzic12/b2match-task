import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import Axios from "axios";
import "./calendar.css";

const Calendar = () => {
  const today = DateTime.local();

  const [currentDate, setCurrentDate] = useState(today);
  const [commits, setCommits] = useState({});

  const fetchCommitsForMonth = async () => {
    const firstDay = currentDate.startOf("month");
    const lastDay = currentDate.endOf("month");
    const owner = "ltrzic12";
    const repo = "vehicle-grid";

    try {
      const response = await Axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        {
          params: {
            since: firstDay.toISO(),
            until: lastDay.toISO(),
          },
        },
      );

      const commitsData = response.data;
      const commitsByDate = {};

      commitsData.forEach((commit) => {
        const commitDate = DateTime.fromISO(
          commit.commit.committer.date,
        ).toFormat("yyyy-LL-dd");
        if (!commitsByDate[commitDate]) {
          commitsByDate[commitDate] = [];
        }
        commitsByDate[commitDate].push(commit);
      });

      setCommits(commitsByDate);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const prevMonth = () => {
    setCurrentDate(currentDate.minus({ months: 1 }));
  };

  const nextMonth = () => {
    setCurrentDate(currentDate.plus({ months: 1 }));
  };

  useEffect(() => {
    fetchCommitsForMonth();
  }, [currentDate]);

  const handleDayClick = (day) => {
    const dayCommits = commits[day.toFormat("yyyy-LL-dd")];
    if (dayCommits && dayCommits.length > 0) {
      const commitList = dayCommits
        .map((commit) => commit.commit.message)
        .join("\n");
      const commitWindow = window.open("", "_blank");
      commitWindow.document.write(`<pre>${commitList}</pre>`);
    }
  };

  const generateCalendar = () => {
    const firstDay = currentDate.startOf("month");
    const lastDay = currentDate.endOf("month");
    const daysInMonth = [];

    for (let day = firstDay; day <= lastDay; day = day.plus({ days: 1 })) {
      daysInMonth.push(day);
    }

    return daysInMonth;
  };

  const calendarRows = [];
  let currentRow = [];
  generateCalendar().forEach((day) => {
    if (currentRow.length === 7) {
      calendarRows.push(currentRow);
      currentRow = [];
    }
    currentRow.push(day);
  });
  if (currentRow.length > 0) {
    calendarRows.push(currentRow);
  }

  return (
    <div className='calendar-container'>
      <div className='calendar-header'>
        <button onClick={prevMonth}>Previous Month</button>
        <span className='calendar-month'>
          {currentDate.toFormat("MMMM yyyy")}
        </span>
        <button onClick={nextMonth}>Next Month</button>
      </div>
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
          {calendarRows.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, index) => (
                <td
                  key={index}
                  className={`calendar-day${
                    day.hasSame(today, "day") ? " calendar-day-highlight" : ""
                  }`}
                  onClick={() => handleDayClick(day)}>
                  {day.toFormat("d")}
                  {commits[day.toFormat("yyyy-LL-dd")] &&
                    commits[day.toFormat("yyyy-LL-dd")].length > 0 && (
                      <div className='commit-dot'></div>
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
