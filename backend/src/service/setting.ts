import { prisma } from '../config/db';
import logger from '../utils/logger';
import { getErrorMessage } from '../utils/utils';
import { Settings } from '../types/global';

export const createSettting = async (data: Settings) => {
  try {
    const _created = await prisma.setting.create({ data });
    console.log(_created);
    if (!_created) {
      return null;
    }
    return _created;
  } catch (error) {
    logger.error(
      `Content failed to fetch for ${data.userId} by type | details=${getErrorMessage(error)}`
    );
  }
};

export const updateSettting = async (input: Settings) => {
  try {
    if (!input) return null;
    const _updated = await prisma.setting.update({
      where: { userId: input.userId },
      data: input,
    });
    if (!_updated) {
      return null;
    }
    return _updated;
  } catch (error) {
    logger.error(
      `Setting failed to update for ${input.userId}  | details=${getErrorMessage(error)}`
    );
  }
};

export const getSetting = async (userId: string) => {
  try {
    if (!userId) return null;
    const _data = prisma.setting.findFirst({
      where: { userId },
    });

    if (!_data) {
      return null;
    }

    return _data;
  } catch (error) {
    logger.error(
      `Setting failed to fetched for ${userId}  | details=${getErrorMessage(error)}`
    );
  }
};
