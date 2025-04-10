import { formatDateBR } from '../../../utils/formatDate';
import { prisma } from '../../../utils/prisma';
import { ListUserAppointmentsDTO } from '../dtos/ListUserAppointmentsDTO';

export class ListUserAppointmentsService {
  public async execute({ userId }: ListUserAppointmentsDTO) {
    const appointments = await prisma.appointment.findMany({
      where: { userId },
      include: {
        service: true,
      },
      orderBy: { date: 'asc' },
    });

    const listAppointments = appointments.map((appointment) => ({
      ...appointment,
      formattedDate: formatDateBR(appointment.date),
    }));

    return listAppointments;
  }
}
