import { authenticateToken } from '../../../middlewares/authenticateToken';
import { Request, Response, Router } from 'express';
import { CreateAppointmentController } from '../controllers/CreateAppointmentController';
import { CancelAppointmentController } from '../controllers/CancelAppointmentController';
import { CheckAvailabilityController } from '../controllers/CheckAvailabilityController';
import { ListUserAppointmentsController } from '../controllers/ListUserAppointmentsController';
import { ListAppointmentsByDateController } from '../controllers/ListAppointmentsByDateController ';

const appointmentRoutes = Router();

const createAppointmentController = new CreateAppointmentController();
const cancelAppointmentController = new CancelAppointmentController();
const listUserAppointmentsController = new ListUserAppointmentsController();
const checkAvailabilityController = new CheckAvailabilityController();
const listAppointmentsByDateController = new ListAppointmentsByDateController();

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

appointmentRoutes.get(
  '/',
  authenticateToken,
  (request: Request, response: Response) => {
    listUserAppointmentsController.handle(request, response);
  }
);

appointmentRoutes.post(
  '/availability',
  (request: Request, response: Response) => {
    checkAvailabilityController.handle(request, response);
  }
);

appointmentRoutes.post('/date', (request: Request, response: Response) => {
  listAppointmentsByDateController.handle(request, response);
});

export { appointmentRoutes };
