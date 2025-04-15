import { Request, Response } from 'express';
import { ListAppointmentsByDateService } from '../services/ListAppointmentsByDateService';

export class ListAppointmentsByDateController {
  public async handle(request: Request, response: Response) {
    const { date } = request.body;

    const service = new ListAppointmentsByDateService();
    const appointments = await service.execute({ date });

    return response.status(200).json(appointments);
  }
}
