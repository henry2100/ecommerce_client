import {
    USER_LOG_STATUS,
    USER_AUTH_DATA,
    RESET_STATE
} from './auth.type';

const AUTH_INIT_STATE = {
    user_loggedIn: false,
    user_authData: null
}

const AuthReducer = (state = AUTH_INIT_STATE, action) => {
    switch (action.type) {
        case USER_LOG_STATUS:
            return {
                ...state,
                user_loggedIn: action.payload
            }

        case USER_AUTH_DATA:
            return {
                ...state,
                user_authData: action.payload
            }

        case RESET_STATE:
            return AUTH_INIT_STATE
    
        default:
            return state;
    }
}

export default AuthReducer;