import React, { useEffect } from "react";
import "./calendar.css";
import { observer } from "mobx-react";
import Navigation from "../Navigation/Navigation";
import CommitData from "../CommitData/CommitData";
import CalendarTable from "../CalendarTable/CalendarTable";
import commitStore from "../../stores/commitStore";
import dateStore from "../../stores/dateStore";

const Calendar = () => {
  const handleDayClick = (day) => {
    const dayCommits = commitStore.commits[day.toFormat("yyyy-LL-dd")];
    if (dayCommits && dayCommits.length > 0) {
      commitStore.setSelectedCommitData(dayCommits);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      commitStore.fetchCommitsForMonth();
    };
    fetch();
  }, [dateStore.currentDate]);

  const closeCommitData = () => {
    commitStore.setSelectedCommitData(null);
  };

  const generateCalendar = () => {
    const firstDay = dateStore.currentDate.startOf("month");
    const lastDay = dateStore.currentDate.endOf("month");
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

  const prevMonth = () => {
    dateStore.prevMonth();
  };

  const nextMonth = () => {
    dateStore.nextMonth();
  };

  return (
    <div className='calendar-container'>
      <Navigation prev={prevMonth} next={nextMonth}></Navigation>
      <CalendarTable
        rows={calendarRows}
        dayClick={handleDayClick}></CalendarTable>
      {commitStore.selectedCommitData && (
        <CommitData close={closeCommitData}></CommitData>
      )}
    </div>
  );
};

export default observer(Calendar);
