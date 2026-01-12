import { Worker } from 'bullmq';
import { sendEmail } from '../service/emailService';
import logger from '../utils/logger';
import { bullConnection } from '../config/bull-connection';

logger.info('Email worker started and waiting for jobs...');

new Worker(
  'email',
  async (job) => {
    const { senderName, link, email } = job.data;
    await sendEmail(senderName, link, email);
  },
  { connection: bullConnection }
)
  .on('completed', (job) => {
    logger.info(`Email sent for job ${job.id}`);
  })
  .on('failed', (job, err) => {
    logger.error(`Email failed for job ${job?.id} | ${err.message}`);
  });
