import { CreateAppointmentDTO } from '../dtos/CreateAppointmentDTO';
import { Appointment } from '../entities/Appointment';

export interface IAppointmentRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByServiceId(serviceId: string): Promise<Appointment | null>;
  findAppointmentByDate(date: Date, id: string): Promise<Appointment | null>;
  cancel(id: string): Promise<Appointment>;
  update(id: string, data: CreateAppointmentDTO): Promise<Appointment>;
}
