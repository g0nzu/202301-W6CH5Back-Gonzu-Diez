/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { Response, Request, NextFunction } from 'express';
import morgan from 'morgan';
import { shopRouter } from './routers/shop.router.js';
import createDebug from 'debug';
import { CustomError } from './errors/error.js';
const debug = createDebug('W6:app');
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/shop', shopRouter);

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Soy el middleware de errores');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMessage,
        },
      ],
    });
    debug(status, statusMessage, error.message);
  }
);
