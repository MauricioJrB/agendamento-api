import { Request, Response } from 'express';
import { ListServiceService } from '../services/ListServiceService';

export class ListServiceController {
  public async handle(request: Request, response: Response) {
    const service = new ListServiceService();

    const services = await service.execute();

    return response.status(200).json(services);
  }
}
