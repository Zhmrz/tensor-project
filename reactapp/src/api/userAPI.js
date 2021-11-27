import axios from "axios";

const API_AUTH = 'http://127.0.0.1:8000/auth/'
//авторизовать пользователя     [POST-запрос]   response = {token}
const API_REGISTER = 'http://127.0.0.1:8000/api/register/'
//зарегистрировать пользователя [POST-запрос]   response = ('username')  в поле type нужно передать значение 0, если фрилансер
const USER_PAGE = 'http://127.0.0.1:8000/api/freelancer/'
//получить личную инф-цию фрилансера [GET-запрос]

export const authUser = (params) => {
    return axios.post(API_AUTH, params)
}

export const registerUser = (params) => {
    return axios.post(API_REGISTER, params)
}

export const getUserPage = () => {
    return axios.get(USER_PAGE)
}