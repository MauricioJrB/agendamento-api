import { Request, Response } from 'express';
import { CreateServiceService } from '../services/CreateServiceService';

export class CreateServiceController {
  public async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const service = new CreateServiceService();

    const result = await service.execute({ name, description });

    return response.status(201).json(result);
  }
}
