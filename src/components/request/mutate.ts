// const { VITE_End_Point } = import.meta.env;
import axios from "axios";

export const regester = (data: any): any => {
    return axios.post(`https://qt.organogram.app/token`, data)
}

export const createQuestions = (data: any): any => {
    const token = localStorage.getItem("xetwux")
    return axios.post(`https://qt.organogram.app/questions`, data,
        {
            headers: {
                "Token": `${token}`,
            },
        }
    )
}

export const updateQuestions = (data: any): any => {
    const { id, payload } = data
    const token = localStorage.getItem("xetwux")
    return axios.put(`https://qt.organogram.app/questions/${id}`, payload,
        {
            headers: {
                "Token": `${token}`,
            },
        }
    )
}

export const deleteQuestions = (data: any): any => {
    const token = localStorage.getItem("xetwux")
    console.log(data);
    
    return axios.delete(`https://qt.organogram.app/questions/${data}`,
        {
            headers: {
                "Token": `${token}`,
            },
        }
    )
}