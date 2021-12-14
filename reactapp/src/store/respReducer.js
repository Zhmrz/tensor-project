import {
    approveResponse,
    changeRespStatus,
    createResponse,
    deleteResponse, downloadFile,
    getResponses,
    loadWork, streamResp, uploadFile
} from "../api/respAPI";

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
export const setRespError = (value) => ({type: SET_ERROR, payload: value})


export const getRespThunkCreator = () => {
    return (dispatch) => {
        dispatch(setLoading(true))
        getResponses()
            .then(response => {
                console.log("Получены отклики")
                console.log(response)
                dispatch(loadResp(response.data))
                dispatch(setWaitResp(response.data.filter(item => item.status === 0 || item.status === 5)))
                dispatch(setWorkResp(response.data.filter(item => item.status === 1 || item.status === 4)))
                dispatch(setCheckResp(response.data.filter(item => item.status === 2 || item.status === 3)))
            })
            .catch(error => {
                dispatch(setRespError(true))
                console.log('error on loading resp')
            })
        dispatch(setLoading(false))
    }
}

export const createRespThunkCreator = (id) => {
    return (dispatch) => {
        createResponse(id)
            .then(response => {
                console.log("создан отклик")
                dispatch(setRespCreated(true))
            })
            .catch(error => {
                dispatch(setRespError(true))
                console.log('error on loading resp')
            })
    }
}

export const changeRespStatusThunkCreator = (id, status) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        changeRespStatus(id, status)
            .then(response => {
                console.log('response status изменен на ' + status)
                dispatch(getRespThunkCreator()) //получаем заново все отклики
            })
            .catch(error => {
                dispatch(setRespError(true))
                console.log('error on change status operations with resp')
            })
        dispatch(setLoading(false))
    }
}

export const deleteRespThunkCreator = (id) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        deleteResponse(id)
            .then(response => {
                console.log('response удален')
                dispatch(getRespThunkCreator()) //получаем заново все отклики
            })
            .catch(error => {
                dispatch(setRespError(true))
                console.log('error on delete operations with resp')
            })
        dispatch(setLoading(false))
    }
}
/*
export const approveRespThunkCreator = (id, userId) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        approveResponse(id, userId)
            .then(response => {
                console.log('response одобрен')
                dispatch(getRespThunkCreator()) //получаем заново все отклики
            })
            .catch(error => {
                dispatch(setRespError(true))
                console.log('error on approve operations with resp')
            })
        dispatch(setLoading(false))
    }
}
*/
/*
export const loadFileRespThunkCreator = (id, file) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        loadWork(id, file)
            .then(response => {
                console.log('работа отправлена')
                dispatch(getRespThunkCreator()) //получаем заново все отклики
            })
            .catch(error => {
                dispatch(setRespError(true))
                console.log('error on load operations with resp')
            })
        dispatch(setLoading(false))
    }
}*/

export const uploadFileThunkCreator = (id, data) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        uploadFile(id, data)
            .then(response => {
                console.log('работа отправлена')
                dispatch(changeRespStatusThunkCreator(id, 2))
                dispatch(getRespThunkCreator()) //получаем заново все отклики
            })
            .catch(error => {
                dispatch(setRespError(true))
                console.log('error on load operations with resp')
            })
        dispatch(setLoading(false))
    }
}

export const downloadFileThunkCreator = (id) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        downloadFile(id)
            .then(response => {
                const url = response.completed_order
                console.log(response)
                window.open(url)
                console.log('работа скачана')
            })
            .catch(error => {
                dispatch(setRespError(true))
                console.log('error on download operations with resp')
            })
        dispatch(setLoading(false))
    }
}

export const streamConnect = () => {
    return (dispatch) => {
        console.log('creating stream)')
        streamResp().then(response => {
            console.log('get response')
            dispatch(getRespThunkCreator())
            setTimeout(dispatch, 1000, streamConnect())
        }).catch(error => {
            if(error.response.status === 502) {
                setTimeout(dispatch, 1000, streamConnect())
                //dispatch(streamConnect())
            } else {
                console.log('another error on stream connection')
                console.log(error)
            }
        })
    }
}