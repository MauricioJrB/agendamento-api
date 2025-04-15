import { ptBR } from 'date-fns/locale';
import { prisma } from '../../../utils/prisma';
import { ListAppointmentsByDateDTO } from '../dtos/ListAppointmentsByDateDTO';
import { parse, startOfDay, endOfDay } from 'date-fns';

export class ListAppointmentsByDateService {
  public async execute({ date }: ListAppointmentsByDateDTO) {
    const parsedDate = parse(date, 'dd/MM/yyyy', new Date(), { locale: ptBR });

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay(parsedDate),
          lte: endOfDay(parsedDate),
        },
      },
      include: {
        service: true,
        user: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return appointments.map((appointment) => ({
      id: appointment.id,
      status: appointment.status,
      date: appointment.date,
      user: {
        name: appointment.user.name,
        email: appointment.user.email,
      },
      service: {
        name: appointment.service.name,
      },
    }));
  }
}
