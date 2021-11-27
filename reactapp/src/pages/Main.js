import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Box, Button, Card, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from '@mui/material/Typography'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CoffeeIcon from '@mui/icons-material/Coffee';
import EuroIcon from '@mui/icons-material/Euro';
import MovingIcon from '@mui/icons-material/Moving';
import InfoCard from "../components/InfoCard";
import dog from '../img/dog.png';
import dzyuba from '../img/dzyuba.jpg';
import insta from '../img/insta.jpg';
import elena from '../img/elena.jpg';
import snou from '../img/snou.jpg'
import {setHasAccount} from "../store/userReducer";
import {useDispatch} from "react-redux";

const MyLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
`

const Main = () => {
    const dispatch = useDispatch()
    const [card, setCard] = useState(1)
    const [liked, setLiked] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
    })

    const nextCard = () => {
        setCard(card === 3 ? 0 : card + 1)
    }

    useEffect(() => {
        let timerID = setTimeout(nextCard, 10000)
        return () => {
            clearTimeout(timerID)
        }
    }, [card])

    const controls = [
        {id: 1, text: 'Получите оценку Ваших умений', icon: <ThumbUpIcon />},
        {id: 2, text: 'Получайте справедливую оплату', icon: <EuroIcon />},
        {id: 3, text: 'Зарабатывайте, не выходя из дома', icon: <CoffeeIcon />},
        {id: 4, text: 'Развивайте свои компетенции', icon: <MovingIcon />},
    ]
    const cards = [
        {id: 1, avatar: 'D', place: 'Санкт-Петербург, Россия', date: '22 ноября, 2021', link: '/login', image: dzyuba, alt: 'Счастливый Дзюба', likes: 2521, desc: 'Шикарная обработка видео! Спасибо большое @handmaker за то, что он сделал меня самым популярным футболистом всея Руси!!!! Сразу видно профессионализм!!!'},
        {id: 2, avatar: 'E', place: 'Москва, Россия', date: '20 ноября, 2021', link: '/login', image: elena, alt: 'Счастливый Елена Малышева', likes: 4872, desc: 'Заказывала 3D-модели для очередного выпуска программы "Здоров жиЕсть". Заказ выполнили раньше положенного срока, поэтому увеличила оплату на 20%!'},
        {id: 3, avatar: 'S', place: 'В самой лучшей стране мира', date: '14 ноября, 2021', link: '/login', image: snou, alt: 'Счастливый программист', likes: 360001, desc: 'Заработал больше, чем сын маминой подруги, и при этом даже не вспотел. И да, я на коне, но при этом не выхожу из своего коттеджа.'},
        {id: 4, avatar: 'I', place: 'На тусе', date: '11 ноября, 2021', link: '/login', image: insta, alt: 'Счастливая Инстасамка', likes: 1248, desc: 'Пипец текст агонь, очуметь, они мне платят и платят скоро новый альбом! ДАВАЙ МНЕ ДЕНЬГИ НЕСИ!!!'},
        {id: 5, avatar: 'R', place: 'Москва, Россия', date: '1 ноября, 2021', link: '/login', image: dog, alt: 'Счастливый собакен', likes: 124000000, desc: 'Этот собакен заработал больше, чем сын маминой подруги, просто выполняя заказы на фриласне!'}
    ]
    return (
        <>
            <Paper elevation={6} sx={{gridRow: '2 / span 2', gridColumn: '1 / span 6', p: '20px', textAlign: 'center', backgroundColor: 'primary.main'}}>
                <Typography sx={{color: "white", textDecoration: 'none', fontSize: '36px'}}>
                    Хотите узнать больше?
                </Typography>
                <Typography variant='span' sx={{color: 'white', fontSize: '36px', ":hover": {color: 'secondary.main'}}}>
                    <MyLink to={'/login'} onClick={() => dispatch(setHasAccount(false))}>
                        Зарегистрируйтесь
                    </MyLink>
                </Typography>
                <Typography variant='span' sx={{color: 'white', fontSize: '36px'}}>
                    &#160;или&#160;
                </Typography>
                <Typography variant='span' sx={{color: 'white', fontSize: '36px', ":hover": {color: 'secondary.main'}}}>
                    <MyLink to={'/login'} onClick={() => dispatch(setHasAccount(true))}>
                        Войдите
                    </MyLink>
                </Typography>
            </Paper>
            <Box sx={{gridRow: '4 / span 4',
                gridColumn: '1 / span 6',
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: '20px 0'
            }}>
                {controls.map(item => (
                    <Button key={item.id} variant="outlined" startIcon={item.icon} sx={{width: '45%', height: '40%', fontSize: '18px'}} onClick={() => setCard(item.id - 1)}>
                        {item.text}
                    </Button>
                ))}
            </Box>
            <Paper elevation={6} sx={{gridRow: '8 / span 2', gridColumn: '1 / span 6', p: '20px', backgroundColor: 'primary.main', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
                <Typography variant='span' sx={{color: 'white', fontSize: '36px'}}>
                    Проблемы с использованием сервиса?
                </Typography>
                <Box>
                    <Typography variant='span' sx={{color: 'white', fontSize: '36px'}}>
                        Посетите нашу&#160;
                    </Typography>
                    <Typography variant='span' sx={{color: 'white', fontSize: '36px', ":hover": {color: 'secondary.main'}}}>
                        <MyLink to={'/help'}>
                            страницу помощи
                        </MyLink>
                    </Typography>
                </Box>
            </Paper>
            <InfoCard row='2 / span 8' column='8 / span 5' item={cards[card]} liked={liked[card+1]} setLiked={(value) => setLiked({...liked, [card+1]: value})}/>
        </>
    );
};

export default Main;