import { prisma } from "../config/db";
import logger from "../utils/logger";
import type { RegisterUser } from "../types/global";


class UserRepo {
    
    public createUser = async (data:RegisterUser) => {
        try {
            const created = await prisma.user.create({data})
            logger.debug(`${created.username} has been registered`)
            return created    
        } catch (error) {
            logger.error(`User creatiion failed | details=${error}`)
            throw error
        }
    }

    public findByEmail = async (email:string) => {
        try {
            const userExistense = await prisma.user.findUnique({
                where: {email}
            })
            return userExistense
        } catch (error) {
            logger.error(`Unique Email search failed | details=${error}`)
            throw error
        }
    }


    public findByUsername = async (username:string) => {
        try {
            const exist  = await prisma.user.findUnique({
                where : {username}
            })
            return exist
        } catch (error) {
            logger.error(`Username search failed | details=${error}`)
        }
    }
}

export {UserRepo}