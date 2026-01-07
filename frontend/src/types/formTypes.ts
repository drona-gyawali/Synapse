export interface  formField {
    email?:string
    username?:string
    password?:string
}


export interface contentformField   {
    title?: string
    content?:string
    tags?: string[] | string
    type?: string
    isPublic?: boolean
}
