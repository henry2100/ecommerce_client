import {
    DARK_MODE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    STORE_TABLE_ITEM,
    SEARCH_QUERY,
    TOGGLE_SEARCH_BOX,
    RESET_APP_STATE
} from './app.type';

export const toggleDarkMode = () => ({
    type: DARK_MODE
});

export const addToCart = (data: any) => ({
    type: ADD_TO_CART,
    payload: data
});

export const removeFromCart = (id:any) => ({
    type: REMOVE_FROM_CART,
    payload: id
});

export const selectTableItem = (data:any) => ({
    type: STORE_TABLE_ITEM,
    payload: data
});

export const toggleSearchBar = () => ({
    type: TOGGLE_SEARCH_BOX
})

export const storeSearchQuery = (data:any) => ({
    type: SEARCH_QUERY,
    payload: data
});

export const resetAppState = () => ({
    type: RESET_APP_STATE
});