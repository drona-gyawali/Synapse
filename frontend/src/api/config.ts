import { ENDPOINT_BASE } from "../utils/conf"

export interface Route {
    endpoint:string
    params?:string
    query?:string
}

export const apiRoute = (route:Route) => {
    let url= `${ENDPOINT_BASE}${route.endpoint}`
    if(route.params ) {url+=`/${route.params}`}
    if(route.query) {url+=`?${route.query}`} 
    return url
}



