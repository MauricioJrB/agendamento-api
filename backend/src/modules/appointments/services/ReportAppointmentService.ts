import { prisma } from '../../../utils/prisma';
import { startOfDay, endOfDay, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ReportAppointmentDTO } from '../dtos/ReportAppointmentDTO';

export class ReportAppointmentService {
  public async execute({ date }: ReportAppointmentDTO) {
    // Converte de 'dd/MM/yyyy' para Date corretamente no fuso
    const parsedDate = parse(date, 'dd/MM/yyyy', new Date(), { locale: ptBR });

    // Cria intervalo de início e fim do dia em UTC
    const start = new Date(parsedDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(parsedDate);
    end.setUTCHours(23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    const total = appointments.length;
    const scheduled = appointments.filter(
      (a) => a.status === 'SCHEDULED'
    ).length;
    const cancelled = appointments.filter(
      (a) => a.status === 'CANCELLED'
    ).length;
    const completed = appointments.filter(
      (a) => a.status === 'COMPLETED'
    ).length;

    return {
      total,
      scheduled,
      cancelled,
      completed,
    };
  }
}
