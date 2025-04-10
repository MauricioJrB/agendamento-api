import { Request, Response, Router } from 'express';
import { authenticateToken } from '../../../middlewares/authenticateToken';
import { CreateAppointmentController } from '../controllers/CreateAppointmentController';
import { CancelAppointmentController } from '../controllers/CancelAppointmentController';

const appointmentRoutes = Router();

const createAppointmentController = new CreateAppointmentController();
const cancelAppointmentController = new CancelAppointmentController();

appointmentRoutes.post(
  '/',
  authenticateToken,
  (request: Request, response: Response) => {
    createAppointmentController.handle(request, response);
  }
);

appointmentRoutes.put(
  '/cancel/:appointmentId',
  authenticateToken,
  (request: Request, response: Response) => {
    cancelAppointmentController.handle(request, response);
  }
);

export { appointmentRoutes };
