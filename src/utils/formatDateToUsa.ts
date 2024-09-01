export default function formatDateToUsa(date?: string) {
  if (!date) {
    return null;
  }

  if (date.includes('-')) {
    return date;
  }
  const getFullDate = date.includes('T') ? date.split('T')[0] : date;
  const splittedDate = getFullDate.split('/');
  const year = splittedDate[2];
  const month = splittedDate[1];
  const day = splittedDate[0];

  return `${year}-${month}-${day}`;
}
