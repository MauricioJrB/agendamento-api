import express from 'express';
import cors from 'cors';
import { userRoutes } from './modules/users/routes/userRoutes';
import { appointmentRoutes } from './modules/appointments/routes/appointmentRoutes';
import { serviceRoutes } from './modules/services/routes/servicesRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/services', serviceRoutes);

export { app };
