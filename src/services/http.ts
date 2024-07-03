import axios from 'axios';
import { getValues } from './storage';
import { handleException } from 'utils';
// import { store } from '../redux/store'

// const state = store.getState()
// console.log("State:", state.auth.token);

const userLoggedIn = getValues("loggedIn")
export const username = getValues('username')

// export const PUBLIC_KEY = getValues(`${username}_public_key`)
// export const AUTH_TOKEN = getValues(`${username}_token`)

// export const BASE_URL = `${process.env.REACT_APP_PROD_BASE_URL}` //PRODUCTION_URL
// export const BASE_URL = `${process.env.REACT_APP_STAGING_BASE_URL}` //STAGING_URL
export const BASE_URL = `${process.env.REACT_APP_TEST_BASE_URL}` //TEST_URL

// export const loggedUser_baseURL = 'api/v1/business/'

console.log('Base_Url:', BASE_URL);

// const axiosRequest = async (reqMethod: string, url: any, reqData?: any) => {
//     try {
//         const res = await axios.create({
//             method: reqMethod,
//             baseURL: `${BASE_URL + url}`,
//             headers: {
//                 "Content-Type": "application/json",
//                 ...{ "Authorization": `${AUTH_TOKEN}` },
//                 ...{ "Public-Key": `${PUBLIC_KEY}` }
//             },
//             data: reqData
//         })
//         return res;
//     } catch (error) {
//         handleException(error)
//     }
// }

export const getRequest = async (url: any, headers?:any) => {
    try {
        const res = await axios.get(`${url}`, { headers });
        return res;
    } catch (error) {
        handleException(error)
    }
}

export const postRequest = async (url: any, headers?:any, requestData?: any) => {
    try {
        const res = await axios.post(`${url}`, requestData, { headers });
        return res;
    } catch (error) {
        handleException(error)
        console.log(error);
        
    }
}

export const putRequest = async (url: any, headers?:any, requestData?: any) => {
    try {
        const res = await axios.put(`${url}`, requestData, { headers });
        return res;
    } catch (error) {
        handleException(error)
    }
}


export const deleteRequest = async (url: any, headers?:any, requestData?: any) => {
    try {
        // const res = await axios.delete(`${url}`, requestData = {}, { headers });
        const res = await axios.delete(`${url}`, requestData = {});
        return res;
    } catch (error) {
        handleException(error)
    }
}

export enum ResponseStatusEnum {
    ERROR = 'error',
    SUCCESS = 'success',
    FAIL = 'failed',
    DUPLICATE_REFERENCE = 'duplicate_reference',
    INVALID_PIN = 'invalid_pin',
    PENDING = 'pending',
    NEW_DEVICE = 'new_device',
}
