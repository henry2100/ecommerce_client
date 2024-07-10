import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';
import rootReducter from './reducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const persistConfig = {
    key: 'root',
    storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducter);

const store = createStore(
    persistedReducer,
    process.env.NODE_ENV === "development"
        ? composeWithDevTools(applyMiddleware(thunk))
        : applyMiddleware(thunk)
);
const persistor = persistStore(store);

export { store, persistor };