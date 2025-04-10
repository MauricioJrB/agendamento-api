import { authenticateToken } from '../../../middlewares/authenticateToken';
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

userRoutes.get(
  '/profile',
  authenticateToken,
  (request: Request, response: Response) => {
    response.status(200).json({ message: `Hello, user ${request.user.id}` });
  }
);

export { userRoutes };
