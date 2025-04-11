import { Request, Response } from 'express';
import { UpdateServiceService } from '../services/UpdateServiceService';

export class UpdateServiceController {
  public async handle(request: Request, response: Response) {
    const { serviceId } = request.params;
    const { name, description } = request.body;

    const service = new UpdateServiceService();

    const result = await service.execute({ serviceId, name, description });

    return response.status(200).json(result);
  }
}
