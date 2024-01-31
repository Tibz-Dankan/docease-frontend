import { Schedule } from "../types/schedule";
import DefaultScheduleData from "../schedule/data/schedule.json";

const findSchedule = (
  schedules: Schedule[],
  weekdayNum: number
): Schedule | undefined => {
  return schedules.find((schedule) => schedule.weekdayNum === weekdayNum);
};

export const buildScheduleList = (schedules: Schedule[]): Schedule[] => {
  const defaultSchedules: any = DefaultScheduleData.schedules;

  defaultSchedules.map((schedule: Schedule, index: number) => {
    const sched = findSchedule(schedules, schedule.weekdayNum);

    if (!sched) return;

    defaultSchedules[index] = sched;
  });

  return defaultSchedules;
};
