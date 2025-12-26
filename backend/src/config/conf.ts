import dotenv from 'dotenv';

dotenv.config();

export const backendPort = () => {
  const port =
    process.env.NODE_ENV !== 'producation' ? 3000 : process.env.BACKEND_PORT;
  return Number(port);
};
