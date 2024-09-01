import { DateTimeFormatOptions } from 'intl';

export default function getCurrentDateWithHyphen() {
  const options: DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  };
  const date = new Date().toLocaleDateString('pt-BR', options).replaceAll('/', '-');
  return date;
}
