import {authUser, getUserPage, registerUser} from "../api/userAPI";
import {SouthEastTwoTone} from "@mui/icons-material";

const defaultState = {
    me: {
        id: 0,
        name: undefined,
        surname: undefined,
        email: undefined,
    },
    id: 0,
    name: undefined,
    surname: undefined,
    email: undefined,
    type: 0,
    link: undefined,
    topics: [],
    isLoading: false,
    error: false,
    hasAccount: true,
    successReg: false,
    successAuth: false,
    currentPageExist: false
};

const GET_DATA = 'GET_DATA'
const LOGOUT = 'LOGOUT'
const LOADING = 'LOADING'
const ERROR = 'ERROR'
const ACCOUNT ='ACCOUNT'
const SUCCESS = 'SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const PAGE_EXIST = 'PAGE_EXIST'
const SET_ME = 'SET_ME'

export const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case GET_DATA:
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
        case AUTH_SUCCESS:
            return {...state, successAuth: action.payload}
        case PAGE_EXIST:
            return {...state, currentPageExist: action.payload}
        case SET_ME:
            return {...state, me: action.payload}
        default:
            return state
    }
}

export const setUser = (value) => ({type: GET_DATA, payload: value})
export const resetUser = () => ({type: LOGOUT})
export const loadUserData = (value) => ({type: LOADING, payload: value})
export const setUserError = (value) => ({type: ERROR, payload: value})
export const setHasAccount = (value) => ({type: ACCOUNT, payload: value})
export const setSuccess = (value) => ({type: SUCCESS, payload: value})
export const authSuccess = (value) => ({type: AUTH_SUCCESS, payload: value})
export const pageExist = (value) => ({type: PAGE_EXIST, payload: value})
export const setMe = (id, name, surname, email) => ({type: SET_ME, payload: {id: id, name: name, surname: surname, email: email}})

export const authUserThunkCreator = (params) => {
    return (dispatch, getState) => {
        dispatch(loadUserData(true))
        authUser(params)
            .then(response => {
                //с токеном работа
                const user = response.data.userData
                localStorage.setItem('token', response.data.token)
                dispatch(setUser(user))
                console.log('auth')
                dispatch(setMe(user.id, user.name, user.surname, user.email))
                dispatch(authSuccess(true))
                dispatch(pageExist(true))
            })
            .catch(error => {
                dispatch(setUserError(true))
                //убрать в проде
                //dispatch(authSuccess(true))
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

export const getUserData = (id) => {
    return (dispatch, getState) => {
        dispatch(loadUserData(true))
        getUserPage(id)
            .then(response => {
                dispatch(pageExist(true))
                const name = response.data.first_name
                const surname = response.data.last_name
                const link = response.data.link_to_resume
                dispatch(setUser({name: name, surname: surname, link: link}))
            })
            .catch(error => {
                dispatch(pageExist(false))
                console.log('no user')
            })
        dispatch(loadUserData(false))
    }
}