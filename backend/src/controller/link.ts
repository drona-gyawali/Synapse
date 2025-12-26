import { LinkRepo } from '../repo/linkRepo';
import logger from '../utils/logger';
import { Request, Response } from 'express';
import { getErrorMessage, getResponseMessage } from '../utils/utils';
import { Link, linkUpdate } from '../types/global';
import { randomUUID } from 'crypto';
import { contentRepo } from '../service/content';

const link = new LinkRepo();

export const shareRequest = async (req: Request, res: Response) => {
  try {
    const { share } = req.query;
    const _share: string = String(share);
    let linkCreated;
    if (_share === 'true') {
      const data: Link = {
        hash: randomUUID(),
        userId: String(req?.user?.id),
      };
      linkCreated = await link.createLink(data);
      logger.info(
        `Link created  for ${req?.user?.id}| details:${linkCreated?.userId}`
      );
    } else {
      const delLink = await link.deleteLink(String(req?.user?.id));
      logger.info(`Link deleted for ${req?.user?.id} | status=${delLink}`);
    }
    return getResponseMessage(
      req,
      res,
      200,
      _share == 'false' ? 'Link removed' : linkCreated?.hash
    );
  } catch (error) {
    logger.error(
      `Link error while operating share operation for ${String(req?.user?.id)} | error=${getErrorMessage(error)}`
    );
  }
};

export const receiverLinkRequest = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const { skip = 0, limit = 10 } = req.query;
    const data: linkUpdate = {
      hash,
    };
    const userHash = await link.findHash(data);
    if (!userHash) {
      return getResponseMessage(req, res, 400, 'Invalid link');
    }
    const content = await contentRepo.getContentPublic(
      userHash?.userId,
      Number(skip),
      Number(limit)
    );
    if (content?.length == 0) {
      return getResponseMessage(
        req,
        res,
        400,
        'No user content or user is private'
      );
    }
    return getResponseMessage(req, res, 200, {
      details: {
        username: userHash?.user?.username,
        data: content,
      },
      pagination: {
        skip,
        limit,
      },
    });
  } catch (error) {
    logger.error(
      `Link error while operating share operation for ${String(req?.user?.id)} | error=${getErrorMessage(error)}`
    );
  }
};
