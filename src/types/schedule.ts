export type ScheduleTime = {
  scheduleTimeId: string;
  scheduleId: string;
  start: string;
  end: string;
  createdAt: string;
  updatedAt: string;
};

export type Schedule = {
  scheduleId: string;
  userId: string;
  weekday: string;
  weekdayNum: number;
  createdAt: string;
  updatedAt: string;
  scheduleTime: ScheduleTime[] | never[];
};
