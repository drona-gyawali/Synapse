import { Response, Request, NextFunction } from "express"
import { verifyToken } from "../utils/token"
import { getErrorMessage } from "../utils/utils"
import logger from "../utils/logger"

export const authMiddleware = (req: Request , res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).json("Access denied. No token provided.");
        }
        const payload:any = verifyToken(String(token));
        req.user = payload
        next(); 
    } catch (error: unknown) {
        logger.error(`Auth Error: ${getErrorMessage(error)}`);
        return res.status(401).json("Invalid or expired token");
    }
}