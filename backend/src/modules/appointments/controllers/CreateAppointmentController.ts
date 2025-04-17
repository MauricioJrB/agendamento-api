import { ptBR } from 'date-fns/locale';
import { parse } from 'date-fns';
import { prisma } from '../../../utils/prisma';
import { Request, Response } from 'express';
import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { PrismaAppointmentRepository } from '../repositories/PrismaAppointmentRepository';

export class CreateAppointmentController {
  public async handle(request: Request, response: Response) {
    try {
      const { date, serviceId } = request.body;
      const userId = request.user.id;

      const parsedDate = parse(date, 'dd/MM/yyyy HH:mm', new Date(), {
        locale: ptBR,
      });

      const repository = PrismaAppointmentRepository.build(prisma);
      const service = CreateAppointmentService.build(repository);

      const appointment = await service.execute({
        date: parsedDate,
        serviceId,
        userId,
      });

      return response.status(201).json(appointment);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }
}
