import logger from '../utils/logger';
import { Link, linkUpdate } from '../types/global';
import { prisma } from '../config/db';
import { getErrorMessage } from '../utils/utils';
import { updateSettting } from '../service/setting';

class LinkRepo {
  public async createLink(data: Link) {
    try {
      const _link = await prisma.link.create({ data });
      logger.debug(`link generated for details=${_link}`);
      return _link;
    } catch (error) {
      logger.error(`Link Creation failed ${getErrorMessage(error)}`);
    }
  }

  public async findHash(data: Link | linkUpdate) {
    try {
      const hash = await prisma.link.findFirst({
        where: { hash: data.hash },
        include: { user: { select: { username: true } } },
      });
      if (!hash) {
        return null;
      }
      return hash;
    } catch (error) {
      logger.error(`Hash finding failed ${getErrorMessage(error)}`);
    }
  }

  public async deleteLink(userId: string) {
    try {
      const delLink = await prisma.link.deleteMany({
        where: { userId: userId },
      });

      const _updateSetting = await updateSettting({
        userId: userId,
        deleteLinks: true,
      });

      if (!_updateSetting) {
        logger.error(
          `User ${userId} data is not updated in settings| ${_updateSetting}`
        );
      }

      return Boolean(delLink.count > 0);
    } catch (error) {
      logger.error(`Delete operation failed ${getErrorMessage(error)}`);
      return false;
    }
  }
}

export { LinkRepo };
