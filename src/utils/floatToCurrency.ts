export default function floatToCurrency(value: number | string | undefined): string | null {
  if (!value) {
    return null;
  }
  if (typeof value === 'string' && isNaN(Number(value))) {
    return value;
  }

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'BRL',
  };

  return value?.toLocaleString('pt-BR', options);
}
