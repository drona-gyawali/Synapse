import { prisma } from '../config/db';
import { Content, contentUpdate } from '../types/global';
import logger from '../utils/logger';
import { getErrorMessage } from '../utils/utils';

class ContentRepo {
  public async createContent(data: Content) {
    try {
      const _content = await prisma.content.create({ data });
      logger.debug(`Content generated for details=${_content} `);
      return _content;
    } catch (error) {
      logger.error(`Content Creation failed ${getErrorMessage(error)}`);
    }
  }

  public async getContent(userId: string, skip: number, limit: number) {
    try {
      const _getContent = await prisma.content.findMany({
        skip: skip,
        take: limit,
        where: { userId: userId },
        orderBy: {
          createdAt: 'desc',
        },
      });
      logger.debug(`Fetch content for ${userId} | details=${_getContent}`);
      return _getContent;
    } catch (error) {
      logger.error(`Fetch failed ${getErrorMessage(error)}`);
    }
  }

  public async getContentPublic(userId: string, skip: number, limit: number) {
    try {
      const _getContent = await prisma.content.findMany({
        skip: skip,
        take: limit,
        where: { userId: userId, isPublic: true },
        orderBy: {
          createdAt: 'desc',
        },
      });
      logger.debug(`Fetch content for ${userId} | details=${_getContent}`);
      return _getContent;
    } catch (error) {
      logger.error(`Fetch failed ${getErrorMessage(error)}`);
    }
  }

  public async deleteContentbyId(contentId: string, userId: string) {
    try {
      const _delContent = await prisma.content.deleteMany({
        where: {
          userId: userId,
          id: contentId,
        },
      });
      return _delContent.count > 0;
    } catch (error) {
      logger.error(`Deletion failed for content ${getErrorMessage(error)}`);
      return false;
    }
  }

  public async deleteAllContent(userId: string) {
    try {
      const _delContent = await prisma.content.deleteMany({
        where: {
          userId: userId,
        },
      });
      return _delContent.count > 0;
    } catch (error) {
      logger.error(`Deletion failed for content ${getErrorMessage(error)}`);
      return false;
    }
  }

  public async updateContentbyId(
    userId: string,
    contentId: string,
    input: contentUpdate
  ) {
    try {
      const _updateContent = await prisma.content.update({
        where: {
          id: contentId,
          userId: userId,
        },
        data: input,
      });
      return _updateContent;
    } catch (error) {
      logger.error(`Updation failed for content ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export { ContentRepo };
