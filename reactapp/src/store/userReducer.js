import {authUser, getMyData, getFreelancerPage, getCompanyPage, registerUser} from "../api/userAPI";

const defaultState = {
    me: {
        id: -1,
        name: undefined,
        surname: undefined,
        description: undefined,
        image: undefined,
        link_to_resume: undefined,
        email: undefined,
        topics: [],
        type: 0
    },
    current: {
        id: -1,
        name: undefined,
        surname: undefined,
        description: undefined,
        image: undefined,
        email: undefined,
        type: 0,
        link_to_resume: undefined,
        topics: [],
        currentPageExist: false
    },
    status: {
        isLoading: false,
        error: false,
        hasAccount: true,
        successReg: false,
        successAuth: false,
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
        case PAGE_EXIST:
            return {...state, current: {...state.status, currentPageExist: action.payload}}
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
export const pageExist = (value) => ({type: PAGE_EXIST, payload: value})
export const setMe = (id, name, surname, email) => ({type: SET_ME, payload: {id: id, name: name, surname: surname, email: email}})

export const getMe = () => {
    return (dispatch) => {
        dispatch(loadingData(true))
        getMyData()
            .then(response => {
                //{"id":1,"first_name":"Ivan","last_name":"Фамилия","description":"","image":null,"link_to_resume":"resume","topics":[1,2], user_type: 0}
                const user = response.data
                dispatch(setMe({id: user.id, name: user.first_name, surname: user.last_name,
                    image: user.image, description: user.description, link_to_resume: user.link_to_resume,
                    topics: user.topics, type: user.user_type}))
                dispatch(authSuccess(true))
            })
            .catch(error => {
                dispatch(setUserError(true))
//убрать в проде !!!!!!!!!!!!!!!
                //dispatch(authSuccess(true))
            })
        dispatch(loadingData(false))
    }
}


export const authUserThunkCreator = (params) => {
    return (dispatch) => {
        dispatch(loadingData(true))
////////убрать установку токена в проде!!!!
        //localStorage.setItem('token', '234')
        authUser(params)
            .then(response => {
                //с токеном работа
                const user = response.data.userData
                localStorage.setItem('token', response.data.token)
                dispatch(setUser(user))
                dispatch(setMe(user.id, user.name, user.surname, user.email))
                dispatch(authSuccess(true))
                dispatch(pageExist(true))
            })
            .catch(error => {
                dispatch(setUserError(true))
//убрать в проде
                //dispatch(authSuccess(true))
            })
        dispatch(loadingData(false))
    }
}

export const registerUserThunkCreator = (params) => {
    return (dispatch) => {
        dispatch(loadingData(true))
        registerUser(params)
            .then(response => {
                dispatch(regSuccess(true))
            })
            .catch(error => {
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
                dispatch(pageExist(true))
                const name = response.data.first_name
                const surname = response.data.last_name
                const link = response.data.link_to_resume
                dispatch(setUser({name: name, surname: surname, link: link}))
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
                dispatch(pageExist(true))
                const name = response.data.first_name
                const link = response.data.link_to_resume
                dispatch(setUser({name: name, link: link}))
            })
            .catch(error => {
                dispatch(pageExist(false))
            })
        dispatch(loadingData(false))
    }
}