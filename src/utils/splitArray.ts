/* eslint-disable @typescript-eslint/no-explicit-any */
type OriginalArrayType = Array<any>

export default function splitArray(originalArray: OriginalArrayType, offset = 100):Array<Array<any>> {
  if (!originalArray) {
    return [[]];
  }

  const splitedArray = [];
  let subArray = [];

  for (let i = 0; i < originalArray?.length; i++) {
    subArray.push(originalArray[i]);
    if (subArray.length === offset || i === originalArray.length - 1) {
      splitedArray.push(subArray);
      subArray = [];
    }
  }

  return splitedArray;
}
