import axios from 'axios';
import { BACKEND_URL } from '../utils/conf';
import { apiRoute } from './config';
import { logger } from '../utils/logger';

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const Post = async (endpointName: string, data?: any) => {
  try {
    const response = await apiClient.post(
      apiRoute({ endpoint: endpointName }),
      data
    );

    if (response.status == 404) {
      return null;
    }
    return response.data;
  } catch (error) {
    logger(
      `Error Occured in Post operation| routeName=${endpointName} | details=${error}`
    );
    return error;
  }
};

export const Get = async (endpointName: string) => {
  try {
    const response = await apiClient.get(apiRoute({ endpoint: endpointName }));
    if (response.status == 404) {
      return null;
    }
    return response.data;
  } catch (error) {
    logger(
      `Error Occured in Post operation| routeName=${endpointName} | details=${error}`
    );
    return error;
  }
};

export const queryGet = async (
  endpointName: string,
  query: string,
  data?: any
) => {
  try {
    const response = await apiClient.get(
      apiRoute({ endpoint: endpointName, query }),
      data
    );

    if (response.status == 404) {
      return null;
    }
    return response.data;
  } catch (error) {
    logger(
      `Error Occured in Post operation| routeName=${endpointName} | details=${error}`
    );
    return error;
  }
};

export const queryParams = async (
  endpointName: string,
  params: string,
  data?: any
) => {
  try {
    const response = await apiClient.get(
      apiRoute({ endpoint: endpointName, params }),
      data
    );

    if (response.status == 404) {
      return null;
    }
    return response.data;
  } catch (error) {
    logger(
      `Error Occured in Post operation| routeName=${endpointName} | details=${error}`
    );
    return error;
  }
};

export const delContent = async (
  endpointName: string,
  params: string,
  data?: any
) => {
  try {
    const response = await apiClient.delete(
      apiRoute({ endpoint: endpointName, params }),
      data
    );
    if (response.status == 404) {
      return null;
    }
    return response.data;
  } catch (error) {
    logger(
      `Error Occured in delete operation | routeName=${endpointName} | details=${error}`
    );
    return error;
  }
};

export const Put = async (
  endpointName: string,
  params?: string,
  data?: any
) => {
  try {
    const response = await apiClient.patch(
      apiRoute({ endpoint: endpointName, params }),
      data
    );

    if (response.status == 404) {
      return null;
    }
    return response.data;
  } catch (error) {
    logger(
      `Error Occured in update operation| routeName=${endpointName} | details=${error}`
    );
    return error;
  }
};

export const SettingPut = async (endpointName: string, data?: any) => {
  try {
    const response = await apiClient.put(
      apiRoute({ endpoint: endpointName }),
      data
    );

    if (response.status == 404) {
      return null;
    }
    return response.data;
  } catch (error) {
    logger(
      `Error Occured in update operation| routeName=${endpointName} | details=${error}`
    );
    return error;
  }
};
