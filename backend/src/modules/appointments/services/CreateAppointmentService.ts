import { formatDateBR } from '../../../utils/formatDate';
import { CreateAppointmentDTO } from '../dtos/CreateAppointmentDTO';
import { PrismaAppointmentRepository } from '../repositories/PrismaAppointmentRepository';

export class CreateAppointmentService {
  private constructor(readonly repository: PrismaAppointmentRepository) {}

  public static build(repository: PrismaAppointmentRepository) {
    return new CreateAppointmentService(repository);
  }

  public async execute({ date, userId, serviceId }: CreateAppointmentDTO) {
    const appointmentDate = new Date(date);

    if (appointmentDate <= new Date()) {
      throw new Error('Past dates are not allowed.');
    }
    const appointmentExists = await this.repository.findAppointmentByDate(
      appointmentDate,
      serviceId
    );

    if (appointmentExists)
      throw new Error('Appointment already exists for this date.');

    const service = await this.repository.findByServiceId(serviceId);

    if (!service) throw new Error('Service not found.');
    const data = {
      date: appointmentDate,
      userId,
      serviceId,
    };
    const appointment = await this.repository.create(data);

    const formattedDate = formatDateBR(appointment.date);

    return { appointment, formattedDate };
  }
}
