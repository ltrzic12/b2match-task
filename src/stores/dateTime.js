import { action, makeObservable, observable } from "mobx";
import { DateTime } from "luxon";

class DataTime {
  currentDate = DateTime.local();

  constructor() {
    makeObservable(this, {
      currentDate: observable,
      setCurrentDate: action,
    });
  }

  setCurrentDate(newDate) {
    this.currentDate = newDate;
  }
}

const dateTimeData = new DataTime();

export default dateTimeData;
