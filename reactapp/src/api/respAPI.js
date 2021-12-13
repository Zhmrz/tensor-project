import instanceAPI from "./API";

const API_RESP = 'api/respondingfreelancers/'
const API_UPLOAD_FREE = '/api/uploadfile/'
const API_UPLOAD_COMP = '/api/downloadfile/'
const STREAM = '/stream/'

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

//Загрузить работу (Ф)
//http://127.0.0.1:8000/api/respondingfreelancers/<id>/  [PATCH-запрос] form-data {"completed_order": файл}.
// Меняется статус отклика: status=2 (на проверке)
export const loadWork = (id, file) => {
    return instanceAPI.patch(API_RESP + id + '/', {"completed_order": file})
}

//Не принять или принять работу (К) - http://127.0.0.1:8000/api/respondingfreelancers/<id>/
// [PATCH-запрос] {"status": 4} {"status": 3}.
export const changeRespStatus = (id, status) => {
    return instanceAPI.patch(API_RESP + id + '/', {"status": status})
}

//Удалить отклик (Ф)  -  http://127.0.0.1:8000/api/respondingfreelancers/<id>/
// [DELETE-запрос]
export const deleteResponse = (id) => {
    return instanceAPI.delete(API_RESP + id + '/')
}

//Загрузить работу (фрилансер)
// http://127.0.0.1:8000/api/uploadfile/<id отклика>/   PATCH-запрос
export const uploadFile = (id, data) => {
    return instanceAPI.patch(API_UPLOAD_FREE + id + '/', data)
}

//Скачать работу (компания)    -
// http://127.0.0.1:8000/api/downloadfile/<id отклика>/   GET-запрос  respone={"completed_order": <url файла>}
export const downloadFile = (id) => {
    return instanceAPI.get(API_UPLOAD_COMP + id + '/')
}

export const streamResp = () => {
    return instanceAPI.get(STREAM)
}