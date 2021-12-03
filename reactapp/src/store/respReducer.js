import {createResponse, getResponses} from "../api/respAPI";

const LOAD_RESP = 'LOAD_RESP'
const RESET_RESP = 'RESET_RESP'
const TOGGLE_LOADING = 'TOGGLE_LOADING'
const SET_WAIT_RESP = 'SET_WAIT_RESP'
const SET_WORK_RESP = 'SET_WORK_RESP'
const SET_CHECK_RESP = 'SET_CHECK_RESP'
const RESP_CREATED = 'RESP_CREATED'
const SET_ERROR = 'SET_ERROR'

const defaultState = {
    resp: [],
    waitResp: [],
    workResp: [],
    checkResp: [],
    isLoading: false,
    respCreated: false,
    respError: false
}

export const respReducer = (state = defaultState, action) => {
    switch(action.type){
        case LOAD_RESP:
            return {...state, resp: action.payload}
        case RESET_RESP:
            return {...state, ...defaultState}
        case TOGGLE_LOADING:
            return {...state, isLoading: action.payload}
        case SET_WAIT_RESP:
            return {...state, waitResp: action.payload}
        case SET_WORK_RESP:
            return {...state, workResp: action.payload}
        case SET_CHECK_RESP:
            return {...state, checkResp: action.payload}
        case RESP_CREATED:
            return {...state, respCreated: action.payload}
        case SET_ERROR:
            return {...state, respError: action.payload}
        default:
            return state
    }
}

export const setLoading = (value) => ({type: TOGGLE_LOADING, payload: value})
export const loadResp = (value) => ({type: LOAD_RESP, payload: value})
export const setWaitResp = (value) => ({type: SET_WAIT_RESP, payload: value})
export const setWorkResp = (value) => ({type: SET_WORK_RESP, payload: value})
export const setCheckResp = (value) => ({type: SET_CHECK_RESP, payload: value})
export const setRespCreated = (value) => ({type:RESP_CREATED, payload: value})
export const setRespError = (value) => ({type: RESP_CREATED, payload: value})


export const getRespThunkCreator = () => {
    return (dispatch) => {
        dispatch(setLoading(true))
        getResponses()
            .then(response => {
                dispatch(loadResp(response.data))
                dispatch(setWaitResp(response.data.filter(item => item.status === '0')))
                dispatch(setWorkResp(response.data.filter(item => item.status === '1')))
                dispatch(setCheckResp(response.data.filter(item => item.status === '2')))
            })
            .catch(error => {
                setRespError(true)
                console.log('error on loading resp')
            })
        dispatch(setLoading(false))
    }
}

export const createRespThunkCreator = (id) => {
    return (dispatch) => {
        createResponse(id)
            .then(response => {
                dispatch(setRespCreated(true))
            })
            .catch(error => {
                setRespError(true)
                console.log('error on loading resp')
            })
    }
}

