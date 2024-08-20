import {
    DARK_MODE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    ADD_TO_QUANTITY,
    REMOVE_FROM_QUANTITY,
    STORE_TABLE_ITEM,
    SEARCH_QUERY,
    TOGGLE_SEARCH_BOX,
    RESET_APP_STATE,
    UPDATE_CART_STATE_FROM_DB
} from './app.type';

export const toggleDarkMode = () => ({
    type: DARK_MODE
});

export const updateCartFromDb = (data: any[]) => ({
    type:UPDATE_CART_STATE_FROM_DB,
    payload: data
})

export const addToCart = (data: any[]) => ({
    type: ADD_TO_CART,
    payload: data
});

export const removeFromCart = (id:any) => ({
    type: REMOVE_FROM_CART,
    payload: id
});

export const clearShoppingCart = () => ({
    type: CLEAR_CART
})

export const addToQuantity = (id:any) => ({
    type: ADD_TO_QUANTITY,
    payload: id
});

export const removeFromQuantity = (id:any) => ({
    type: REMOVE_FROM_QUANTITY,
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