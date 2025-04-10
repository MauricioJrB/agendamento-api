import { differenceInMinutes, isBefore } from 'date-fns';
import { prisma } from '../../../utils/prisma';
import { CancelAppointmentDTO } from '../dtos/CancelAppointmentDTO';

export class CancelAppointmentService {
  public async execute({ appointmentId }: CancelAppointmentDTO) {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) throw new Error('Agendamento não encontrado.');

    if (appointment.status === 'CANCELLED')
      throw new Error('Este agendamento já está cancelado.');

    const now = new Date();
    const appointmentDate = new Date(appointment.date);

    if (isBefore(appointmentDate, now))
      throw new Error('Agendamento já passou.');

    const minutesUntilAppointment = differenceInMinutes(appointmentDate, now);

    if (minutesUntilAppointment < 60)
      throw new Error(
        'Cancelamentos só são permitidos com pelo menos 1 hora de antecedência.'
      );

    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CANCELLED' },
    });

    return updated;
  }
}
