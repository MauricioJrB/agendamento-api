import { Request, Response, Router } from 'express';
import { CreateServiceController } from '../controllers/CreateServiceController';
import { authenticateToken } from '../../../middlewares/authenticateToken';

const serviceRoutes = Router();
const createServiceController = new CreateServiceController();

serviceRoutes.post(
  '/',
  authenticateToken,
  (request: Request, response: Response) => {
    createServiceController.handle(request, response);
  }
);

export { serviceRoutes };
