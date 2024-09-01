export default function isValidBrDateString(dateString: string): boolean {
  // Verifica se a string possui o formato correto
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!dateRegex.test(dateString)) {
    return false;
  }

  // Divide a string em dia, mês e ano
  const [day, month, year] = dateString.split('/').map(Number);

  // Verifica se o dia, mês e ano são válidos
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000) {
    return false;
  }

  // Verifica fevereiro em anos bissextos
  if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return day <= 29;
    } else {
      return day <= 28;
    }
  }

  // Verifica meses com 30 ou 31 dias
  if ([4, 6, 9, 11].includes(month)) {
    return day <= 30;
  }

  return true;
}
