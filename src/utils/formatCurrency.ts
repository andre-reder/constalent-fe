export default function formatCurrency(currency?: number | string) {
  if (!currency) {
    return ''
  }
  const toNumber = (
    typeof currency === 'number'
      ? Number(currency.toFixed(2).replace(/\D/g, '')) / 100
      : Number(Number(currency.replace(/\D/g, '')).toFixed(2)) / 100);
  const valueBr = toNumber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return valueBr;
}
