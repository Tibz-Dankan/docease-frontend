import { Schedule } from "../types/schedule";

const getWeekDay = (weekdayNum: number): string | null => {
  switch (weekdayNum) {
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
    case 7:
      return "seven";
    default:
      return null;
  }
};

const findSchedule = (
  schedules: Schedule[],
  weekdayNum: number
): Schedule | undefined => {
  return schedules.find((schedule) => schedule.weekdayNum === weekdayNum);
};

export const buildScheduleList = (schedules: Schedule[]): Schedule[] => {
  const scheduleList: Schedule[] = [];

  const defaultSchedule: Schedule = {
    scheduleId: "",
    userId: "",
    weekday: "",
    weekdayNum: 0,
    createdAt: "",
    updatedAt: "",
    scheduleTime: [],
  };
  const weekdayNumList = [1, 2, 3, 4, 5, 6, 7];

  weekdayNumList.map((weekdayNum) => {
    const schedule = findSchedule(schedules, weekdayNum);
    if (schedule) {
      scheduleList.push(schedule);
      return;
    }

    if (!schedule) {
      defaultSchedule.weekday = getWeekDay(weekdayNum)!;
      scheduleList.push(defaultSchedule);
    }
  });

  return scheduleList;
};
