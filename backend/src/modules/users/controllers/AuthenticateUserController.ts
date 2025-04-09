import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export class AuthenticateUserController {
  public async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const service = new AuthenticateUserService();

    const user = await service.execute({ email, password });

    return response.status(200).json(user);
  }
}
