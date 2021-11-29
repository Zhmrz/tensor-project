import {authUser, registerUser} from "../api/userAPI";
import {useNavigate} from "react-router-dom";
import axios from 'axios'

const defaultState = {
    id: undefined,
    name: undefined,
    surname: undefined,
    email: undefined,
    type: 0,
    link: undefined,
    topics: [],
    isLoading: false,
    error: false,
    hasAccount: true,
    successReg: false
};

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const LOADING = 'LOADING'
const ERROR = 'ERROR'
const ACCOUNT ='ACCOUNT'
const SUCCESS = 'SUCCESS'

export const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case LOGIN:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...state, ...defaultState}
        case LOADING:
            return {...state, isLoading: action.payload}
        case ERROR:
            return {...state, error: action.payload}
        case ACCOUNT:
            return {...state, hasAccount: action.payload}
        case SUCCESS:
            return {...state, successReg: action.payload}
        default:
            return state
    }
}

export const setUser = (value) => ({type: LOGIN, payload: value})
export const resetUser = () => ({type: LOGOUT})
export const loadUserData = (value) => ({type: LOADING, payload: value})
export const setUserError = (value) => ({type: ERROR, payload: value})
export const setHasAccount = (value) => ({type: ACCOUNT, payload: value})
export const setSuccess = (value) => ({type: SUCCESS, payload: value})

export const authUserThunkCreator = (params) => {
    return (dispatch, getState) => {
        dispatch(loadUserData(true))
        //получить параметры фильтрации и упаковать в params
        authUser(params)
            .then(response => {
                //с токеном работа
                axios.defaults.headers.common['Authorization'] = 'Token ' + response.data.token;
            })
            .catch(error => {
                dispatch(setUserError(true))
            })
        dispatch(loadUserData(false))
    }
}

export const registerUserThunkCreator = (params) => {
    return (dispatch, getState) => {
        dispatch(loadUserData(true))
        //получить параметры фильтрации и упаковать в params
        registerUser(params)
            .then(response => {
                //с токеном работа
                dispatch(setUser(response.data))
                dispatch(setSuccess(true))
            })
            .catch(error => {
                dispatch(setUserError(true))
            })
        dispatch(loadUserData(false))
    }
}
