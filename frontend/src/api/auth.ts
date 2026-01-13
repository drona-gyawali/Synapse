import { Post, Get } from './api';
import { logger } from '../utils/logger';
import { type formField } from '../types/formTypes';
import { queryParams } from './api';

export async function signup(data: formField) {
  try {
    const response = await Post('register', data);
    return response;
  } catch (error) {
    logger(`Signup route failed | ${error}`);
    return error;
  }
}

export async function Login(data: formField) {
  try {
    const response = await Post('login', data);
    return response;
  } catch (error) {
    logger(`Login route failed | ${error}`);
    return error;
  }
}

export async function CheckAuth() {
  try {
    const response = await Get('info');
    console.log(response);
    if (response.code == 200 && response.details.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger(`Info route failed | ${error}`);
  }
}

export async function initateEmail() {
  const response = await Get('initate-verification');
  return response.code === 200;
}

export async function verifyEmail(hash: string) {
  const response = await queryParams('verification', hash);
  if (response.status === 400 || 401) {
    throw new Error('Verification failed');
  }
  return true;
}

export async function Info() {
  try {
    const response = await Get('info');
    if (response.code == 200 && response.details.id) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    logger(`Info route failed | ${error}`);
  }
}

export async function Logout() {
  try {
    const response = await Get('logout');
    console.log(response);
    if (response.code == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger(`logout route failed | ${error}`);
  }
}
