import { Response, Request } from 'express';
import { LoginUser, RegisterUser } from '../types/global';
import { Login, register } from '../service/auth';
import { getResponseMessage, getErrorMessage } from '../utils/utils';
import logger from '../utils/logger';

export const RegisterRequest = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username && !email && !password) {
      return getResponseMessage(req, res, 400, 'Input Error');
    }
    const payload: RegisterUser = {
      username,
      email,
      password,
    };
    const singIn = await register(payload);
    logger.debug(`Request processed for : ${username} | details=${singIn}`);
    if (!singIn) {
      return getResponseMessage(req, res, 400, singIn || 'User already exist');
    }
    return getResponseMessage(req, res, 201, singIn);
  } catch (error: unknown) {
    logger.error(getErrorMessage(error));
    return getResponseMessage(req, res, 400, error);
  }
};

export const LoginRequest = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username && !password) {
      return getResponseMessage(req, res, 400, 'Input Error');
    }

    const payload: LoginUser = {
      username,
      password,
    };
    const login = await Login(payload);
    if (login == null) {
      return getResponseMessage(req, res, 400, 'Account is deactivated');
    }
    if (!login?.access_token) {
      return getResponseMessage(
        req,
        res,
        400,
        'Username or password doesnot match'
      );
    }
    res.cookie('access-token', login.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    res.cookie('refresh-token', login.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    return res.status(200).json({
      'access-token': login.access_token,
      'refresh-token': login.refresh_token,
    });
  } catch (error) {
    logger.error(getErrorMessage(error));
    return getResponseMessage(req, res, 500, 'Internal server error');
  }
};

export const userInfo = (req: Request, res: Response) => {
  try {
    const user = req?.user;
    const data = { id: user?.id, username: user?.username };

    if (!user) {
      return getResponseMessage(req, res, 403, 'Unauthorized access');
    }
    return getResponseMessage(req, res, 200, data);
  } catch (error) {
    logger.error(getErrorMessage(error));
    return getResponseMessage(req, res, 500, 'Internal server error');
  }
};
