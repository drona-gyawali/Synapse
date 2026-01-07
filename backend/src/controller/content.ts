import {
  createContent,
  getContent,
  contentRepo,
  getContentByType,
} from '../service/content';
import { Content, contentUpdate } from '../types/global';
import { Request, Response, urlencoded } from 'express';
import { getResponseMessage, getErrorMessage } from '../utils/utils';
import logger from '../utils/logger';

export const ContentCreationRequest = async (req: Request, res: Response) => {
  try {
    const { title, content, link, tags, type, isPublic } = req.body;
    const userId = String(req?.user?.id);
    if (!title && !content && !link && !userId) {
      return getResponseMessage(req, res, 400, 'Invalid Input');
    }
    const data: Content = {
      title: title?.toLowerCase().trim(),
      content: content?.trim(),
      link: link?.trim(),
      type: type?.trim(),
      tags: Array.isArray(tags) ? tags.join(',') : tags,
      isPublic: isPublic,
      userId,
    };
    const _contentReq = await createContent(data);
    if (!_contentReq) {
      logger.debug(`Error | details=${_contentReq}`);
      return getResponseMessage(
        req,
        res,
        400,
        `Content Creation failed  | ${_contentReq}`
      );
    }
    return getResponseMessage(req, res, 201, _contentReq);
  } catch (error) {
    logger.error(
      `Unable to create Content for ${req?.user?.id} | details=${getErrorMessage(error)}`
    );
    return getResponseMessage(
      req,
      res,
      500,
      `Content failed while creating ${getErrorMessage(error)}`
    );
  }
};

export const GetContentRequest = async (req: Request, res: Response) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const userId = String(req.user?.id);
    const _getContent = await getContent(userId, Number(limit), Number(skip));
    if (!_getContent) {
      logger.debug(`Error | details=${_getContent}`);
      return getResponseMessage(
        req,
        res,
        400,
        `Content fetching failed  | ${_getContent}`
      );
    }
    return getResponseMessage(req, res, 200, {
      data: {
        content: _getContent,
      },
      pagination: {
        skip,
        limit,
      },
    });
  } catch (error) {
    logger.error(
      `Unable to fetch Content for ${req?.user?.id} | details=${getErrorMessage(error)}`
    );
    return getResponseMessage(
      req,
      res,
      500,
      `Content failed while fetching ${getErrorMessage(error)}`
    );
  }
};

export const DeleteContentRequestbyId = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;
    const userId = String(req?.user?.id);
    const _delContent = await contentRepo.deleteContentbyId(contentId, userId);
    if (!_delContent) {
      return getResponseMessage(req, res, 200, 'content never exist');
    }
    return getResponseMessage(req, res, 204, 'No content available');
  } catch (error) {
    logger.error(
      `Unable to delete Content for ${req?.user?.id} | details=${getErrorMessage(error)}`
    );
    return getResponseMessage(
      req,
      res,
      500,
      `Content failed while deleting ${getErrorMessage(error)}`
    );
  }
};

export const DeleteContentRequestbyAll = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = String(req?.user?.id);
    await contentRepo.deleteAllContent(userId);
    return getResponseMessage(req, res, 204, 'No content available');
  } catch (error) {
    logger.error(
      `Unable to delete Content for ${req?.user?.id} | details=${getErrorMessage(error)}`
    );
    return getResponseMessage(
      req,
      res,
      500,
      `Content failed while deleting ${getErrorMessage(error)}`
    );
  }
};

export const UpdateContentRequestbyId = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;

    const updatedContent: contentUpdate = req.body;
    const userId = String(req?.user?.id);
    const _updateContent = await contentRepo.updateContentbyId(
      userId,
      contentId,
      updatedContent
    );
    if (!_updateContent?.id) {
      return getResponseMessage(req, res, 400, 'Invalid Id');
    }
    return getResponseMessage(req, res, 200, _updateContent);
  } catch (error) {
    logger.error(
      `Unable to update Content for ${req?.user?.id} | details=${getErrorMessage(error)}`
    );
    return getResponseMessage(
      req,
      res,
      500,
      `Content failed while updating ${getErrorMessage(error)}`
    );
  }
};

export const GetContentType = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    const userId = String(req?.user?.id);
    if (!type || !userId) {
      return getResponseMessage(req, res, 400, 'Invalid Input');
    }

    const getContent = await getContentByType(
      type.toString(),
      userId.toString()
    );
    if (!getContent || getContent == null) {
      return getResponseMessage(req, res, 400, 'Content is not avaliable');
    }

    return getResponseMessage(req, res, 200, getContent);
  } catch (error) {
    return getResponseMessage(
      req,
      res,
      500,
      `Content failed while fetching by type ${getErrorMessage(error)}`
    );
  }
};
