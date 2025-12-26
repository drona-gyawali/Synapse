import { UserRepo } from '../repo/userRepo';
import type { RegisterUser, LoginUser } from '../types/global';
import { hashPassword } from '../utils/crypt';
import { signinToken } from '../utils/token';
import logger from '../utils/logger';

const userRepo = new UserRepo();

export const register = async (data: RegisterUser) => {
  try {
    const _registered = await userRepo.findByEmail(data.email);
    if (_registered?.id) {
      throw new Error('User Already Exists');
    }
    const hash = await hashPassword(data.password);
    const _hashPassword: RegisterUser = {
      ...data,
      password: String(hash),
    };
    const createdUser = await userRepo.createUser(_hashPassword);
    const { password, ..._data } = createdUser;
    logger.info(`${createdUser?.username} has been registered `);
    return _data;
  } catch (error) {
    logger.error(`Registration failed for ${data.username} | details=${error}`);
    throw error;
  }
};

export const Login = async (data: LoginUser) => {
  try {
    const _registered = await userRepo.findByUsername(data.username);
    logger.debug(`userdetails=${_registered}`);
    if (!_registered?.id) {
      throw new Error('User never exists');
    }
    const payload = {
      id: _registered?.id,
      username: _registered.username,
    };
    const access_token = signinToken(payload, '3h');
    const refresh_token = signinToken(payload, '7h');
    return {
      access_token,
      refresh_token,
    };
  } catch (error) {
    logger.error(`LogIn failed for ${data.username} | details=${error}`);
  }
};
