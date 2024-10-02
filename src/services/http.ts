import axios from 'axios';
import { getValues } from './storage';
import { handleException } from 'utils';

const userLoggedIn = getValues("loggedIn")
export const username = getValues('username')
export const BASE_URL = `${process.env.REACT_APP_PROD_BASE_URL}` //PRODUCTION_BASE_URL
// export const BASE_URL = `${process.env.REACT_APP_TEST_BASE_URL}` //TEST_BASE_URL

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


export const deleteRequest = async (url: any, headers?:any) => {
    try {
        const res = await axios.delete(`${url}`, { headers });
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
