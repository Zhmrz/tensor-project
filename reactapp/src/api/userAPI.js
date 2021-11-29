import instanceAPI from "./API";

const API_AUTH = '/auth/'
//авторизовать пользователя     [POST-запрос]   response = {token}
const API_REGISTER = '/api/register/'
//зарегистрировать пользователя [POST-запрос]   response = ('username')  в поле type нужно передать значение 0, если фрилансер
const USER_PAGE = '/api/freelancer/'
//получить личную инф-цию фрилансера [GET-запрос]

export const authUser = (params) => {
    return instanceAPI.post(API_AUTH, params)
}

export const registerUser = (params) => {
    return instanceAPI.post(API_REGISTER, params)
}

export const getUserPage = (id) => {
    return instanceAPI.get(USER_PAGE + id + '/')
}