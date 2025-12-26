import { ContentRepo } from '../repo/contentRepo';
import { Content } from '../types/global';
import logger from '../utils/logger';
import { getErrorMessage } from '../utils/utils';

export const contentRepo = new ContentRepo();

export const createContent = async (data: Content) => {
  try {
    const _content = await contentRepo.createContent(data);
    if (!_content && !_content!.userId) {
      throw new Error(`Unable to create Content for ${data.userId}`);
    }
    return _content;
  } catch (error) {
    logger.error(
      `Content creation failed for ${data.userId} | details=${getErrorMessage(error)}`
    );
  }
};

export const getContent = async (
  userId: string,
  limit: number,
  skip: number
) => {
  try {
    const _getContent = await contentRepo.getContent(userId, skip, limit);
    if (!_getContent) {
      throw new Error(`Unable to fetch Content for ${userId}`);
    }
    return _getContent;
  } catch (error) {
    logger.error(
      `Content failed to fetch for ${userId} | details=${getErrorMessage(error)}`
    );
  }
};
