import { DateTime } from "luxon";
import { action, makeObservable, observable } from "mobx";

class DateStore {
  today = DateTime.local();
  currentDate = this.today;

  constructor() {
    makeObservable(this, {
      today: observable,
      currentDate: observable,

      setCurrentDate: action,
      prevMonth: action,
      nextMonth: action,
    });
  }

  setCurrentDate(date) {
    this.currentDate = date;
  }

  prevMonth = () => {
    this.setCurrentDate(this.currentDate.minus({ months: 1 }));
  };

  nextMonth = () => {
    this.setCurrentDate(this.currentDate.plus({ months: 1 }));
  };
}

const dateStore = new DateStore();
export default dateStore;
