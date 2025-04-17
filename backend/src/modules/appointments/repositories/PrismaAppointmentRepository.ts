import { prisma } from '../../../utils/prisma';
import { Appointment } from '../entities/Appointment';
import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDTO } from '../dtos/CreateAppointmentDTO';
import { IAppointmentRepository } from '../interfaces/IAppointmentRepository';

export class PrismaAppointmentRepository implements IAppointmentRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new PrismaAppointmentRepository(prisma);
  }

  public async create(data: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = await prisma.appointment.create({
      data: {
        date: data.date,
        status: 'SCHEDULED',
        userId: data.userId,
        serviceId: data.serviceId,
      },
    });
    return new Appointment(
      appointment.id,
      appointment.date,
      appointment.status,
      appointment.userId,
      appointment.serviceId,
      appointment.createdAt
    );
  }

  public async findByServiceId(serviceId: string): Promise<Appointment | null> {
    const appointment = await prisma.appointment.findUnique({
      where: { id: serviceId },
    });

    if (!appointment) return null;

    return new Appointment(
      appointment.id,
      appointment.date,
      appointment.status,
      appointment.userId,
      appointment.serviceId,
      appointment.createdAt
    );
  }

  public async findAppointmentByDate(
    date: Date,
    id: string
  ): Promise<Appointment | null> {
    const appointment = await prisma.appointment.findFirst({
      where: { date: date, id },
    });

    if (!appointment) return null;

    return new Appointment(
      appointment.id,
      appointment.date,
      appointment.status,
      appointment.userId,
      appointment.serviceId,
      appointment.createdAt
    );
  }

  public async cancel(id: string): Promise<Appointment> {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    return new Appointment(
      appointment.id,
      appointment.date,
      appointment.status,
      appointment.userId,
      appointment.serviceId,
      appointment.createdAt
    );
  }
  public async update(
    id: string,
    data: CreateAppointmentDTO
  ): Promise<Appointment> {
    const appointment = await prisma.appointment.update({
      where: { id },
      data,
    });

    return new Appointment(
      appointment.id,
      appointment.date,
      appointment.status,
      appointment.userId,
      appointment.serviceId,
      appointment.createdAt
    );
  }
}
