export default function isAgeValid(age: number, isRecordedClass: number) {
  const minAge = isRecordedClass ? 0 : 3;
  const maxAge = 12;

  return !((age < minAge || age > maxAge));
}
