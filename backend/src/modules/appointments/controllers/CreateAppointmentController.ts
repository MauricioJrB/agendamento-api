import { Request, Response } from 'express';
import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export class CreateAppointmentController {
  public async handle(request: Request, response: Response) {
    const { date, serviceId } = request.body;
    const userId = request.user.id;

    const parsedDate = parse(date, 'dd/MM/yyyy HH:mm', new Date(), {
      locale: ptBR,
    });

    const service = new CreateAppointmentService();

    const appointment = await service.execute({
      date: parsedDate,
      serviceId,
      userId,
    });

    return response.status(201).json(appointment);
  }
}
