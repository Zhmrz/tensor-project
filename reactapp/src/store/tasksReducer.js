import {createOrder, getAllTasks, getOrders, updateOrder} from "../api/tasksAPI";

const LOAD_TASKS = 'LOAD_TASKS'
const RESET_TASKS = 'RESET_TASKS'
const TOGGLE_SEARCH_LOADING = 'TOGGLE_SEARCH_LOADING'
const TOGGLE_COMPANY_LOADING = 'TOGGLE_COMPANY_LOADING'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_PAGE = 'SET_TOTAL_PAGE'
const SET_PAGE_LIMIT = 'SET_PAGE_LIMIT'
const SET_PRICE_LIMS = 'SET_PRICE_LIMS'
const SET_DATE_LIMS = 'SET_DATE_LIMS'
const SET_DURATION_LIMS = 'SET_DURATION_LIMS'
const LOAD_COMPANY_ORDERS = 'LOAD_COMPANY_ORDERS'
const SET_SEARCH_ERROR = 'SET_SEARCH_ERROR'
const SET_COMPANY_ERROR = 'SET_COMPANY_ERROR'

const defaultState = {
    search: {
        tasks: [],
        priceLims: {min: '', max: ''},
        durationLims: {min: '', max: ''},
        dateLims: {min: '', max: ''},
        pageLimit: 5,
        totalPage: 1,
        currentPage: 1,
        isLoading: false,
        isError: false
    },
    company: {
        orders: [],
        isLoading: false,
        isError: false
    },
}

export const tasksReducer = (state = defaultState, action) => {
    switch(action.type){
        case LOAD_TASKS:
            return {...state, search: {...state.search, tasks: action.payload}}
        case RESET_TASKS:
            return {...state, ...defaultState}
        case TOGGLE_SEARCH_LOADING:
            return {...state, search: {...state.search, isLoading: action.payload}}
        case SET_CURRENT_PAGE:
            return {...state, search: {...state.search, currentPage: action.payload}}
        case SET_TOTAL_PAGE:
            return {...state, search: {...state.search, totalPage: action.payload}}
        case SET_PAGE_LIMIT:
            return {...state, search: {...state.search, pageLimit: action.payload}}
        case SET_PRICE_LIMS:
            return {...state, search: {...state.search, priceLims: action.payload}}
        case SET_DATE_LIMS:
            return {...state, search: {...state.search, dateLims: action.payload}}
        case SET_DURATION_LIMS:
            return {...state, search: {...state.search, durationLims: action.payload}}
        case SET_SEARCH_ERROR:
            return {...state, search: {...state.search, isError: action.payload}}
        case LOAD_COMPANY_ORDERS:
            return {...state, company: {...state.company, orders: action.payload}}
        case TOGGLE_COMPANY_LOADING:
            return {...state, company: {...state.company, isLoading: action.payload}}
        case SET_COMPANY_ERROR:
            return {...state, company: {...state.company, isError: action.payload}}
        default:
            return state
    }
}

export const setSearchLoading = (value) => ({type: TOGGLE_SEARCH_LOADING, payload: value})
export const setCompanyOrdersLoading = (value) => ({type: TOGGLE_COMPANY_LOADING, payload: value})
export const setSearchError = (value) => ({type: SET_SEARCH_ERROR, payload: value})
export const setCompanyError = (value) => ({type: SET_COMPANY_ERROR, payload: value})
export const setCurrentPage = (value) => ({type: SET_CURRENT_PAGE, payload: value})
export const setTotalPage = (value) => ({type: SET_TOTAL_PAGE, payload: value})
export const setPageLimit = (value) => ({type: SET_PAGE_LIMIT, payload: value})
export const loadTasks = (data) => ({type: LOAD_TASKS, payload: data})
export const loadCompanyOrders = (data) => ({type: LOAD_COMPANY_ORDERS, payload: data})
export const setPriceLims = (value) => ({type: SET_PRICE_LIMS, payload: {min: value[0], max: value[1]}})
export const setDateLims = (value) => ({type: SET_DATE_LIMS, payload: {min: value[0], max: value[1]}})
export const setDurationLims = (value) => ({type: SET_DURATION_LIMS, payload: {min: value[0], max: value[1]}})

export const getTasksThunkCreator = (params) => {
    return (dispatch, getState) => {
        dispatch(setSearchLoading(true))
        //получить параметры фильтрации и упаковать в params
        getAllTasks(params)
            .then(response => {
                dispatch(loadTasks(response.data.orders))
                dispatch(setDateLims(response.data.dateLims))
                dispatch(setDurationLims(response.data.durationLims))
                dispatch(setPriceLims(response.data.priceLims))
                const limit = getState().tasks.pageLimit
                dispatch(setTotalPage(Math.ceil(response.data.length/limit)))
            })
            .catch(error => {
                dispatch(setSearchError(true))
            })
        dispatch(setSearchLoading(false))
    }
}

export const getCompanyOrdersThunkCreator = () => {
    return (dispatch) => {
        dispatch(setCompanyOrdersLoading(true))
        getOrders()
            .then(response => {
                dispatch(loadCompanyOrders(response.data))
            })
            .catch(error => {
                dispatch(setCompanyError(true))
                console.log('ошибка загрузки заказов компании')
            })
        dispatch(setCompanyOrdersLoading(false))
    }
}

export const updateCompanyOrderThunkCreator = (id, data) => {
    return (dispatch) => {
        dispatch(setCompanyOrdersLoading(true))
        updateOrder(id, data)
            .then(response => {
                dispatch(getCompanyOrdersThunkCreator())
            })
            .catch(error => {
                dispatch(setCompanyError(true))
                console.log('Ошибка обновления заказа')
            })
        dispatch(setCompanyOrdersLoading(false))
    }
}

export const createCompanyOrderThunkCreator = (data) => {
    return (dispatch) => {
        dispatch(setCompanyOrdersLoading(true))
        createOrder(data)
            .then(response => {
                dispatch(getCompanyOrdersThunkCreator())
            })
            .catch(error => {
                dispatch(setCompanyError(true))
                console.log('Ошибка создания заказа')
            })
        dispatch(setCompanyOrdersLoading(false))
    }
}

