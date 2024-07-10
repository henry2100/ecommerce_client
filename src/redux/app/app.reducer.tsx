import React from 'react';

import {
    DARK_MODE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    STORE_TABLE_ITEM,
    SEARCH_QUERY,
    TOGGLE_SEARCH_BOX,
    RESET_APP_STATE
} from '../app/app.type';

interface CartItem {
    id: string;
    name: string;
    category: number;
    currency: string;
    tags: any[];
    productImg: string;
    price: number;
    quantity: number;
    init_price: number;
    quantity_in_stock: number;
}

interface AppState {
    darkMode: boolean;
    selected_table_item: any;
    search_status: boolean;
    search_query: string;
    shopping_cart: CartItem[];
}

interface Action {
    type: string;
    payload: any;
}

const APP_INIT_STATE: AppState = {
    darkMode: false,
    selected_table_item: null,
    search_status: false,
    search_query: '',
    shopping_cart: []
}

const AppReducer = (state = APP_INIT_STATE, action: Action) => {
    switch (action.type) {
        case DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode
            }

        case ADD_TO_CART:
            const newItem = action.payload;
            const existingCartItem = state.shopping_cart.find(item => item.id === newItem.id);

            console.log("existingCartItem:", existingCartItem);
            
            let updatedCart: any[];

            if (existingCartItem) {
                updatedCart = state.shopping_cart.map(item =>
                    item.id === newItem.id
                        ? {
                            ...item,
                            quantity: item.quantity + newItem.quantity,
                            price: item.price + newItem.price
                        }
                        : item
                );
            } else {
                updatedCart = [...state.shopping_cart, newItem];
            }

            return {
                ...state,
                shopping_cart: updatedCart
            };

        case REMOVE_FROM_CART:
            const itemIdToRemove = action.payload;
            const filteredCartState = state.shopping_cart?.filter(item => item.id !== itemIdToRemove);

            return {
                ...state,
                shopping_cart: filteredCartState
            }


        case STORE_TABLE_ITEM:
            return {
                ...state,
                selected_table_item: action.payload
            }

        case TOGGLE_SEARCH_BOX:
            return {
                ...state,
                search_status: !state.search_status
            }

        case SEARCH_QUERY:
            return {
                ...state,
                search_query: action.payload
            }

        case RESET_APP_STATE:
            return APP_INIT_STATE

        default:
            return state;
    }
}

export default AppReducer;