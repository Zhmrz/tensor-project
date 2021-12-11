import instanceAPI from "./API";

const API_AUTH = '/auth/'
//авторизовать пользователя     [POST-запрос]   response = {token}
const API_REGISTER = '/api/register/'
//зарегистрировать пользователя [POST-запрос]   response = ('username')  в поле type нужно передать значение 0, если фрилансер
const FREELANCER_PAGE = '/api/freelancer/'
//получить личную инф-цию фрилансера [GET-запрос]
const COMPANY_PAGE = '/api/company/'
//получить личную инф-цию компании   [POST-запрос]
const USER = '/api/user/'

export const authUser = (params) => {
    return instanceAPI.post(API_AUTH, params)
}

export const registerUser = (params) => {
    return instanceAPI.post(API_REGISTER, params)
}

export const getFreelancerPage = (id) => {
    return instanceAPI.get(FREELANCER_PAGE + id + '/')
}

export const getCompanyPage = (id) => {
    return instanceAPI.get(COMPANY_PAGE + id + '/')
}

export const changeFreelancerInfo = (id, data) => {
    return instanceAPI.put(FREELANCER_PAGE + id + '/', data)
}

export const changeCompanyInfo = (id, data) => {
    return instanceAPI.put(COMPANY_PAGE + id + '/', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getMyData = () => {
    return instanceAPI.get(USER)
}