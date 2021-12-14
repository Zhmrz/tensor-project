import {
    authUser,
    getMyData,
    getFreelancerPage,
    getCompanyPage,
    registerUser,
    changeFreelancerInfo, changeCompanyInfo, uploadPhoto
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
        currentPageExist: true
    },
    status: {
        isLoading: false,
        error: false,
        hasAccount: true,
        successReg: false,
        //successAuth: false, //false!!!
        successUpd: false, //0 - не обработано, 1 - успех,  2 - ошибка
        successPhoto: false, //0 - не обработано, 1 - успех,  2 - ошибка
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
const PHOTO_SUCCESS = 'PHOTO_SUCCESS'

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
        case PHOTO_SUCCESS:
            return {...state, status: {...state.status, successPhoto: action.payload}}
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
                localStorage.setItem('auth', 'auth')
            })
            .catch(error => {
                dispatch(setUserError(true))
                localStorage.removeItem('token')
                localStorage.removeItem('auth')
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
                const user = response.data.userData
                localStorage.setItem('token', response.data.token)
                console.log('authUser')
                console.log(response)
                localStorage.setItem('auth', 'auth')
                dispatch(setMe(user))
                //dispatch(authSuccess(true))
                //dispatch(pageExist(true))
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

export const getUserData = (id, me) => {
    return (dispatch) => {
        dispatch(loadingData(true))
        getFreelancerPage(id, me)
            .then(response => {
                console.log('получить данные пользователя')
                console.log(response)
                dispatch(setUser(response.data))
                dispatch(pageExist(true))
            })
            .catch(error => {
                console.log(error)
                dispatch(pageExist(false))
            })
        dispatch(loadingData(false))
    }
}

export const getCompanyData = (id, me) => {
    return (dispatch) => {
        dispatch(loadingData(true))
        getCompanyPage(id, me)
            .then(response => {
                console.log('получить данные компании')
                console.log(response)
                dispatch(setUser(response.data))
                dispatch(pageExist(true))
            })
            .catch(error => {
                console.log(error)
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
                dispatch(getMe())
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
                dispatch(getMe())
                dispatch(updSuccess(true))
            })
            .catch(error => {
                dispatch(setUserError(true))
            })
        dispatch(loadingData(false))
    }
}

export const changePhoto = (type, id, data) => {
    return (dispatch) => {
        dispatch(loadingData(true))
        uploadPhoto(type, id, data)
            .then(response => {
                console.log('фото загружено')
                console.log(response)
                dispatch(updSuccess(true))
                //dispatch(photoSuccess(true))
            })
            .catch(error => {
                console.log('ошибка при загрузке фото')
                dispatch(setUserError(true))
            })
        dispatch(loadingData(false))
    }
}