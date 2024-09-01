export default function parseCurrencyStringToFloat(formattedValue: string | undefined): number | null {
  if (!formattedValue) {
    return null;
  }

  const withoutSymbol = formattedValue.replaceAll('R$', '');
  const removeDot = withoutSymbol.replace('.', '');
  const replaceComaWithDot = removeDot.replace(',', '.');
  const removeSpaces = replaceComaWithDot.replace(/\s/g, '');

  return Number(removeSpaces);
}
