import instanceAPI from "./API";

const API_TASKS = '/api/orders/'

export const getTasksApi = (params) => {
    return instanceAPI.get(API_TASKS, {params: params})
}