import { Response, Request, response } from 'express';
import { LoginUser, RegisterUser } from '../types/global';
import { Login, register } from '../service/auth';
import { getResponseMessage, getErrorMessage, REDIS_KEY } from '../utils/utils';
import logger from '../utils/logger';
import { CookieOptions } from 'express';
import * as redisService from '../service/redis';
import { prisma } from '../config/db';
import { emailQueue } from '../job/queue';
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
      maxAge: 604800,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    res.cookie('refresh-token', login.refresh_token, {
      maxAge: 604800,
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
    const data = { id: user?.id, username: user?.username, email: user?.email };
    if (!user) {
      return getResponseMessage(req, res, 403, 'Unauthorized access');
    }
    return getResponseMessage(req, res, 200, data);
  } catch (error) {
    logger.error(getErrorMessage(error));
    return getResponseMessage(req, res, 500, 'Internal server error');
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    const access_token = req.cookies['access-token'];
    const refresh_token = req.cookies['refresh-token'];
    if (!access_token && !refresh_token) {
      return getResponseMessage(req, res, 200, 'User logout');
    }

    const Options: CookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    };

    res.clearCookie('access-token', Options);
    res.clearCookie('refresh-token', Options);

    return getResponseMessage(req, res, 200, 'Logout operation sucessfull');
  } catch (error) {
    return getResponseMessage(
      req,
      res,
      500,
      'Internal server error during logout'
    );
  }
};

export const emailVerificationCreation = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const username = req.user?.username;
    const email = req.user?.email;
    const createHash = await redisService.createAndStoreHash(String(userId));
    if (createHash == null) {
      return getResponseMessage(req, res, 400, 'Error to create otp for user');
    }
    await emailQueue.add('send-verification', {
      senderName: username,
      link: createHash,
      email,
    });

    const constructUrl =
      process.env.NODE_ENV == 'dev'
        ? process.env.FRONTEND_VERIFICATION_DEV
        : process.env.FRONTEND_VERIFICATION_PROD;
    const link = `${constructUrl}${createHash}`;
    return getResponseMessage(req, res, 201, link);
  } catch (error) {
    throw error;
  }
};

export const emailVerficationReciver = async (req: Request, res: Response) => {
  try {
    const { hashId } = req.params;
    const userId = req?.user?.id;
    if (!hashId) {
      return getResponseMessage(req, res, 400, 'Hash missing');
    }
    const storedToken = await redisService.getToken(`${String(userId)}`);
    if (storedToken == null) {
      return getResponseMessage(req, res, 400, 'Invalid verification token');
    }
    const isVerified = await redisService.isVerifiedToken(
      String(hashId),
      String(storedToken)
    );
    if (!isVerified) {
      return getResponseMessage(req, res, 401, 'Verification failed');
    }
    const updateVerification = await prisma.user.update({
      where: { id: userId },
      data: {
        isVerified: true,
      },
    });
    logger.info(`${updateVerification.id} email has been verified`);
    return getResponseMessage(req, res, 200, 'Token verified');
  } catch (error) {
    logger.error(`Error verifying user email| details=${error}`);
    throw error;
  }
};
