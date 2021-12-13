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
//Загрузить фото (фрилансер) PATCH-запрос
const PHOTO_FREE = '/api/uploadimagef/'
// Загрузить фото (компания) PATCH-запрос
const PHOTO_COMP = '/api/uploadimagec/'

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
    return instanceAPI.put(COMPANY_PAGE + id + '/', data)
}

export const getMyData = () => {
    return instanceAPI.get(USER)
}

//Загрузить фото (фрилансер)
// Загрузить фото (компания)
export const uploadPhoto = (type, id, data) => {
    if(type){
        return instanceAPI.patch(PHOTO_COMP + id + '/', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
    } else {
        return instanceAPI.patch(PHOTO_FREE + id + '/', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
    }
}