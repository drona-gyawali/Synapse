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



export interface ModalBehave extends contentformField {
    open?: boolean;
    close?: () => void | null;
    id?:string
    setcontextOpen?: () => void;
}


export interface SettingOptions extends ModalBehave {
    deactivateAccount?: boolean;
    deleteAccount?: boolean;
    deactivateLinks?: boolean;
    deleteLinks?: boolean;
    language?: string
    grantPersonalData?: boolean
    logout?: boolean
    userId?: string
    updatedAt?: string
}
