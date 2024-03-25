import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form"


export interface Question {
    question: string;
    options: string[];
};

export interface Option {
		[x: string]: string | undefined;
    day: string;
}

export interface IFormInput {
    profilePicture: string
    email: string;
    fullName: string;
    password: string;
    select: string;
}
export interface inputType {
    type?: string;
    placeholder?: string;
    icon?: string;
    name?: any
    register: UseFormRegister<any>
    errors?: any
    inputType?: string
    onChange?: (data: { target: { value: string, name: string } }) => void
    remove?: () => void
    deleteIcon?: ReactNode
    index?:number
    value?:string
}

export interface buttonType {
    handleClick?: () => void
    children: string;
    type: string;
    style?: any;
    isLoading?: boolean
    disabled?: boolean
}