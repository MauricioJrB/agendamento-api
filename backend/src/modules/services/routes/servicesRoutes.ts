import { Request, Response, Router } from 'express';
import { CreateServiceController } from '../controllers/CreateServiceController';
import { authenticateToken } from '../../../middlewares/authenticateToken';
import { UpdateServiceController } from '../controllers/UpdateServiceController';
import { ListServiceController } from '../controllers/ListServiceController';

const serviceRoutes = Router();

const createServiceController = new CreateServiceController();
const updateServiceController = new UpdateServiceController();
const listServiceController = new ListServiceController();

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

serviceRoutes.get('/', (request: Request, response: Response) => {
  listServiceController.handle(request, response);
});

export { serviceRoutes };
