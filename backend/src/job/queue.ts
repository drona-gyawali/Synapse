import { Queue } from 'bullmq';
import { bullConnection } from '../config/bull-connection';

export const emailQueue = new Queue('email', {
  connection: bullConnection,
});
