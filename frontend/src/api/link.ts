import { queryGet, queryParams } from "./api";
import { logger } from "../utils/logger";


export const shareLink = async () => {
    try {
        const linkCreated = await queryGet("share", "share=true")
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
