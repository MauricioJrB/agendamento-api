import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';

export function formatDateBR(date: Date) {
  return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR });
}
