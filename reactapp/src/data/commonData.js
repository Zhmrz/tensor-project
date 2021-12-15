import dzyuba from "../img/dzyuba.jpg";
import heroes from "../img/heroes.jpeg";
import oneHome from "../img/oneHome.jpg";
import insta from "../img/insta.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EuroIcon from "@mui/icons-material/Euro";
import CoffeeIcon from "@mui/icons-material/Coffee";
import MovingIcon from "@mui/icons-material/Moving";
import React from "react";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CodeIcon from "@mui/icons-material/Code";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SchoolIcon from "@mui/icons-material/School";
import CreateIcon from "@mui/icons-material/Create";


//Main page data
export const cards = [
    {id: 1, avatar: 'D', topics: [1,3,5], date: '22 ноября, 2021', link: '/login', image: dzyuba, alt: 'Счастливый Дзюба', likes: 2521, description: 'Я рад, что могу показать всем свое мастерство!'},
    {id: 2, avatar: 'E', topics: [1,2,3], date: '20 ноября, 2021', link: '/login', image: heroes, alt: 'Счастливая Лига', likes: 4872, description: 'Одобряем справедливую оплату за труд!'},
    {id: 3, avatar: 'S', topics: [2,3,4], date: '14 ноября, 2021', link: '/login', image: oneHome, alt: 'Счастливый парень', likes: 360001, description: 'Можно просто сидеть дома и зарабатывать столько, сколько хочешь!'},
    {id: 4, avatar: 'I', topics: [2], date: '11 ноября, 2021', link: '/login', image: insta, alt: 'Счастливая Инстасамка', likes: 1248, description: 'Любые навыки могут приносить стабильный доход!'},
]

export const controls = [
    {id: 1, text: 'Получите оценку Ваших умений', icon: <ThumbUpIcon />},
    {id: 2, text: 'Получайте справедливую оплату', icon: <EuroIcon />},
    {id: 3, text: 'Зарабатывайте, не выходя из дома', icon: <CoffeeIcon />},
    {id: 4, text: 'Развивайте свои компетенции', icon: <MovingIcon />},
]

//Search page data
export const defTopics = {
    code: false,
    model: false,
    photo: false,
    typo: false,
    img: false,
    edu: false,
}

//User page data
export const buttonsFree = [
    {id: 1, text: 'Отклики', modal: 'wait', row: '1 / span 1', column: '4 / span 2', columnSm: '2 / span 3', onClick: ''},
    {id: 2, text: 'В работе', modal: 'work', row: '1 / span 1', column: '6 / span 2', columnSm: '5 / span 4', onClick: ''},
    {id: 3, text: 'На проверке', modal: 'check', row: '1 / span 1', column: '8 / span 2', columnSm: '9 / span 3', onClick: ''},
    {id: 4, text: 'Редактировать профиль',  modal: 'edit', row: '10 / span 1', column: '4 / span 6', columnSm: '2 / span 10', onClick: ''},
]

export const buttonsComp = [
    {id: 1, text: 'Отклики', modal: 'wait', row: '1 / span 1', column: '4 / span 2', columnSm: '2 / span 3', onClick: ''},
    {id: 2, text: 'В работе', modal: 'work', row: '1 / span 1', column: '6 / span 2', columnSm: '5 / span 4', onClick: ''},
    {id: 3, text: 'На проверке', modal: 'check', row: '1 / span 1', column: '8 / span 2', columnSm: '9 / span 3', onClick: ''},
    {id: 4, text: 'Редактировать профиль',  modal: 'edit', row: '10 / span 1', column: '4 / span 3', columnSm: '2 / span 5', onClick: ''},
    {id: 5, text: 'Добавить/изменить заказ', modal: 'change', row: '10 / span 1', column: '7 / span 3', columnSm: '7 / span 5', onClick: ''}
]

export const anotherButtons = {id: 1, text: 'Все заказы компании', modal: 'companyWorks', row: '10 / span 1', column: '4 / span 6', onClick: ''}

//Login page data
export const variants = [
    {id: 1, label: 'Типографика', name: 'typo', icon: <TextFieldsIcon />, active: <TextFieldsIcon />},
    {id: 2, label: 'Программирование', name: 'dev', icon: <CodeIcon />, active: <CodeIcon />},
    {id: 3, label: '3D-моделирование', name: 'model', icon: <ThreeDRotationIcon />, active: <ThreeDRotationIcon />},
    {id: 4, label: 'Фотография', name: 'photo', icon: <PhotoCameraIcon />, active: <PhotoCameraIcon />},
    {id: 5, label: 'Образование', name: 'edu', icon: <SchoolIcon />, active: <SchoolIcon />},
    {id: 6, label: 'Графика', name: 'img', icon: <CreateIcon />, active: <CreateIcon />},
]

export const defUserData = {
    username: '', //email
    password: '',
    first_name: '',
    last_name: '',
    user_type: '0',
    link_to_resume: '',
    topics: []
}

export const userSections = [
    {id: 1, label: 'Имя', title: 'Изменить имя пользователя', field: 'first_name', type: 'text'},
    {id: 2, label: 'Фамилия', title: 'Изменить фамилию пользователя', field: 'last_name', type: 'text'},
    {id: 3, label: 'Описание', title: 'Изменить описание пользователя', field: 'description', type: 'text'},
    {id: 4, label: 'Ссылка', title: 'Изменить ссылку на резюме', field: 'link_to_resume', type: 'url'},
]

export const compSections = [
    {id: 1, label: 'Название', title: 'Изменить название компании', field: 'first_name', type: 'text'},
    {id: 2, label: 'Описание', title: 'Изменить описание компании', field: 'description', type: 'text'},
    {id: 3, label: 'Ссылка', title: 'Изменить ссылку на сайт', field: 'link_to_resume', type: 'url'},
]

//OrderModal
export const statusDict = {
    '0': 'Отлик отправлен',
    '1': 'Отлик одобрен',
    '2': 'Работа на проверке',
    '3': 'Работа оплачена',
    '4': 'Работа возвращена на доработку',
    '5': 'Отлик отменен',
}

//TaskModal
export const itemDetails = [
    {id: 1, label: 'Название:', field: 'title'},
    {id: 2, label: 'Дата публикации:', field: 'publication_date'},
    {id: 3, label: 'Описание:', field: 'description'},
    {id: 4, label: 'Стоимость:', field: 'price'},
    {id: 5, label: 'Сроки выполнения:', field: 'deadline'},
]