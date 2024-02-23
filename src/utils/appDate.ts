export class AppDate {
  date;

  constructor(date: Date | string) {
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
