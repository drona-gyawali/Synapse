export {}

declare global {
    namespace Express {
        export interface Request{
            user?: {
                id?: string | undefined
                username?:string | undefined
            } 
        }
    }
}