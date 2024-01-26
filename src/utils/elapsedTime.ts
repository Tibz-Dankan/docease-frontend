import { removeMinusCharPrefix } from "./removeMinusCharPrefix";

const ONE_SEC_MILL_SEC = 1000;
const ONE_MIN_MILL_SEC = 1000 * 60;
const ONE_HOUR_MILL_SEC = 1000 * 60 * 60;
const ONE_DAY_MILL_SEC = 1000 * 60 * 60 * 24;
const ONE_WEEK_MILL_SEC = 1000 * 60 * 60 * 24 * 7;
const ONE_MONTH_MILL_SEC = 1000 * 60 * 60 * 24 * 30;
const ONE_YEAR_MILL_SEC = 1000 * 60 * 60 * 24 * 365;

const seconds = (millSecs: number) => {
  const secs = millSecs / ONE_SEC_MILL_SEC;
  return Math.floor(secs);
};

const minutes = (millSecs: number) => {
  const mins = millSecs / ONE_MIN_MILL_SEC;
  return Math.floor(mins);
};

const hours = (millSecs: number) => {
  const hrs = millSecs / ONE_HOUR_MILL_SEC;
  return Math.floor(hrs);
};

const days = (millSecs: number) => {
  const dys = millSecs / ONE_DAY_MILL_SEC;
  return Math.floor(dys);
};

const weeks = (millSecs: number) => {
  const wks = millSecs / ONE_WEEK_MILL_SEC;
  return Math.floor(wks);
};

const months = (millSecs: number) => {
  const mths = millSecs / ONE_MONTH_MILL_SEC;
  return Math.floor(mths);
};

const years = (millSecs: number) => {
  const yrs = millSecs / ONE_YEAR_MILL_SEC;
  return Math.floor(yrs);
};

export const elapsedTime = (dateStr: string) => {
  const candidateDateMillSec = new Date(dateStr).getTime();
  const currentDateMillSec = new Date(Date.now()).getTime();

  const millSecDiff = currentDateMillSec - candidateDateMillSec;

  const millSecDiffWithOutMinusChar = removeMinusCharPrefix(millSecDiff);

  //   if (millSecDiff < ONE_MIN_MILL_SEC) {
  if (millSecDiffWithOutMinusChar < ONE_MIN_MILL_SEC) {
    if (seconds(millSecDiff) === 1) return "1 second";
    return `${seconds(millSecDiff)} seconds`;
  }

  //   if (millSecDiff < ONE_HOUR_MILL_SEC) {
  if (millSecDiffWithOutMinusChar < ONE_HOUR_MILL_SEC) {
    if (minutes(millSecDiff) === 1) return "1 minute";
    return `${minutes(millSecDiff)} minutes`;
  }

  //   if (millSecDiff < ONE_DAY_MILL_SEC) {
  if (millSecDiffWithOutMinusChar < ONE_DAY_MILL_SEC) {
    if (hours(millSecDiff) === 1) return "1 hour";
    return `${hours(millSecDiff)} hours`;
  }

  //   if (millSecDiff < ONE_WEEK_MILL_SEC) {
  if (millSecDiffWithOutMinusChar < ONE_WEEK_MILL_SEC) {
    if (days(millSecDiff) === 1) return "1 day";
    return `${days(millSecDiff)} days`;
  }

  //   if (millSecDiff < ONE_MONTH_MILL_SEC) {
  if (millSecDiffWithOutMinusChar < ONE_MONTH_MILL_SEC) {
    if (weeks(millSecDiff) === 1) return "1 week";
    return `${weeks(millSecDiff)} weeks`;
  }

  //   if (millSecDiff < ONE_YEAR_MILL_SEC) {
  if (millSecDiffWithOutMinusChar < ONE_YEAR_MILL_SEC) {
    if (months(millSecDiff) === 1) return "1 month";
    return `${months(millSecDiff)} months`;
  }

  //   if (millSecDiff >= ONE_YEAR_MILL_SEC) {
  if (millSecDiffWithOutMinusChar >= ONE_YEAR_MILL_SEC) {
    if (years(millSecDiff) === 1) return "1 year";
    return `${years(millSecDiff)} years`;
  }
};
