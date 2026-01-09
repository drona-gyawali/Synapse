import { getSetting, updateSettting } from "../service/setting";
import { Request, Response } from "express";
import { getResponseMessage, getErrorMessage } from "../utils/utils";
import { Settings } from "../types/global";
import logger from "../utils/logger";

export const GetSettingRequest = async (req: Request, res: Response) => {
  try {
    const userId = String(req?.user?.id);
    if (!userId) {
      return getResponseMessage(req, res, 400, 'Invalid Input');
    }

    const _getSetting = await getSetting(
      userId.toString()
    );
    if (!_getSetting || _getSetting == null) {
      return getResponseMessage(req, res, 400, 'Setting cannot be fetched for the user');
    }

    return getResponseMessage(req, res, 200, _getSetting);
  } catch (error) {
    return getResponseMessage(
      req,
      res,
      500,
      `Setting failed while fetching for user ${req?.user?.id} | ${getErrorMessage(error)}`
    );
  }
};


export const UpdateSettingRequest = async (req: Request, res: Response) => {
  try {
    const updatedSetting: Settings = req.body;
    const userId = String(req?.user?.id);
    const _data = {
        ...updatedSetting,
        userId
    }
    const _updateContent = await updateSettting(_data) 
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