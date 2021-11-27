import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import img from '../img/svg/NotFound.svg';
import styled from "styled-components";

const NotFoundImg = styled.div`
    grid-column: 2 / span 10;
    grid-row: 4 / span 6;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    overflow: hidden;
`;

const NotFound = () => {
    return (
        <>
            <Paper elevation='6' sx={{gridRow: '2 / span 2', gridColumn: '2 / span 10', p: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '32px'}}>
                <Box>
                    <Typography variant='h2' component="h2">
                        Страница не найдена :(
                    </Typography>
                    <Typography variant='p' component="p" sx={{mt: 2}}>
                        Похоже, то, что Вы ищете, находится за гранью человеческого познания
                    </Typography>
                </Box>
                <SentimentVeryDissatisfiedIcon sx={{fontSize: '54px'}}/>
            </Paper>
            <NotFoundImg src={img}/>
        </>
    );
};

export default NotFound;