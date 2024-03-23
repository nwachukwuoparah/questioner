// const { VITE_End_Point } = import.meta.env;
import axios from "axios";

export const regester = (data: any): any => {
    return axios.post(`https://qt.organogram.app/token`, data)
}

// export const editProfile = (data: any): any => {
//     const token = localStorage.getItem("token")
//     return axios.put(`${VITE_End_Point}/updateuser`, data,
//         {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 'Authorization': `Bearer ${token}`,
//             },
//         }
//     )
// }