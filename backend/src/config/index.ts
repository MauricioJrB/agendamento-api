import dotenv from 'dotenv';
dotenv.config();

import { createLocalConfig } from './envs/local';

export const config = createLocalConfig();
