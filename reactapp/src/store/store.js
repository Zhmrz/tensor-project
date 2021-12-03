import {createStore, combineReducers, applyMiddleware} from 'redux'
import {userReducer} from "./userReducer";
import thunkMiddleware from 'redux-thunk';
import {tasksReducer} from "./tasksReducer";
import {respReducer} from "./respReducer";

const reducer = combineReducers({
    user: userReducer,
    tasks: tasksReducer,
    resp: respReducer
})

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
export default store