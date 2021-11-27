import axios from "axios";

const API_TASKS = 'http://127.0.0.1:8000/api/orders'
// http://127.0.0.1:8000/api/orders/

export const getTasksApi = (params) => {
    return axios.get(API_TASKS, {params: params})
}