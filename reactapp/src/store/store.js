import {createStore, combineReducers, applyMiddleware} from 'redux'
import {userReducer} from "./userReducer";
import thunkMiddleware from 'redux-thunk';
import {tasksReducer} from "./tasksReducer";

const reducer = combineReducers({
    user: userReducer,
    tasks: tasksReducer,
})

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
export default store