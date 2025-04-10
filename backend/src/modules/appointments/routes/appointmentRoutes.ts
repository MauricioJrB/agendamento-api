import { Request, Response, Router } from 'express';
import { authenticateToken } from '../../../middlewares/authenticateToken';
import { CreateAppointmentController } from '../controllers/CreateAppointmentController';

const appointmentRoutes = Router();

const createAppointmentController = new CreateAppointmentController();

appointmentRoutes.post(
  '/',
  authenticateToken,
  (request: Request, response: Response) => {
    createAppointmentController.handle(request, response);
  }
);

export { appointmentRoutes };
