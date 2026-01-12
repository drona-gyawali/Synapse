import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const backendPort = () => {
  const port =
    process.env.NODE_ENV !== 'producation' ? 3000 : process.env.BACKEND_PORT;
  return Number(port);
};

export const REDIS_URL = process.env.REDIS_URL;

export const conf = {
  port: Number(process.env.PORT),
  node_env: String(process.env.NODE_ENV),
};

const mailConfigOptions = {
  host: 'smtp.resend.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.DEV_MAIL,
    pass: process.env.DEV_PASS,
  },
};

export const transporter = nodemailer.createTransport(mailConfigOptions);
