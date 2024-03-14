export class AppDate {
  currentDate: Date;
  midnight: Date;
  date: Date;
  oneDayMillSec: number;

  constructor(date: Date | string) {
    this.currentDate = new Date(Date.now());
    this.date = new Date(date);
    this.midnight = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate()
    );
    this.oneDayMillSec = 1000 * 60 * 60 * 24;
    this.date = new Date(date);
  }

  buildDayMonthPostfix(dayOfMonth: number) {
    if (dayOfMonth === 1) return `${dayOfMonth}st`;
    if (dayOfMonth === 2) return `${dayOfMonth}nd`;
    if (dayOfMonth === 3) return `${dayOfMonth}rd`;
    return `${dayOfMonth}th`;
  }

  dayMonthYear() {
    const year = this.date.getFullYear();
    const month = this.date.toLocaleDateString("en-US", { month: "short" });
    const dayOfMonth = this.date.getDate();

    return `${dayOfMonth} ${month} ${year}`;
  }

  monthDayYear() {
    const year = this.date.getFullYear();
    const month = this.date.toLocaleDateString("en-US", { month: "short" });
    const dayOfMonth = this.date.getDate();

    return `${month} ${dayOfMonth}, ${year}`;
  }

  fullMonthDayYear() {
    const year = this.date.getFullYear();
    const month = this.date.toLocaleDateString("en-US", { month: "long" });
    const dayOfMonth = this.date.getDate();

    return `${month} ${dayOfMonth}, ${year}`;
  }

  weekdayMonthDate() {
    const dayOfWeek = this.date.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const month = this.date.toLocaleDateString("en-US", { month: "short" });
    const dayOfMonth = this.buildDayMonthPostfix(this.date.getDate());

    return `${dayOfWeek}, ${month} ${dayOfMonth}`;
  }

  weekday() {
    const dayOfWeek = this.date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    return `${dayOfWeek}`;
  }

  day() {
    const todayEnd = new Date(this.midnight.getTime() + this.oneDayMillSec);
    const yesterdayEnd = new Date(this.midnight.getTime() - this.oneDayMillSec);
    const date = new Date(this.date.getTime());

    if (date > this.midnight && date < todayEnd) {
      return "Today";
    }
    if (date < this.midnight && date > yesterdayEnd) {
      return "Yesterday";
    }
    if (date < yesterdayEnd) {
      return this.fullMonthDayYear();
    }
  }

  timeOrDate() {
    const todayEnd = new Date(this.midnight.getTime() + this.oneDayMillSec);
    const yesterdayEnd = new Date(this.midnight.getTime() - this.oneDayMillSec);
    const date = new Date(this.date.getTime());

    if (date > this.midnight && date < todayEnd) {
      return this.time();
    }
    if (date < this.midnight && date > yesterdayEnd) {
      return "Yesterday";
    }
    if (date < yesterdayEnd) {
      return this.monthDayYear();
    }
  }

  time() {
    return this.date.toLocaleTimeString("en-Us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  time24hourFormat() {
    const hour = this.date.getHours();
    const minute = this.date.getMinutes();
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    return `${formattedHour}:${formattedMinute}`;
  }

  addTimeToDate(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    const resultDate = new Date(this.date);
    resultDate.setHours(0, 0, 0, 0);

    resultDate.setHours(resultDate.getHours() + hours);
    resultDate.setMinutes(resultDate.getMinutes() + minutes);

    return resultDate.toISOString();
  }

  getWeekday() {
    const date: Date = this.date;
    const weekdays: string[] = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const weekdayIndex: number = date.getDay();
    return weekdays[weekdayIndex];
  }
}
