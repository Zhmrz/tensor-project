import React, {useState} from 'react';
import InfoCard from "../components/InfoCard";
import UserInfo from "../components/UserInfo";


const UserPage = () => {
    const [userName, setUserName] = useState('User')
    const rating = 50
    const link = ''
    const profile = 'Программист'
    const item = {id: 1,
            avatar: 'D', //первая буква имени
            place: profile,
            date: '22 ноября, 2021', //текущая дата или дата регистрации
            link: link,
            image: undefined,
            alt: userName,
            likes: rating,
            desc: 'Краткое описание пользователя'
    }
    return (
        <>
            <UserInfo row='2 / span 8' column='1 / span 6'/>
            <InfoCard row='2 / span 8' column='8 / span 5' item={item} liked={true} setLiked={() => console.log('no')}/>
        </>
    );
};

export default UserPage;