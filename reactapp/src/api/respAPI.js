import instanceAPI from "./API";

const API_RESP = 'api/respondingfreelancers/'
const API_APPR_RESP = 'api/order/'
///respondingfreelancers/   - [GET-запрос]  получить данные об откликах (фрилансер получает все свои отклики, компания - отклики на свои заказы)
// response = ('id_freelancer', 'freelancer', 'order', 'order_title', ''responding_date', 'status')
//где freelancer - имя и фамилия фрилансера, order - id заказа, order_title - название заказа, status - false - откликнулся, true - в работе
//[POST-запрос]  создать отклик, нужно передать id заказа {"order": id}

export const createResponse = (id) => {
    return instanceAPI.post(API_RESP, {order: id})
}

//фрилансер получает все свои отклики, компания - отклики на свои заказы
//response = ('id', 'id_freelancer', 'freelancer', 'order', 'order_title', ''responding_date', 'status')
//где id - id отклика, freelancer - имя и фамилия фрилансера, order - id заказа, order_title - название заказа,
//    status: 0 - откликнулся, 1 - принято в работу, 2 - на проверке, 3 - принято, 4 - на доработку
export const getResponses = () => {
    return instanceAPI.get(API_RESP)
}

//Одобрить отклик (К) - http://127.0.0.1:8000/api/order/<id>/
// [PATCH-запрос]  {"performer": id фрилансера}. После назначения меняется статус у отклика: status=1 (принято в работу)
export const approveResponse = (id) => { //чей id в строке запросс???
    return instanceAPI.patch(API_APPR_RESP + id, {"performer": id})
}

//Загрузить работу (Ф)
//http://127.0.0.1:8000/api/respondingfreelancers/<id>/  [PATCH-запрос] form-data {"completed_order": файл}.
// Меняется статус отклика: status=2 (на проверке)
export const loadWork = (id, file) => { //чей id в строке запрос???
    return instanceAPI.patch(API_APPR_RESP + id, {"completed_order": file})
}

//Принять работу (К) - http://127.0.0.1:8000/api/respondingfreelancers/<id>/
//[PATCH-запрос] {"status": 3}.
//Происходит перевод денег со счета компании на счет фрилансера,
//статус заказа status=3 (принято), счетчик выполн-х заказов у фрилансера +1
export const acceptWork = (id) => { //чей id в строке запрос???
    return instanceAPI.patch(API_APPR_RESP + id, {"status": 3})
}
//Не принять работу (К) - http://127.0.0.1:8000/api/respondingfreelancers/<id>/
// [PATCH-запрос] {"status": 4}
export const declineWork = (id) => { //чей id в строке запрос???
    return instanceAPI.patch(API_APPR_RESP + id, {"status": 4})
}

//Удалить отклик (Ф)  -  http://127.0.0.1:8000/api/respondingfreelancers/<id>/
// [DELETE-запрос]
export const deleteResponse = (id) => { //чей id в строке запрос???
    return instanceAPI.delete(API_APPR_RESP + id)
}

