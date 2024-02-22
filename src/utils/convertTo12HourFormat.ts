export const convertTo12HourFormat = (hour24String: string): string => {
  const [hourStr, minuteStr] = hour24String.split(":");
  let hour24 = parseInt(hourStr, 10);
  const minute = minuteStr || "00";
  const period = hour24 < 12 ? "AM" : "PM";

  hour24 = hour24 % 12 || 12;
  const hour12 = hour24 < 10 ? `0${hour24}` : `${hour24}`;

  return `${hour12}:${minute} ${period}`;
};
