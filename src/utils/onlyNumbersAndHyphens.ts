export default function onlyNumbersAndHyphens(value: string) {
  return value.replace(/[^\d-]/g, '');
}
