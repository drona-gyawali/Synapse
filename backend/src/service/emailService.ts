import { transporter } from '../config/conf';
import { conf } from '../config/conf';
import nodemailer from 'nodemailer';
import { SUBJECT, TEXT } from '../utils/constant';
import { HTML } from '../template/email';
import logger from '../utils/logger';

export const sendEmail = async (
  senderName: string,
  link: string,
  receiverMail: string
) => {
  try {
    const info = await transporter.sendMail({
      from: 'Synapse <onboarding@resend.dev>',
      to: receiverMail,
      subject: SUBJECT(senderName),
      text: TEXT(senderName, link),
      html: HTML(senderName, link),
    });

    logger.info(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    logger.error(`Email error: ${String(error)}`);
    return false;
  }
};
