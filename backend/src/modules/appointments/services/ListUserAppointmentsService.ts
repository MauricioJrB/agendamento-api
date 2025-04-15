import { prisma } from '../../../utils/prisma';
import { formatDateBR } from '../../../utils/formatDate';
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
      id: appointment.id,
      status: appointment.status,
      formattedDate: formatDateBR(appointment.date),
      service: {
        name: appointment.service.name,
      },
    }));

    return listAppointments;
  }
}
