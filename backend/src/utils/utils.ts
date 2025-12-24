import logger from "./logger"
import {Response, Request} from "express"
import { detailType } from "../types/global"

export function handleFatalError(err: unknown) {
    logger.error(`System generate failure signal | details=${err} `)
    process.exit(1)
}

export function getErrorMessage(err:unknown) {
    if(err instanceof Error) return err.message
    return String(err)
}

export function getResponseMessage(req:Request, res:Response, code:number, details:detailType) {
    const data = {
        code:code,
        details:details
    }
    return res.status(code).json(data)
}