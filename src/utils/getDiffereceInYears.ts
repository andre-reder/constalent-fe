import { intervalToDuration } from "date-fns";

export default function getDiffereceInYears(date1: Date, date2: Date) {
  const differenceBetweenDates = (intervalToDuration({
    start: date1,
    end: date2,
  }))

  return differenceBetweenDates?.years;
}
