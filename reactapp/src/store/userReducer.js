import {
    authUser,
    getMyData,
    getFreelancerPage,
    getCompanyPage,
    registerUser,
    changeFreelancerInfo, changeCompanyInfo
} from "../api/userAPI";

const defaultState = {
    me: {
        id: 0,
        first_name: undefined,
        last_name: undefined,
        description: undefined,
        image: undefined,
        link_to_resume: undefined,
        email: undefined,
        topics: [],
        user_type: 0
    },
    current: {
        id: 0,
        first_name: undefined,
        last_name: undefined,
        description: undefined,
        image: undefined,
        email: undefined,
        user_type: 0,
        link_to_resume: undefined,
        topics: [],
        currentPageExist: false
    },
    status: {
        isLoading: false,
        error: false,
        hasAccount: true,
        successReg: false,
        successAuth: false, //false!!!
        successUpd: false,
    }
};

const GET_CURRENT = 'GET_CURRENT'
const LOGOUT = 'LOGOUT'
const LOADING = 'LOADING'
const ERROR = 'ERROR'
const HAS_ACCOUNT ='HAS_ACCOUNT'
const REG_SUCCESS = 'REG_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const PAGE_EXIST = 'PAGE_EXIST'
const SET_ME = 'SET_ME'
const UPDATE_SUCCESS = 'UPDATE_SUCCESS'

export const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case GET_CURRENT:
            return {...state, current: action.payload}
        case LOGOUT:
            return {...state, ...defaultState}
        case LOADING:
            return {...state, status: {...state.status, isLoading: action.payload}}
        case ERROR:
            return {...state, status: {...state.status, error: action.payload}}
        case HAS_ACCOUNT:
            return {...state,  status: {...state.status, hasAccount: action.payload}}
        case REG_SUCCESS:
            return {...state, status: {...state.status, successReg: action.payload}}
        case AUTH_SUCCESS:
            return {...state, status: {...state.status, successAuth: action.payload}}
        case UPDATE_SUCCESS:
            return {...state, status: {...state.status, successUpd: action.payload}}
        case PAGE_EXIST:
            return {...state, current: {...state.current, currentPageExist: action.payload}}
        case SET_ME:
            return {...state, me: action.payload}
        default:
            return state
    }
}

export const setUser = (value) => ({type: GET_CURRENT, payload: value})
export const resetUserData = () => ({type: LOGOUT})
export const loadingData = (value) => ({type: LOADING, payload: value})
export const setUserError = (value) => ({type: ERROR, payload: value})
export const setHasAccount = (value) => ({type: HAS_ACCOUNT, payload: value})
export const regSuccess = (value) => ({type: REG_SUCCESS, payload: value})
export const authSuccess = (value) => ({type: AUTH_SUCCESS, payload: value})
export const updSuccess = (value) => ({type: UPDATE_SUCCESS, payload: value})
export const pageExist = (value) => ({type: PAGE_EXIST, payload: value})
export const setMe = (value) => ({type: SET_ME, payload: value})


export const getMe = () => {
    return (dispatch) => {
        dispatch(loadingData(true))
        getMyData()
            .then(response => {
                console.log("получить мои данные")
                console.log(response)
                //{"id":1,"first_name":"Ivan","last_name":"Фамилия","description":"","image":null,"link_to_resume":"resume","topics":[1,2], user_type: 0}
                const user = response.data
                console.log(user)
                dispatch(setMe(user))
                dispatch(authSuccess(true))
            })
            .catch(error => {
                dispatch(setUserError(true))
                localStorage.removeItem('token')
//убрать в проде !!!!!!!!!!!!!!!
                //dispatch(authSuccess(true))
            })
        dispatch(loadingData(false))
    }
}


export const authUserThunkCreator = (params) => {
    return (dispatch) => {
        dispatch(loadingData(true))
        authUser(params)
            .then(response => {
                //с токеном работа
                console.log("автоматическая авторизация")
                console.log(response)
                const user = response.data.userData
                localStorage.setItem('token', response.data.token)
                dispatch(setUser(user))
                console.log('authUser')
                console.log(response)
                dispatch(setMe(user))
                dispatch(authSuccess(true))
                dispatch(pageExist(true))
            })
            .catch(error => {
                dispatch(setUserError(true))
            })
        dispatch(loadingData(false))
    }
}

export const registerUserThunkCreator = (params) => {
    return (dispatch) => {
        dispatch(loadingData(true))
        registerUser(params)
            .then(response => {
                console.log("регистрация пользователя")
                console.log(response)
                dispatch(regSuccess(true))
            })
            .catch(error => {
                console.log('regerror')
                console.log(error)
                dispatch(setUserError(true))
            })
        dispatch(loadingData(false))
    }
}

export const getUserData = (id) => {
    return (dispatch) => {
        dispatch(loadingData(true))
        getFreelancerPage(id)
            .then(response => {
                console.log('получить данные пользователя')
                console.log(response)
                dispatch(pageExist(true))
                dispatch(setUser(response.data))
            })
            .catch(error => {
                dispatch(pageExist(false))
            })
        dispatch(loadingData(false))
    }
}

export const getCompanyData = (id) => {
    return (dispatch) => {
        dispatch(loadingData(true))
        getCompanyPage(id)
            .then(response => {
                console.log('получить данные компании')
                console.log(response)
                dispatch(pageExist(true))
                dispatch(setUser(response.data))
            })
            .catch(error => {
                dispatch(pageExist(false))
            })
        dispatch(loadingData(false))
    }
}

export const changeUserData = (id, data) => {
    return (dispatch) => {
        dispatch(loadingData(true))
        changeFreelancerInfo(id, data)
            .then(response => {
                console.log('обновить пользовательские данные')
                console.log(response)
                dispatch(updSuccess(true))
            })
            .catch(error => {
                dispatch(setUserError(true))
            })
        dispatch(loadingData(false))
    }
}

export const changeCompanyData = (id, data) => {
    return (dispatch) => {
        dispatch(loadingData(true))
        changeCompanyInfo(id, data)
            .then(response => {
                console.log('обновить данные компании')
                console.log(response)
                dispatch(updSuccess(true))
            })
            .catch(error => {
                dispatch(setUserError(true))
            })
        dispatch(loadingData(false))
    }
}