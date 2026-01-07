import { ContentRepo } from '../repo/contentRepo';
import { Content } from '../types/global';
import logger from '../utils/logger';
import { getErrorMessage } from '../utils/utils';
import { prisma } from '../config/db';

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

// TODO: Migrate this db state in the repository module
export const getContentByType = async (type: string, userId: string) => {
  try {
    const _getContentbyType = await prisma.content.findMany({
      where: { userId: userId, type: type },
    });
    if (!_getContentbyType) {
      return null;
    }

    return _getContentbyType;
  } catch (error) {
    logger.error(
      `Content failed to fetch for ${userId} by type | details=${getErrorMessage(error)}`
    );
  }
};
