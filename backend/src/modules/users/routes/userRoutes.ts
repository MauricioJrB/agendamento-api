import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { RegisterUserController } from '../controllers/RegisterUserController';
import { Request, Response, Router } from 'express';

const userRoutes = Router();
const registerUserController = new RegisterUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post('/register', (request: Request, response: Response) => {
  registerUserController.handle(request, response);
});

userRoutes.post('/login', (request: Request, response: Response) => {
  authenticateUserController.handle(request, response);
});

export { userRoutes };
