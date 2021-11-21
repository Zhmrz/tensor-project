import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFound = () => {
    return (
        <Paper elevation='6' sx={{gridRow: '2 / span 2', gridColumn: '1 / span 5', p: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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
    );
};

export default NotFound;