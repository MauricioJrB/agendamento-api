import { Request, Response } from 'express';
import { ReportAppointmentService } from '../services/ReportAppointmentService';

export class ReportAppointmentController {
  public async handle(request: Request, response: Response) {
    const { date } = request.query;

    const service = new ReportAppointmentService();

    const result = await service.execute({ date: String(date) });

    return response.json(result);
  }
}
