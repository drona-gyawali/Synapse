import { Post } from "./api"
import {logger} from "../utils/logger"
import {type formField } from "../types/formTypes"
import { Get } from "./api"

export async function signup(data: formField) {
    try {
        const response = await Post("register", data)
        return response
    } catch (error) {
        logger(`Signup route failed | ${error}`)
        return error
    }
}    

export async function Login(data: formField) {
    try {
        const response = await Post("login", data)
        return response
    } catch (error) {
        logger(`Login route failed | ${error}`)
        return error
    }
}


export async function CheckAuth() {
    try {
        const response = await  Get("info")
        console.log(response)
        if(response.code == 200 && response.details.id) {
            return true
        }else {
            return false
        }
    } catch (error) {
        logger(`Info route failed | ${error}`)
    }
}