import { Request, Response } from 'express';
import { CancelAppointmentService } from '../services/CancelAppointmentService';

export class CancelAppointmentController {
  public async handle(request: Request, response: Response) {
    const { appointmentId } = request.params;

    const service = new CancelAppointmentService();
    const result = await service.execute({ appointmentId });

    return response.status(200).json(result);
  }
}
