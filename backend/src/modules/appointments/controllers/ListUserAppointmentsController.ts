import { Request, Response } from 'express';
import { ListUserAppointmentsService } from '../services/ListUserAppointmentsService';

export class ListUserAppointmentsController {
  public async handle(request: Request, response: Response) {
    const userId = request.user.id;

    const service = new ListUserAppointmentsService();

    const appointments = await service.execute({ userId });

    return response.status(200).json(appointments);
  }
}
