import instanceAPI from "./API";

const API_TASKS = 'api/orders/'
//все заказы
const COMP_ORDERS = 'api/order'
//получить, изменить данные заказа компании   [GET-запрос, PUT-запрос]

//все заказы получить
export const getAllTasks = (params) => {
    return instanceAPI.get(API_TASKS, {params: params})
}

export const getOrders = () => {
    return instanceAPI.get(COMP_ORDERS)
}

export const updateOrder = (id, data) => {
    return instanceAPI.put(COMP_ORDERS + `/${id}/`, data)
}

export const createOrder = (data) => {
    return instanceAPI.post(COMP_ORDERS, data)
}







