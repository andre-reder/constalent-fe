export default function formatPercentage(input: string) {
  const number = parseFloat(input);
  if (Number.isNaN(number)) {
    return '';
  }
  const percentage = number > 100 ? 100 : `${Math.round(number)}`;
  return Number(percentage);
}
