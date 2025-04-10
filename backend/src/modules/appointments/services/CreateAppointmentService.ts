import { prisma } from '../../../utils/prisma';
import { formatDateBR } from '../../../utils/formatDate';
import { CreateAppointmentDTO } from '../dtos/CreateAppointmentDTO';

export class CreateAppointmentService {
  public async execute({ date, userId, serviceId }: CreateAppointmentDTO) {
    const appointmentDate = new Date(date);

    if (appointmentDate <= new Date()) {
      throw new Error('Past dates are not allowed.');
    }

    const appointmentExists = await prisma.appointment.findFirst({
      where: { date: appointmentDate, serviceId },
    });

    if (appointmentExists)
      throw new Error('Appointment already exists for this date.');

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) throw new Error('Service not found.');

    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        userId,
        serviceId,
        status: 'SCHEDULED',
      },
    });

    const formattedDate = formatDateBR(appointment.date);

    return { appointment, formattedDate };
  }
}
