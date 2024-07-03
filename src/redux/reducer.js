import { combineReducers } from "redux";
import AuthReducer from './auth/auth.reducer';
import AppReducer from './app/app.reducer';

const rootReducter = combineReducers({
    auth: AuthReducer,
    app: AppReducer
});

export default rootReducter;