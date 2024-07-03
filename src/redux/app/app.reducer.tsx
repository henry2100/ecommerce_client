import React from 'react';
import {
    DARK_MODE,
    STORE_TABLE_ITEM,
    RESET_APP_STATE
} from '../app/app.type';

const APP_INIT_STATE = {
    darkMode: false,
    selected_table_item: null 
}

const AppReducer = (state = APP_INIT_STATE, action) => {
    switch(action.type){
        case DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode   
            }

        case STORE_TABLE_ITEM:
            return {
                ...state,
                selected_table_item: action.payload
            }

        case RESET_APP_STATE:
            return APP_INIT_STATE
        
        default:
            return state;
    }
}

export default AppReducer;