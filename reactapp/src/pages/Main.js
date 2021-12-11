import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Box, Button, Card, Paper, useMediaQuery, useTheme} from "@mui/material";
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
import oneHome from '../img/oneHome.jpg';
import heroes from '../img/heroes.jpeg';
import {setHasAccount} from "../store/userReducer";
import {useDispatch} from "react-redux";

const MyLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
`

const Main = () => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));
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
        {id: 1, avatar: 'D', topics: [1,3,5], date: '22 ноября, 2021', link: '/login', image: dzyuba, alt: 'Счастливый Дзюба', likes: 2521, desc: 'Шикарная обработка видео! Спасибо большое @handmaker за то, что он сделал меня самым популярным футболистом всея Руси!!!! Сразу видно профессионализм!!!'},
        {id: 2, avatar: 'E', topics: [1,2,3], date: '20 ноября, 2021', link: '/login', image: heroes, alt: 'Счастливая лига', likes: 4872, desc: 'Заказывала 3D-модели на 20%!'},
        {id: 3, avatar: 'S', topics: [2,3,4], date: '14 ноября, 2021', link: '/login', image: oneHome, alt: 'Счастливый программист', likes: 360001, desc: 'Заработал больше, чем сын маминой подруги, и при этом даже не вспотел. И да, я на коне, но при этом не выхожу из своего коттеджа.'},
        {id: 4, avatar: 'I', topics: [2], date: '11 ноября, 2021', link: '/login', image: insta, alt: 'Счастливая Инстасамка', likes: 1248, desc: 'Пипец текст агонь, очуметь, они мне платят и платят скоро новый альбом! ДАВАЙ МНЕ ДЕНЬГИ НЕСИ!!!'},
        {id: 5, avatar: 'R', topics: [1], date: '1 ноября, 2021', link: '/login', image: dog, alt: 'Счастливый собакен', likes: 124000000, desc: 'Этот собакен заработал больше, чем сын маминой подруги, просто выполняя заказы на фриласне!'}
    ]
    return (
        <>
            <Paper elevation={6} sx={{gridRow: mdUp ? '2 / span 2' : '1 / span 1', gridColumn: mdUp ? '1 / span 6' : '1 / span 12', p: '20px', textAlign: 'center', backgroundColor: 'primary.main'}}>
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
            <Box sx={{gridRow: mdUp ? '4 / span 4' : '2 / span 8',
                gridColumn: '1 / span 6',
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: '20px 0'
            }}>
                {controls.map(item => (
                    <Button key={item.id} variant="outlined" startIcon={item.icon} sx={{width: mdUp ? '45%' : '100%', height: mdUp ? '40%' : '20%', fontSize: '18px', backgroundColor: card === (item.id - 1)? 'secondary.main' : 'none' }} onClick={() => setCard(item.id - 1)}>
                        {item.text}
                    </Button>
                ))}
            </Box>
            <Paper elevation={6} sx={{gridRow: mdUp ? '8 / span 2' : '10 / span 1', gridColumn: mdUp ? '1 / span 6' : '1 / span 12', p: '20px', backgroundColor: 'primary.main', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
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