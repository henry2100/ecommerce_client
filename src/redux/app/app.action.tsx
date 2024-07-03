import {
    DARK_MODE,
    STORE_TABLE_ITEM,
    RESET_APP_STATE
} from './app.type';

export const toggleDarkMode = () => ({
    type: DARK_MODE
});

export const selectTableItem = (data:any) => ({
    type: STORE_TABLE_ITEM,
    payload: data
})

export const resetAppState = () => ({
    type: RESET_APP_STATE
})