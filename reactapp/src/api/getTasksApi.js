import instanceAPI from "./API";

const API_TASKS = '/api/orders/'
//все заказы
const COMP_ORDERS = 'api/order'
//api/order/<id>/      -  получить, изменить данные заказа компании   [GET-запрос, PUT-запрос]
const API_RESP = '/respondingfreelancers/'
///respondingfreelancers/   - [GET-запрос]  получить данные об откликах (фрилансер получает все свои отклики, компания - отклики на свои заказы)
// response = ('id_freelancer', 'freelancer', 'order', 'order_title', ''responding_date', 'status')
//где freelancer - имя и фамилия фрилансера, order - id заказа, order_title - название заказа, status - false - откликнулся, true - в работе
//[POST-запрос]  создать отклик, нужно передать id заказа {"order": id}


export const getTasksApi = (params) => {
    return instanceAPI.get(API_TASKS, {params: params})
}

export const createResponse = (id) => {
    return instanceAPI.post(API_RESP, {order: id})
}

export const getResponses = () => {
    return instanceAPI.get(API_RESP)
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







