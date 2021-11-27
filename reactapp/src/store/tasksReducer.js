import {getTasksApi} from "../api/getTasksApi";

const LOAD_TASKS = 'LOAD_TASKS'
const RESET_TASKS = 'RESET_TASKS'
const TOGGLE_LOADING = 'TOGGLE_LOADING'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_PAGE = 'SET_TOTAL_PAGE'
const SET_PAGE_LIMIT = 'SET_PAGE_LIMIT'

const defaultState = {
    tasks: [],
    pageLimit: 5,
    totalPage: 1,
    currentPage: 1,
    isLoading: false
}


export const tasksReducer = (state = defaultState, action) => {
    switch(action.type){
        case LOAD_TASKS:
            return {...state, tasks: action.payload}
        case RESET_TASKS:
            return {...state, ...defaultState}
        case TOGGLE_LOADING:
            return {...state, isLoading: action.payload}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload}
        case SET_TOTAL_PAGE:
            return {...state, totalPage: action.payload}
        case SET_PAGE_LIMIT:
            return {...state, pageLimit: action.payload}
        default:
            return state
    }
}

export const setLoading = (value) => ({type: TOGGLE_LOADING, payload: value})
export const setCurrentPage = (value) => ({type: SET_CURRENT_PAGE, payload: value})
export const setTotalPage = (value) => ({type: SET_TOTAL_PAGE, payload: value})
export const setPageLimit = (value) => ({type: SET_PAGE_LIMIT, payload: value})
export const loadTasks = (data) => ({type: LOAD_TASKS, payload: data})

export const getTasksThunkCreator = (params) => {
    return (dispatch, getState) => {
        dispatch(setLoading(true))
        //получить параметры фильтрации и упаковать в params
        getTasksApi(params)
            .then(response => {
                dispatch(loadTasks(response.data))
                const limit = getState().tasks.pageLimit
                dispatch(setTotalPage(Math.ceil(response.data.length/limit)))
            })
            .catch(error => {
                console.log('error')
            })
        dispatch(setLoading(false))
    }
}

