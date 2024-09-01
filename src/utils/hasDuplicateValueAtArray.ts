// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MyArray = Array<string> | Array<object> | Array<Array<any>>;

export default function hasDuplicates(array: MyArray): boolean {
  const stringifiedArray = array.map((index) => JSON.stringify(index));
  return (new Set(stringifiedArray)).size !== stringifiedArray.length;
}
