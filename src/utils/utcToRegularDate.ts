import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export default function utcToRegularDate(dateUTC: Date | undefined) {
  if (!dateUTC) {
    return null
  }
  const saoPauloTimeZone = 'America/Sao_Paulo';
  const dateZoned = utcToZonedTime(dateUTC, saoPauloTimeZone);
  const formattedDate = format(dateZoned, 'dd/MM/yyyy');
  return formattedDate;
}
