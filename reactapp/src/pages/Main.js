import React, {useState} from 'react';
import styled from "styled-components";
import {Button, Card, Paper} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CoffeeIcon from '@mui/icons-material/Coffee';
import EuroIcon from '@mui/icons-material/Euro';
import MovingIcon from '@mui/icons-material/Moving';
import InfoCard from "../components/InfoCard";

const Description = styled(Paper)`
    grid-row: 2 / span 2;
    grid-column: 1 / span 4;
    width: 100%;
    height: 100%;
`

const CardWrapper = styled(Card)`
    grid-row: 2 / span 8;
    grid-column: 7 / span 4;
`
const MyLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 36px;
`
const LoginButton = styled(MyLink)`
    grid-row: 8 / span 2;
    grid-column: 1 / span 4;
    width: 100%;
    height: 100%;
    background-color: #61dafb;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ControlsWrapper = styled.div`
    grid-row: 5 / span 2;
    grid-column: 1 / span 4;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
`

const Main = () => {
    const controls = [
        {id: 1, text: 'Получите оценку Ваших умений', icon: <ThumbUpIcon />},
        {id: 2, text: 'Получайте справедливую оплату за Ваш труд', icon: <EuroIcon />},
        {id: 3, text: 'Зарабатывайте, не выходя из дома', icon: <CoffeeIcon />},
        {id: 4, text: 'Развивайте свои компетенции', icon: <MovingIcon />},
    ]
    return (
        <>
            <Description elevation={6} sx={{ p: '20px', textAlign: 'center', backgroundColor: 'black'}}>
                <Typography sx={{color: "white", textDecoration: 'none', fontSize: '36px'}}>Хотите узнать больше?</Typography>
                <Typography sx={{color: "white", textDecoration: 'none', fontSize: '36px'}}>
                    <MyLink to={'/signin'}>
                        Зарегистрируйтесь
                    </MyLink>
                    <span> или </span>
                    <MyLink to={'/login'}>
                        войдите
                    </MyLink>
                </Typography>
            </Description>
            <ControlsWrapper>
                {controls.map(item => (
                    <Button key={item.id} variant="outlined" startIcon={item.icon} sx={{width: '45%', height: '40%'}}>
                        {item.text}
                    </Button>
                ))}
            </ControlsWrapper>
            <LoginButton to="/login">
                Начать зарабатывать прямо сейчас
            </LoginButton>
            <InfoCard />
        </>
    );
};

export default Main;