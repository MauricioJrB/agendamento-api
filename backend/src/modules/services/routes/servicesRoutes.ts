import { Request, Response, Router } from 'express';
import { CreateServiceController } from '../controllers/CreateServiceController';
import { authenticateToken } from '../../../middlewares/authenticateToken';
import { UpdateServiceController } from '../controllers/UpdateServiceController';

const serviceRoutes = Router();

const createServiceController = new CreateServiceController();
const updateServiceController = new UpdateServiceController();

serviceRoutes.post(
  '/',
  authenticateToken,
  (request: Request, response: Response) => {
    createServiceController.handle(request, response);
  }
);

serviceRoutes.put('/:serviceId', (request: Request, response: Response) => {
  updateServiceController.handle(request, response);
});

export { serviceRoutes };
