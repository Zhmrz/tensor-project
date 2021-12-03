import instanceAPI from "./API";

const API_RESP = 'api/respondingfreelancers/'
///respondingfreelancers/   - [GET-запрос]  получить данные об откликах (фрилансер получает все свои отклики, компания - отклики на свои заказы)
// response = ('id_freelancer', 'freelancer', 'order', 'order_title', ''responding_date', 'status')
//где freelancer - имя и фамилия фрилансера, order - id заказа, order_title - название заказа, status - false - откликнулся, true - в работе
//[POST-запрос]  создать отклик, нужно передать id заказа {"order": id}

export const createResponse = (id) => {
    return instanceAPI.post(API_RESP, {order: id})
}

export const getResponses = () => {
    return instanceAPI.get(API_RESP)
}

