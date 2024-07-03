import {
    USER_LOG_STATUS,
    USER_AUTH_DATA,
    RESET_STATE
} from './auth.type';

export const setUserLogStatus = (data) => ({
    type: USER_LOG_STATUS,
    payload: data
})

export const storeUserData = (data) => ({
    type: USER_AUTH_DATA,
    payload: data
})

export const resetAuthState = () => ({
    type: RESET_STATE
})

// logoutHandler