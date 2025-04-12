import { prisma } from '../../../utils/prisma';
import { CheckAvailabilityDTO } from '../dtos/CheckAvailabilityDTO';
import { endOfDay, isEqual, startOfDay } from 'date-fns';

export class CheckAvailabilityService {
  public async execute({ serviceId, date }: CheckAvailabilityDTO) {
    const searchDate = new Date(date);
    const appointment = await prisma.appointment.findMany({
      where: {
        serviceId,
        date: {
          gte: startOfDay(searchDate),
          lte: endOfDay(searchDate),
        },
        status: 'SCHEDULED',
      },
    });

    // Considerando horário comercial das 8h às 17h
    const shedule = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    // Verificando se há disponibilidade no horário comercial
    const availability = shedule.map((hour) => {
      const appointmentTime = new Date(searchDate);
      appointmentTime.setHours(hour, 0, 0, 0);

      // Verifica se já existe agendamento nesse horário e retorna true/false
      const hasAppointment = appointment.some((appt) =>
        isEqual(new Date(appt.date).getTime(), appointmentTime.getTime())
      );

      return {
        time: `${hour}:00`,
        available: !hasAppointment,
      };
    });

    return availability;
  }
}
