
import { combineReducers, createStore } from "redux";
import { VacationsReducer } from "./vacationsState"
import { authReducer } from "./AuthState";


const reducers = combineReducers({ VacationState: VacationsReducer, authState: authReducer });
const store = createStore(reducers);

export default store;