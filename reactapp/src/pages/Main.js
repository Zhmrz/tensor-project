import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Box, Button, Card, Paper, useMediaQuery, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from '@mui/material/Typography'
import InfoCard from "../components/InfoCard";
import {setHasAccount} from "../store/userReducer";
import {useDispatch} from "react-redux";
import {cards, controls} from '../data/commonData'
import {TransitionGroup, CSSTransition, SwitchTransition} from "react-transition-group";
import '../styles/index.css'

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
    console.log(card)
    const nextCard = () => {
        setCard(card === 4 ? 1 : card + 1)
    }
    useEffect(() => {
        let timerID = setTimeout(nextCard, 3000)
        return () => {
            clearTimeout(timerID)
        }
    }, [card])
    return (
        <>
            <Paper elevation={6} sx={{gridRow: mdUp ? '2 / span 2' : '1 / span 1', gridColumn: mdUp ? '1 / span 6' : '1 / span 12', p: '20px', textAlign: 'center', backgroundColor: 'primary.main'}}>
                <Typography sx={{color: "white", textDecoration: 'none', fontSize: '36px'}}>
                    Хотите узнать больше?
                </Typography>
                <Typography variant='span' sx={{color: 'primary.light', fontSize: '36px', ":hover": {color: 'secondary.main'}}}>
                    <MyLink to={'/login'} onClick={() => dispatch(setHasAccount(false))}>
                        Зарегистрируйтесь
                    </MyLink>
                </Typography>
                <Typography variant='span' sx={{color: 'white', fontSize: '36px'}}>
                    &#160;или&#160;
                </Typography>
                <Typography variant='span' sx={{color: 'primary.light', fontSize: '36px', ":hover": {color: 'secondary.main'}}}>
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
                    <Button key={item.id} variant="outlined" startIcon={item.icon} sx={{width: mdUp ? '45%' : '100%', height: mdUp ? '40%' : '20%', fontSize: '18px', backgroundColor: card === (item.id)? 'secondary.main' : 'none' }} onClick={() => setCard(item.id)}>
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
                    <Typography variant='span' sx={{color: 'primary.light', fontSize: '36px', ":hover": {color: 'secondary.main'}}}>
                        <MyLink to={'/help'}>
                            страницу помощи
                        </MyLink>
                    </Typography>
                </Box>
            </Paper>
            <SwitchTransition mode={'out-in'}>
                    <CSSTransition
                        timeout={500}
                        classNames='card'
                        key={card}
                        unmountOnExit
                        mountOnEnter
                    >
                        <InfoCard row='2 / span 8' column='8 / span 5' item={cards.filter(item => item.id === card)[0]} liked={liked[card+1]} setLiked={(value) => setLiked({...liked, [card+1]: value})}/>
                    </CSSTransition>
            </SwitchTransition>
        </>
    );
};

export default Main;