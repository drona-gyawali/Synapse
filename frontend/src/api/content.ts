import { Post, Get, queryGet, delContent, Put } from './api';
import type { contentformField } from '../types/formTypes';
import { logger } from '../utils/logger';

export const createContent = async (data: contentformField) => {
  try {
    const contentCreated = await Post('content', data);
    if (!contentCreated) {
      return ' Content Creation failed';
    }
    return contentCreated;
  } catch (error) {
    logger(`content creation failed  | detail=${error}`);
  }
};

export const getContent = async () => {
  try {
    const fetchContent = await Get('content');
    if (!fetchContent) {
      return 'Fetch content Falied';
    }
    console.log(fetchContent.details);

    return fetchContent;
  } catch (error) {
    logger(`fetched creation failed  | detail=${error}`);
  }
};

export const getContentbyTab = async (tab: string) => {
  try {
    const fetchContent = await queryGet('content-type', `type=${tab}`);
    if (!fetchContent) {
      return 'Fetch content Falied';
    }
    return fetchContent;
  } catch (error) {
    logger(`fetch content failed  | detail=${error}`);
  }
};

export const delContentbyId = async (id: string) => {
  try {
    const _delContent = await delContent('content', id);
    if (!_delContent) {
      return 'Deletion content failed';
    }
    return _delContent;
  } catch (error) {
    logger(`Delete content failed  | detail=${error}`);
  }
};

export const UpdateContent = async (id: string, data: contentformField) => {
  try {
    const updated = await Put('content', id, data);
    if (!updated) {
      return ' Content updation failed';
    }
    return updated;
  } catch (error) {
    logger(`content updation failed  | detail=${error}`);
  }
};
