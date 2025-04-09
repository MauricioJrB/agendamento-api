import { RegisterUserController } from '../controllers/RegisterUserController';
import { Request, Response, Router } from 'express';

const userRoutes = Router();
const registerUserController = new RegisterUserController();

userRoutes.post('/register', (request: Request, response: Response) => {
  registerUserController.handle(request, response);
});

export { userRoutes };
