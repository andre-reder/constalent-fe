type NumberLiterals = {
  [key: string]: string;
};

export default function dateWith0(date: string) {
  const numberLiterals: NumberLiterals = {
    1: '01',
    2: '02',
    3: '03',
    4: '04',
    5: '05',
    6: '06',
    7: '07',
    8: '08',
    9: '09',
  };
  const splittedDate = date.split('/');
  const mappedSplittedDate = splittedDate.map((number) => (
    numberLiterals[number] || number
  ));

  return `${mappedSplittedDate[0]}/${mappedSplittedDate[1]}/${mappedSplittedDate[2]}`;
}
