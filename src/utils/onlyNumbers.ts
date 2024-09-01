export default function onlyNumbers(text: string) {
  return Number(text.replace(/[^0-9]/g, ''));
}
