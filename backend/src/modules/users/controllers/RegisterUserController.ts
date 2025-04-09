import { Request, Response } from 'express';
import { RegisterUserService } from '../services/RegisterUserService';

export class RegisterUserController {
  public async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const service = new RegisterUserService();
    const user = await service.execute({ name, email, password });

    return response.status(201).json(user);
  }
}
