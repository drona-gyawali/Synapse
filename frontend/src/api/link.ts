import { queryGet, queryParams,  SettingPut } from "./api";
import { logger } from "../utils/logger";
import type { SettingOptions } from "../types/formTypes";

export const shareLink = async (isPublic = true) => {
    try {
        const linkCreated = await queryGet("share", `share=${isPublic}`)
        if(!linkCreated) {
            return " Link Creation failed"
        }
        return linkCreated
    } catch (error) {
        logger(`link creation failed  | detail=${error}`)
    }
}

export const sendLink = async (hash:string) => {
    try {
        const shareLink = await queryParams("share", hash)
        if(!shareLink) {
            return " Link Creation failed"
        }
        return shareLink
    } catch (error) {
        logger(`link sharing failed  | detail=${error}`)
    }
}


export const settingUpdate = async (updateSetting:SettingOptions) => {
    try {
        const deactivate  = await SettingPut("setting", updateSetting)
        if(!deactivate) {
            return  "Update failed"
        }

        return deactivate
    }catch(error) {
        logger(`link sharing failed  | detail=${error}`)
    }
}