// const { VITE_End_Point } = import.meta.env;
import axios from "axios";

export const getQuestions = (): any => {
    const token = localStorage.getItem("xetwux")
    console.log(token);

    return axios.get(`https://qt.organogram.app/questions`,
        {
            headers: {
                "Token": `${token}`,
            },
        }
    )
}