import { ptBR } from 'date-fns/locale';
import { parse } from 'date-fns';
import { Request, Response } from 'express';
import { CheckAvailabilityService } from '../services/CheckAvailabilityService';

export class CheckAvailabilityController {
  public async handle(request: Request, response: Response) {
    const { serviceId, date } = request.body;

    const parseDate = parse(date, 'dd/MM/yyyy', new Date(), {
      locale: ptBR,
    });

    const service = new CheckAvailabilityService();

    const availability = await service.execute({
      serviceId,
      date: parseDate,
    });

    return response.status(200).json(availability);
  }
}
