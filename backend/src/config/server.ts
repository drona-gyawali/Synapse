import Server from 'express';
import { requestLogger } from '../middleware/loggerMiddleware';
import logger from '../utils/logger';
import { backendPort } from './conf';
import morgan from 'morgan';
import { handleFatalError } from '../utils/utils';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import apis from '../route/index';

const app = Server();
app.use(requestLogger);
app.use(Server.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(
  morgan('dev', {
    stream: {
      write: (message: unknown) => {
        logger.info(message);
      },
    },
  })
);

app.use('/api/v1/', apis);

app.listen(backendPort(), () => {
  logger.info(
    'Server is running on http://localhost:' +
      (backendPort() || backendPort()) +
      '/'
  );

  process.on('unhandledRejection', handleFatalError);
  process.on('SIGTERM', handleFatalError);
});
