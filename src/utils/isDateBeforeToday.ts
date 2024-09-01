import differenceInDays from 'date-fns/differenceInDays';

export default function isDateBeforeToday(date: string) {
  const today = new Date();
  today.setHours(today.getHours() - 3);

  const isBeforeToday = differenceInDays(new Date(date), new Date(today)) < 0;

  return isBeforeToday;
}
