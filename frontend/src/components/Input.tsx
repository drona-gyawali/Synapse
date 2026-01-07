import type { ReactElement } from "react"
import {type UseFormRegisterReturn } from "react-hook-form"

interface inputVariant {
    type?:string
    onChange?: () => void
    placeholder?:string
    style?:string
    iconStart?:ReactElement
    reference?:any
    register?:UseFormRegisterReturn
    isdisabled?:boolean
} 

export function Input(props:inputVariant) {
    return (
        <>
        <div className="flex items-center justify-center">
            <input 
            ref={props.reference}
            {...props.register}
            type={props.type}
            className={`mt-4 px-5 py-3 border rounded-lg ${props.style}`}
            placeholder={props.placeholder}
            onChange={props.onChange}
            disabled={props.isdisabled}
            />
        </div>
        </>
    )
}