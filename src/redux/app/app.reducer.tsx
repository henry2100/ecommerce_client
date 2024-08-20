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
} from '../app/app.type';

interface CartItem {
    id: string;
    name: string;
    category: string;
    currency: string;
    tags: string[];
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

const AppReducer = (state = APP_INIT_STATE, action: Action): AppState => {
    // console.log("Reducer state:", state.shopping_cart);
    // console.log("Reducer action:", action);

    switch (action.type) {
        case DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode
            }

        case UPDATE_CART_STATE_FROM_DB:
            return {
                ...state,
                shopping_cart: action.payload
            }

        case CLEAR_CART:
            return{
                ...state,
                shopping_cart: []
            }

        case ADD_TO_CART:
            const newItem = action.payload as CartItem;
            const existingCartItem = state.shopping_cart.find(item => item.id === newItem.id);

            let updatedCart: CartItem[];

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
            const itemIdToRemove = action.payload as string;
            const filteredCartState = state.shopping_cart.filter(item => item.id !== itemIdToRemove);

            return {
                ...state,
                shopping_cart: filteredCartState
            }

        case ADD_TO_QUANTITY:
            const productId = action.payload as string;
            const updateProduct = state.shopping_cart.map(item =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        price: (item.quantity + 1) * item.init_price
                    }
                    : item
            );

            return {
                ...state,
                shopping_cart: updateProduct
            }

        case REMOVE_FROM_QUANTITY:
            const productId_ = action.payload as string;
            const updateProduct_ = state.shopping_cart.map(item =>
                item.id === productId_
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                        price: (item.quantity - 1) * item.init_price
                    }
                    : item
            );

            return {
                ...state,
                shopping_cart: updateProduct_
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