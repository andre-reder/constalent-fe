import intervalToDuration from 'date-fns/intervalToDuration';

export default function differenceBetweenDates(startDate: string) {
  const today = new Date();
  today.setHours(today.getHours() - 3);
  const todayFormatted = today.toJSON().slice(0, 10);
  const currentDay = Number(todayFormatted.split('-')[2]);
  const currentMonth = Number(todayFormatted.split('-')[1]);
  const currentYear = Number(todayFormatted.split('-')[0]);

  const startDay = Number(startDate?.split('/')[0]);
  const startMonth = Number(startDate?.split('/')[1]);
  const startYear = Number(startDate?.split('/')[2]);

  const datesDistance = intervalToDuration({
    end: new Date(currentYear, Number(currentMonth - 1), currentDay),
    start: new Date(startYear, Number(startMonth - 1), startDay),
  });

  return {
    years: datesDistance.years,
    months: datesDistance.months,
    days: datesDistance.days,
  };
}
